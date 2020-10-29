<template>
  <div class="container">
    <DocumentationHeader title="Работа с изображениями"/>
    <div class="components-page components-page-images">
      <p class="components-page-images__text">
        Изображения следует хранить в папке assets/images.
      </p>
      <pre class="components-page-images__code">
        ├── assets
        │   ├── images (стили для модулей проекта)
        │   │   ├── icons
        │   │   ├── icons-gen (автомачески генерирующаяся папка )
        │   │   │   ├── icons.svg (все svg из папки icons автоматический скомпилированные в один файл)
        │   │   ├── lk
      </pre>
      <p class="components-page-images__text">
        Из папки icons все svg компилируются в файл icons.svg
      </p>
      <p class="components-page-images__text">
        Подключать скомпилированную картинку правильно через конструкция
        {{SvgIcon}} где name это имя svg файла помещённого в папку icons
      </p>

    </div>
  </div>
</template>

<script>
  import DocumentationHeader from "../../../components/documentation-header"

  export default {
    name: 'documents-images',
    components: { DocumentationHeader },
    data(){
      return{
        SvgIcon: '<svg-icon name="svg-name" />'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .components-page-images{
    &__text{
      margin-top: 0.8rem;
      @include font-size();
    }

    &__code{
      background-color: #ffffff;
      padding: 1.6rem;
      margin: 1.6rem 0;
      white-space: pre;
      font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;
      @include font-size()
    }
  }
</style>
