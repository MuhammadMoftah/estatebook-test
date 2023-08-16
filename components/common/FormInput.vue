<template>
  <div class="w-full mt-6">
    <label :for="name" class="text-sm font-normal capitalize text-text-gray">
      {{ label }}</label
    >

    <input
      :id="name"
      class="block w-full h-12 px-4 mt-2 text-xs font-normal bg-white border rounded-md outline-none text-slate-800 border-border-input"
      :class="{ 'border-red-500': errorClass }"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="updateInput"
      @blur="$emit('blur', $event)"
    />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  model: {
    prop: 'value',
    event: 'update',
  },
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    successMessage: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    errorClass: {
      type: Boolean,
    },
  },

  methods: {
    updateInput(e) {
      this.$emit('update', e.target.value)
    },
  },
})
</script>
