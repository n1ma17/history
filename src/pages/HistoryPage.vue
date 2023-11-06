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
import { defineComponent } from "vue";
import Calendar from "src/components/history/CalendarComponent.vue";
import Activities from "src/components/history/ActivitiesComponent.vue";

export default defineComponent({
  name: "HistoryPage",
  components: {
    Calendar,
    Activities,
  },
});
</script>
<style scoped lang="scss">
.history-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: calc(100vh - 65px);
  &__activities {
    width: 100%;
    height: 80%;
    padding: 0 50px;
    @media only screen and (max-width: 1024px) {
      padding: 0 20px;
    }
  }
  &__calendar {
    width: 100%;
    height: 20%;
  }
}
</style>
