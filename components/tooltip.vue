<template>
  <div class="tooltip" @mouseenter="state = true" @mouseleave="state = false">
    <div class="tooltip__main">
      ?
    </div>
    <transition name="tooltip__content">
      <div class="tooltip__content" v-if="state" :style="StyleObject">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
  // TODO При последовательных кликах на тултипы, неправильный расчет values. Поправить!

  export default {
    name: 'tooltip',
    props: ['name'],
    data: () => {
      return {
        state: false,
        StyleObject: {
          left: '0',
          top: '-8px'
        }
      }
    },
    methods: {
      CountHidden(){
        //console.log(this.$el.querySelector('.tooltip__content'));

        const ElementRect = document.querySelector('.tooltip__content').getBoundingClientRect();

        const values = {
          up: Math.max(0, 0 - ElementRect.top),
          left: Math.max(0, 0 - ElementRect.left),
          down: Math.max(0, ElementRect.bottom - window.innerHeight),
          right: Math.max(0, ElementRect.right - window.innerWidth)
        };


        if (values.left > 0) {
          this.StyleObject.left = `${values.left + 4}px`;
        }

        if (values.up > 0) {
          //this.StyleObject.top = `${values.up + 4}px`;
        }

        if (values.right > 0) {
          //this.StyleObject.top = `${-values.right - 4}px`;
        }

        if (values.down > 0) {
          //this.StyleObject.top = `${-values.down - 4}px`;
        }

        //console.log('values: ', values);
      }
    },
    watch: {
      state: function (value) {
        if (value){
          this.StyleObject = {
            left: '0',
            top: '-8px'
          };

          this.$nextTick(() => {
            this.CountHidden();
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .tooltip {
    width: 1.6rem;
    height: 1.6rem;

    display: flex;
    justify-content: center;
    align-content: center;

    position: relative;

    &__main {
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-content: center;

      border-radius: 50%;
      border: 0.1rem solid $color-main--orange;
      cursor: pointer;

      font-size: 1.2rem;
      line-height: 1.6rem;
      font-weight: 500;
      color: $color-main--orange;
    }

    &__content {
      width: max-content;
      height: auto;

      max-width: 23rem;

      padding: 0.8rem 1.6rem;

      position: absolute;

      background-color: white;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
      border-radius: 5px 5px 0 5px;

      font-size: 1.2rem;
      line-height: 1.6rem;
      font-weight: 500;
      color: $color-main--darkgray;

      transform: translateY(-100%) translateX(-100%);
    }
  }

  .tooltip__content{
    &-enter-active, &-leave-active {
      transition: opacity .35s, transform ease 0.35s;
    }
    &-enter, &-leave-active {
      opacity: 0;
      transform: translateY(calc(-100% - 1.6rem)) translateX(-100%);
    }
  }
</style>
