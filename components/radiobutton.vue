<template>
  <div class="input-radio" :class="{'input-radio--disabled': disabled}">
  <label>
    <input type="radio"
           :title="title"
           :id="id"
           :name="name"
           :value="value"
           :checked="ModelValue === value"
           :disabled="disabled"
           @change="SelectValue($event)"
    >
      <span class="input-radio__wrapper">
      <span class="input-radio__new"/>
      <span class="input-radio__text">
        {{title}}
        <slot></slot>
      </span>
    </span>
  </label>
</div>
</template>

<script>
  export default {
    name: 'radiobutton',
    props: ['id', 'name', 'title', 'value', 'checked', 'disabled', 'ModelValue'],
    model: {
      prop: 'ModelValue',
      event: 'change'
    },
    methods: {
      SelectValue(event){
        this.$emit('change', event.target.value);
      },
    },
  }
</script>
