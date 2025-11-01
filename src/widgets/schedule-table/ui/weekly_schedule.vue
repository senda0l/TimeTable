

<script setup>
import { reactive, computed } from "vue";
import { defaultSchedule } from "@/entities/lesson/ui";
// const schedule = reactive(JSON.parse(JSON.stringify(defaultSchedule)));
import { useScheduleStore } from "@/features/store/scheduleStore";
const store = useScheduleStore();

const schedule = store.schedule;

const timeSlots = ["9:30-11:00", "11:00-12:30", "12:30-14:00", "14:30-16:00"];
const roomNames = computed(() => {
  return Object.keys(dailySchedule.value);
});

const getLesson = (dayKey, timeSlot) => {
  const daySchedule = schedule[dayKey];
  if (!daySchedule) {
    return null;
  }
  for(const room in daySchedule){
    const lesson = daySchedule[room][timeSlot];
    if(lesson){
        return{
            name: lesson.name,
            teacher: lesson.teacher,
            room: room
        }
    }
  }
  return null;
};

const days = computed(()=>{
    return Object.keys(schedule);
})



</script>

<template>
  <div class="schedule-table">
    <h1 class="title">Weekly Schedule</h1>
     <table class="schedule">
    <thead>
      <tr>
        <th>Day / Time</th>
        <th v-for="time in timeSlots" :key="time">{{ time }}</th>
      </tr>
    </thead>

    <tbody>

      <tr v-for="day in days" :key="day">
        <td class="day-name ">{{ day }}</td>
        <td v-for="time in timeSlots" :key="time">
          <template v-if="getLesson(day, time)">
            <div class="text-sm text-white">
              {{ getLesson(day, time).name }}
              <br />
              <small>({{ getLesson(day, time).room }})</small>
              <small>({{ getLesson(day, time).teacher }})</small>
            </div>
          </template>
          <template v-else>—</template>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<style scoped>
.schedule-table {
  text-align: center;
  color: white;
  margin-top: 30px;
  min-height: 500px;
  margin-left: 200px;
  background-color: var(--secondary-bg);
  min-width: fit-content;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
}

table {
  margin: 0 auto;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  overflow: hidden;
  
}

.schedule-table_title{
  text-transform: uppercase;
  margin-bottom: 20px;
  font-size: 30px;
}

th,
td {
  border: 1px solid gray;
  padding: 12px 16px;
  min-width: 140px;
}

th {
  background-color: rgba(255, 255, 255, 0.2);
}

.day-name{
  text-transform: uppercase;
}

.title{
  font-size: 30px;
  margin-bottom: 15px;
  color: var(--primary-bg);
}
</style>