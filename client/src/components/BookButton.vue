<template>
  <div :class="`nav__buttons-wrp__${book.name}s-wrp`" class="book-wrp">
    <button
      type="button"
      :class="`nav__buttons-wrp__${book.name}s-wrp__button-wrp`"
      class="book-wrp__book-button"
      @click="bookClickEvent"
    >
      <font-awesome-icon
        :class="`nav__buttons-wrp__${book.name}s-wrp__button-wrp__icon`"
        class="book-wrp__book-button__icon"
        :icon="['far', book.icon]"
      ></font-awesome-icon>

      <span
        :class="`nav__buttons-wrp__${book.name}s-wrp__button-wrp__title`"
        class="book-wrp__book-button__title"
      >{{ bookName }}</span>
    </button>
    <div
      :class="[`nav__buttons-wrp__${book.name}s-wrp__pages`, 'book-wrp__page-wrp', { 'book-wrp__page-wrp--hidden': hidden }]"
    >
      <template v-for="page in state.pages.value" :key="page">
        <page-button v-if="page.book === book.name" :page="page"></page-button>
      </template>
    </div>
  </div>
</template>


<script setup>
import { defineEmits, ref, watch, onMounted } from 'vue'
import { useState, useGetters, useActions } from '../helpers/storeHelpers'
import PageButton from './PageButton.vue'

// =======================================================================================

// DEFINITIONS
const props = defineProps({
  book: Object
})

const emits = defineEmits([
  'toggleBookVisibility'
])

// =======================================================================================

// STORE
// States
const state = useState([
  'pages',
])
// Getters
const getters = useGetters([
  'firstNotePage',
  'firstTodoPage'
])
// Actions

// =======================================================================================

// FUNCTIONS

const toggleBookVisibilityFn = (book) => {
  hidden.value = !hidden.value
  return emits('toggleBookVisibility', book)
}

switch (props.book.name) {
  case 'note':
    break
  case 'todo':
    break
}

const setBookFirstPage = () => {
  switch (props.book.name) {
    case 'note':
      watch(getters.firstNotePage, (newFirstNotePage) => {
        firstBookPage = newFirstNotePage
      })
      break
    case 'todo':
      watch(getters.firstTodoPage, (newFirstTodoPage) => {
        firstBookPage = newFirstTodoPage
      });
      break
  }
}

// =======================================================================================

let hidden = ref(false)
const bookClickEvent = () => {
  toggleBookVisibilityFn(props.book.name)
}

// =======================================================================================

let firstBookPage
setBookFirstPage()

// =======================================================================================

// ANIMATIONS
// Toggling visibility of the book page wrapper

// =======================================================================================

let bookName = props.book.name
bookName = bookName[0].toUpperCase() + bookName.slice(1) + 's'

</script>
