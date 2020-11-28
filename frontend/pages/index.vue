<template>
  <a-row class="index-page">
    <a-col :span="8">
      <ui-cloud header="Мои задачи" class="index-page__short">
        <img src="/img/tasks.png" alt="" />
      </ui-cloud>
    </a-col>

    <a-col :span="16">
      <index-region />

      <a-row type="flex" justify="space-between">
        <a-col :span="12">
          <ui-cloud header="Порученные задачи" class="index-page__short">
            <img src="/img/create.png" alt="" />
          </ui-cloud>
        </a-col>
        <a-col :span="12">
          <ui-cloud header="Технологические процессы">
            <img src="/img/processes.png" alt="" /> </ui-cloud
        ></a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
export default {};
</script>

<style lang="scss">
.index-page {
  &__short {
    img {
      width: 100%;
    }
  }
}
</style>
