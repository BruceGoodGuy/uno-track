<script setup>
import Container from '@/components/Container.vue'
import Swal from 'sweetalert2'
import { ref } from 'vue'
import IconRemove from '@/components/icons/IconRemove.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'

const router = useRouter()

const store = useStore()

const { settings } = storeToRefs(store)
const config = { max: 1000, min: 10 };

function selectText(e) {
    e.target.select();
}

function onBlurInput(e) {
    let value = e.target.value.replace(/\D/g, '').trim();
    if (value === '') {
        value = settings.value.max;
    }

    if (value > config.max || value < config.min) {
        Swal.fire({
            title: 'Error!',
            text: `Max score needs to be greater than ${config.min} and less than ${config.max}. Please adjust it.`,
            icon: 'error',
            confirmButtonText: 'Cool'
        });
        value = settings.value.max;
    }

    e.target.value = value;
    settings.value.max = value;
}

function changeStep(step = 1) {
    if (step === 2) {
        const { players } = settings.value;
        let playerFiltered = [...players].filter(player => player.name.trim() !== '');
        if (playerFiltered.length < 2) {
            Swal.fire({
                title: 'Error!',
                text: `To start, you need at least 2 players to play.`,
                icon: 'error',
                confirmButtonText: 'Cool'
            });
            return;
        } else {
            settings.value.games = [];
            settings.value.timeStart = Date.now(),
                settings.value.players = playerFiltered.map(p => {
                    p.score = 0;
                    p.win = 0;
                    return p;
                });
            router.push('/play');
        }
    }

    settings.value.step = step;
}

function removePlayer(index) {
    let { players } = settings.value;
    if (players.length > 2) {
        players.splice(index, 1);
        settings.value.players = players;
    }
}

function addMore() {
    let { players } = settings.value;
    players.push({ order: players.length, name: '', score: 0 });
    settings.value.players = players;
}
</script>
<template>
    <Container>
        <div class="wrap mt-10">
            <h3 class="rowdies-bold text-5xl">SETUP</h3>
            <p class="rowdies-regular text-xl">
                <span v-if="settings.step === 0">Maximum Score</span>
                <span v-if="settings.step === 1">Players (Total: {{ settings.players.length }} )</span>
            </p>
        </div>
        <div class="wrap my-3 min-h-[200px]">
            <TransitionGroup>
                <div class="form-wrap flex gap-1" v-if="settings.step === 0" :key="0">
                    <input type="text" @focus="selectText" @blur="onBlurInput"
                        class="rounded-full md:max-w-md w-full h-[44px] px-5 text-end text-black outline-none focus:outline-amber-400"
                        :value="settings.max">
                </div>

                <div class="form-wrap flex md:flex-row md:flex-wrap flex-col gap-4 max-h-[500px] overflow-auto p-1"
                    v-if="settings.step === 1" :key="1">
                    <div :class="'player pe-5 ' + 'player-' + (index + 1)" v-for="(player, index) of settings.players">
                        <div class="wrap-player flex gap-1 items-center">
                            <input type="text" @focus="selectText" :placeholder="`Player ${index + 1}`"
                                v-model="player.name" maxlength="10"
                                class="rounded-full md:max-w-md w-full h-[44px] px-5 text-end text-black outline-none focus:outline-amber-400 uppercase">
                            <button class="text-red-700" @click="removePlayer(index)"
                                v-if="settings.players.length > 2">
                                <IconRemove />
                            </button>
                        </div>
                    </div>
                </div>
                <button v-if="settings.players.length < 15 && settings.step === 1"
                    class="button border-nonemontserrat-text hover:opacity-80 focus:opacity-80 w-full md:max-w-md bg-transparent rounded-full text-green-700 font-bold text-5lg mx-auto"
                    @click="addMore">
                    <div class="flex items-center justify-center h-10">
                        <IconAdd />
                    </div>
                </button>
            </TransitionGroup>
            <div class="button-wrap mt-3 flex gap-1">
                <TransitionGroup>
                    <button @click="changeStep(settings.step + 1)" :key="2"
                        class="button montserrat-text hover:opacity-80 focus:opacity-80 w-full md:max-w-md bg-amber-400 px-3 py-2 rounded-full text-black font-bold text-lg">
                        <span v-if="settings.step === 0">Next</span>
                        <span v-if="settings.step === 1">Start</span>
                    </button>
                    <button v-if="settings.step !== 0" @click="changeStep(0)" :key="3"
                        class="button border border-black montserrat-text hover:opacity-80 focus:opacity-80 w-full md:max-w-md bg-transparent px-3 py-2 rounded-full text-black font-bold text-lg">
                        Back
                    </button>
                </TransitionGroup>
            </div>
        </div>
    </Container>

</template>

<style>
.v-enter-active {
    animation: slide-right 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes slide-right {
    0% {
        -webkit-transform: translateX(-10px);
        transform: translateX(-10px);
        visibility: hidden;
    }

    100% {
        visibility: visible;
    }
}
</style>