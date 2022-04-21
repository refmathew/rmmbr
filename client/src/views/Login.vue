<script setup >
import CustomForm from '../components/CustomForm.vue'
import { watch, onMounted, reactive, ref } from 'vue'
import UserService from '../services/UserService.js'


// =============================================================================
// ]===   Animations   ========================================================[
// =============================================================================

// Scroll into the form upon landing
onMounted(() => {
  window.addEventListener('load', () => {
    document
      .querySelector('.login__hero__logo')
      .scrollIntoView({ alignToTop: true, behavior: 'smooth' })
    window.removeEventListener('load', () => { })
  })
})
</script>


<template>
  <div class="login">
    <div class="login__wrapper">
      <div class="login__hero">
        <div class="login__hero__wrapper">
          <div ref="logooo" class="login__hero__logo">
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
          <custom-form></custom-form>
          <div class="login__form__footer">
            <div class="login-footer">
              Wanna see what's inside?
              <a href class="login-footer__link">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
