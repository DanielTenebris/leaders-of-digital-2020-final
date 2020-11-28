<template>
  <div class="sidebar-user">
    <img class="sidebar-user__image" src="/img/avatar.png" alt="" />
    <div class="sidebar-user__user">
      <div class="sidebar-user__name">Шарипов Геннадий Петрович</div>
      <div class="sidebar-user__position">Главный сварщик</div>
    </div>
    <div class="sidebar-user__alarm">
      <ui-alarm />
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar-user',
};
</script>

<style lang="scss">
.sidebar-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
  &__image {
    flex-shrink: 0;
    width: 81px;
    height: 81px;
  }
  &__alarm {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    background-color: rgba(246, 246, 246, 0.1);
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color ease 0.3s;
    &:hover {
      cursor: pointer;
      background-color: rgba(246, 246, 246, 0.2);
    }
  }
  &__user {
    margin-left: 10px;
    padding-left: 14px;
    flex-direction: column;
    display: flex;
    justify-content: center;
  }
  &__name {
    font-family: Circe;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    color: #fff;
  }
  &__position {
    font-family: Gilroy;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    color: rgba(248, 249, 253, 0.5);
    margin-top: 5px;
  }
}
</style>
