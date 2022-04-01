import { createLogger, createStore } from 'vuex'

export default createStore({
  plugins: [createLogger()],
  state: {
    windowHeight: 0,
    emoticonPickerShown: false,
    emoticonPickerStyles: {
      position: 'absolute',
      top: '100px',
      left: '100px'
    },

    // store the focused icon, i.e. the icon double-clicked
    focusedPageEmoticon: '',
    chosenPageEmoticon: '',

    focusedPageButtonName: '',

    contextMenuShown: false,
    contextMenuOffsets: {
      top: 0,
      left: 0,
    }
  },

  getters: {
    contextMenuTop(state) {
      return state.contextMenuOffsets.top
    },

    contextMenuLeft(state) {
      return state.contextMenuOffsets.left
    }
  },

  mutations: {
    MUTATE_WINDOW_HEIGHT(state, windowHeight) {
      state.windowHeight = windowHeight - 32
    },

    TRUTHIFY_EMOTICONPICKERSHOWN(state) {
      state.emoticonPickerShown = true
    },

    FALSIFY_EMOTICONPICKERSHOWN(state) {
      state.emoticonPickerShown = false
    },

    TOGGLE_EMOTICONPICKERSTYLES(state, styles) {
      state.emoticonPickerStyles.top = styles[0]
      state.emoticonPickerStyles.left = styles[1]
    },

    MUTATE_FOCUSED_PAGE_EMOTICON(state, name) {
      state.focusedPageEmoticon = name
    },

    MUTATE_CHOSEN_PAGE_EMOTICON(state, emoticon) {
      state.chosenPageEmoticon = emoticon
    },

    MUTATE_FOCUSED_PAGE_BUTTON_NAME(state, pageName) {
      state.focusedPageButtonName = pageName
    },

    TOGGLE_CONTEXT_MENU_SHOWN(state) {
      state.contextMenuShown = !state.contextMenuShown
    },
    MUTATE_CONTEXT_MENU_OFFSETS(state, payload) {
      state.contextMenuOffsets.top = payload[0]
      state.contextMenuOffsets.left = payload[1]
    },
  },

  actions: {
    mutateWindowHeight({ commit }, windowHeight) {
      commit('MUTATE_WINDOW_HEIGHT', windowHeight)
    },
    truthifyEmoticonPickerShown({ commit }) {
      commit('TRUTHIFY_EMOTICONPICKERSHOWN')
    },
    falsifyEmoticonPickerShown({ commit }) {
      commit('FALSIFY_EMOTICONPICKERSHOWN')
    },
    toggleEmoticonPickerStyles({ commit }, styles) {
      commit('TOGGLE_EMOTICONPICKERSTYLES', styles)
    },
    mutateFocusedPageEmoticon({ commit }, name) {
      commit('MUTATE_FOCUSED_PAGE_EMOTICON', name)
    },
    mutateChosenPageEmoticon({ commit, state }, emoticon) {
      commit('MUTATE_CHOSEN_PAGE_EMOTICON', emoticon)
    },
    mutateFocusedPageButtonName({ commit }, pageName) {
      commit('MUTATE_FOCUSED_PAGE_BUTTON_NAME', pageName)
    },
    toggleContextMenuShown({ commit }) {
      commit('TOGGLE_CONTEXT_MENU_SHOWN')
    },
    mutateContextMenuOffsets({ commit }, payload) {
      commit('MUTATE_CONTEXT_MENU_OFFSETS', payload)
    }
  }
})
