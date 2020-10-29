/* TODO НЕ ИСПОЛЬЗОВАТЬ ДИРЕКТИВУ, ОШИБКИ В РАБОТЕ! Перенести часть логики в компоненты выпадающих списков. */

import Vue from 'vue';

Vue.directive('smooth-height', {
  bind(el, binding){
    const state = typeof binding.value === "object" ? binding.value.state : binding.value;
    const AnimationsTime = 350;

    const HiddenWrapper = document.createElement('div');
    const ChildNodes = el.children;

    for (const el of [...ChildNodes]) {
      HiddenWrapper.insertAdjacentElement('beforeend', el);
    }

    for (const ParentNodeClass of [...el.classList]) {
      HiddenWrapper.classList.add(ParentNodeClass);
      el.classList.remove(ParentNodeClass);
    }

    el.appendChild(HiddenWrapper);


    if (binding.value.styles){
      for (const style in binding.value.styles){
        if (binding.value.styles.hasOwnProperty(style)){
          el.style[style] = binding.value.styles[style];
        }
      }
    }

    el.classList.add('smooth-height-container');
    el.style.transition = `height ease ${AnimationsTime}ms`;

    HiddenWrapper.classList.add('smooth-height-container__wrapper');
    HiddenWrapper.style.transition = `opacity ease ${AnimationsTime}ms`;

    if (state){
      el.style.display = 'block';
      el.style.overflow = 'unset';
      el.style.height = 'auto';
      el.style.zIndex = 'auto';

      HiddenWrapper.style.opacity = '1';
    } else {
      el.style.display = 'none';
      el.style.overflow = 'hidden';
      el.style.height = '0';
      el.style.zIndex = '0';

      HiddenWrapper.style.opacity = '0';
    }
  },
  update(el, binding){
    const state = typeof binding.value === "object" ? binding.value.state : binding.value;
    const OldState = typeof binding.value === "object" ? binding.oldValue.state : binding.oldValue;
    const HiddenWrapper = el.querySelector('.smooth-height-container__wrapper');
    const AnimationsTime = 350;

    const GetHeight = ()=> {
      const ElMarginTop = parseInt(getComputedStyle(HiddenWrapper).marginTop.split('px')[0]);
      const ElMarginBottom = parseInt(getComputedStyle(HiddenWrapper).marginBottom.split('px')[0]);
      const ElHeight = parseInt(getComputedStyle(HiddenWrapper).height.split('px')[0]);

      return ElMarginTop + ElMarginBottom + ElHeight;
    };

    if (state !== OldState){
      if (state){
        el.style.display = 'block';
        el.style.transition = `height ease 0`;
        el.style.zIndex = 'auto';

        setTimeout(() => {
          el.style.transition = `height ease ${AnimationsTime}ms`;
          el.style.height = `${GetHeight()}px`;

          HiddenWrapper.style.opacity = '1';
        },0);

        setTimeout(() => {
          el.style.overflow = 'unset';
        }, AnimationsTime)
      } else {
        el.style.height = `${GetHeight()}px`;

        setTimeout(() => {
          el.style.height = '0';
          el.style.overflow = 'hidden';

          if (HiddenWrapper){
            HiddenWrapper.style.opacity = '0';
          }
        }, 0);

        setTimeout(() => {
          el.style.display = 'none';
          el.style.zIndex = '0';
        }, AnimationsTime);
      }
    }
  }
});
