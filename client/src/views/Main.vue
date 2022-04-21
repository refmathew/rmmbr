<script setup >
import { ref, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useState, useGetters, useActions } from '../helpers/storeHelpers.js'
import PageService from '../services/PageService.js'
import NoteService from '../services/NoteService'
import BookButton from '@/components/BookButton.vue'
import EmoticonPicker from '@/components/EmoticonPicker.vue'
import PageButtonContextMenu from '@/components/PageButtonContextMenu.vue'
const router = useRouter()


// LOGIN REDIRECTION
const cookie = Object.fromEntries(document.cookie
  .split('; ')
  .map(entry => entry.split('='))
)

if (!cookie.hasVisited) {
  router.push({
    name: 'Login',
  })
} else {
  watch(firstPage, (newFirstPage) => {
    router.push({
      name: 'Pages',
      params: {
        bookName: 'notes',
        pageName: newFirstPage.note.name
      }
    })
  }, { deep: true })
}


// ]===========================================================================[

// STORE
// State
const state = useState([
  'emoticonPickerShown',
  'contextMenuShown'
])

// Actions
const actions = useActions([
  'mutateWindowHeight',
  'falsifyEmoticonPickerShown',
  'mutateChosenPageEmoticon'
])

// ]===========================================================================[

// STATES
// Books
const books = [
  { name: 'note', icon: 'note-sticky' },
  { name: 'todo', icon: 'square-check' }
]
const notesHidden = ref(false)
const todosHidden = ref(false)

// Pages
const pages = ref(null)
const firstPage = ref({ note: undefined, todo: undefined })

// ]===========================================================================[

// HOOKS
onBeforeMount(() => {
  fetchPages()
})


// ]===========================================================================[

// FUNCTIONS
// Book
const toggleRecentlyFocusedBook = () => {
  watch(notesHidden, (newNotesHidden) => {
    if (newNotesHidden === false) {
      recentlyFocusedBook.value = 'note'
    }
  })
  watch(todosHidden, (newTodosHidden) => {
    if (newTodosHidden === false) {
      recentlyFocusedBook.value = 'todo'
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

// )---------------------------------------------------------------------------(

// Page
const fetchPages = async () => {
  const res = await PageService.getPages()
  pages.value = res.data.data
}

const focusPageButtonName = (e) => {
  if (e.target.classList.contains('page-button__name')) {
    e.target.classList.add('page-button__name--focused')
  }
}

// )---------------------------------------------------------------------------(

// EmoticonPicker
const toggleEmoticonPickerVisibility = (e) => {
  // Trigger only when emoticon picker is shown
  if (state.emoticonPickerShown.value) {
    console.log(e.target.closest('.emoji-mart, .page-button__emoticon'))

    if (!e.target.closest('.emoji-mart, .page-button__emoticon')) {
      // if such elements do not exist, hide the picker
      actions.falsifyEmoticonPickerShown()
      // reset the value of the chosenPageEmoticon
      actions.mutateChosenPageEmoticon('')
    }
  }
}

// )---------------------------------------------------------------------------(

// ]===========================================================================[

// PAGES
// Page updates
const UpdateEmoticon = (event) => {
  // const page = await axios.patch(`http://localhost:8000/api/pages:${event[0]._id}`)
  console.log(event[0]._id)
}

// ]===========================================================================[

// ROUTER
// The focused book is a reference to which 'book' was most recently unHidden
// Used for when both the note and todo books are not hidden
let recentlyFocusedBook = ref(null)
toggleRecentlyFocusedBook()

// )---------------------------------------------------------------------------(


// )---------------------------------------------------------------------------(

// In the routing aspect, I've decided to watch for when there's a change on the
// todosHidden and notesHidden rather than use a router-link
// Initially, the application would be routed onto the 'Notes' route and both
// the 'Todos' and 'Notes' buttons are shown. Say router-links was used, then
// a user clicked the 'Notes' button to hide it. The desired result would be
// for the 'Notes' to be hidden and to directed onto the 'Todos' route since it
// is currently the one shown. The former would be achieved, but the latter
// would not be. It's obviously because clicking on the router-link would route
// you to its link
watch([recentlyFocusedBook, todosHidden, notesHidden, firstPage,],
  ([newRecentlyFocusedBook, newTodosHidden, newNotesHidden, newFirstPage,]) => {
    if (newNotesHidden && newTodosHidden) {
      router.push({ name: 'Home' })
    }
    else if (newTodosHidden) {
      router.push({
        name: 'Pages',
        params: {
          bookName: 'notes',
          pageName: newFirstPage.note.name
        }
      })
    }
    else if (newNotesHidden) {
      router.push({
        name: 'Pages',
        params: {
          bookName: 'todos',
          pageName: newFirstPage.todo.name
        }
      })
    }
    else if (!newNotesHidden && !newTodosHidden) {
      switch (newRecentlyFocusedBook) {
        case 'note':
          router.push({
            name: 'Pages',
            params: {
              bookName: 'notes',
              pageName: newFirstPage.note.name
            }
          })
          break
        case 'todo':
          router.push({
            name: 'Pages',
            params: {
              bookName: 'todos',
              pageName: newFirstPage.todo.name
            }
          })
          break
      }
    }
  },
  { deep: true }
)

// ]===========================================================================[

// PAGES
if (pages.value) {
  watch(pages, (newPages) => {
    firstPage.value.note = newPages.find(page => page.book === 'note')
    firstPage.value.todo = newPages.find(page => page.book === 'todo')
  })
}

// ]===========================================================================[

// EMOTICON PICKER
// For calculating the maximum offset of the emoticon picker
actions.mutateWindowHeight(window.innerHeight)

// ]===========================================================================[

// WINDOW & DOCUMENT LISTENER
window.addEventListener('resize', () => {
  actions.mutateWindowHeight(window.innerHeight)
})

document.addEventListener('click', (e) => {
  toggleEmoticonPickerVisibility(e)
})

// ]===========================================================================[

</script>


<template >
  <div v-if="cookie.hasVisited" v-cloak>
    <nav class="nav" @contextmenu.prevent>
      <img class="nav__logo" src="../assets/img/logo-alt.svg" alt="Rmmbr logo" />

      <div class="nav__buttons-wrp">
        <book-button
          v-for="book in books"
          :key="book.name"
          :book="book"
          :pages="pages"
          @toggle-book-visibility="toggleBookVisibility"
        ></book-button>
      </div>
    </nav>

    <main class="main" @contextmenu.prevent>
      <router-view />
    </main>
  </div>

  <emoticon-picker />
  <page-button-context-menu />
</template>
