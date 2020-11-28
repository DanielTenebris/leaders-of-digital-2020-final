<template>
  <a-layout>
    <sidebar />
    <a-layout>
      <a-layout-content class="content">
        <Nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="scss">
.content {
  padding-right: 20px;
  padding-top: 20px;
  overflow: auto;
  height: 100vh;
}
</style>
