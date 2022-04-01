<template>
  <div @blur="blurEvent" @click="clickEvent" >Pages</div>
  <div>{{ pageName }}</div>
</template>


<script setup lang="ts">

import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute();

// =============================================================================

let pageName = ref(route.params.pageName)

watch(
  () => route.params.pageName,
  (newPageName) => {
    pageName.value = newPageName
  },
  { deep: true }
)

const clickEvent = (e) => {
  e.target.style.contenteditable = 'true'
  console.log(e.target.style.contenteditable)
}

const blurEvent = (e) => {
  console.log(e)
}

</script>
