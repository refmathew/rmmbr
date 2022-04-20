<script setup>
import CustomInput from './CustomInput.vue'
import { computed, onMounted, ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { minLength, required, email } from '@vuelidate/validators'
import UserService from '../services/UserService'
const router = useRouter()


// =============================================================================
// ]===   Template Ref   ======================================================[
// =============================================================================
const formEl = ref(null)
const buttonEl = ref(null)


// =============================================================================
// ]===   Child Component Props   =============================================[
// =============================================================================
const inputFields = [
  { name: 'email' },
  { name: 'password' }
]


// =============================================================================
// ]===   Login   =============================================================[
// =============================================================================

// }---   Validation   --------------------------------------------------------{
const validations = {
  email: { required, email },
  password: { required },
}

const state = reactive({
  email: '',
  password: '',
})

const v$ = useVuelidate(validations, state)

const storeInputValue = (name, value) => {
  state[name] = value
}

const errorMsgs = ref({
  email: '',
  password: ''
})

const handleValidationReady = async (e) => {
  const name = e[0]
  const value = e[1]

  storeInputValue(name, value)

  await v$.value[name].$validate()
  const error = v$.value[name].$errors
  if (error.length === 0) return errorMsgs.value[name] = ''
  errorMsgs.value[name] = error[0].$message
}

// }---   Authentication   ----------------------------------------------------{
const animateError = (element) => {
  element.classList.remove('login__form__main__login-button--error')

  setTimeout(() => {
    element.classList.add('login__form__main__login-button--error')
  }, 1)
}
const handleLogin = async (e) => {
  const valid = await v$.value.$validate()
  console.log(valid, v$.value.$errors)

  if (!valid) return animateError(buttonEl.value)

  const user = await UserService.authenticateUser(state.email, state.password)
  if (!user) return console.log('aint no user exists')

  document.cookie = "hasVisited=true"
  document.cookie = "loggedIn=true"
  return router.push({ name: 'Main' })

}
</script>


<template>
  <form ref="formEl" class="login__form__main">
    <custom-input
      v-for="inputField in inputFields"
      :key="inputField"
      :name="inputField.name"
      :error-msg="errorMsgs[inputField.name]"
      @validation-ready="handleValidationReady"
    ></custom-input>
    <button
      ref="buttonEl"
      :class="['login__form__main__login-button']"
      @click.prevent="handleLogin"
    >Log In</button>
  </form>
</template>
