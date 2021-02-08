<template>
  <teleport to="body">
    <component
      @open-box="handleOpenBox"
      @close-box="handleCloseBox"
      :is="state.component"
    />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import Standby from './Standby.vue'
import Box from './Box.vue'
import useIframeControl from '../../hooks/iframe'
import useStore from '../../hooks/store'

type State = {
  component: string;
}

interface SetupReturn {
  state: State;
  handleOpenBox(): void;
  handleCloseBox(): void;
}

export default defineComponent({
  components: { Standby, Box },
  setup (): SetupReturn {
    const store = useStore()
    const iframe = useIframeControl()
    const state = reactive<State>({
      component: 'Standby'
    })

    watch(() => store.currentComponent, () => {
      iframe.updateCoreValuesOnStore()
    })

    function handleOpenBox (): void {
      iframe.notifyOpen()
      state.component = 'Box'
    }

    function handleCloseBox (): void {
      iframe.notifyClose()
      state.component = 'Standby'
    }

    return {
      state,
      handleOpenBox,
      handleCloseBox
    }
  }
})
</script>
