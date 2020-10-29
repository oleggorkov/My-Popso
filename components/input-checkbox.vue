<template>
  <div class="input-checkbox " :class="className">
    <input type="checkbox" :name="name" :id="id" :checked="value" :disabled="disabled" @input="$emit('input', !value)">
    <label :for="id" class="input-checkbox__wrapper" :class="{'input-checkbox__wrapper--disabled' : disabled}">
      <span class="input-checkbox__new">
        <svg-icon class="input-checkbox__default-ico" name="check"/>
        <svg-icon class="input-checkbox__error-ico" name="plus-thin"/>
      </span>
      <span class="input-checkbox__text">{{ text }}</span>
    </label>
  </div>
</template>

<script>
  export default {
    name: "input-checkbox",
    props: ['name', 'id', 'text', 'value', 'disabled', 'className'],
  }
</script>
