<template>
    <div class="input-select"
         :class="{'input-select--active': state}"
         tabindex="0"
         :value="SelectedValue.value"
         @blur="state = false"
         @input="$emit('input', $event.target.value)"
    >
      <span v-if="title">
        <span class="input-select__title">{{ title }}</span>
      </span>
      <div class="input-select__current" @click="ToggleState">
        <p class="input-select__current-text">{{ SelectedValue.title ? SelectedValue.title : placeholder }}</p>
        <span class="input-select__current-icon" />
      </div>
      <transition name="input-select__hidden-case">
        <div class="input-select__hidden-case" v-smooth-height="{state: state, styles: hiddenCaseStyles}">
          <div class="input-select__hidden-case-wrapper" :style="options.length < 6 ? `height: calc(3.3rem * ${options.length})` : `height: calc(3.3rem * 6)`" v-bar>
            <ul>
              <li v-for="(option, index) in options"
                  :class="{ 'input-select__hidden-case--disabled': option.value === SelectValue.value }"
                  :value="option.value"
                  :key="'select-option' + index"
                  @click="SelectValue(option.value)">
                {{ option.title }}
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  import Vue from 'vue';
  import Vuebar from 'vuebar';

  Vue.use(Vuebar);

  export default {
    name: "input-select",
    props: ['options', 'value', 'title', 'placeholder', 'alignTextCenter'],
    data: () => {
      return{
        state: false,
        hiddenCaseStyles: {
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
        }
      }
    },
    methods: {
      ToggleState(){
        this.state = !this.state;
      },
      SelectValue(value){
        this.$emit('input', value);
        this.ToggleState();
      },
    },
    computed: {
      SelectedValue(){
        let title = '';
        let value = '';

        if (this.value !== undefined && this.value !== null){
           if (this.options.find(el => el.value === this.value) !== undefined){
             if (this.options.find(el => el.value === this.value).title !== undefined){
               title = this.options.find(el => el.value === this.value).title;
             }

             if (this.options.find(el => el.value === this.value).value !== undefined){
               value = this.options.find(el => el.value === this.value).value;
             }
           }
        }

        return {
          title,
          value
        };
      },
    }
  }
</script>
