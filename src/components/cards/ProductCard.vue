<template>
  <div class="product-card" :class="product.date ? 'red-bac' : 'green-bac'">
    <div v-if="product.used" class="product-card__cover"></div>
    <div v-if="product.date" class="product-card__timer">
      <span>{{ product.used ? "استفاده شده" : "مهلت دریافت" }}</span>
      <span>{{ product.used ? persianDate(product.date) : timeTracker }}</span>
    </div>
    <div class="product-card__content">
      <div class="product-card__content__info">
        <div class="product-card__content__info__percent">
          <span class="product-card__content__info__percent__num">
            {{ product.percent }}%
          </span>
          <span class="product-card__content__info__percent__text">تخفیف</span>
        </div>
        <div v-if="product.date" class="product-card__content__info__text">
          <span>برای خرید</span>
          <span> کتاب های</span>
          <span> متنی و صوتی</span>
        </div>
        <div v-else class="product-card__content__info__infinit">
          <q-icon name="all_inclusive" size="xl" color="#188585" />
        </div>
      </div>
    </div>
    <div v-if="!isDetail" class="product-card__action">
      <div class="product-card__action__circule-left"></div>
      <div class="product-card__action__circule-right"></div>
      <div class="product-card__action__dots">
        <div
          class="product-card__action__dots__dot"
          v-for="(_, index) in 20"
          :key="index"
        ></div>
      </div>

      <div>
        {{ product.cost }}
        <q-icon name="nest_eco_leaf" size="sm" color="green" />
      </div>
      <q-btn flat dense style="color: #188585" @click="handleSelect">
        {{ product.used ? "مشاهده" : "مشاهده و دریافت" }}
        <q-icon name="chevron_left" size="sm" color="#188585" />
      </q-btn>
    </div>
  </div>
</template>

<script>
import { computed, ref, defineEmits } from "vue";
import jalaliMoment from "jalali-moment";
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["selectTicket"],
  setup(props, { emit }) {
    const todayJalali = ref(jalaliMoment().locale("fa"));
    const persianDate = (date) =>
      jalaliMoment(date, "jDD/jMM/jYYYY")
        .locale("fa")
        .format("jDD jMMMM jYYYY");
    const timeTracker = computed(() => {
      const sec = props.product.date
        ? +jalaliMoment(props.product.date, "jDD/jMM/jYYYY").format("X")
        : null;
      if (sec > todayJalali.value.format("X")) {
        const diff = sec - todayJalali.value.format("X");
        const hour = (diff / 3600) % 24;
        const day = (diff / 3600) / 24;
        return `${Math.trunc(day)} روز و ${Math.trunc(hour)} ساعت دیگر`;
      }
      return "";
    });
    const handleSelect = () => {
      emit("selectTicket", { id: props.product.id });
    };
    return {
      handleSelect,
      timeTracker,
      todayJalali,
      persianDate,
    };
  },
};
</script>

<style lang="scss" scoped>
.green-bac {
  background-color: #188585;
}
.red-bac {
  background-color: #b71b16;
}
.used-design {
  opacity: 0.7;
}
.product-card {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  box-shadow: 0px 5px 10px 0px #bdbdbd4d;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  color: #fff;
  overflow-x: hidden;
  &__cover {
    width: 100%;
    height: 100%;
    background-color: #484848;
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0.8;
  }
  &__action {
    width: 100%;
    height: 60px;
    margin-top: 16px;
    background-color: #fff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #484848;
    padding: 0 20px;

    &__dots {
      width: 100%;
      height: 12px;
      display: flex;
      justify-content: space-between;
      position: absolute;
      flex-wrap: nowrap;
      overflow: hidden;
      top: -4px;
      right: 0;
      padding: 0 20px;

      &__dot {
        width: 8px;
        height: 8px;

        border-radius: 50%;
        background-color: #fff;
      }
      @media only screen and (max-width: 378px) {
        &__dots {
          &__dot {
            width: 2px;
            height: 2px;
          }
        }
      }
    }
    &__circule-right,
    &__circule-left {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f7f7f5;
      position: absolute;
      top: -20px;
      box-shadow: inset -1px 0px 10px 0px #b4b4b4d6;
    }
    &__circule-right {
      right: -20px;
    }
    &__circule-left {
      left: -20px;
    }
  }

  &__timer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 24px;
    background-color: #484848;
    color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    padding: 0 16px;
    font-size: 12px;
    font-weight: 400;
  }
  &__content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__info {
      width: 50%;
      height: calc(100%);
      padding-top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      &__percent {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        font-size: 48px;
        font-weight: 900;
        white-space: break-spaces;
        text-align: center;
        &__num {
          width: 100%;
        }
        &__text {
          width: 100%;
          font-size: 24px;
          font-weight: 400;
          margin-top: -24px;
        }
      }
      &__text {
        border-left: 3px solid #fff;
        width: 50%;
        font-size: 12px;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 12px;
      }
      &__infinit {
        border-left: 3px solid #fff;
        font-size: 36px;
      }
      @media only screen and (max-width: 425px) {
        &__percent {
          width: 40%;
          font-size: 32px;
          &__text {
            font-size: 16px;
            margin-top: -12px;
          }
        }
        &__text {
          width: 60%;
          font-size: 10px;
          padding-left: 8px;
        }
      }
    }
  }
  &:hover {
    transform: translateY(-12px);
    transition: all 0.4s ease-in-out;
  }
}
</style>
