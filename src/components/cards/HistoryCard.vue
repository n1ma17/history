<template>
  <div class="card">
    <span class="card__title">{{ cardInfo.title }}</span>
    <div class="card__status">
      <span class="card__status__value"
        >{{ cardInfo.value }} {{ !cardInfo.status ? "-" : null }}</span
      >
      <q-icon
        name="nest_eco_leaf"
        size="sm"
        :color="cardInfo.status ? 'green' : 'red'"
        :class="{ dangerIcon: !cardInfo.status }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryCard",
  props: {
    cardInfo: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 0 40px 0 40px;
  box-shadow: 0px 0px 11px 3px #e9e9e9;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__status {
    display: flex;
    align-items: center;
    &__value {
      font-size: 16px;
      font-weight: 700;
    }
  }
  &__title {
    font-size: 16px;
    font-weight: 700;
    @media only screen and (max-width: 425px) {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 768px) {
    &__status {
      &__value {
        font-size: 12px;
      }
    }
    &__title {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 425px) {
    padding: 16px;
    border-radius: 0 30px 0 30px;
    &__status {
      &__value {
        font-size: 10px;
      }
    }
    &__title {
      font-size: 10px;
    }
  }
}
.dangerIcon {
  transform: rotate(180deg);
}
</style>
