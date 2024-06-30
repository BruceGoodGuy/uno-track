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

defineProps<{
    title?: string
}>()

const emit = defineEmits<{
    (e: 'confirm'): void
}>()

function handleConfirm() {
    const winnerIndex = data.value.winner;
    if (winnerIndex === '') {
        return;
    }
    let { games, players, max } = settings.value;
    let winnerInfo = players[winnerIndex];
    winnerInfo = { ...winnerInfo, win: winnerInfo.win + 1, score: winnerInfo.score + (players.length - 1) };
    const game = { index: games.length, winner: { index: winnerIndex, ...winnerInfo }, end: Date.now() };
    games.push(game);
    players[winnerIndex] = winnerInfo;
    settings.value.games = games;
    for (let player in players) {
        if (player != winnerIndex) {
            players[player].score--;
        }
    }
    settings.value.players = players.sort((a, b) => b.score - a.score);
    const maxMark = settings.value.players[0].score;
    if (maxMark >= max) {
        settings.value.timeEnd = Date.now(),
            router.push('/finish');
    }
    emit('confirm');
}

function setWinner(index) {
    if (settings.value.players[index]) {
        data.value.winner = index;
    }

}
</script>

<template>
    <VueFinalModal class="end-round-modal w-full text-white" content-class="end-round-modal-content" overlay-transition="vfm-fade"
        content-transition="vfm-fade">
        <h1>{{ 'Who won game ' + (settings.games.length + 1) + '?' }}</h1>
        <div class="flex gap-3 flex-wrap">
            <div v-for="(player, index) of settings.players" class="uppercase">
                <button @click="setWinner(index)"
                    :class="(index === data.winner ? 'bg-yellow-500 text-black' : '') + ' uppercase player-choice'">
                    {{ player.name }}
                </button>
            </div>
        </div>
        <button @click="handleConfirm" class="bg-yellow-500 text-black p-3">
            Confirm
        </button>
    </VueFinalModal>
</template>

<style>
.end-round-modal {
    display: flex;
    justify-content: center;
    align-items: center;
}

.end-round-modal-content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: #fff;
    border-radius: 0.5rem;
}

.end-round-modal-content>*+* {
    margin: 0.5rem 0;
}

.end-round-modal-content h1 {
    font-size: 1.375rem;
}

.end-round-modal-content button {
    margin: 0.25rem 0 0 auto;
    /* padding: 0 8px; */
    border: 1px solid;
    border-radius: 0.5rem;
}

.end-round-modal-content {
    background: rgb(43, 58, 81);
}

button.player-choice {
    padding: 5px 10px;
}

@media only screen and (max-width: 600px) {
    .end-round-modal-content {
        width: 98%;
    }
}
</style>
