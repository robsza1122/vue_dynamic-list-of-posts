<script lang="ts">
export default {
  data() {
    return {
      posts: [],
    }
  },
  mounted() {
    
  }
}


</script>



<template>


    <div data-cy="PostsList">
      <p className="title">Posts:</p>
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {{posts}}
            {/* return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.body}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                  >
                    {selectedPost?.id === post.id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            ); */}

        </tbody>
      </table>
    </div>
</template>

