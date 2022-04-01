import { computed } from 'vue'
import { useStore } from 'vuex'

const useState = (arr) => {
  const store = useStore()
  let keypair = arr.map(state => [state, computed(() => store.state[state])])
  return Object.fromEntries(keypair)
}

const useGetters = (arr) => {
  const store = useStore()
  let keypair = arr.map(getter => [getter, computed(() => store.getters[getter])])
  return Object.fromEntries(keypair)
}

const useMutations = (arr) => {
  const store = useStore()
  let keypair = arr.map(mutation => [mutation, payload => store.commit(mutation, payload)])
  return Object.fromEntries(keypair)
}

const useActions = (arr) => {
  const store = useStore()
  let keypair = arr.map(action => [action, payload => store.dispatch(action, payload)])
  return Object.fromEntries(keypair)
}

export {
  useState,
  useGetters,
  useMutations,
  useActions
}
