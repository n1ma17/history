<template>
  <div class="activities">
    <div class="activities__content">
      <div class="activities__content__branch">
        <!-- <img src="src/assets/images/vase.svg" alt="vase"> -->
      </div>
      <div class="activities__content__cards">
        <div class="activities__content__cards__single-card" v-for="item in cards" :key="item.name">
          <span>{{ item.time }}</span>
          <HistoryCard :cardInfo="item" />
        </div>
      </div>
    </div>
    <div class="activities__vase">
      <div class="activities__vase__image">
        <img src="src/assets/images/vase.svg" alt="vase">
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import HistoryCard from "src/components/cards/HistoryCard.vue";
export default {
  name: "ActivitiesComponent",
  components: {
    HistoryCard,
  },
  setup() {
    const cards = ref([
      {
        title: "Total Activities1",
        value: "240",
        status: true,
        time: '12:00'
      },
      {
        title: "Total Activities2",
        value: "5",
        status: false,
        time: '16:40'
      },
      {
        title: "Total Activities3",
        value: "122",
        status: true,
        time: '22:10'
      },
      
      {
        title: "Total Activities4",
        value: "132",
        status: true,
        time: '02:10'
      },
      
      {
        title: "Total Activities5",
        value: "132",
        status: true,
        time: '02:10'
      },
      
      {
        title: "Total Activities6",
        value: "132",
        status: true,
        time: '02:10'
      },
    ])
    return {
      cards
    };
  },
};
</script>

<style lang="scss" scoped>
.activities {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__vase {
    width: 50%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &__image {
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      margin-top: -20px;
    }
  }
  &__content {
    width: 50%;
    height: calc(100% - 60px);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 12px 0;
    &__branch {
      width: 10%;
      height: 100%;
      background-image: url("src/assets/images/branch.svg");
      background-position: bottom;
      background-repeat: repeat-y;
      
    }
    &__cards {
      width: 90%;
      height: 100%;
      display: flex;
      flex-direction: column-reverse;
      gap: 24px;
      overflow-y: scroll;
      overflow-x: hidden;
      padding: 24px;
      &__single-card {
        width: 100%;
        height: 90px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }
    }
  }
}
</style>
