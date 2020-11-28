<template>
  <a-layout-sider class="sidebar">
    <img src="/img/logo.png" alt="" />
    <sidebar-user />
    <sidebar-menu />
    <div class="sidebar__exit">Выход</div>
  </a-layout-sider>
</template>

<script>
export default {
  name: 'sidebar',
};
</script>

<style lang="scss">
.sidebar {
  background: #4051e7 !important;
  max-width: 480px !important;
  width: 100% !important;
  flex: 0 0 480px !important;
  border-bottom-right-radius: 68px;
  border-top-right-radius: 68px;
  padding: 41px 36px;
  top: 0px;
  left: 0px;
  min-height: 100vh;
  margin-right: 20px;
  &__exit {
    position: absolute;
    bottom: 42px;
    color: $white;
    font-family: Gilroy;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
  }
}
</style>
