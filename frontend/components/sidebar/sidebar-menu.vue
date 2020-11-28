<template>
  <ul class="sidebar-menu">
    <li v-for="item in items" :key="item.label" class="sidebar-menu__item">
      <nuxt-link :to="item.link">
        {{ item.label }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'sidebar-menu',

  data() {
    return {
      items: [
        { label: 'Главная', link: '/' },
        { label: 'Смарт-контракты', link: '/contracts' },
      ],
    };
  },
};
</script>

<style lang="scss">
.sidebar-menu {
  padding-left: 0;
  margin-top: 90px;
  li {
    list-style: none;
    padding-left: 0;
    margin-bottom: 60px;
    padding-left: 45px;
  }
  a {
    font-family: Circe;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    color: #fff;
  }
}
</style>
