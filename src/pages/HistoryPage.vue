<template>
  <div class="history-page">
    <div class="history-page__calendar">
      <Calendar />
    </div>
    <div class="history-page__activities">
      <Activities />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Calendar from "src/components/history/CalendarComponent.vue";
import Activities from "src/components/history/ActivitiesComponent.vue";
import { api } from "boot/axios";

export default {
  name: "HistoryPage",
  components: {
    Calendar,
    Activities,
  },
  setup() {
    const profile = ref({});
    const getProfile = () => {
      api
        .get("/getProfile")
        .then((res) => {
          profile.value = res.data.data;
          localStorage.setItem("profile", JSON.stringify(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    onMounted(() => {
      getProfile();
    });
    return {};
  }
};
</script>
<style scoped lang="scss">
.history-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 65px);
  &__activities {
    width: 100%;
    height: calc(100% - 148px);
    padding: 0 50px;
    @media only screen and (max-width: 1024px) {
      padding: 0 24px;
    }
  }
  &__calendar {
    width: 100%;
    height: 80px;
  }
}
</style>
