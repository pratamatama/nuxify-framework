import { VueElement } from 'vue'

declare global {
  interface Field {
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
    value?: string | number | undefined
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

  interface AsyncSelectField extends Field {
    displayKey: string
    valueKey: string
    options: () => Promise<any[]>
  }

  interface BrowseField extends AsyncSelectField {
    fields: BrowseFieldConfig[]
  }

  interface BrowseFieldConfig {
    key: string
    label: string
    width?: 'fit' | number
  }

  interface DateField extends Field {
    separator?: string
  }

  interface FormFields {
    [key: string]:
      | Field
      | OptionField
      | AsyncSelectField
      | DateField
      | BrowseField
  }

  interface OptionField extends Field {
    displayKey: string
    valueKey: string
    options: string[] | { [key: string]: any }[]
  }

  interface FormSchema {
    title: string
    key?: string
    fields: FormFields
  }

  interface DetailFormSchema extends FormSchema {
    mode?: 'single' | 'multirow' | 'browse'
    onAdd?: (self: VueElement) => void
  }

  interface Blueprint {
    form: {
      initialValues?: () => Promise<any>
      onSubmit: (values: any) => Promise<void>
      onInvalidSubmit: (errors: any) => Promise<void>
      header: FormSchema
      detail?: DetailFormSchema | DetailFormSchema[]
    }
  }
}

export {}
