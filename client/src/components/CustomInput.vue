<template>
  <div :class="[
    'text-input',
    `login__form__main__${labelNameClass}`
  ]">
    <label
      :class="[
        'text-input__label',
        `login__form__main__${labelNameClass}__label`
      ]"
      for
    >{{ labelName }}:</label>

    <input
      :class="[
        'text-input__input',
        `login__form__main__${labelNameClass}__input`
      ]"
      :type="inputType"
      @input="inputEvt"
    />
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emits = defineEmits([
  'forwardInput',
])

const props = defineProps({
  labelName: String
})

const labelNameClass = props.labelName.toLowerCase().replace(/ .*/, '')
let inputType
if (labelNameClass === "password") {
  inputType = "password"
} else {
  inputType = "text"
}

const inputEvt = (e) => {
  return emits('forwardInput', [labelNameClass, e.target.value])
}

</script>
