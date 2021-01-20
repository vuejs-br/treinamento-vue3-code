import Store from '../store'

export default function useStore (module) {
  if (module) {
    return Store[module]
  }

  return Store
}
