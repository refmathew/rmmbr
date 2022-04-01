<template>
  <nav class="nav" @contextmenu.prevent>
    <img class="nav__logo" src="./assets/img/logo-alt.svg" alt="Rmmbr logo" />

    <div class="nav__buttons-wrp">
      <book-button
        v-for="book in books"
        :key="book.name"
        :book="book"
        @toggle-book-visibility="toggleBookVisibility"
      ></book-button>
    </div>
  </nav>

  <main class="main" @contextmenu.prevent>
    <router-view />
  </main>

  <emoticon-picker />
  <page-button-context-menu />
</template>


<script setup >

import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import { useState, useGetters, useActions } from './helpers/storeHelpers.js'
import NoteService from './services/NoteService'

import BookButton from '@/components/BookButton.vue'
import EmoticonPicker from '@/components/EmoticonPicker.vue'
import PageButtonContextMenu from '@/components/PageButtonContextMenu.vue'

const route = useRoute()
const router = useRouter()

// =============================================================================

// STORE
// State
const state = useState([
  'emoticonPickerShown',
  'contextMenuShown'
])

// Getters
const getters = useGetters([
  'firstNotePage',
  'firstTodoPage'
])

// Actions
const actions = useActions([
  'fetchPages',
  'mutateWindowHeight',
  'falsifyEmoticonPickerShown',
  'mutateChosenPageEmoticon'
])

// =============================================================================

// FUNCTIONS
const toggleEmoticonPickerVisibility = (emoticonPickerShown, e) => {
  // Hide the emoticon-picker when clicked outside of it
  // Trigger only when emoticon picker is shown
  if (emoticonPickerShown) {

    // Reach for the top-most level of e.target's ancestry and store it inside
    // an array. This is to ensure that when the 'emoticon picker' component or
    // any of its child elements is clicked, the emoticon picker won't get
    // closed
    let targetFamilyMember
    targetFamilyMember = e.target
    let targetFamily = []

    while (targetFamilyMember) {
      // push only the nodes which have classList property, i.e., do not
      // include HTML document itself
      if (targetFamilyMember.classList) {
        targetFamily.push(targetFamilyMember)
      }

      targetFamilyMember = targetFamilyMember.parentNode
    }

    // look for if there is an element that contains a class of 'emoji-mart' or
    // 'page-button__emoticon'
    const familyFiltered = targetFamily.find(member =>
      member.classList.contains('emoji-mart') ||
      member.classList.contains('page-button__emoticon')
    )

    if (!familyFiltered) {
      // if such an element does not exist, hide the picker
      actions.falsifyEmoticonPickerShown()

      // reset the value of the chosenPageEmoticon
      actions.mutateChosenPageEmoticon('')
    }
  }
}

const focusPageButtonName = (e) => {
  if (e.target.classList.contains('page-button__name')) {
    e.target.classList.add('page-button__name--focused')
  }
}

const toggleRecentlyFocusedBook = () => {
  watch(notesHidden, (newNotesHidden) => {
    if (newNotesHidden === false) {
      recentlyFocusedBook.value = 'notes'
    }
  })
  watch(todosHidden, (newTodosHidden) => {
    if (newTodosHidden === false) {
      recentlyFocusedBook.value = 'todos'
    }
  })
}

const toggleBookVisibility = (e) => {
  switch (e) {
    case 'note':
      notesHidden.value = !notesHidden.value
      break
    case 'todo':
      todosHidden.value = !todosHidden.value
      break
  }
}

// =============================================================================

// BOOK
const books = [
  { name: 'note', icon: 'note-sticky' },
  { name: 'todo', icon: 'square-check' }
]

const notesHidden = ref(false)
const todosHidden = ref(false)

// =============================================================================

// PAGES
// Fetch the pages on setup
actions.fetchPages()

// Page updates
const UpdateEmoticon = (event) => {
  // const page = await axios.patch(`http://localhost:8000/api/pages:${event[0]._id}`)
  console.log(event[0]._id)
}

// =============================================================================

// ROUTER
// The focused book is a reference to which 'book' was most recently unHidden
// Used for when both the note and todo books are not hidden
let recentlyFocusedBook = ref(null)
toggleRecentlyFocusedBook()

// -----------------------------------------------------------------------------

// In the routing aspect, I've decided to watch for when there's a change on the
// todosHidden and notesHidden rather than use a router router-link
// Initially, the application would be routed onto the 'Notes' route and both
// the 'Todos' and 'Notes' buttons are shown. Say router-links was used, then
// a user clicked the 'Notes' button to hide it. The desired result would be
// for the 'Notes' to be hidden and to directed onto the 'Todos' route since it
// is currently the one shown. The former would be achieved, but the latter
// would not be. It's obviously because clicking on the router-link would route
// you to its link

// Apparently I have to watch for the firstNotePage and firstTodoPage to be able
// to use them
watch([
  recentlyFocusedBook,
  todosHidden,
  notesHidden,
  getters.firstNotePage,
  getters.firstTodoPage
],
  ([newRecentlyFocusedBook,
    newTodosHidden,
    newNotesHidden,
    newFirstNotePage,
    newFirstTodoPage
  ]) => {

    if (newNotesHidden && newTodosHidden) {
      router.push({ name: 'Home' })
    }
    else if (newTodosHidden) {
      router.push({
        name: 'Pages',
        params: {
          bookName: 'notes',
          pageName: newFirstNotePage
        }
      })
    }
    else if (newNotesHidden) {
      router.push({
        name: 'Pages',
        params: {
          bookName: 'todos',
          pageName: newFirstTodoPage
        }
      })
    }
    else if (!newNotesHidden && !newTodosHidden) {

      if (newRecentlyFocusedBook === 'notes') {
        router.push({
          name: 'Pages',
          params: {
            bookName: 'notes',
            pageName: newFirstNotePage
          }
        })
      }
      else if (newRecentlyFocusedBook === 'todos') {
        router.push({
          name: 'Pages',
          params: {
            bookName: 'todos',
            pageName: newFirstTodoPage
          }
        })
      }
    }
  }
)

// Immediately redirect to the first note page onCreate
watch(getters.firstNotePage, (newFirstNotePage) => {
  router.push({
    name: 'Pages',
    params: {
      bookName: 'notes',
      pageName: newFirstNotePage
    }
  })
})


// =============================================================================

// EMOTICON PICKER
// For calculating the maximum offset of the emoticon picker
actions.mutateWindowHeight(window.innerHeight)

// =============================================================================

// WINDOW & DOCUMENT LISTENER
window.addEventListener('resize', () => {
  actions.mutateWindowHeight(window.innerHeight)
})

document.addEventListener('click', (e) => {
  toggleEmoticonPickerVisibility(state.emoticonPickerShown.value, e)
})

// =============================================================================

</script>
