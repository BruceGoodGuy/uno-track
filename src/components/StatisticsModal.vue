<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const store = useStore()
const { settings } = storeToRefs(store)
const data = ref({ winner: '' });
const router = useRouter()

function formatDate(time) {
    const date = new Date(time);
    return date.getHours() + ":"
        + date.getMinutes() + ":"
        + date.getSeconds() + ' (' + date.getDate() + "/"
        + (date.getMonth() + 1) + "/"
        + date.getFullYear()
        + ')';
}

defineProps<{
    title?: string
}>()

const emit = defineEmits<{
    (e: 'confirm'): void
}>()

</script>

<template>
    <VueFinalModal class="statistics-modal w-full" content-class="statistics-modal-content" overlay-transition="vfm-fade"
        content-transition="vfm-fade">
        <h1>{{ 'Statistics' }}</h1>
        <div class="flex gap-3 flex-wrap">
            <div class="">
                <p>Time start: {{ formatDate(settings.timeStart) }}</p>
                <p>Time end: {{ formatDate(settings.timeEnd) }}</p>
                <p>Duration: {{ Math.floor(settings.timeEnd - settings.timeStart) / 1000 }}s</p>
                <p>Total games: {{ settings.games.length }}</p>
            </div>
            <div class="max-h-[200px] overflow-auto">
                <table class="table-auto">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Winner</th>
                            <th>Score</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(game, index) of settings.games">
                            <td>{{ index + 1 }}</td>
                            <td class="uppercase">{{ game.winner.name }}</td>
                            <td>{{ game.winner.score }}</td>
                            <td>{{ formatDate(game.end) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <button @click="emit('confirm')" class="bg-yellow-500 text-black p-3">
            Confirm
        </button>
    </VueFinalModal>
</template>

<style>
.statistics-modal {
    display: flex;
    justify-content: center;
    align-items: center;
}

.statistics-modal-content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: #fff;
    border-radius: 0.5rem;
}

.statistics-modal-content>*+* {
    margin: 0.5rem 0;
}

.statistics-modal-content h1 {
    font-size: 1.375rem;
}

.statistics-modal-content button {
    margin: 0.25rem 0 0 auto;
    /* padding: 0 8px; */
    border: 1px solid;
    border-radius: 0.5rem;
}

.statistics-modal-content {
    background: rgb(43, 58, 81);
}

button.player-choice {
    padding: 5px 10px;
}

@media only screen and (max-width: 600px) {
    .statistics-modal-content {
        width: 98%;
    }
}
</style>
