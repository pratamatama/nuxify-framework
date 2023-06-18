<script setup lang="ts">
import { useChangeCase } from '@vueuse/integrations/useChangeCase'
import { ObjectShape, object } from 'yup'

const props = defineProps<{
  blueprint: Blueprint
}>()

const toObjectShape = (fields: FormFields) => {
  return Object.keys(fields).reduce((obj: any, key: string) => {
    if (!obj[key]) obj[key] = fields[key].rules.label(fields[key].label)
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

  if (detail && Array.isArray(detail)) {
    dShape = detail.reduce((obj, curr) => {
      const key = curr.key ?? useChangeCase(curr.title, 'snakeCase').value
      if (!obj[key]) {
        obj[key] = object().shape(toObjectShape(curr.fields))
      }
      return obj
    }, {} as any)
  }

  const finalShape = object().shape({
    ...hShape,
    ...dShape,
  })

  return toTypedSchema(finalShape)
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

    <UContainer :ui="{ constrained: 'max-w-9xl' }" class="mb-10">
      <!-- Header -->
      <NFormLayout :fields="blueprint.form.header.fields" />

      <!-- Multiple detail -->
      <template v-if="Array.isArray(blueprint.form.detail)">
        <template v-if="blueprint.form.detailMode === 'rows'">
          <NFormLayout
            v-for="detail in blueprint.form.detail"
            :key="generateKey(detail.title, detail.key)"
            :title="detail.title"
            :fields="detail.fields"
          />
        </template>

        <div class="mt-20" v-else>
          <Tabs>
            <template #default="{ currentTab }">
              <NFormLayout
                v-for="detail in blueprint.form.detail"
                :key="generateKey(detail.title, detail.key)"
                :id="generateKey(detail.title, detail.key)"
                :fields="detail.fields"
                :label="detail.title"
                :title="detail.title"
                hide-title
                v-show="currentTab === detail.title"
              />
            </template>
          </Tabs>
        </div>
      </template>

      <!-- Single detail -->
      <NFormLayout
        v-else-if="blueprint.form.detail"
        :title="blueprint.form.detail.title"
        :fields="blueprint.form.detail.fields"
      />
    </UContainer>
  </VeeForm>
</template>
