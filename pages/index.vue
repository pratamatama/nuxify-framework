<script setup lang="ts">
import { date, string } from 'yup'
import Form, { Blueprint } from '~/components/Form.vue'

const formRef = ref<InstanceType<typeof Form>>()

const blueprint: Blueprint = reactive({
  form: {
    initialValues: async () => {},
    onSubmit: async (values) => {},
    onInvalidSubmit: async (errors) => {},
    header: {
      title: 'Form General',
      fields: {
        email: {
          type: 'text',
          label: 'Email',
          disabled: false,
          required: false,
          leadingIcon: 'i-heroicons-envelope',
          placeholder: 'someone@example.com',
          rules: string().required().min(10).max(100),
          onChange: (value) => {
            blueprint.form.header.fields.username.value = value
            console.log(value)
          },
        },
        password: {
          type: 'text',
          label: 'Password',
          disabled: false,
          rules: string().required().min(10).max(100),
          onChange: (value) => {},
        },
        username: {
          type: 'text',
          label: 'Username',
          disabled: false,
          rules: string().required().min(10).max(100),
          value: '',
          onChange: (value) => {},
        },
        status: {
          type: 'select',
          label: 'Status',
          disabled: false,
          rules: string().required().min(10).max(100),
          value: null,
          displayKey: 'label',
          valueKey: 'id',
          options: [
            { id: 1, label: 'Value 1' },
            { id: 1, label: 'Value 2' },
            { id: 1, label: 'Value 3' },
          ],
          onChange: (value) => {},
        },
        country: {
          type: 'asyncSelect',
          label: 'Country',
          disabled: false,
          value: 1,
          rules: string().required(),
          displayKey: 'name',
          valueKey: 'id',
          options: async () => [],
          onChange: (value) => {},
        },
        birthdate: {
          separator: '',
          type: 'date',
          label: 'Birthdate',
          disabled: false,
          value: new Date(),
          rules: date().required(),
          onChange: (value) => {},
        },
        booking_date: {
          type: 'datetime',
          label: 'Booking Date',
          disabled: false,
          value: new Date(),
          rules: date().required(),
          separator: '/',
          onChange: (value) => {},
        },
        sub_unit: {
          type: 'browse',
          label: 'Sub Unit',
          disabled: false,
          value: null,
          rules: string().required(),
          displayKey: 'value_1',
          valueKey: 'id',
          options: async () => [],
          onChange: (value) => {},
          fields: [
            { key: 'no', label: 'No' },
            { key: 'value_1', label: 'Value 1' },
            { key: 'value_2', label: 'Value 2' },
            { key: 'value_3', label: 'Value 3' },
          ],
        },
      },
    },
    detail: {
      title: 'Detail Form',
      mode: 'multirow',
      fields: {
        detail_text: {
          type: 'text',
          label: 'Detail Text',
          disabled: false,
          rules: string().required().min(10).max(100),
          onChange: (value) => {},
        },
        detail_select: {
          type: 'select',
          label: 'Detail Select',
          disabled: false,
          rules: string().required().min(10).max(100),
          value: null,
          options: ['Value 1', 'Value 2', 'Value 3'],
          onChange: (value) => {},
        },
        detail_async_select: {
          type: 'asyncSelect',
          label: 'Detail Async Select',
          disabled: false,
          value: 1,
          displayKey: 'name',
          valueKey: 'id',
          rules: string().required(),
          options: async () => [],
          onChange: (value) => {},
        },
        detail_date: {
          type: 'date',
          label: 'Detail Date',
          disabled: false,
          value: new Date(),
          rules: date().required(),
          onChange: (value) => {},
        },
        detail_datetime: {
          type: 'datetime',
          label: 'Detail DateTime',
          disabled: false,
          value: new Date(),
          rules: date().required(),
          onChange: (value) => {},
        },
        detail_browse: {
          type: 'browse',
          label: 'Detail Browse',
          disabled: false,
          value: null,
          rules: string().required(),
          displayKey: 'value_1',
          valueKey: 'id',
          options: async () => [],
          onChange: (value) => {},
          fields: [
            { key: 'no', label: 'No', width: 'fit' },
            { key: 'value_1', label: 'Value 1', width: 10 },
            { key: 'value_2', label: 'Value 2', width: 10 },
            { key: 'value_3', label: 'Value 3', width: 10 },
          ],
        },
      },
    },
  },
})
</script>

<template>
  <Form ref="formRef" :blueprint="blueprint" />
</template>
