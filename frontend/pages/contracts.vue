<template>
  <div class="contracts">
    <a-row type="flex" justify="space-between">
      <a-col :span="8">
        <ui-cloud header="Мои смарт-контракты">
          <div
            v-for="contract in contracts"
            :key="contract.id"
            :class="['contracts__preview', { active: contract.id === active }]"
            @click="choose(contract)"
          >
            <svg-icon class="doc" name="doc" />

            <span>{{ contract.label }}</span>

            <svg-icon class="trash" name="trash" />
          </div>
          <ui-button type="primary"> Добавить новый </ui-button>
        </ui-cloud>
      </a-col>
      <a-col :span="15">
        <ui-cloud><contract-builder /></ui-cloud>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'contracts',
  data() {
    return {
      active: 1,
      contracts: [
        {
          label: 'Контракт',
          id: 1,
        },
        {
          label: 'Контракт',
          id: 2,
        },
        {
          label: 'Контракт',
          id: 31,
        },
        {
          label: 'Контракт',
          id: 32,
        },
        {
          label: 'Контракт',
          id: 41,
        },
        {
          label: 'Контракт',
          id: 5,
        },
      ],
    };
  },

  methods: {
    choose(active) {
      this.active = active.id;
    },
  },
};
</script>

<style lang="scss">
.contracts {
  &__preview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 34px;
    margin-bottom: 30px;
    border: solid 1px #ededed;
    border-radius: 8px;
    cursor: pointer;
    span {
      font-family: Circe;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 26px;
      letter-spacing: 0em;
      text-align: left;
      display: block;
      width: 100%;
      margin-left: 20px;
      padding-left: 10px;
    }
    > svg {
      &.doc {
        width: 26px;
        height: 34px;
        flex-shrink: 0;
      }
      &.trash {
        opacity: 0.5;
        width: 30px;
        height: 30px;
      }
    }
    img {
      height: 30px;
      width: 57px;
      flex-shrink: 0;
    }
    &.active {
      background-color: rgba(76, 94, 248, 0.05);
    }
  }
}
</style>
