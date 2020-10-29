<template>
	<div class="input-select-text" :class="{'input-select-text--active': OptionsState}">
    <label :for="id">
      <span class="input-select-text__title" v-if="title">{{ title }}</span>
      <div class="input-select-text__input-wrapper">
        <input
          type="text"
          :name="name"
          :id="id"
          :placeholder="placeholder"
          :value="value"
          @input="ChangeInputValue($event)"
        >
        <button type="button" @focus="OptionsState = true" @blur="OptionsState = false">
          <svg-icon name="arrow-small"/>
        </button>
      </div>
      <div class="input-select-text__options" v-if="OptionsState && options.length > 0">
        <ul>
          <li
            v-for="(option, id) in options" :key="`input-select-text-${name}-option-${id}`"
            @mousedown="ChangeSelectValue(option)"
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'input-select-text',
    components: {},
    props: ['id', 'name', 'title', 'placeholder', 'options', 'value'],
    data: () => {
      return{
        OptionsState: false,
      }
    },
    methods: {
      ChangeInputValue(event){
        this.$emit('input', event.target.value);
      },
      ChangeSelectValue(value){
        this.$emit('input', value);
        this.OptionsState = false;
      }
    }
  }
</script>

<style lang="scss">
  .input-select-text{
    width: auto;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    outline: none;

    position: relative;

    z-index: 3;

    &__title{
      width: 100%;
      height: auto;

      font-size: 1.4rem;
      line-height: 1.6rem;
      color: $color-main--darkgray;

      @include mobile{
        font-size: 1.2rem;
      }
    }

    &__input-wrapper{
      width: 100%;
      height: auto;

      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;

      button{
        width: 2.4rem;
        height: 3.6rem;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: transparent;
        border: none;
        outline: none;

        position: absolute;
        right: 0;
        z-index: 2;

        svg{
          width: 1.2rem;
          height: 0.8rem;

          fill: $color-main--darkgray;

          transform: rotate(-90deg);
        }
      }
    }

    &__options{
      width: 100%;
      height: auto;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      flex-shrink: 0;

      border: 0.1rem $color-main--darkgray solid;
      border-top: none;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      background-color: white;
      overflow: hidden;

      transform: translateY(100%);

      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      ul{
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        flex-shrink: 0;
        flex-grow: 1;

        li{
          width: 100%;
          height: 3.2rem;

          padding: 0 0.8rem;

          font-size: 1.4rem;
          line-height: 3.2rem;
          font-weight: 500;
          color: $black-main;
          white-space: nowrap;
          text-overflow: ellipsis;

          overflow: hidden;

          cursor: pointer;
          transition: background-color ease 0.25s;

          &:hover{
            background-color: rgba(148, 150, 166, 0.26);
          }

          @include mobile{
            font-size: 1.2rem;
          }
        }
      }
    }

    &--active{
      z-index: 4;
      input{
        border-bottom: 0.1rem $color-main--darkgray solid!important;
      }
    }

    label{
      width: 100%;
      height: auto;
    }

    input{
      width: 100%;
      height: 100%;

      padding: 0.7rem 0;

      position: relative;

      border: none;
      border-bottom: 0.1rem $gray-light solid;

      font-size: 1.4rem;
      line-height: 3.2rem;
      font-weight: 500;
      color: $black-main;

      transition: border-bottom ease 0.425s;

      @include mobile{
        font-size: 1.2rem;
      }

      &::placeholder{
        line-height: 3.2rem;
        font-weight: 500;
        font-size: 2rem;
        color: $gray-main;
      }

      &:focus{
        & + .input-text__line{
          width: 100%;
          background-color: $black-main;
        }
      }

      &:focus,
      &:hover:not([disabled]){
        border-color: $color-main--darkgray;
      }

      &[type="number"] {
        -moz-appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }

      &[disabled] {
        opacity: 0.5;
      }
    }
  }
</style>
