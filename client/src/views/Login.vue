<template>
  <div class="login">
    <div class="login__wrapper">
      <div class="login__hero">
        <div class="login__hero__wrapper">
          <div ref="logooo" class="login__hero__logo">
            <!-- <source media="(min-width: 400px)" srcset="../assets/img/logo-alt.svg" /> -->
            <!-- <source media="(min-width: 800px)" srcset="../assets/img/logo.svg" /> -->
            <img src="../assets/img/logo.svg" alt="Rmmbr logo" />
          </div>
          <div class="login__hero__heading">
            <span class="login__hero__heading__text">Never forget about stuff!</span>
          </div>
          <div class="login__hero__subtitle">
            <div
              class="login__hero__subtitle__text"
            >Keep track of your notes and to-dos both in a single app</div>
          </div>
          <div class="login__hero__illustration">
            <img class="login__hero__illustration__img" src="../assets/img/login_banner_3.svg" alt />
          </div>
        </div>
      </div>
      <div class="login__form">
        <div class="login__form__wrapper">
          <div class="login__form__heading">
            <div class="login__form__heading__text">Get Starded</div>
          </div>
          <form class="login__form__main">
            <custom-input label-name="Username or Email" @forward-input="fillFormData"></custom-input>
            <custom-input label-name="Password" @forward-input="fillFormData"></custom-input>
            <button
              class="login__form__main__login-button"
              @click.prevent="submitBtnClickEvt"
            >Log In</button>
          </form>
          <div class="login__form__footer">
            <div class="login-footer login__form__footer__forgot">
              Forgot Password?
              <a
                href
                class="login-footer__link login__form__footer__forgot__link"
              >Reset</a>
            </div>
            <div class="login-footer login__form__footer__signup">
              Don't have an account?
              <a
                href
                class="login-footer__link login__form__footer__signup__link"
              >Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, onMounted, reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import CustomInput from '../components/CustomInput.vue'

// ]===========================================================================[

onMounted(() => {
  window.addEventListener('load', () => {
    document
      .querySelector('.login__hero__logo')
      .scrollIntoView({ alignToTop: true, behavior: 'smooth' })
    window.removeEventListener('load', () => { })
  })
})

// ]===========================================================================[

// Validation
const validations = {
  username: { required, email },
  password: { required, },
}

const state = reactive({
  username: '',
  password: '',
})

const fillFormData = (e) => {
  const type = e[0]
  const value = e[1]
  state[type] = value
}

const v$ = useVuelidate(validations, state)

const submitBtnClickEvt = async () => {
  const valid = await v$.value.$validate()
  // if (validationResult) {

  // }
  if (valid) {
    console.log(valid)
  } else {
    console.log("not valid")
  }
}

</script>
