<script setup>
import {reactive, computed } from "vue";
import { defaultSchedule } from "@/entities/lesson/ui";
const timeSlots = ["9:30-11:00", "11:00-12:30", "12:30-14:00", "14:30-16:00"];
import { useScheduleStore } from "@/features/store/scheduleStore";
const store = useScheduleStore();

import {storeToRefs} from 'pinia'
const {schedule} = storeToRefs(store);
// const schedule = reactive(JSON.parse(JSON.stringify(defaultSchedule)));

const getCurrentDayName = () => {
  const today = new Date();

  return today.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
};

const dayOfWeekKey = getCurrentDayName();




const dailySchedule = computed(() => {
  return schedule.value[dayOfWeekKey] || {};
});

const roomNames = computed(() => {
  return Object.keys(dailySchedule.value);
});

const getLesson = (room, time) => {
  const roomSchedule = dailySchedule.value[room];
  if (roomSchedule && roomSchedule[time]) {
    return roomSchedule[time];
  }
  return null;
};
</script>

<template>
  <div class="schedule-table">
    <h1 class="schedule-table_title">{{ dayOfWeekKey }}</h1>

    <table>
      <thead>
        <tr>
          <th>Room / Time</th>
          <th v-for="time in timeSlots" :key="time">{{ time }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="roomName in roomNames" :key="roomName">
          <td>{{ roomName }}</td>
          <td 
            v-for="time in timeSlots"
            :key="time"
            class="p-2 border border-gray-300 "
          >
            <div v-if="getLesson(roomName, time)">
              <strong>{{ getLesson(roomName, time).name }}</strong>
              <div class="text-sm text-white">
                {{ getLesson(roomName, time).teacher }}
              </div>
            </div>
            <div v-else class="text-gray-400">—</div>
          </td>
        </tr>
      </tbody>
    </table>
    
    <h1 class="weekend_title" v-if="dayOfWeekKey==='saturday'||dayOfWeekKey==='sunday'">Today there are no lessons</h1>
  </div>
</template>

<style scoped>

.weekend_title{
  text-align: center;
  font-size: 30px;
  margin-top: 50px;
  
}
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
  color: white;
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
</style>
