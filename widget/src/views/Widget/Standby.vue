<template>
  <div
    @click="() => emit('open-box')"
    id="widget-open-button"
    class="
      fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-brand-main rounded-full
      py-3 px-5 flex items-center shadow-xl cursor-pointer select-none
      animate__animated animate__fadeInUp animate__faster
    ">

    <icon
      name="Chat"
      color="white"
      size="27"
      class="mr-3"
    />
    <span class="font-black text-white text-xl">
      Deixe um feedback
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue'
import Icon from '../../components/Icon/index.vue'

interface SetupReturn {
  emit: SetupContext['emit'];
}

export default defineComponent({
  components: { Icon },
  emits: ['open-box'],
  setup (_, { emit }: SetupContext): SetupReturn {
    return { emit }
  }
})
</script>
