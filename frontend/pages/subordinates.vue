<template>
  <div class="subordinates">
    <a-row>
      <a-col :span="10">
        <ui-cloud>
          <img src="/img/subordinates.png" alt="" @click="tasks = true" />
        </ui-cloud>
      </a-col>
      <transition name="fadeScaleY">
        <a-col v-show="tasks" :span="8">
          <ui-cloud header="Выданные задания:">
            <img src="/img/tasks-sub.png" alt="" />
          </ui-cloud>
        </a-col>
      </transition>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'subordinates',
  data() {
    return {
      tasks: false,
    };
  },
};
</script>

<style lang="scss">
.subordinates {
  .ui-cloud__content img {
    width: 100%;
    margin-bottom: 20px;
    cursor: pointer;
  }
}
</style>
