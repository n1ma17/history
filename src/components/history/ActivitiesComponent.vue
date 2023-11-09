<template>
  <div class="activities">
    <div class="activities__total-point">
      <div class="activities__total-point__content">
        <span class="activities__total-point__content__text q-ml-sm">{{
          totalPoint
        }}</span>
        <q-icon name="nest_eco_leaf" size="sm" color="green" />
      </div>
    </div>
    <div class="activities__content">
      <div class="activities__content__branch"></div>
      <div class="activities__content__cards">
        <div
          class="activities__content__cards__single-card"
          v-for="item in cards"
          :key="item.name"
        >
          <span>{{ item.time }}</span>
          <div class="activities__content__cards__single-card__history">
            <HistoryCard :cardInfo="item" />
          </div>
        </div>
      </div>
    </div>
    <div class="activities__vase">
      <div class="activities__vase__image">
        <img src="src/assets/images/vase.svg" alt="vase" />
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
        time: "12:00",
      },
      {
        title: "Total Activities2",
        value: "5",
        status: false,
        time: "16:40",
      },
      {
        title: "Total Activities3",
        value: "122",
        status: true,
        time: "22:10",
      },

      {
        title: "Total Activities4",
        value: "132",
        status: true,
        time: "02:10",
      },

      {
        title: "Total Activities5",
        value: "132",
        status: true,
        time: "02:10",
      },

      {
        title: "Total Activities6",
        value: "132",
        status: true,
        time: "02:10",
      },
    ]);
    return {
      cards,
      totalPoint: 300,
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
  margin-top: 0px;
  padding-bottom: 44px;
  &__total-point {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 32px;
    &__content {
      background-color: #283c1d;
      border-radius: 8px;
      padding: 4px 16px;
      &__text {
        color: #fff;
        font-weight: 500;
        font-size: 16px;
      }
    }
    @media only screen and (max-width: 768px) {
      width: 95%;
      &__content {
        padding: 2px 12px;
        &__text {
          font-size: 12px;
        }
      }
    }
  }
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
      > img {
        width: 60px;
      }
    }
    @media only screen and (max-width: 768px) {
      width: 95%;
    }
  }
  &__content {
    width: 50%;
    height: fit-content;
    max-height: calc(100% - 60px);
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
      height: fit-content;
      max-height: 100%;
      display: flex;
      flex-direction: column-reverse;
      overflow-y: scroll;
      overflow-x: hidden;
      padding: 24px;
      &__single-card {
        width: 100%;
        height: 100%;
        margin: 16px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 12px;
        > span {
          font-size: 16px;
          font-weight: 500;
          @media only screen and (max-width: 768px) {
            font-size: 10px;
          }
        }
        &__history {
          width: 320px;
          height: 80px;
          @media only screen and (max-width: 425px) {
            width: 280px;
            height: 60px;
          }
        }
      }
    }
    @media only screen and (max-width: 768px) {
      width: 95%;
    }
  }
}
</style>
