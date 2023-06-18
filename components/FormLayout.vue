<script setup lang="ts">
export interface Field {
  type:
    | 'text'
    | 'number'
    | 'select'
    | 'asyncSelect'
    | 'date'
    | 'datetime'
    | 'browse'
    | 'radio'
    | 'checkbox'
  label: string
  disabled?: boolean
  value?: string | number | null
  rules: any
  hint?: string
  help?: string
  icon?: string
  placeholder?: string
  required?: boolean
  autofocus?: boolean
  autocomplete?: 'on' | 'off'
  leadingIcon?: string
  loading?: boolean
  loadingIcon?: string
  spellcheck?: boolean
  trailingIcon?: string
  error?: string
  description?: string
  ui?: any
  onBlur?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onChange?: (newval: any, oldval: any) => void
  formatter?: (value: string | number) => string
}

export interface OptionField extends Field {
  displayKey: string
  valueKey: string
  options: string[] | { [key: string]: any }[]
}

export interface AsyncSelectField extends Field {
  displayKey: string
  valueKey: string
  options: () => Promise<any[]>
}

export interface DateField extends Omit<Field, 'value'> {
  separator?: string
  value: Date
}

export interface BrowseFieldConfig {
  key: string
  label: string
  width?: 'fit' | number
}

export interface BrowseField extends AsyncSelectField {
  fields: BrowseFieldConfig[]
}

export interface FormFields {
  [key: string]:
    | Field
    | OptionField
    | AsyncSelectField
    | DateField
    | BrowseField
}

defineProps<{
  fields: FormFields
  title?: string
}>()
</script>

<template>
  <div class="p-10 pb-0">
    <h4 v-if="title" class="text-primary-500 text-2xl mt-20 mb-10">
      {{ title }}
    </h4>

    <div class="grid grid-cols-12 gap-7">
      <div v-for="(field, key) in fields" :key="key" class="col-span-6">
        <UFormGroup
          :name="key.toString()"
          :label="field.label"
          :hint="field.hint ?? field.required === false ? 'Optional' : ''"
          :help="field.help"
          :error="field.error"
          :description="field.description"
        >
          <USelectMenu
            v-if="field.type === 'select' || field.type === 'asyncSelect'"
            class="w-full h-[2.75rem]"
            :id="key.toString()"
            :required="field.required ?? true"
            :placeholder="field.placeholder"
            :icon="field.icon"
            :autofocus="field.autofocus"
            :disabled="field.disabled"
            :autocomplete="field.autocomplete"
            :leading="!!field.leadingIcon"
            :leading-icon="field.leadingIcon"
            :loading="field.loading"
            :loading-icon="field.loadingIcon"
            :name="key.toString()"
            :on-blur="field.onBlur"
            :on-focus="field.onFocus"
            :on-update:model-value="field.onChange"
            :spellcheck="field.spellcheck"
            :trailing="!!field.trailingIcon"
            :trailing-icon="field.trailingIcon"
            :ui="{ ...field.ui, innerHeight: '1000px' }"
          />

          <UInput
            v-else
            :id="key.toString()"
            :type="field.type"
            :required="field.required ?? true"
            :placeholder="field.placeholder"
            :icon="field.icon"
            :autofocus="field.autofocus"
            :disabled="field.disabled"
            :autocomplete="field.autocomplete"
            :leading="!!field.leadingIcon"
            :leading-icon="field.leadingIcon"
            :loading="field.loading"
            :loading-icon="field.loadingIcon"
            :name="key.toString()"
            :on-blur="field.onBlur"
            :on-focus="field.onFocus"
            :on-update:model-value="field.onChange"
            :spellcheck="field.spellcheck"
            :trailing="!!field.trailingIcon"
            :trailing-icon="field.trailingIcon"
            :ui="field.ui"
          />
        </UFormGroup>
      </div>
    </div>
  </div>
</template>
