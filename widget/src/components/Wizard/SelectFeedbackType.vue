<template>
  <div class="flex justify-between w-full my-5">
    <button
      @click="() => handleSelect('ISSUE')"
      class="
        rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col
        justify-center items-center p-5 w-28 cursor-pointer focus:outline-none
      ">
      <div class="w-12">
        <img class="w-full" src="../../assets/images/issue.png" alt="problema">
      </div>
      <p class="font-medium mt-1 text-gray-800">Problema</p>
    </button>

    <button
      @click="() => handleSelect('IDEA')"
      class="
        rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col
        justify-center items-center p-5 w-28 cursor-pointer focus:outline-none
      ">
      <div class="w-12">
        <img class="w-full" src="../../assets/images/lamp.png" alt="problema">
      </div>
      <p class="font-medium mt-1 text-gray-800">Ideia</p>
    </button>

    <button
      @click="() => handleSelect('OTHER')"
      class="
        rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col
        justify-center items-center p-5 w-28 cursor-pointer focus:outline-none
      ">
      <div class="w-12">
        <img class="w-full" src="../../assets/images/fire.png" alt="problema">
      </div>
      <p class="font-medium mt-1 text-gray-800">Outro</p>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue'

interface SetupReturn {
  handleSelect(type: string): void;
}

export default defineComponent({
  setup (_, { emit }: SetupContext): SetupReturn {
    function handleSelect (type: string): void {
      emit('select-feedback-type', type)
      emit('next')
    }

    return {
      handleSelect
    }
  }
})
</script>
