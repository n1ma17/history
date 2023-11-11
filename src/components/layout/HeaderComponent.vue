<template>
  <q-header elevated class="header bg-white text-black">
    <div class="header__content">
      <div class="header__content__action">
        <q-icon name="search" size="1.3rem" />
        <q-btn
          class="header__content__action__toggle-drawer q-ml-md"
          dense
          flat
          round
          icon="menu"
          @click="toggleRightDrawer"
        />
        <q-btn
          class="header__content__action__menu q-ml-sm"
          color="white"
          flat
          text-color="black"
          label="دسته بندی ها"
          icon="expand_more"
          icon-right="list"
        >
          <q-menu
            anchor="bottom middle"
            fit
            self="top middle"
            class="menu-list"
            :offset="[0, 5]"
          >
            <q-item clickable>
              <q-item-section @click="navigateHandler('home')"
                >صفحه اصلی</q-item-section
              >
            </q-item>
            <q-item clickable>
              <q-item-section @click="navigateHandler('product')"
                >لیست محصولات</q-item-section
              >
            </q-item>
          </q-menu>
        </q-btn>
      </div>
      <div class="header__content__logo">
        <q-avatar>
          <img
            src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-black.svg"
            class="q-pa-sm"
          />
        </q-avatar>
      </div>
      <div class="header__content__download">
        <q-btn
          class="header__content__download__btn"
          dense
          color="green"
          unelevated
          label="نصب طاقچه"
        />
      </div>
    </div>
  </q-header>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "HeaderComponent",
  setup(_, { emit }) {
    const toggleRightDrawer = () => {
      emit("toggleRightDrawer")
    };
    const navigateHandler = (route) => {
      emit("routeHandler", route)
    };
    return {
      navigateHandler,
      toggleRightDrawer,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
  &__content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__download {
      width: 33%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &__btn {
        width: 90px;
        height: 40px;
      }
    }
    &__logo {
      width: 33%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__action {
      width: 33%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &__toggle-drawer {
        display: none;
        @media only screen and (max-width: 1024px) {
          display: flex;
        }
      }
      &__menu {
        @media only screen and (max-width: 1024px) {
          display: none;
        }
      }
    }
  }
  @media only screen and (max-width: 1024px) {
    padding: 0 20px;
  }
}
</style>
