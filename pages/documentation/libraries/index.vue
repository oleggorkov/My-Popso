<template>
  <div class="container">
    <DocumentationHeader title="Используемые библиотеки"/>
    <div class="documentation">
      <ul class="documentation__list">
        <li v-for="(item, index) in libraries" :key="index">
          <a :href="item.href">
            {{item.title}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import DocumentationHeader from "../../../components/documentation-header"

  export default {
    name: 'documents-general-structure',
    components: { DocumentationHeader },
    data(){
      return{
        libraries: [
          {title: 'axios', href: 'https://ru.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html'},
          {title: 'proxy', href: 'https://www.npmjs.com/package/@nuxtjs/proxy'},
          {title: 'svg-sprite', href: 'https://www.npmjs.com/package/@nuxtjs/svg-sprite'},
          {title: 'yandex-metrika', href: 'https://www.npmjs.com/package/@nuxtjs/yandex-metrika'},
          {title: 'fontfaceobserver', href: 'https://www.npmjs.com/package/fontfaceobserver'},
          {title: 'jsbarcode', href: 'https://www.npmjs.com/package/jsbarcode'},
          {title: 'jspdf-yworks', href: 'https://www.npmjs.com/package/jspdf-yworks'},
          {title: 'leaflet', href: 'https://www.npmjs.com/package/leaflet'},
          {title: 'nuxt', href: 'https://ru.nuxtjs.org/guide'},
          {title: 'sass', href: 'https://www.npmjs.com/package/sass'},
          {title: 'svg2pdf', href: 'https://www.npmjs.com/package/svg2pdf'},
          {title: 'vue-chartjs', href: 'https://www.npmjs.com/package/vue-chartjs'},
          {title: 'vue-custom-scrollbar', href: 'https://binaryify.github.io/vue-custom-scrollbar/en/#why-custom-scrollbar'},
          {title: 'vue-dadata', href: 'https://www.npmjs.com/package/vue-dadata'},
          {title: 'vue-scrollto', href: 'https://www.npmjs.com/package/vue-scrollto'},
          {title: 'vue-the-mask', href: 'https://www.npmjs.com/package/vue-the-mask'},
          {title: 'vue2-datepicker', href: 'https://www.npmjs.com/package/vue2-datepicker'},
          {title: 'vue2-leaflet', href: 'https://www.npmjs.com/package/vue2-leaflet'},
          {title: 'vuebar', href: 'https://www.npmjs.com/package/vuebar'},
          {title: 'vuelidate', href: 'https://www.npmjs.com/package/vuelidate'},
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>
  .documentation{
    width: 100%;
    height: auto;

    margin-top: 3.2rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &__list{
      width: auto;
      height: auto;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;


      li{
        width: auto;
        height: auto;

        &:not(:first-of-type){
          margin-top: 1.6rem;
        }

        a{
          text-decoration: none;
          color: $color-main--black;
          font-size: 1.6rem;
          font-weight: normal;

          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
    &__sub-list{


      li{
        &:not(:first-of-type){
          margin-top: 1.6rem;
        }

        a{
          font-size: 1.4rem;
        }
      }
    }
  }
</style>
