<template>
  <Picker
    :data="emojiIndex"
    :perLine="Number(8)"
    color="#396ad4"
    emoji="lower_left_ballpoint_pen"
    set="twitter"
    title="Pick emoji..."
    @select="select"
    :pickerStyles="emoticonPickerStyles"
    v-if="state.emoticonPickerShown.value"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useState, useActions } from '../helpers/storeHelpers'

import data from "emoji-mart-vue-fast/data/twitter.json"
import "emoji-mart-vue-fast/css/emoji-mart.css"
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src"

// =============================================================================

// STORE

// State
const state = useState([
  'emoticonPickerShown',
  'emoticonPickerStyles'
])
const emoticonPickerStyles = state.emoticonPickerStyles

// Actions
const actions = useActions(['mutateChosenPageEmoticon'])
const mutateChosenPageEmoticon = actions.mutateChosenPageEmoticon

// =============================================================================

// EMOTICON PICKER
// Create emoji data index.
// We can change it (for example, filter by category) before passing to the
// component.
let emojiIndex = new EmojiIndex(data, { recentLength: 16 });

const select = (emoticon) => {
  mutateChosenPageEmoticon(emoticon.native)
}
</script>
