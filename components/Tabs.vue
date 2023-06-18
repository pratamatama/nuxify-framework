<script setup lang="ts">
interface Tab {
  label: string
  component: string
}

const props = defineProps({
  defaultTab: {
    type: String,
    default: '',
  },
})

const tabs = ref<Tab[]>([])

const handleTabClick = (label: string, event: MouseEvent) => {
  event.preventDefault()
  currentTab.value = label
  updateUrlHash(label)
}

const updateUrlHash = (label: string) => {
  const hash = `#tab-${label.toLowerCase().replace(/\s/g, '-')}`
  history.replaceState(null, '', hash)
}

onMounted(() => {
  // Find all the tabs inside the component
  const tabElements = Array.from(
    document.querySelectorAll('div[label]'),
  ) as HTMLDivElement[]
  tabs.value = tabElements.map((tab, index) => ({
    label: tab.getAttribute('label') || `Tab ${index + 1}`,
    component: tab.innerHTML,
  }))

  // Set the initial active tab to the first tab
  if (tabs.value.length > 0) {
    currentTab.value = tabs.value[0].label
  }

  // Listen to hash changes to update the current tab
  window.addEventListener('hashchange', handleHashChange)
  handleHashChange()
})

const currentTab = ref<string>(
  props.defaultTab || (tabs.value.length > 0 ? tabs.value[0].label : ''),
)

const handleHashChange = () => {
  const hash = window.location.hash
  const label = hash.replace('#tab-', '').replace(/-/g, ' ')
  const index = tabs.value.findIndex((tab) => tab.label.toLowerCase() === label)
  if (index !== -1) {
    currentTab.value = tabs.value[index].label
  }
}

watchEffect(() => {
  const activeTab = tabs.value.find((tab) => tab.label === currentTab.value)
  if (activeTab) {
    updateUrlHash(activeTab.label)
  }
})

// Cleanup the event listener when the component is unmounted
onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})

const getClass = (active: boolean) => {
  return active
    ? 'select-none block p-4 px-8 whitespace-nowrap transition-colors duration-200 bg-primary-600'
    : 'select-none block p-4 px-8 hover:bg-gray-200 dark:hover:bg-gray-700 bg-gray-200 dark:bg-gray-800 whitespace-nowrap transition-colors duration-200'
}
</script>

<template>
  <div class="mb-72">
    <div class="border-b border-gray-200 dark:border-gray-800">
      <ul class="tabs flex">
        <li v-for="(tab, index) in tabs" :key="index">
          <a
            :href="'#tab-' + tab.label.toLowerCase().replace(/\s/g, '-')"
            :class="getClass(currentTab === tab.label)"
            @click="handleTabClick(tab.label, $event)"
            >{{ tab.label }}</a
          >
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <slot :currentTab="currentTab"></slot>
    </div>
  </div>
</template>
