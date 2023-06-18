<script setup lang="ts">
import { useChangeCase } from '@vueuse/integrations/useChangeCase'

const props = defineProps<{
  fields: FormFields
  title?: string
  hideTitle?: boolean
}>()

const buildName = (key: string) => {
  if (props.title) {
    const scTitle = useChangeCase(props.title, 'snakeCase').value
    return `${scTitle}.${key}`
  }
  return key
}
</script>

<template>
  <div class="p-10 pb-0">
    <h4
      v-if="title && !hideTitle"
      class="text-primary-500 text-2xl mt-20 mb-10"
    >
      {{ title }}
    </h4>

    <div class="grid grid-cols-12 gap-7">
      <div v-for="(field, key) in fields" :key="key" class="col-span-6">
        <NSelectMenu
          v-if="field.type === 'select' || field.type === 'asyncSelect'"
          :field="field"
          :name="buildName(key.toString())"
        />

        <NInput v-else :field="field" :name="buildName(key.toString())" />
      </div>
    </div>
  </div>
</template>
