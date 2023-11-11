<template>
  <q-card v-if="loading" flat class="spinner-loading">
    <q-spinner-gears color="teal" size="5em" />
    <span>در حال دریافت اطلاعات...</span>
  </q-card>
  <div v-else class="activities">
    <div class="activities__total-point">
      <div class="activities__total-point__content">
        <span class="activities__total-point__content__text q-ml-sm">{{
          profile.wallet
        }}</span>
        <q-icon name="nest_eco_leaf" size="sm" color="green" />
      </div>
    </div>

    <div class="activities__content">
      <div class="activities__content__branch"></div>
      <div v-if="histories?.length" class="activities__content__cards">
        <div
          class="activities__content__cards__single-card"
          v-for="item in histories"
          :key="item.name"
        >
          <span>{{ item.time }}</span>
          <div class="activities__content__cards__single-card__history">
            <HistoryCard :cardInfo="item" />
          </div>
        </div>
      </div>
      <div v-else class="activities__content__cards">
        <span class="activities__content__cards__nodata-card"
          >فعالیتی یافت نشد</span
        >
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
import { ref, onMounted } from "vue";
import HistoryCard from "src/components/cards/HistoryCard.vue";
import { api } from "boot/axios";
export default {
  name: "ActivitiesComponent",
  components: {
    HistoryCard,
  },
  setup() {
    const histories = ref([]);
    const loading = ref(false);
    const profile = ref({});
    const getHistories = () => {
      loading.value = true;
      api
        .get("/getHistories")
        .then((res) => {
          console.log(res.data);
          histories.value = res.data.data;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    onMounted(() => {
      getHistories();
      localStorage.getItem("profile") &&
        (profile.value = JSON.parse(localStorage.getItem("profile")));
    });
    return {
      histories,
      totalPoint: 300,
      loading,
      profile,
    };
  },
};
</script>

<style lang="scss" scoped>
.spinner-loading {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:16px;
  > span {
    font-size: 16px;
    color: #868686;
  }
}
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
      &__nodata-card {
        background-color: #fff;
        border-radius: 0 40px 0 40px;
        box-shadow: 0px 0px 11px 3px #e9e9e9;
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
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
            font-size: 8px;
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
        @media only screen and (max-width: 425px) {
          gap: 4px;
        }
      }
    }
    @media only screen and (max-width: 768px) {
      width: 95%;
    }
  }
}
</style>
