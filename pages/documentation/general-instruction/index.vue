<template>
  <div class="container">
    <DocumentationHeader title="Основные команды"/>
    <div class="components-page components-page-images">
      <p class="components-page-images__text">
        npm run dev — основная команда, запускает nuxt в режиме разработки.
      </p>
      <p class="components-page-images__text">
        npm run build — команда для запуска режима сборки проекта. Собранный версия сайта помещается в папку dist
      </p>
    </div>
  </div>
</template>

<script>
  import DocumentationHeader from "../../../components/documentation-header"

  export default {
    name: 'documents-general-structure',
    components: { DocumentationHeader },
  }
</script>

<style lang="scss" scoped>
  .components-page-images{
    &__text{
      margin-top: 0.8rem;
      @include font-size();
    }
  }
</style>
