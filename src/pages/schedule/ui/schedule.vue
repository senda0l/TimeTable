<script setup>
import { reactive, computed } from "vue";
import weeklySchedule from "@/widgets/schedule-table/ui/weekly_schedule.vue";
</script>

<template>
    <div class="schedule">
        <div class="container">
            <div class="schedule_content">
                <weeklySchedule/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .schedule_content{
        background-color: var(--primary-bg);
        max-width: 1110px;
        width: 100%;
        height: 100px;
    }
</style>