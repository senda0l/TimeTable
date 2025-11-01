// src/features/store/scheduleStore.js
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { defaultSchedule } from '@/entities/lesson/ui' // проверь путь

const STORAGE_KEY = 'user_schedule'

export const useScheduleStore = defineStore('schedule', () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  const schedule = ref(saved ? JSON.parse(saved) : structuredClone(defaultSchedule))

  // Автосохранение при любых изменениях
  watch(
    schedule,
    (newVal) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
      } catch (e) {
        console.error('Ошибка при сохранении расписания:', e)
      }
    },
    { deep: true }
  )

  function addOrUpdate(day, room, time, lesson) {
    if (!schedule.value[day]) schedule.value[day] = {}
    if (!schedule.value[day][room]) schedule.value[day][room] = {}
    schedule.value[day][room][time] = lesson
  }

  function removeLesson(day, room, time) {
    if (!schedule.value[day]?.[room]?.[time]) return
    delete schedule.value[day][room][time]
    if (Object.keys(schedule.value[day][room] || {}).length === 0) {
      delete schedule.value[day][room]
    }
    if (Object.keys(schedule.value[day] || {}).length === 0) {
      delete schedule.value[day]
    }
    console.log("Удаляю из store:", day, room, time);
  }

  function resetToDefault() {
    schedule.value = structuredClone(defaultSchedule)
    localStorage.removeItem(STORAGE_KEY)
  }

  return { schedule, addOrUpdate, removeLesson, resetToDefault }
})
