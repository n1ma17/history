<template>
  <div class="products">
    <div class="products__banner">
      <div class="products__banner__content">
        <span class="products__banner__content__title">
          تعداد برگ های من:
        </span>
        <span class="products__banner__content__user-leaf">
          {{ profile.wallet }}
        </span>
        <q-icon name="spa" size="sm" color="#188585" />
      </div>
    </div>
    <div class="products__cards" ref="scrollComponent">
      <div class="products__cards__card" v-for="(card, i) in products" :key="i">
        <ProductCard :product="card" @selectTicket="routToSingleProduct" />
      </div>
    </div>
    <q-spinner-gears v-if="loading" color="teal" size="4em" />
    <q-btn
      v-if="nextPage && !loading"
      flat
      size="md"
      color="black"
      label="بارگذاری بیشتر"
      @click="getData()"
    />
  </div>
</template>

<script>
import ProductCard from "src/components/cards/ProductCard.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "boot/axios";
export default {
  name: "ProductsPage",
  components: {
    ProductCard,
  },
  setup() {
    const userLeaf = ref(180);
    const route = useRoute();
    const router = useRouter();
    const products = ref([]);
    const nextPage = ref(1);
    const profile = ref({});
    const currentPage = ref(1);
    let loading = ref(false);
    const scrollComponent = ref(null);
    const debounce = (func, delay) => {
      let timeoutId;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(context, args);
        }, delay);
      };
    };
    const getData = async () => {
      loading.value = true;
      if (nextPage.value) {
        await api
          .get(`/getProducts?page=${nextPage.value}&pageSize=10`)
          .then((res) => {
            products.value = [...products.value, ...res.data.data];
            nextPage.value = res.data.nextPage;
            currentPage.value = res.data.currentPage;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            loading.value = false;
          });
      }
    };
    const handleScroll = debounce(async () => {
      let element = scrollComponent.value;
      if (
        element.getBoundingClientRect().bottom < window.innerHeight &&
        nextPage.value
      ) {
        await getData();
      }
    }, 300);
    onMounted(() => {
      localStorage.getItem("profile") &&
        (profile.value = JSON.parse(localStorage.getItem("profile")));
      getData();
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    const routToSingleProduct = (e) => {
      router.push(`/products/${e.id}`);
    };
    return {
      products,
      profile,
      nextPage,
      currentPage,
      userLeaf,
      scrollComponent,
      loading,
      routToSingleProduct,
      getData,
    };
  },
};
</script>

<style lang="scss" scoped>
.products {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 32px 50px;
  gap: 32px;
  @media only screen and (max-width: 1024px) {
    padding: 32px 20px;
  }
  &__banner {
    width: 100%;
    height: 300px;
    background-image: url("src/assets/images/hills.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 16px;
    padding: 0 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 32px;
    &__content {
      color: #188585;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border-radius: 8px;
      padding: 8px 16px;
      gap: 8px;
      &__title {
        font-size: 16px;
        font-weight: 500;
        color: #ccc;
      }
      &__user-leaf {
        font-weight: 900;
        font-size: 28px;
      }
    }
  }
  &__cards {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 24px;
    padding: 24px 0;
    overflow-y: scroll;
    &__card {
      width: 30%;
      height: fit-content;
      cursor: pointer;
      @media only screen and (max-width: 1024px) {
        width: 100%;
      }
    }
  }
}
</style>
