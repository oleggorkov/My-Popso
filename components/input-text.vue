<template>
  <div class="input-text" :class="{'input-text--required': required}">
    <label :for="id">
      <span v-if="title" class="input-text__title">
        {{ title }}
        <slot name="title" />
      </span>

      <div class="input-text__wrapper">
        <input
          :type="type"
          :name="name"
          :id="id"
          :placeholder="placeholder"
          :maxlength="MaxLengths"
          :value="value"
          :disabled="disabled"
          :max="max"
          :ref="`input-text__${id}`"
          @input="[Validate($event), ChangeValue($event)]"
          @change="ChangeValueLazy($event)"
        >
        <span class="input-text__line" />
      </div>
      <span class="input-text__footer" :class="{'input-text__footer--active': HelperText && HelperText.length > 0}">
        <span class="input-text__helper-text">{{ HelperText }}</span>
      </span>
    </label>
    <slot name="DeleteButton"></slot>
  </div>
</template>

<script>
  export default {
    name: 'input-text',
    props: ['index', 'type', 'name', 'id', 'title', 'placeholder', 'HelperText', 'InputsArr', 'MaxLengths', 'value',
      'hasDeleteButton', 'disabled', 'lazy', 'min', 'max', 'required', 'range'],
    methods: {
      Validate(event){
        let value = event.target.value;

        if (this.type === 'number'){
          value = parseInt(value);

          if (this.range){
            if (this.range.length > 0){
              if (value < this.range[0]){
                value = this.range[0];
              }

              if (value > this.range[1]){
                value = this.range[1];
              }
            }

            if (isNaN(value)){
              value = this.range.length > 0 ? this.range[0] : 0;
            }
          }
        }

        if (this.min !== undefined && this.type === 'number'){
          //TODO отрефакторить код, использовать либо range, либо max\min значения
          if (value < parseInt(this.min)){
            value = parseInt(this.min);
          }

          if (isNaN(value)){
            value = parseInt(this.min);
          }
        }

        if (value.toString().length > this.MaxLengths) {
          value = value.toString().slice(0, this.MaxLengths);
        }

        if (this.$refs[`input-text__${this.id}`] !== undefined){
          this.$refs[`input-text__${this.id}`].value = value;
        }
      },
      ChangeValue(event){
        let value = event.target.value;

        if (this.type === 'number'){
          value = parseInt(value);
        }

        if (!this.lazy){
          this.$emit('input', value);
        }
      },
      ChangeValueLazy(event){
        let value = event.target.value;

        if (this.type === 'number'){
          value = parseInt(value);
        }

        if (this.lazy){
          this.$emit('input', value);
        }
      },
      CreateDefaultFocus(){
        setTimeout(() => {
          this.$refs[`input-text__${this.id}`].focus();
        }, 0);
      },
      CreateDefaultBlur(){
        this.$refs[`input-text__${this.id}`].blur();
      }
    }
  }
</script>
