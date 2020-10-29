<template>
  <div class="container">
    <DocumentationHeader title="Руководство по компонентам проекта"/>
    <div class="components-page components-page-images">
      <p class="components-page-images__text">
        Компоненты создаются в папке components. Можно группировать компонеты с помощью папок.
      </p>
      <p class="components-page-images__text">
        Использование компонентов предусматривается внутри файла с расширением .vue.
      </p>
      <p class="components-page-images__text">
        Файл с расширением vue обычно состоит из 3 частей
      </p>
      <p class="components-page-images__text">
        1. template - место где находится разметка и подключенные компоненты в нашем случае это MyComponent
      </p>
      <p class="components-page-images__text">
        2. script - место где находится разметка и компоненты. Для правильного подключения нужно сделать import
        c указанием названия компонета, а затем в свойстве components указать это имя
      </p>
      <p class="components-page-images__text">
        3. style - Все стили записываются здесь. В проекте используется препроцессор scss
      </p>

      <img class="components-page-images__img" src="../../../assets/images/documentation/1.png" alt="">


    </div>
  </div>
</template>

<script>
  import DocumentationHeader from "../../../components/documentation-header"

  export default {
    name: 'documents-components-guide',
    components: { DocumentationHeader },
  }
</script>

<style lang="scss" scoped>
  .components-page-images{
    &__text{
      margin-top: 0.8rem;
      @include font-size();
    }

    &__img{
      margin-top: 1.6rem;
    }
  }
</style>
