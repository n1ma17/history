<template>
  <q-layout view="hHh lpR fFf">
    <HeaderComponent />
    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="mobile"
      elevated
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import HeaderComponent from "src/components/layout/HeaderComponent.vue";
import { ref } from "vue";

export default {
  components: {
    HeaderComponent,
  },
  setup() {
    const rightDrawerOpen = ref(false);

    return {
      rightDrawerOpen,
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
