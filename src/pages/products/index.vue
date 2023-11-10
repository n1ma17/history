<template>
  <div class="products">
    <div class="products__banner">
      <div class="products__banner__content">
        <span class="products__banner__content__title">
          تعداد برگ های من:
        </span>
        <span class="products__banner__content__user-leaf">
          {{ userLeaf }}
        </span>
        <q-icon name="spa" size="sm" color="#188585" />
      </div>
    </div>
    <div class="products__cards" ref="scrollComponent">
      <div class="products__cards__card" v-for="(card, i) in products" :key="i">
        <ProductCard :product="card" @selectTicket="routToSingleProduct" />
      </div>
    </div>
    <q-spinner-gears v-if="loading" color="teal" size="3em" />
  </div>
</template>

<script>
import ProductCard from "src/components/cards/ProductCard.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "ProductsPage",
  components: {
    ProductCard,
  },
  setup() {
    const userLeaf = ref(180);
    const route = useRoute();
    const router = useRouter();
    const products = ref([
      {
        id: Math.random() * 1024,
        percent: "10",
        date: "25/08/1402",
        cost: 125,
        used: false,
      },
      {
        id: Math.random() * 1024,
        percent: "10",
        date: null,
        cost: 125,
        used: false,
      },
      {
        id: Math.random() * 1024,
        percent: "10",
        date: "25/08/1402",
        cost: 125,
        used: true,
      },
      {
        id: Math.random() * 1024,
        percent: "10",
        date: "25/08/1402",
        cost: 125,
        used: false,
      },
    ]);
    let loading = ref(false);
    const scrollComponent = ref(null);
    const getData = () => {
      products.value.push({
        id: Math.random() * 1024,
        percent: "10",
        date: "25/08/1402",
        cost: 125 * Math.random(),
        used: false,
      });
    };
    const loadMorePosts = async () => {
      loading.value = true;
      await getData();
      loading.value = false;
    };
    const handleScroll = (e) => {
      let element = scrollComponent.value;
      if (element.getBoundingClientRect().bottom < window.innerHeight) {
        loadMorePosts();
      }
    };
    onMounted(() => {
      // for (let i = 0; i < 4; i++) {
      //   getData();
      // }
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    const routToSingleProduct = (e) => {
      console.log({ e });
      router.push(`/products/${e.id}`);
    };
    return {
      products,
      userLeaf,
      scrollComponent,
      loading,
      routToSingleProduct,
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
  &__banner {
    width: 100%;
    height: 250px;
    background-image: url("src/assets/images/hills.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 16px;
    padding: 0 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
    padding: 24px 0;
    overflow-y: scroll;
    &__card {
      width: 30%;
      height: fit-content;
      cursor: pointer;
    }
  }
}
</style>
