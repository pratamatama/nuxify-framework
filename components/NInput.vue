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
} = useField(name, undefined, {
  initialValue: props.field.value,
})

watchDebounced(
  inputValue,
  (newval, oldval) => {
    if (props.field.onChange && newval !== oldval) {
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
    <UInput
      v-model="inputValue"
      @blur="handleBlur"
      @focus="field.onFocus"
      :id="name"
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
      :name="name"
      :spellcheck="field.spellcheck"
      :trailing="!!field.trailingIcon"
      :trailing-icon="field.trailingIcon"
      :ui="field.ui"
    />
  </UFormGroup>
</template>
