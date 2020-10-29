<template>
  <div class="container">
    <DocumentationHeader title="Структура папок и файлов"/>
    <div class="components-page components-page-files">
      <pre class="components-page-files__code">
        ├── .nuxt (системыне файлы nuxt.js)
        ├── assets (системыне файлы nuxt.js)
        │   ├── fonts (папка со шрифтами)
        │   └── images
        │       ├── icons
        │       ├── icons-gen
        │       └── lk
        │   └── styles
        |       ├── modules (стили для модулей проекта)
        │       └── vars
        |           ├── colors.scss (общие стили цветов для сайта)
        │           ├── layout.scss
        │           ├── media.scss  (breakpoints для разных разрешений экрана)
        │           └── skeleton.scss (стили skeleton screen pre-loading.
        │       ├── control-elements.scss  (стили стандартных элементов форм / кнопок и пр.).
        │       ├── global.scss
        │       ├── grid.scss
        │       ├── main.scss  (файл с import стилей).
        │       ├── mixins.scss
        │       ├── reset.scss
        │       └── typography.scss  (шрифты).
        ├── components
        ├── dist (папка с собранной версией проекта)
        ├── layout
        │   ├── default.vue (стандартный шаблок для страницы сайта)
        │   ├── error.vue (404-страница)
        │   ├── error-layout.vue
        │   └── login-layout.vue
        ├── middleware
        ├── node_modules
        ├── pages (Адрес страницы автоматический генерируется на основе структуры файлов и папкой )
        ├── scripts
        │   ├── directives
        │   ├── helpers
        │   └── mixins
        ├── static
        ├── store
        └── .editorconfig
        └── .gitignore
        └── nuxt.config.js (стандартные настройки nuxt.js
        └── package.json
        └── package-lock.json
        └── README.md
      </pre>
    </div>
  </div>
</template>

<script>
  import DocumentationHeader from "../../../components/documentation-header"

  export default {
    name: 'documents-file-structure',
    components: { DocumentationHeader },
    data(){
      return{
      }
    },
  }
</script>

<style lang="scss" scoped>
  .components-page-files{
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
