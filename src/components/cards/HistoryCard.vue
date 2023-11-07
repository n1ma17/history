<template>
  <div class="card">
    <span class='card__title'>{{ cardInfo.title }}</span>
    <div class="card__status">
      <span class="card__status__value q-ml-sm">{{ cardInfo.value }} {{ !cardInfo.status ? '-' : null }}</span>
      <q-icon name='nest_eco_leaf' size="sm" :color="cardInfo.status ? 'green' : 'red'" :class="{'dangerIcon': !cardInfo.status}"  />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryCard',
  props: {
    cardInfo: {
      type: Object,
      required: true
    }
  },
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 120px;
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
      font-size: 20px;
      font-weight: 700;
      font-weight: 500;
    
    }
  }
  &__title {
      font-size: 20px;
      font-weight: 700;
      font-weight: 500;
    }
}
.dangerIcon {
  transform: rotate(180deg);
}
</style>