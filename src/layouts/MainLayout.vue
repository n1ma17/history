<template>
  <q-layout view="hHh lpR fFf">
    <HeaderComponent @routeHandler="navigateHandler" @toggleRightDrawer="rightDrawerOpen = true" />
    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile"  :width="300" :breakpoint="400">
      <q-scroll-area
        style="
          height: calc(100% - 200px);
          margin-top: 200px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple @click="navigateHandler('home')">
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> صفحه اصلی </q-item-section>
          </q-item>

          <q-item active clickable v-ripple @click="navigateHandler('product')">
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> محصولات </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 200px"
      >
        <div class="absolute-bottom bg-transparent">
        </div>
      </q-img>
    </q-drawer>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import HeaderComponent from "src/components/layout/HeaderComponent.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import jalaliMoment from "jalali-moment";
export default {
  components: {
    HeaderComponent,
  },
  setup() {
    const router = useRouter();
    const rightDrawerOpen = ref(false);
    const navigateHandler = (route) => {
      const today = jalaliMoment().locale("fa").format("jDD-jMM-jYYYY");
      if (route === "product") {
        router.push({ path: "/products", query: { date: today } });
      } else router.push({ path: "/" });
    };
    return {
      rightDrawerOpen,
      navigateHandler,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.page-container {
}
</style>
