<template>
  <div class="calendar">
    <div class="calendar__months">
      <q-select
        v-model="selectedMonth"
        :options="months"
        label="Select a month"
        @update:model-value="getDaysInMonth()"
      />

      <!-- Display the selected month's days -->
    </div>
    <div v-for="day in daysOfMonth" :key="day" class="date" :class="today === day.day ? 'active' : ''">
      <span>{{ day.label }}</span>
      <span>{{ day.day }}</span>
    </div>
    <!-- {{ $dayjs().calendar("jalali").locale("fa").format("dd MMMM YYYY") }} -->
  </div>
</template>

<script>
import { ref, onMounted, toRefs } from "vue";
import jalaliMoment from "jalali-moment";
export default {
  name: "CalendarComponent",
  setup() {
    const months = [];
    const daysOfMonth = ref([]);
    const selectedMonth = ref(null);
    const today = jalaliMoment().locale("fa").format("DD/MM/YYYY");
    const currentYear = ref(jalaliMoment().locale("fa").format("YYYY"));
    // Loop through each month (from 0 to 11, where 0 is January and 11 is December)
    for (let i = 0; i < 12; i++) {
      // Use Moment.js to format the current month
      const month = jalaliMoment().month(i).locale("fa").format("jMMMM");
      months.push({
        label: month,
        value: i + 1 
      });
    }
    const getDaysInMonth = () => {
      daysOfMonth.value = [];
      // Use Moment.js to get the number of days in the selected month
      const daysInMonth = jalaliMoment(`${selectedMonth.value}/${currentYear.value}`).daysInMonth();
      console.log({daysInMonth});
      // Loop through each day in the selected month
      for (let i = 1; i <= daysInMonth; i++) {
        // Use Moment.js to format the current day
        const day = jalaliMoment(selectedMonth)
          .date(i)
          .locale("fa")
          .format("dd");
        const dayNum = i
        daysOfMonth.value.push({
          label: day,
          day: dayNum,
        });
      }
    };
    return {
      months,
      selectedMonth,
      getDaysInMonth,
      daysOfMonth,
      today,
      currentYear
    };
  },
};
</script>

<style lang="scss" scoped>
.active {
  background-color: aquamarine;
}
.date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
}
.calendar {
  width: 100%;
  height: 60px;
  background-color: #f1f3f6;
  padding: 4px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__months {
    width: 200px;
  }
}
</style>
