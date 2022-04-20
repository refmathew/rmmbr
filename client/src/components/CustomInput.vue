<script setup>
import { onMounted, ref, defineEmits } from 'vue'


// =========================
// ]===   Definitions   ===[
// =========================
const props = defineProps({
  name: String,
  errorMsg: String
})
const emits = defineEmits([
  'validationReady',
  'validateInput'
])

// template refs
const inputEl = ref(null)


// ==============================
// ]===   Input Validation   ===[
// ==============================
const inputValue = ref()
const validateInput = () => {
  return emits('validationReady', [props.name, inputValue.value])
}

// after first blur, change the input listener from 'Blur' to 'onInput'
const handleBlur = () => {
  validateInput()

  inputEl.value.addEventListener('input', () => {
    validateInput()
  })
}


// ]===========================================================================[
// const clearInputField = () => {
//   inputEl.value = ''
// }
// defineExpose({
//   clearInputField
// })
</script>


<template>
  <div :class="[
    'custom-input',
    `login__form__main__${name}`
  ]" ref="inputEl">
    <input
      :class="[
        'custom-input__input',
        `login__form__main__${name}__input`
      ]"
      :type="name"
      :placeholder="name[0].toUpperCase() + name.slice(1)"
      v-model="inputValue"
      @blur.once="handleBlur"
    />

    <p :class="[`login__form__main__${name}__error`, 'custom-input__error']">{{ errorMsg }}</p>
  </div>
</template>
