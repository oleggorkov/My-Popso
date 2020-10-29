<template>
	<div class="input-suggestion" :class="{ 'input-suggestion--focused': focused, 'input-suggestion--required':required}">
    <label :for="`input-suggestion__${id}`">
      <span v-if="title">
        <span class="input-suggestion__title">{{ title }}</span>
      </span>
      <div class="input-suggestion__wrapper">
        <input type="text"
               :id="`test-input-suggestion__${id}`"
               :name="'name'"
               autocomplete="off"
               :ref="`test-input-suggestion__${id}`"
               v-model="InputValue"
               :maxlength="MaxLengths"
               @focus="FocusInput"
               @blur="BlurInput"
               @input="ChangeInputValue($event)"
               @change="ChangeInputValueLazy($event)"
        >
        <span class="input-suggestion__line" />
      </div>
      <span class="input-suggestion__footer">
        <span class="input-suggestion__helper-text">{{ HelperText }}</span>
      </span>
      <div class="input-suggestion__hidden-case" v-if="focused && (options.length > 0)">
        <div class="input-select__hidden-case-wrapper"
          :style="options.length < 6 ? `height: calc(3.3rem * ${options.length})` : `height: calc(3.3rem * 6)`" v-bar
        >
          <ul>
            <li v-for="(item, index) in options" :key="index" :value="item" @mousedown="SelectValue($event)">{{ item }}</li>
          </ul>
        </div>
      </div>
    </label>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Vuebar from 'vuebar';

  Vue.use(Vuebar);

  export default {
    name: 'input-suggestion',
    props: ['options', 'lazy', 'id', 'name', 'title', 'HelperText', 'MaxLengths', 'required', 'placeholder', 'value'],
    data:() => {
      return{
        focused: false,
        InputValue: '',
      }
    },
    mounted() {
      this.InputValue = this.value !== undefined ? this.value : ''
    },
    methods: {
      ChangeInputValue(event){
        if (event.target.value.length > this.MaxLengths) {
          event.target.value = event.target.value.slice(0, this.MaxLengths);
        }
        if (!this.lazy){
          this.$emit('input', event.target.value);
        }
      },
      ChangeInputValueLazy(event){
        if (event.target.value.length > this.MaxLengths) {
          event.target.value = event.target.value.slice(0, this.MaxLengths);
        }
        if (this.lazy){
          this.$emit('input', event.target.value);
        }
      },
      SelectValue(event){
        this.InputValue = event.target.getAttribute('value');
        this.$emit('input', event.target.getAttribute('value'));
      },
      FocusInput(){
        this.focused = true;
      },
      BlurInput(){
        this.focused = false;
      },
      CreateDefaultFocus(){
        setTimeout(() => {
          this.$refs[`input-suggestion__${this.id}`].focus();
        }, 0);
      },
      CreateDefaultBlur(){
        this.$refs[`input-suggestion__${this.id}`].blur();
      }
    }
  }
</script>
