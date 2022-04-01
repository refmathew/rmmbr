<template >
  <div
    :style="{ top: getters.contextMenuTop.value, left: getters.contextMenuLeft.value }"
    class="context-menu"
    v-if="state.contextMenuShown.value"
    contenteditable="true"
  >
    <button class="context-menu__button context-menu__rename" @click="renameButtonClickEvent">Rename</button>
    <!-- <button class="context-menu__button context-menu__delete" @click="deleteButtonclickEvent">Delete</button> -->
  </div>
</template>

<script setup lang="ts">

import { useState, useGetters, useActions } from '../helpers/storeHelpers'

// =============================================================================

// STORE
const state = useState([
  'contextMenuShown',
  'focusedPageButtonName'
])
const getters = useGetters([
  'contextMenuTop',
  'contextMenuLeft'
])
const actions = useActions([
  'toggleContextMenuShown'
])

// =============================================================================

const renameButtonClickEvent = () => {
  actions.toggleContextMenuShown()

  const focusedPageButtonName = document.querySelector(`.page-button__${state.focusedPageButtonName.value}`)
  focusedPageButtonName.contentEditable = true
  window.getSelection().selectAllChildren(focusedPageButtonName)
  focusedPageButtonName.focus()
}

</script>
