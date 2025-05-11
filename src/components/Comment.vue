<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const {comment} = defineProps({
  comment: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <article className="message is-small" >
  <div className="message-header">
    <a href="{`mailto:${comment.email}`}"> {{ comment.name }} </a>
    <button type="button" className="delete is-small" aria-label="delete">

    </button>
  </div>
  <div className="message-body">{{ comment.body }}</div>
</article>
</template>
