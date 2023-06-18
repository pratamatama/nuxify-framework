<script setup lang="ts">
const props = defineProps<{
  field: Field | OptionField | AsyncSelectField | DateField | BrowseField
  name: string
}>()

const name = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  handleReset,
} = useField(name, props.field.rules, {
  initialValue: props.field.value,
})

watchDebounced(
  inputValue,
  (newval, oldval) => {
    if (props.field.onChange) {
      props.field.onChange(newval, oldval)
    }
  },
  { debounce: 800 },
)
</script>

<template>
  <UFormGroup
    :label="field.label"
    :hint="field.hint ?? field.required === false ? 'Optional' : ''"
    :help="field.help"
    :error="errorMessage"
    :description="field.description"
  >
    <USelectMenu
      class="w-full h-[2.75rem]"
      :id="name"
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
      :name="name"
      :on-blur="
        (e: any) => {
          handleBlur(e)
          field.onBlur && field.onBlur(e)
        }
      "
      :on-focus="field.onFocus"
      :on-update:model-value="handleChange"
      :spellcheck="field.spellcheck"
      :trailing="!!field.trailingIcon"
      :trailing-icon="field.trailingIcon"
      :ui="field.ui"
    />
  </UFormGroup>
</template>
