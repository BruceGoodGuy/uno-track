<script setup>
import { useRouter } from 'vue-router'
import Container from '@/components/Container.vue'
import IconTrophy from '@/components/icons/IconTrophy.vue'
import { ref } from 'vue'
import { ModalsContainer, useModal } from 'vue-final-modal'
import RoundModal from '@/components/RoundModal.vue'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'
import Swal from 'sweetalert2'

const router = useRouter()
const store = useStore()

const { settings } = storeToRefs(store)

const { open, close } = useModal({
    component: RoundModal,
    attrs: {
        onConfirm() {
            close()
        },
    },
});

function confirmStop() {
    Swal.fire({
        title: 'Warning!',
        text: 'Do you really want to quit the game?',
        icon: 'question',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showDenyButton: true,
    }).then((result) => {
        if (!result.isConfirmed) {
            return;
        }
        settings.value.timeEnd = Date.now(),
        router.push('/finish');
    });
}
</script>
<template>
    <Container>
        <div class="wrap mt-10">
            <h3 class="rowdies-bold text-5xl">Play</h3>
            <p class="rowdies-regular text-xl flex gap-1 justify-between">
                <span>Game#{{ settings.games.length + 1 }}</span>
                <span>Max score: <b>{{ settings.max }}</b></span>
            </p>
        </div>
        <div class="wrap max-h-[400px] mt-3 overflow-auto p-2 border border-gray bg-slate-800 bg-opacity-85 rounded">
            <div class="card border p-3 rounded flex justify-between items-center mb-3"
                v-for="(player, index) of settings.players">
                <div class="card-body">
                    <div class="flex flex-1 gap-2">
                        <h4 class="font-bold">#{{ index + 1 }}</h4>
                        <p class="uppercase">{{ player.name }}</p>
                    </div>
                    <div class="flex gap-2">
                        <span><b>{{ player.win }}</b> wins</span>
                        <span>Score: <b :class="player.score < 0 ? 'text-red-600' : ''">{{ player.score }}</b></span>
                    </div>
                </div>
                <div class="text-yellow-500" v-if="index === 0">
                    <IconTrophy />
                </div>
            </div>
        </div>
        <div class="button-wrap mt-3 flex gap-1">
            <button @click="open"
                class="button montserrat-text hover:opacity-80 focus:opacity-80 w-full md:max-w-md bg-green-600 px-3 py-2 rounded-full text-white font-bold text-lg">
                <span>Finish Round</span>
            </button>
            <button @click="confirmStop"
                class="button montserrat-text hover:opacity-80 focus:opacity-80 w-full md:max-w-md bg-red-700 px-3 py-2 rounded-full text-white font-bold text-lg">
                <span>Stop</span>
            </button>
        </div>
    </Container>
</template>