<script lang="ts">
import  PostsList  from './components/PostsList.vue';
import  PostDetails  from './components/PostDetails.vue';
import  UserSelector  from './components/UserSelector.vue';
import  Loader  from "./components/Loader/Loader.vue";
import LoginUser from './components/LoginUser.vue';
import { ref } from 'vue';
import { getUser } from './utils/UserLocaleStorage';


export default {
  components: {
    PostsList,
    PostDetails,
    UserSelector,
    Loader,
    LoginUser,
  },

}

const user = ref(getUser())

</script>

<template>
  <LoginUser v-if="!user" v-model:user="user"/>
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>
              <div className="block" data-cy="MainContent">

                  <p data-cy="NoSelectedUser">No user selected</p>

                <Loader />

                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorNotification}
                  </div>


                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>


                  <PostsList />

              </div>
            </div>
          </div>
          <div
            data-cy="Sidebar"
            className="tile is-parent is-8-destop Sidebar Sidebar--open"
          >

              <div className="tile is-child box is-success ">
                <PostDetails />
              </div>

          </div>
        </div>
      </div>
    </main>
</template>
<style>
.Sidebar {
  overflow: hidden;
  opacity: 0;
  transition-property: max-width, opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;

  @media (min-width: 769px) {
    max-width: 0;
  }
}

.Sidebar--open {
  opacity: 1;

  @media (min-width: 769px) {
    max-width: 50%;
  }
}</style>
