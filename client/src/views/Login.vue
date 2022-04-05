<template>
  <div class="login">
    <div class="login__hero">
      <div class="login__hero__logo">
        <img src="../assets/img/logo.svg" alt="Rmmbr logo" />
      </div>
      <div class="login__hero__heading">
        <span class="login__hero__heading__text">
          Never forget
          <br />about stuff!
        </span>
      </div>
      <div class="login__hero__subtitle">
        <div class="login__hero__subtitle__text">
          Keep track of your notes and to-dos
          <br />both in a single app
        </div>
      </div>
      <div class="login__hero__illustration">
        <img class="login__hero__illustration__img" src="../assets/img/login_banner_3.svg" alt />
      </div>
    </div>
    <div class="login__form">
      <div class="login__form__heading">Get Starded</div>
      <form class="login__form__main">
        <div class="login__form__main__username">
          <label class="login__form__main__username__label" for>Username or Email:</label>
          <input class="login__form__main__username__input" type="text" />
        </div>
        <div class="login__form__main__password">
          <label class="login__form__main__password__label" for>Password</label>
          <input class="login__form__main__password__input" type="text" />
        </div>
        <button class="login__form__main__login-button"></button>
      </form>
      <div class="login__form__footer">
        <div class="login__form__footer__forgot">
          Forgot Password?
          <a href class="login__form__footer__forgot__link">Reset</a>
        </div>
        <div class="login__form__footer__signup">
          Don't have an account?
          <a href class="login__form__footer__signup__link">Sign up</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
