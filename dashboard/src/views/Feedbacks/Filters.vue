<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-regular text-brand-darkgray">
      Filtros
    </h1>

    <ul class="flex flex-col mt-3 list-none">
      <li
        v-for="filter in state.filters"
        :key="filter.label"
        :class="{
          'bg-gray-200 bg-opacity-50': filter.active
        }"
        @click="() => handleSelect(filter)"
        class="flex items-center justify-between px-4 py-1 rounded cursor-pointer"
      >
        <div class="flex items-center">
          <span
            :class="filter.color.bg"
            class="inline-block w-2 h-2 mr-2 rounded-full"/> {{ filter.label }}
        </div>
        <span
          :class="filter.active ? filter.color.text : 'text-brand-graydark'"
          class="font-bold"
        >
          {{ filter.amount }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'
import services from '../../services'
import useStore from '../../hooks/useStore'

const LABELS = {
  all: 'Todos',
  issue: 'Problemas',
  idea: 'Ideias',
  other: 'Outros'
}

const COLORS = {
  all: { text: 'text-brand-info', bg: 'bg-brand-info' },
  issue: { text: 'text-brand-danger', bg: 'bg-brand-danger' },
  idea: { text: 'text-brand-warning', bg: 'bg-brand-warning' },
  other: { text: 'text-brand-graydark', bg: 'bg-brand-graydark' }
}

function applyFiltersStructure (summary) {
  return Object.keys(summary).reduce((acc, cur) => {
    const currentFilter = {
      label: LABELS[cur],
      color: COLORS[cur],
      amount: summary[cur]
    }

    if (cur === 'all') {
      currentFilter.active = true
    } else {
      currentFilter.type = cur
    }

    return [...acc, currentFilter]
  }, [])
}

export default {
  async setup (_, { emit }) {
    const store = useStore('Global')
    const state = reactive({
      hasError: false,
      filters: [
        { label: null, amount: null }
      ]
    })

    try {
      const { data } = await services.feedbacks.getSummary()
      state.filters = applyFiltersStructure(data)
    } catch (error) {
      state.hasError = !!error
      state.filters = applyFiltersStructure({ all: 0, issue: 0, idea: 0, other: 0 })
    }

    function handleSelect ({ type }) {
      if (store.isLoading) {
        return
      }

      state.filters = state.filters.map((filter) => {
        if (filter.type === type) {
          return { ...filter, active: true }
        }
        return { ...filter, active: false }
      })

      emit('select', type)
    }

    return {
      state,
      handleSelect
    }
  }
}
</script>
