<template>
  <div class="single-product">
    <div class="single-product__header">
      <div class="single-product__header__image">
        <ProductCard :product="product.info" isDetail />
      </div>
      <div class="single-product__header__action">
        <q-btn color="green" outline>
          انتخاب طرح
          <q-icon name="local_florist" />
        </q-btn>
        <div class="single-product__header__action__leaf">
          <span>برگ مورد نیاز:</span>
          <span class="single-product__header__leaf__cost">
            {{ product?.info?.cost }}
          </span>
          <q-icon name="energy_savings_leaf" size="sm" color="green" />
        </div>
      </div>
    </div>
    <div class="single-product__description">
      <span class="single-product__description__title">{{
        product.info.title
      }}</span>
      <div class="single-product__description__rules">
        <span class="single-product__description__rules__title">
          قوانین استفاده
        </span>
        <ul>
          <li v-for="(rule, i) in product.rules" :key="i">{{ rule }}</li>
        </ul>
      </div>
      <div class="single-product__description__guides">
        <span class="single-product__description__guides__title">
          قوانین استفاده
        </span>
        <ul>
          <li v-for="(guide, i) in product.guides" :key="i">{{ guide }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import ProductCard from "src/components/cards/ProductCard.vue";
export default {
  name: "SingleProduct",
  components: {
    ProductCard,
  },
  setup() {
    const product = ref({
      info: {
        id: 0,
        title: "تخفیف ۳۰٪ کتاب (صوتی و متنی)",
        percent: "10",
        date: "25/08/1402",
        cost: 125,
      },
      rules: [
        "این تخفیف روی قیمت اصلی کتاب انتخابی شما اعمال می‌شود‌؛ بنابراین اگر تخفیف دیگری از سمت طاقچه روی کتابی اعمال شده باشد، استفاده از کد تخفیف رویش آن را غیرفعال می‌کند.",
        "برای خرید مجله‌ها و روزنامه‌ها هم می توان از این تخفیف استفاده کرد.",
        "مهلت استفاده از تخفیف ۳۰ روز پس از دریافت آن است.",
        "این تخفیف روی کتاب‌های تعدادی از ناشران قابل استفاده نیست. اسم این نشرها در راهنمای رویش آمده است.",
      ],
      guides: [
        "تعداد برگ‌های لازم برای دریافت تخفیف را جمع‌آوری کن. سپس دکمه دریافت جایزه را بزن.",
        "پس از کلیک کردن روی «دریافت جایزه» کد تخفیف فعال می‌شود. دکمه «کپی کن» را فشار بده تا کد را کپی کنی.",
        "بعد از کپی کردن کد به قسمت«بی‌نهایت» برو. دکمهٔ «خرید اشتراک» یا «تمدید اشتراک» را انتخاب کن.",
        "در قسمت «کد تخفیف یا هدیه دارم» کد تخفیفی که کپی کرده‌ای وارد کن و دکمه ثبت را بزن.",
      ],
    });
    return {
      product,
    };
  },
};
</script>

<style lang="scss" scoped>
.single-product {
  width: 100%;
  height: 700px;
  padding: 50px;
  display: flex;
  align-items: flex-start;
  gap: 24px;

  &__header {
    width: 50%;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    &__action {
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > button {
        width: fit-content;
        min-width: 120px;
        padding: 8px 0;
      }
      &__leaf {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 10px;
        color: #868686;
        gap: 12px;
        &__cost {
          font-size: 24px;
          color: #000;
        }
      }
    }
    &__image {
      width: 90%;
      height: 200px;
      pointer-events: none;
    }
    &__action {
      &__leaf {
        width: 90%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 10px;
        color: #868686;
        gap: 12px;
        &__cost {
          font-size: 24px;
          color: #000;
        }
      }
    }
  }
  &__description {
    width: 50%;
    height: fit-content;
    &__title {
      font-size: 24px;
      color: #000;
    }
    &__rules,
    &__guides {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      &__title {
        font-size: 16px;
        margin-top: 32px;
      }
      > ul {
        li {
          margin: 12px 0;
          color: #868686;
        }
      }
    }
  }
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    &__header {
      width: 100%;
      padding: 0;

      &__image {
        width: 100%;
      }
      &__leaf {
        width: 100%;
      }
    }
    &__description {
      width: 100%;
    }
  }
  @media only screen and (max-width: 1024px) {
    padding: 50px 20px;
  }
}
</style>
