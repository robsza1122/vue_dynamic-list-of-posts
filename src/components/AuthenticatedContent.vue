<script setup>
import PostsList from './PostsList.vue'
import SideBar from './SideBar.vue'
import Post from './Post.vue'
import { SideBarEnum } from '@/utils/SideBarModes'
import UserNavigation from './UserNavigation.vue'
import { onMounted, ref } from 'vue'
import { getPosts } from '../api/api.posts'
import NewPostForm from './NewPostForm.vue'

const user = defineModel('user', {
  type: Object,
})

const sideBarMode = ref('')
const currentPostId = ref(0)
const body = ref('')
const title = ref('');
const posts = ref([]);

onMounted(async () => {
  try {

    posts.value = await getPosts();
  } catch (error) {
    console.log(error)
  }
})

console.log(posts.value);

console.log(sideBarMode.value)
</script>

<template>
  <UserNavigation v-model:user="user" />
  <main className="section">
    <div className="container">
      <div className="tile is-ancestor">
        <!-- <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorNotification}
                  </div> -->

        <PostsList
          v-model:title="title"
          v-model:body="body"
          v-model:sideBarMode="sideBarMode"
          v-model:currentPostId="currentPostId"
          :posts="posts"
        />
        <SideBar :class="{ 'Sidebar--open': !!sideBarMode }">
        <Post
          v-if="sideBarMode === SideBarEnum.Post"
          v-model:posts="posts"
          v-model:sideBarMode="sideBarMode"
          v-model:currentPostId="currentPostId"
          v-model:title="title"
          v-model:body="body"
          :post-id="currentPostId"
        />

        <NewPostForm
          v-else-if="sideBarMode === SideBarEnum.New_Post_Form"
          v-model:sideBarMode="sideBarMode"
          v-model:currentPostId="currentPostId"
          v-model:posts="posts"
          v-model:title="title"
          v-model:body="body"
        />

       </SideBar>
      </div>
    </div>
  </main>
</template>
