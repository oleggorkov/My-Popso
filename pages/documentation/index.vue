<template>
	<div class="container">
    <div class="container__head">
      <h1>Документация к проекту popso</h1>
      <!--
      <nuxt-link to="/documentation" class="container__head-breadcrumbs">
        <svg-icon name="arrow-big" />
        назад
      </nuxt-link>
      -->
    </div>
    <div class="documentation">
      <ul class="documentation__list">
        <li>
          <nuxt-link to="/documentation/control-elements">
            Описание структуры проекта
          </nuxt-link>
          <ul class="documentation__sub-list">
            <li v-for="(item, index) in structure" :key="index">
              <nuxt-link :to="item.href">
                {{item.title}}
              </nuxt-link>
            </li>
          </ul>
        </li>
        <li>
          <nuxt-link to="/documentation/libraries">
            Список используемых библиотек
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/documentation/components-guide">
            Руководство по компонентам проекта
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/documentation/control-elements">
            Компоненты проекта
          </nuxt-link>
          <ul class="documentation__sub-list">
            <li v-for="(item, index) in components" :key="index">
              <nuxt-link :to=item.href>
                {{item.title}}
              </nuxt-link>
            </li>
          </ul>
        </li>
        <li>
          <nuxt-link to="/documentation/control-elements">
            Документация по работе с API popso
          </nuxt-link>
          <ul class="documentation__sub-list">
            <li v-for="(item, index) in documentation" :key="index">
              <nuxt-link :to="item.href">
                {{item.title}}
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index-new",
    data(){
      return{
        structure: [
          {title: 'Основные команды', href: '/documentation/general-instruction'},
          {title: 'Структура папок и файлов', href: '/documentation/file-structure'},
          {title: 'Стили', href: '/documentation/styles'},
          {title: 'Изображения', href: '/documentation/images'},
        ],
        components: [
          {title: 'input-text', href: '/documentation/control-elements#input-text'},
          {title: 'input-suggestion', href: '/documentation/control-elements#input-suggestion'},
          {title: 'input-checkbox', href: '/documentation/control-elements#input-checkbox'},
          {title: 'radiobutton', href: '/documentation/control-elements#radiobutton'},
          {title: 'input-select', href: '/documentation/control-elements#input-select'},
          {title: 'button', href: '/documentation/control-elements#button'},
          {title: 'link', href: '/documentation/control-elements#link'},
        ],
        documentation: [
          {title: 'Описания и правила создания структуры данных для запроса к API', href: '/documentation/control-elements'},
          {title: 'Примеры создания запроса на сервер', href: '/documentation/control-elements'},
          {title: 'Примеры обработки ошибок и вызовов их на стороне фронте', href: '/documentation/control-elements'},
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .documentation{
    width: 100%;
    height: auto;

    margin-top: 4.8rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &__list, &__sub-list{
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
          margin-top: 3.2rem;
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
      margin-top: 1.6rem;
      margin-left: 2.4rem;

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
