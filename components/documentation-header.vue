<template>
  <div class="container__head">
    <h1>{{title}}</h1>
    <nuxt-link to="/documentation" class="container__head-breadcrumbs">
      <svg-icon name="arrow-big" />
      Вернуться к странице документации
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    name: 'documentation-header',
    props: ['title']
  }
</script>

<style lang="scss">

</style>
