<template>
  <div class="page-button">
    <span
      ref="pageButtonEmoticon"
      class="page-button__emoticon"
      @blur="pageButtonEmoticonBlurEvent"
      @click="makeEditable"
      @dblclick="showEmoticonPicker"
      @keypress.enter="makeUneditable"
      @input="updateChanges"
      @change="changeEvent"
    >{{ page.emoticon }}</span>

    <router-link
      :to="{
        name: 'Pages',
        params: {
          bookName: `${page.book}s`,
          pageName: page.name
        }
      }"
      ref="pageButtonName"
      class="page-button__name"
      :class="[
        `page-button__${page.name}`,
        route.params.pageName === page.name ? 'page-button__name--focused' : ''
      ]"
      @click="clickEvent"
      @blur="blurEvent"
      @contextmenu.prevent="contextmenuEvent"
    >{{ page.name }}</router-link>
  </div>
</template>

<script setup>

import { ref, computed, onMounted, watch } from 'vue'
import { useState, useGetters, useActions } from '../helpers/storeHelpers'
import { useRouter, useRoute } from 'vue-router'
// this module is for "visually" counting the emoticon
// most emoticons are calculated as multiple characters by String.length
import GraphemeSplitter from 'grapheme-splitter'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const splitter = new GraphemeSplitter()

// =============================================================================

// DEFINITIONS
// Emits
const emit = defineEmits([
  'showEmoticonPicker',
  'hideEmoticonPicker',
  'updateEmoticon'
])

// Props
const props = defineProps({
  page: Object,
})

// Template refs
const pageButtonEmoticon = ref(null)
const pageButtonName = ref(null)

// =============================================================================

// STORE
// State
const state = useState([
  'windowHeight',
  'emoticonPickerShown',
  'focusedPageEmoticon',
  'chosenPageEmoticon',
  'focusedPageButtonName',
  'contextMenuShown'
])

// Getters
const getters = useGetters([
  'firstNotePage'
])

// Actions
const actions = useActions([
  'truthifyEmoticonPickerShown',
  'falsifyEmoticonPickerShown',
  'toggleEmoticonPickerStyles',
  'mutateFocusedPageEmoticon',
  'mutateChosenPageEmoticon',
  'mutateFocusedPageButtonName',
  'toggleContextMenuShown',
  'mutateContextMenuOffsets'
])

// =============================================================================

// FUNCTIONS
const setPageNameUnderlineWidth = (route) => {
  if (props.page.name === route) {

    let width = getComputedStyle(pageButtonName.value.$el).width
    width = width.replace('px', '')

    const root = document.querySelector(':root')
    root.style.setProperty('--page-name-underline-width', `${width + 4}px`)
  }
}

const hideContextMenu = () => {
  if (state.contextMenuShown.value) {
    actions.toggleContextMenuShown(!state.contextMenuShown.value)
  }
}

const renamePageName = () => {
  if (state.focusedPageButtonName.value === props.page.name) {
    if (state.focusedPageButtonName.value !== pageButtonName.value.$el.innerText) {
      console.log('aint the same')
    } else { console.log('sames') }
  }
}

// =============================================================================

watch([state.emoticonPickerShown, state.focusedPageEmoticon, state.chosenPageEmoticon],
  ([newEmoticonPickerShown, newFocusedPageEmoticon, newChosenPageEmoticon],
    [previousEmoticonPickerShown, previousFocusedPageEmoticon, previousChosenPageEmoticon]) => {
    if (newFocusedPageEmoticon === props.page.name) {
      if (state.chosenPageEmoticon.value != '') {
        pageButtonEmoticon.value.innerText = state.chosenPageEmoticon.value
      }

      if (newEmoticonPickerShown === false && pageButtonEmoticon.value.innerText !== props.page.emoticon) {
        const patch = async () => {
          let data = await axios.patch(
            `http://localhost:8000/api/pages/${props.page._id}`,
            { emoticon: pageButtonEmoticon.value.innerText }
          )
        }
        patch()
      }

    }
  }
)

// =============================================================================

// EMOTICON PICKER

// update
const updateValue = ref('')

const updateChanges = (event) => {
  const targetElement = event.currentTarget
  const emoticonInput = splitter.splitGraphemes(targetElement.textContent)

  const regex = new RegExp(targetElement.textContent)
  // console.log(targetElement.textContent, regex.unicode)
  if (emoticonInput.length > 1) {
    return targetElement.textContent = props.page.emoticon
  }

  if (emoticonInput[0] !== props.page.emoticon && emoticonInput[0] !== undefined) {
    updateValue.value = emoticonInput[0]
  }


  console.log(event)
}

watch(updateValue, (newValue) => {
  // const regex = new RegExp(newValue)
  console.log(newValue, regex)
})

// -----------------------------------------------------------------------------

// make uneditable if RETURN is pressed
const makeUneditable = (event) => {
  // remove the emoticonPicker too
  actions.falsifyEmoticonPickerShown()

  const targetElement = event.currentTarget
  targetElement.contentEditable = false
}

// -----------------------------------------------------------------------------

// make the page-emoticon element contenteditable on 'double click'
const makeEditable = (event) => {
  const targetElement = event.currentTarget
  targetElement.contentEditable = true

  setTimeout(() => {
    if (document.activeElement !== targetElement) {
      targetElement.contentEditable = false
    }
  }, 300)
}

// -----------------------------------------------------------------------------

// emoticonPicker stuff
const emoticonPickerHeight = 420
let maxEmoticonPickerBottomOffset = state.windowHeight.value - emoticonPickerHeight
watch(state.windowHeight, (newWindowHeight) => {
  maxEmoticonPickerBottomOffset = newWindowHeight - emoticonPickerHeight
})

const marginBottom = 32

// This is to align the pageButtonEmoticon with the emoticonPicker
const bottomOffsetReduction = 75
// Additional margin between the pageButtonEmoticon and the emoticonPicker
const emoticonPickerLeftMargin = 5

const showEmoticonPicker = (event) => {
  actions.mutateFocusedPageEmoticon(props.page.name)
  actions.mutateChosenPageEmoticon('')
  actions.truthifyEmoticonPickerShown()

  const targetElementOffset = event.currentTarget.getBoundingClientRect()

  let emoticonPickerTopOffset = targetElementOffset.bottom - bottomOffsetReduction
  const emoticonPickerLeftOffset = targetElementOffset.right + emoticonPickerLeftMargin

  if (emoticonPickerTopOffset > maxEmoticonPickerBottomOffset) {
    console.log(emoticonPickerTopOffset, maxEmoticonPickerBottomOffset)
    emoticonPickerTopOffset = emoticonPickerTopOffset + (maxEmoticonPickerBottomOffset - emoticonPickerTopOffset)
  }
  actions.toggleEmoticonPickerStyles([
    `${emoticonPickerTopOffset}px`,
    `${emoticonPickerLeftOffset}px`
  ])

}

// =============================================================================

// PAGE BUTTON NAME
const clickEvent = (event) => {

  // Set the width of the element's underline according to its word length
  const targetElement = event.currentTarget

  // get the parent's width
  // then remove the character 'px'
  let buttonNameWidth = getComputedStyle(targetElement).getPropertyValue('width')
  buttonNameWidth = buttonNameWidth.replace(/px/g, '')
  buttonNameWidth = Number(buttonNameWidth)

  // modify the value of the root variable --page-name-underline-width
  const root = document.querySelector(':root')
  root.style.setProperty('--page-name-underline-width', `${buttonNameWidth + 4}px`)

  // ---------------------------------------------------------------------------

  actions.mutateFocusedPageButtonName(props.page.name)
}

const blurEvent = (e) => {
  e.srcElement.contentEditable = false
  renamePageName()

  // if (e.relatedTarget) {
  //   if (!e.relatedTarget.classList.contains('context-menu__button')) {
  //     hideContextMenu()
  //   }
  // }
  // else {
  //   hideContextMenu()
  // }
}

// =============================================================================

onMounted(() => {

  // PAGE BUTTONS WRAPPER ANIMATION
  // Why do this?
  // This has to be done all for the sake of animating the hiding and showing
  // of the page buttons. I've got to reference the initial height of the page
  // buttons' wrapper in order to animate its height, because the I have not
  // set the height of the wrapper; It will be dynamically set by the amount
  // page buttons. Although I could have just hard-coded its height since
  // I am not planning to make the site responsive, I still went through this
  // freaking path so if I felt like making it responsive, I could easily do so.

  // Reference the elements
  const root = document.querySelector(':root')
  const notePagesWrapper = document
    .querySelector('.nav__buttons-wrp__notes-wrp__pages')
  const todoPagesWrapper = document
    .querySelector('.nav__buttons-wrp__todos-wrp__pages')

  // Get the notePagesWrapper and todoPagesWrapper's initial height respectively
  let notePagesWrapperHeight = getComputedStyle(notePagesWrapper)
    .getPropertyValue('height')
  let todoPagesWrapperHeight = getComputedStyle(todoPagesWrapper)
    .getPropertyValue('height')

  // Set the root element's variables for the height of the former elements
  root.style.setProperty('--note-pages-height', notePagesWrapperHeight)
  root.style.setProperty('--todo-pages-height', todoPagesWrapperHeight)

  // Use the newly set root element's variables for the notePagesWrapper and
  // todoPagesWrapper's height
  notePagesWrapper.style.height = getComputedStyle(root)
    .getPropertyValue('--note-pages-height')
  todoPagesWrapper.style.height = getComputedStyle(root)
    .getPropertyValue('--todo-pages-height')
})

const contextmenuEvent = (e) => {
  if (!state.contextMenuShown.value) {
    actions.toggleContextMenuShown()
  }

  actions.mutateContextMenuOffsets([`${e.pageY}px`, `${e.pageX}px`])
  actions.mutateFocusedPageButtonName(props.page.name)

  router.push({
    name: 'Pages',
    params: { bookName: `${props.page.book}s`, pageName: props.page.name }
  })
}

// =============================================================================

watch(
  route,
  newRoute => {
    setPageNameUnderlineWidth(newRoute.params.pageName)
  },
  { deep: true }
)

onMounted(() => {
  setPageNameUnderlineWidth(getters.firstNotePage.value)
})

const pageButtonEmoticonBlurEvent = (e) => {
  e.srcElement.contentEditable = false

  // pageButtonEmoticon.style.contentEditable = true
}

</script>
