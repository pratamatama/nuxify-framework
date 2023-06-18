<script setup lang="ts">
import { useChangeCase } from '@vueuse/integrations/useChangeCase'
import { VueElement } from 'vue'
import { ObjectShape, object, string } from 'yup'
import { type FormFields } from './FormLayout.vue'

export interface FormSchema {
  title: string
  key?: string
  fields: FormFields
}

export interface DetailFormSchema extends FormSchema {
  mode?: 'single' | 'multirow' | 'browse'
  onAdd?: (self: VueElement) => void
}

export interface Blueprint {
  form: {
    initialValues?: () => Promise<any>
    onSubmit: (values: any) => Promise<void>
    onInvalidSubmit: (errors: any) => Promise<void>
    header: FormSchema
    detail?: DetailFormSchema | DetailFormSchema[]
  }
}

const props = defineProps<{
  blueprint: Blueprint
}>()

const toObjectShape = (fields: FormFields) => {
  return Object.keys(fields).reduce((obj: any, key: string) => {
    if (!obj[key]) obj[key] = fields[key].rules
    return obj as ObjectShape
  }, {})
}

const validationSchema = computed(() => {
  const { fields: hFields } = props.blueprint.form.header
  const hShape = toObjectShape(hFields)

  let dShape
  const detail = props.blueprint.form.detail
  if (detail && !Array.isArray(detail)) {
    const key = detail.key ?? useChangeCase(detail.title, 'snakeCase').value
    dShape = {
      [key]: object().shape(toObjectShape(detail.fields)),
    }
  }

  const finalShape = {
    ...hShape,
    ...dShape,
  }

  return toTypedSchema(object().shape(finalShape))
})

const generateKey = (title: string, key?: string) => {
  return useChangeCase(key ?? title, 'snakeCase').value
}
</script>

<template>
  <VeeForm :validation-schema="validationSchema">
    <div class="sticky top-0 inset-x-0 mb-10 z-10">
      <div class="w-full border-b border-gray-200 dark:border-gray-800">
        <div
          class="bg-white dark:bg-gray-900 flex justify-between items-center"
        >
          <div class="flex items-center">
            <UButton
              @click.prevent="$router.back()"
              type="button"
              variant="ghost"
              color="gray"
              label="Back"
              icon="i-heroicons-arrow-left-20-solid"
              class="border-r border-gray-200 dark:border-gray-800"
              :ui="{
                rounded: 'rounded-0',
                padding: {
                  '2xs': 'px-2 py-1',
                  xs: 'px-2.5 py-1.5',
                  sm: 'px-3 py-1.5',
                  md: 'px-3 py-2',
                  lg: 'px-10 py-5',
                  xl: 'px-4 py-3',
                },
              }"
            />
            <h4 class="ml-10 mb-1 text-xl font-semibold capitalize">
              {{ blueprint.form.header.title }}
            </h4>
          </div>
          <UButton
            type="submit"
            variant="solid"
            color="primary"
            label="Simpan"
            trailing-icon="i-heroicons-inbox-arrow-down"
            :ui="{
              rounded: 'rounded-0',
              padding: {
                '2xs': 'px-2 py-1',
                xs: 'px-2.5 py-1.5',
                sm: 'px-3 py-1.5',
                md: 'px-3 py-2',
                lg: 'px-10 py-5',
                xl: 'px-4 py-3',
              },
            }"
          />
        </div>
      </div>
    </div>

    <UContainer :ui="{ constrained: 'max-w-9xl' }">
      <!-- Header -->
      <FormLayout :fields="blueprint.form.header.fields" />

      <!-- Multiple detail -->
      <template v-if="Array.isArray(blueprint.form.detail)">
        <FormLayout
          v-for="detail in blueprint.form.detail"
          :key="generateKey(detail.title, detail.key)"
          :title="detail.title"
          :fields="detail.fields"
        />
      </template>

      <!-- Single detail -->
      <FormLayout
        v-else-if="blueprint.form.detail"
        :title="blueprint.form.detail.title"
        :fields="blueprint.form.detail.fields"
      />
    </UContainer>
  </VeeForm>
</template>
