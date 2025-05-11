<script setup>
import { getPost, deletePost } from '@/api/api.posts'
import { getComments } from '@/api/api.comments'
import { onMounted, ref, watch } from 'vue'
import Loader from './Loader/Loader.vue'
import { SideBarEnum } from '@/utils/SideBarModes'


const { postId } = defineProps({
  postId: {
    type: Number,
    required: true,
  },
})
const posts = defineModel('posts', {
  type: Array,
})
const currentPostId = defineModel('currentPostId', {
  type: Number,
})
const sideBarMode = defineModel('sideBarMode', {
  type: String,
})
const body = defineModel('body', {
  type: String,
})
const title = defineModel('title', {
  type: String,
})
const post = ref({})
const comments = ref([]);
const isLoading = ref(false)

const showComments = async () => {
  sideBarMode.value = SideBarEnum.Comments_List;
  try {
    comments.value = await getComments(currentPostId.value);

  } catch (error) {
    console.error(error);
  }
}

const onShowPost = async () => {
  isLoading.value = true
  try {
    const postsResponse = await getPost(postId)
    console.log(postsResponse)
    post.value = postsResponse
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(onShowPost)
watch(() => postId, onShowPost, showComments)

const onDeletePost = async () => {
  try {
    await deletePost(postId)
    posts.value = posts.value.filter((post) => post.id !== postId)
    currentPostId.value = null
    sideBarMode.value = SideBarEnum.None
  } catch (error) {
    console.error('Error deleting post:', error)
  }
}

const onEditPost = () => {
  sideBarMode.value = SideBarEnum.Edit_Post_Form;
  currentPostId.value = postId;

}

const openCommentForm = () => {
  sideBarMode.value = SideBarEnum.New_Comment_Form;
  currentPostId.value = postId;
  body.value = post.value.body;
  title.value = post.value.title;

}


console.log(post.value)
console.log(postId)
</script>
<template>
  <Loader v-if="isLoading" />
  <div className="block" v-if="!isLoading">
    <div className="is-flex is-justify-content-space-between is-align-items-center">
      <h2>{{ isLoading ? '' : `#${post.id}: ${post.title}` }}</h2>
      <div className="is-flex">
        <span className="icon is-small is-right is-clickable" @click="onEditPost">
          <i className="fas fa-pen-to-square"></i>
        </span>
        <span
          className="icon is-small is-right has-text-danger is-clickable ml-3"
          @click="onDeletePost"
        >
          <i className="fas fa-trash"></i>
        </span>
      </div>
    </div>
    <p data-cy="PostBody">{{ post.body }}</p>
    <div className="block" v-if="comments.length === 0">
  <p className="title is-4">No comments yet</p>
</div>

    <article className="message is-small" v-if="comments.length > 0">
  <div className="message-header">
    <a href="{`mailto:${email}`}"> name </a>
    <button type="button" className="delete is-small" aria-label="delete">

    </button>
  </div>
  <div className="message-body">el body</div>
</article>
<button type="button" className="button is-link" @click="openCommentForm">Write a comment</button>
  </div>
</template>
