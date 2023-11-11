<template>
  <q-card v-if="loading" flat class="spinner-loading">
    <q-spinner-gears color="teal" size="5em" />
    <span>در حال دریافت اطلاعات...</span>
  </q-card>
  <div v-else class="single-product">
    <div class="single-product__header">
      <div class="single-product__header__image">
        <ProductCard :product="product?.info" isDetail />
      </div>
      <div class="single-product__header__action">
        <q-btn
          v-if="!product?.info?.used"
          color="green"
          outline
          @click="openDialog"
        >
          {{ buttonLabel }}
          <q-icon name="local_florist" />
        </q-btn>
        <div class="single-product__header__action__leaf">
          <span>برگ مورد نیاز:</span>
          <span class="single-product__header__action__leaf__cost">
            {{ product?.info?.cost }}
          </span>
          <q-icon name="energy_savings_leaf" size="sm" color="green" />
        </div>
      </div>
    </div>
    <div class="single-product__description">
      <span class="single-product__description__title">{{
        product?.info?.title
      }}</span>
      <div class="single-product__description__rules">
        <span class="single-product__description__rules__title">
          قوانین استفاده
        </span>
        <ul>
          <li v-for="(rule, i) in product?.rules" :key="i">{{ rule }}</li>
        </ul>
      </div>
      <div class="single-product__description__guides">
        <span class="single-product__description__guides__title">
          قوانین استفاده
        </span>
        <ul>
          <li v-for="(guide, i) in product?.guides" :key="i">{{ guide }}</li>
        </ul>
      </div>
    </div>
    <q-dialog
      v-model="showModal"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card v-if="modalLoading" flat class="spinner-loading">
        <q-spinner-gears color="teal" size="5em" />
        <span>در حال دریافت کد...</span>
      </q-card>
      <q-card v-else class="bg-teal text-white" style="width: 520px">
        <q-card-section class="bg-teal text-white">
          <div class="text-h6">دریافت کد</div>
        </q-card-section>
        <q-card-section class="bg-white text-teal">
          <div class="code">
            <div class="code__value">{{ codeText }}</div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            outline
            label="متوجه شدم"
            color="warning"
            v-close-popup
            @click="routeToHome"
          />
          <q-btn
            v-if="!disable"
            flat
            label="کپی"
            v-close-popup
            @click="copyToClipboard"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import ProductCard from "src/components/cards/ProductCard.vue";
import { api } from "boot/axios";
export default {
  name: "SingleProduct",
  components: {
    ProductCard,
  },
  setup() {
    const $q = useQuasar();
    const showModal = ref(false);
    const disable = ref(false);
    const loading = ref(true);
    const modalLoading = ref(false);
    const router = useRouter();
    const profile = ref({});
    const codeText = ref("code");
    const product = ref({});
    const buttonLabel = computed(() => {
      return profile?.value?.wallet >= product.value?.info?.cost
        ? "  انتخاب طرح"
        : "برای دریافت جایزه بیشتر برگ جمع کن";
    });
    const routeToHome = () => {
      router.push("/");
    };
    const getProduct = async () => {
      loading.value = true;
      await api
        .get(`/getSingleProduct`)
        .then((res) => {
          product.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const openDialog = async () => {
      showModal.value = true;
      modalLoading.value = true;
      await api
        .get(`/getDiscountCode`)
        .then((res) => {
          codeText.value = res.data.data.code;
        })
        .catch((err) => {
          console.log(err);
          disable.value = true;
          codeText.value = "دریافت کد با خطا مواجه شد";
        })
        .finally(() => {
          modalLoading.value = false;
        });
    };
    const copyToClipboard = () => {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(codeText.value);
        return;
      }
      navigator.clipboard.writeText(codeText.value).then(
        function () {
          $q.notify({
            type: "positive",
            position: "top-left",
            message: `کد تخفیف ${codeText.value} کپی شد`,
          });
        },
        function (err) {
          $q.notify({
            type: "negative",
            message: "عملیات با خطا مواجه شد",
          });
        }
      );
    };
    onMounted(() => {
      localStorage.getItem("profile") &&
        (profile.value = JSON.parse(localStorage.getItem("profile")));
      getProduct();
    });
    return {
      product,
      showModal,
      openDialog,
      modalLoading,
      routeToHome,
      codeText,
      copyToClipboard,
      profile,
      buttonLabel,
      loading,
      disable,
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
  gap: 16px;
  > span {
    font-size: 16px;
    color: #868686;
  }
}
.code {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  &__value {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 80px;
    border: 2px dashed #868686;
    font-size: 24px;
  }
}
.single-product {
  width: 100%;
  height: 700px;
  padding: 50px;
  display: flex;
  align-items: flex-start;
  gap: 24px;

  &__header {
    width: 50%;
    max-width: 600px;
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
    align-items: center;
    &__header {
      width: 100%;
      padding: 0;
      align-items: center;
      &__action {
        width: 100%;
      }
      &__image {
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
