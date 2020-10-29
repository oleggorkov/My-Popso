<template>
  <div class="container">
    <DocumentationHeader title="Работа со стилями"/>
    <div class="components-page components-page-styles">
      <p class="components-page-styles__text">
        При работе со стилями важно придерживаться установленных правил по оформлению кода. В сборке используется препроцессор SCSS
      </p>
      <p class="components-page-styles__text">
        Стили размещаются в папке src/scss:
      </p>
      <pre class="components-page-styles__code">
        ├── styles
        │   ├── modules (стили для модулей проекта)
        │   ├── vars
        │   │   ├── colors.scss (общие стили цветов для сайта)
        │   │   ├── layout.scss
        │   │   ├── media.scss (breakpoints для разных разрешений экрана)
        │   │   └── skeleton.scss (стили skeleton screen pre-loading.
        │   ├── control-elements.scss (стили стандартных элементов форм / кнопок и пр.).
        │   ├── global.scss (стили стандартных элементов форм / кнопок и пр.).
        │   ├── grid.scss
        │   ├── main.scss (файл с import стилей).
        │   ├── mixins.scss
        │   ├── reset.scss
        │   └── typography.scss (шрифты).
      </pre>

      <p class="components-page-styles__text">
        Так же стили размещаются файле с разрешением vue внутри тега {{styleText}}
      </p>

      <p class="components-page-styles__text">За сборку и преобразование SCSS в CSS отвечает задача: `npm run build`</p>
    </div>
  </div>
</template>

<script>
  import DocumentationHeader from "../../../components/documentation-header"

  export default {
    name: 'documents-styles',
    components: { DocumentationHeader },
    data(){
      return{
        styleText: '<style></style>'
      }
    },
  }
</script>

<style lang="scss" scoped>
  .components-page-styles{
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
