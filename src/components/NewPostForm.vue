<script setup>
import { SideBarEnum } from '@/utils/SideBarModes'
import { createPost } from '../utils/fetchClient'
import InputField from './InputField.vue'
import TextAreaField from './TextAreaField.vue'
import { ErrorMessages } from '@/utils/ErrorMessages'
import { ref } from 'vue'
const posts = defineModel('posts', {
  type: Array,
})
const currentPostId = defineModel('currentPostId', {
  type: Number,
})
const title = defineModel('title', {
  type: String,
})
const body = defineModel('body', {
  type: String,
})
const sideBarMode = defineModel('sideBarMode', {
  type: String,
})

const errorMessages = {
  titleError: ErrorMessages.None,
  bodyError: ErrorMessages.None,
}
const errors = ref({
  ...errorMessages,
})

const onSubmit = async () => {
  errors.value = {...errorMessages}
  if (title.value.trim()) {
    errors.value.titleError = ErrorMessages.Title_Post_Is_Empty;
  }
  if (body.value.trim()) {
    errors.value.bodyError = ErrorMessages.Text_Area_Is_Empty;
  }
  if (errors.value.titleError || errors.value.bodyError) {
    return;
  }
  try {
    const newPost = await createPost(title.value.trim(), body.value.trim())

    posts.value.push(newPost)

    sideBarMode.value = SideBarEnum.New_Post_Form

    currentPostId.value = newPost.id
    title.value = ''
    body.value = ''
  } catch (error) {
    console.log(error)
  }
}

const onCancel = async () => {
  sideBarMode.value = ''
  title.value = ''
  body.value = ''
}
</script>

<template>
  <div className="content" v-if="sideBarMode === SideBarEnum.New_Post_Form">
    <h2>Create New Post</h2>

    <form @submit.prevent="onSubmit" @reset="onCancel">
      <InputField
      v-model:title="title"
      v-model:error="errors.titleError"
      icon="fa-user"
      placeholder="Type title of your post"
      type="text"
      title="Title"
      />
        <TextAreaField
        v-model:body="body"
        v-model:error="errors.bodyError"
        title="Text"
        placeholder="Type text of your post"
        />

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">Save</button>
        </div>
        <div className="control">
          <button type="reset" className="button is-link is-light">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>
