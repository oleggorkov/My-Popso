<template>
  <div class="input-number" :class="{'input-number--required': required}">
    <span v-if="title" class="input-number__title">
      {{ title }}
      <slot name="title" />
    </span>

    <div class="input-number__wrapper">
      <button type="button" class="input-number__control-button" @click="MinusValue">
        −
      </button>
      <input type="number" class="input-number__input"
       :name="name" :id="id" :placeholder="placeholder" :value="value" :disabled="disabled" :max="max" :ref="`input-number__${id}`"
       @input="ChangeValue($event)" @change="ChangeValueLazy($event)"
      >
      <button type="button" class="input-number__control-button" @click="PlusValue">
        +
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'input-number',
    props: ['index', 'name', 'id', 'title', 'placeholder', 'HelperText', 'InputsArr', 'value',
      'disabled', 'lazy', 'max', 'required', 'step', 'range'],
    methods: {
      ChangeValue(event){
        let value = parseInt(event.target.value);

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

        if (this.$refs[`input-number__${this.id}`] !== undefined){
          this.$refs[`input-number__${this.id}`].value = value;
        }

        if (!this.lazy){
          this.$emit('input', value);
        }
      },
      ChangeValueLazy(event){
        let value = parseInt(event.target.value);

        if (this.range.length > 0){
          if (value < this.range[0]){
            return this.range[0];
          }

          if (value > this.range[1]){
            return this.range[1];
          }
        }

        if (isNaN(value)){
          value = this.range.length > 0 ? this.range[0] : 0;
        }

        if (this.$refs[`input-number__${this.id}`] !== undefined){
          this.$refs[`input-number__${this.id}`].value = value;
        }

        if (this.lazy){
          this.$emit('input', value);
        }
      },
      CreateDefaultFocus(){
        setTimeout(() => {
          this.$refs[`input-number__${this.id}`].focus();
        }, 0);
      },
      CreateDefaultBlur(){
        this.$refs[`input-number__${this.id}`].blur();
      },
      PlusValue(){
        const CurrentStep = this.step !== undefined ? this.step : 1;
        let CurrentValue = this.value + CurrentStep;

        if (this.range.length > 0){
          if (CurrentValue > this.range[1]){
            CurrentValue = this.range[1];
          }
        }

        if (this.$refs[`input-number__${this.id}`] !== undefined){
          this.$refs[`input-number__${this.id}`].value = CurrentValue;
        }

        this.$emit('input', CurrentValue);
      },
      MinusValue(){
        const CurrentStep = this.step !== undefined ? this.step : 1;
        let CurrentValue = this.value - CurrentStep;

        if (this.range.length > 0){
          if (CurrentValue < this.range[0]){
            CurrentValue = this.range[0];
          }
        }

        if (this.$refs[`input-number__${this.id}`] !== undefined){
          this.$refs[`input-number__${this.id}`].value = CurrentValue;
        }

        this.$emit('input', CurrentValue);
      },
    },
    computed: {

    }
  }
</script>
