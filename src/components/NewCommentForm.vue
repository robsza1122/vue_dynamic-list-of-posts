<script setup>
import { ErrorMessages } from '@/utils/ErrorMessages';
import { ref } from 'vue';


const sideBarMode = defineModel('sideBarMode', {
  type: String,
})
const commentsErrors = {
  nameError: ErrorMessages.None,
  emailError: ErrorMessages.None,
  bodyError: ErrorMessages.None,
}
const errors = ref({
  ...commentsErrors,
})

const onClear = () => {
  sideBarMode.value = '';
}

</script>



<template>
    <form
      data-cy="NewCommentForm"
      @reset="onClear"
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            class="input"
            :class="{'is-danger': errors.nameError !== ErrorMessages.None}"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

            <span
              class="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" v-if="errors.nameError !== ErrorMessages.None"/>
            </span>

        </div>

          <p className="help" data-cy="ErrorMessage" :class="{'is-danger': errors.nameError !== ErrorMessages.None}">
            {{ errors.nameError }}
          </p>

      </div>
      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"

            id="comment-author-email"
            placeholder="email@test.com"
            class="input"
            :class="{'is-danger': errors.emailError !== ErrorMessages.None}"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" v-if="errors.emailError !== ErrorMessages.None"/>
            </span>

        </div>

          <p className="help is-danger" data-cy="ErrorMessage">
            {{ errors.emailError }}
          </p>

      </div>
      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>
        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            class="input"
            :class="{'is-danger': errors.bodyError !== ErrorMessages.None}"
          />
        </div>

          <p className="help is-danger" data-cy="ErrorMessage">
            {{ errors.bodyError }}
          </p>

      </div>
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className="button is-link is-loading"
          >
            Add
          </button>
        </div>
        <div className="control">
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
    </template>

