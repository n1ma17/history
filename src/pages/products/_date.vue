<template>
  <div class="products">
    <div class="products__card" v-for="(card, i) in products" :key="i">
      <ProductCard :product="card" />
    </div>
  </div>
</template>

<script>
import ProductCard from "src/components/cards/ProductCard.vue";
import { ref } from "vue";
export default {
  name: "ProductsPage",
  components: {
    ProductCard,
  },
  setup() {
    const products = ref([
      {
        id: 0,
        percent: "70",
        date: "25/08/1402",
        cost: 500,
        used: false,
      },
      {
        id: 1,
        percent: "30",
        date: "22/10/1402",
        cost: 1000,
        used: false,
      },
      {
        id: 2,
        percent: "50",
        date: "22/12/1401",
        cost: 100,
        used: true,
      },
      {
        id: 1,
        percent: "10",
        date: null,
        cost: 320,
        used: false,
      },
    ]);
    return {
      products,
    };
  },
};
</script>

<style lang="scss" scoped>
.products {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 32px 50px;
  &__card {
    width: 30%;
    height: fit-content;
  }
}
</style>
