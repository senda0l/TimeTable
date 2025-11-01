<script setup>
import { reactive, ref, computed } from "vue";
import { useScheduleStore } from "@/features/store/scheduleStore";
import { storeToRefs } from "pinia";

const store = useScheduleStore();
const { schedule } = storeToRefs(store);
// ref из pinia

const timeSlots = ["9:30-11:00", "11:00-12:30", "12:30-14:00", "14:30-16:00"];

const selectedDay = ref(null);
const selectedLessonKey = ref(null);
const initialFormData = { name: "", teacher: "", room: "", time: "" };
const formData = reactive({ ...initialFormData });

const days = computed(() => Object.keys(schedule.value));
const isEditing = computed(
  () => selectedLessonKey.value && selectedLessonKey.value !== "add_new"
);

const dayLessons = computed(() => {
  if (!selectedDay.value) return [];
  const lessons = [];
  const daySchedule = schedule.value[selectedDay.value] || {};
  for (const room in daySchedule) {
    for (const time in daySchedule[room]) {
      const lesson = daySchedule[room][time];
      lessons.push({
        key: `${room}|${time}`,
        time,
        room,
        name: lesson.name,
        teacher: lesson.teacher,
      });
    }
  }
  return lessons;
});

const formatDay = (dayKey) =>
  dayKey ? dayKey.charAt(0).toUpperCase() + dayKey.slice(1) : "";

const loadForm = () => {
  Object.assign(formData, initialFormData);
  if (isEditing.value) {
    const [room, time] = selectedLessonKey.value.split("|");
    console.log("Парсинг ключа:", selectedLessonKey.value, "->", {
      room,
      time,
    });
    const originalLesson = schedule.value[selectedDay.value]?.[room]?.[time];
    if (originalLesson) {
      formData.name = originalLesson.name;
      formData.teacher = originalLesson.teacher;
      formData.room = room;
      formData.time = time;
    }
  }
};

const saveChanges = () => {
  if (!selectedDay.value || !formData.room || !formData.time) {
    alert("Выберите день, время и комнату!");
    return;
  }

  // Если редактируем — возможно, комната/время изменились → удалим старую запись
  if (isEditing.value) {
    const [oldTime, oldRoom] = selectedLessonKey.value.split("-");
    if (oldRoom !== formData.room || oldTime !== formData.time) {
      store.removeLesson(selectedDay.value, oldRoom, oldTime);
    }
  }

  // Добавляем или обновляем через store
  store.addOrUpdate(selectedDay.value, formData.room, formData.time, {
    name: formData.name,
    teacher: formData.teacher,
  });

  alert(
    `Урок "${formData.name}" успешно ${
      isEditing.value ? "обновлён" : "добавлен"
    }!`
  );

  selectedLessonKey.value = null;
  Object.assign(formData, initialFormData);
};

const deleteLessonHandler = () => {
  if (!isEditing.value) return;
  if (!confirm(`Удалить урок "${formData.name}"?`)) return;

  const [room, time] = selectedLessonKey.value.split("|");
  store.removeLesson(selectedDay.value, room, time);

  alert("Урок успешно удалён.");
  selectedLessonKey.value = null;
  Object.assign(formData, initialFormData);
  console.log(
    "Текущее расписание:",
    JSON.stringify(schedule.value[selectedDay.value], null, 2)
  );
};
</script>

<template>
  <div
    class="schedule-editor p-6 bg-white shadow-xl rounded-lg max-w-lg mx-auto"
  >
    <h2 class="text-2xl font-bold mb-6 text-white">
      Редактирование Расписания
    </h2>

    <div class="mb-6">
      <label
        for="day-select"
        class="block text-sm font-medium text-white mb-2"
        >1. Выберите День Недели:</label
      >
      <select
        id="day-select"
        v-model="selectedDay"
        @change="selectedLessonKey = null"
        class="w-full p-2 border bg-white border-gray-300 rounded-md"
      >
        <option :value="null" disabled>-- Выберите день --</option>
        <option v-for="dayKey in days" :key="dayKey" :value="dayKey">
          {{ formatDay(dayKey) }}
        </option>
      </select>
    </div>

    <div v-if="selectedDay" class="mb-6">
      <label
        for="lesson-select"
        class="block text-sm font-medium text-white mb-2"
      >
        2. Выберите Урок или Добавьте Новый:
      </label>
      <select
        id="lesson-select"
        v-model="selectedLessonKey"
        @change="loadForm"
        class="w-full p-2 bg-white border white rounded-md"
      >
        <option :value="null" disabled>-- Выберите действие --</option>

        <option value="add_new" class="font-bold text-green-700">
          ➕ Добавить новый урок
        </option>

        <optgroup label="Редактировать существующий:">
          <option
            v-for="lesson in dayLessons"
            :key="lesson.key"
            :value="lesson.key"
          >
            {{ lesson.time }} — {{ lesson.name }} ({{ lesson.room }})
          </option>
        </optgroup>
      </select>
    </div>

    <div v-if="selectedLessonKey" class="border-t pt-6 mt-6">
      <h3 class="text-xl font-semibold mb-4 text-white">
        {{ isEditing ? "Редактирование урока" : "Добавление урока" }}
      </h3>

      <form @submit.prevent="saveChanges">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-white"
            >Название Урока</label
          >
          <input
            type="text"
            id="name"
            v-model="formData.name"
            required
            class="form-input"
          />
        </div>

        <div class="mb-4">
          <label for="teacher" class="block text-sm font-medium text-white"
            >Учитель</label
          >
          <input
            type="text"
            id="teacher"
            v-model="formData.teacher"
            required
            class="form-input"
          />
        </div>

        <div class="mb-4">
          <label for="room" class="block text-sm font-medium text-white"
            >Комната (Например: B202)</label
          >
          <input
            type="text"
            id="room"
            v-model="formData.room"
            required
            class="form-input"
          />
        </div>

        <div class="mb-6">
          <label for="time" class="block text-sm font-medium text-white"
            >Время</label
          >
          <select id="time" v-model="formData.time" required class="form-input">
            <option value="" disabled>-- Выберите интервал --</option>
            <option v-for="time in timeSlots" :key="time" :value="time">
              {{ time }}
            </option>
          </select>
        </div>

        <div class="flex justify-between btns">
          <button type="submit" class="btn-save">
            {{ isEditing ? "Сохранить Изменения" : "Добавить Урок" }}
          </button>

          <button
            v-if="isEditing"
            type="button"
            @click="deleteLessonHandler"
            class="btn-delete"
          >
            Удалить Урок
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Стилям я дал более универсальные имена классов */
.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--color-white);
  border-radius: 4px;
  background-color: var(--color-white);
}
.btn-save {
  padding: 10px 15px;
  background-color: #2ecc71; /* Green */
  color: white;
  border-radius: 5px;
}
.btn-delete {
  padding: 10px 15px;
  background-color: #e74c3c; /* Red */
  color: white;
}

.schedule-editor {
  margin-top: -40px;
  margin-left: 300px;
  max-width: 600px;
  width: 100%;
  padding: 30px;
  min-height: 200px;
  background-color: var(--secondary-bg);
}

select{
  outline: none;
}

.text-2x1, .block{
  margin-bottom: 5px;
  margin-top: 10px;
}

.btns{
  margin-top: 20px;
}

</style>
