<template>
  <div class="calendar">
    <div class="calendar__months">
      <div class="calendar__months__select-box">
        <q-select
          v-model="selectedMonth"
          :options="months"
          v-bind="attrs"
          label="انتخاب ماه"
          @update:model-value="getDaysInMonth()"
        />
      </div>

      <!-- Display the selected month's days -->
    </div>
    <div class="calendar__content">
      <div
        ref="scrollableElement"
        id="calendar__content__days"
        class="calendar__content__days"
      >
        <div
          v-for="day in daysOfMonth"
          :key="day"
          class="calendar__content__days__day fade"
          :class="+today === day.day ? 'active' : ''"
        >
          <span  class="calendar__content__days__day__label">{{ day.label }}</span>
          <span  class="calendar__content__days__day__number">{{ day.day }}</span>
        </div>
      </div>
      <div class="prev">
        <q-btn
          flat
          size="md"
          round
          color="black"
          icon="chevron_left"
          @click="scrollSlider(-1)"
        />
      </div>
      <div class="next">
        <q-btn
          flat
          size="md"
          round
          color="black"
          icon="chevron_right"
          @click="scrollSlider(1)"
        />
      </div>
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
    const attrs = {
      outlined: true,
      dense: true,
    };
    const currentMonth = jalaliMoment().jMonth() + 1;
    const scrollableElement = ref(null);
    const months = [];
    const daysOfMonth = ref([]);
    const selectedMonth = ref(null);
    const currentYear = ref(jalaliMoment().locale("fa").format("YYYY"));
    // Loop through each month (from 0 to 11, where 0 is January and 11 is December)
    for (let i = 0; i < 12; i++) {
      // Use Moment.js to format the current month
      const month = jalaliMoment().jMonth(i).locale("fa").format("jMMMM");
      months.push({
        label: month,
        monthNum: i + 1 < 10 ? `0${i + 1}` : `${i + 1}`,
      });
    }
    onMounted(async () => {
      selectedMonth.value = months[currentMonth - 1];
      await getDaysInMonth();
      await scrolltoToday();
    });
    const getDaysInMonth = () => {
      daysOfMonth.value = [];
      // Use Moment.js to get the number of days in the selected month
      const daysInMonth = jalaliMoment(
        `${currentYear.value}-${selectedMonth.value.monthNum}`,
        "jYYYY-jMM"
      ).jDaysInMonth();
      // Loop through each day in the selected month
      for (let i = 1; i <= daysInMonth; i++) {
        // Use Moment.js to format the current day
        const day = jalaliMoment(
          `${currentYear.value}-${selectedMonth.value.monthNum}`,
          "jYYYY-jMM"
        )
          .jDate(i)
          .locale("fa")
          .format("dd");
        const dayNum = i;
        daysOfMonth.value.push({
          label: day,
          day: dayNum,
        });
      }
    };
    const today = ref(+jalaliMoment().locale("fa").format("DD"));
    const scrolltoToday = () => {
      document.getElementById("calendar__content__days").scrollLeft =
        (today.value - 1) * -48;
      document.getElementById("calendar__content__days").scrollLeft += 2 * 48;
    };
    const scrollSlider = (index) => {
      if (index === 1) {
        today.value--
        document.getElementById("calendar__content__days").scrollLeft += 48;
      }
      else {
        today.value++
        document.getElementById("calendar__content__days").scrollLeft += -48;
      }
    };
    return {
      months,
      selectedMonth,
      scrollSlider,
      getDaysInMonth,
      daysOfMonth,
      today,
      currentYear,
      currentMonth,
      attrs,
      scrollableElement,
    };
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  width: 100%;
  height: 60px;
  background-color: #f1f3f6;
  padding: 4px 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &__months {
    width: 33%;
    &__select-box {
      max-width: 200px;
    }
  }
  &__content {
    width: 33%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .next {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .prev {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &__days {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 70%;
      height: 100%;
      overflow-x: scroll;
      position: relative;
      transition: all 0.5s ease-in-out;
      &__day {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 40px;
        height: 100%;
        margin: 0 4px;
        border: 4px solid transparent;
        border-radius: 8px;
        cursor: pointer;
        &__label {
          font-size: 16px;
          font-weight: 700;
          color: #8d8d8d;
        }
        &__number {
          font-size: 20px;
          font-weight: 700;
          color: #000;
        }
        &:hover {
          background-color: #fff;
          
          margin-top: 24px;
          box-shadow: 0px 0px 11px 3px #e9e9e9;
          border: 4px solid aquamarine;
          transition: all 0.5s ease-in-out;
        }
      }
    }
  }
}
.active {
  background-color: aquamarine;
  border-radius: 8px;
  margin-top: 24px;
  box-shadow: 0px 0px 11px 3px #e9e9e9;
}
/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
}
</style>
