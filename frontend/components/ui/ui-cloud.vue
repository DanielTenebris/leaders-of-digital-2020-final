<template>
  <div class="ui-cloud" v-on="$listeners">
    <div v-if="header" class="ui-cloud__header">
      <h3>
        {{ header }}
      </h3>
      <img src="/img/more.png" alt="" />
    </div>

    <div class="ui-cloud__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ui-cloud',

  props: {
    header: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
.ui-cloud {
  background: #fff;
  padding: 50px;
  border-radius: 21px;
  &__header {
    display: flex;
    justify-content: space-between;
    img {
      height: 30px;
      width: 57px;
      flex-shrink: 0;
    }
  }
  h3 {
    font-family: Circe;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 33px;
    letter-spacing: 0em;
    text-align: left;
  }
  &__content {
    overflow: auto;
    padding-bottom: 10px;
  }
  margin-bottom: 20px;
  margin-left: 20px;
}
</style>
