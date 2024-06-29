<script setup>
import { useRouter } from 'vue-router'
import Container from '@/components/Container.vue'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'
import Swal from 'sweetalert2'
import { ModalsContainer, useModal } from 'vue-final-modal'
import StatisticsModal from '@/components/StatisticsModal.vue'


const router = useRouter()
const store = useStore()
const { settings } = storeToRefs(store)

const { open, close } = useModal({
    component: StatisticsModal,
    attrs: {
        onConfirm() {
            close()
        },
    },
});


Swal.fire({
    title: 'Finish~',
    text: 'The game ends',
    icon: 'success',
    confirmButtonText: 'Cool',
}).then((result) => {
    if (!result.isConfirmed) {
        return;
    }
    router.push('/finish');
});
function doAction(action) {
    switch (action) {
        case 'download':
            const arrData = settings.value.players;
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += [
                Object.keys(arrData[0]).join(","),
                ...arrData.map(item => Object.values(item).join(","))
            ]
                .join("\n")
                .replace(/(^\[)|(\]$)/gm, "");

            const data = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", data);
            link.setAttribute("download", "players.csv");
            link.click();
            break;
        case 'end':
            Swal.fire({
                title: 'Warning!',
                text: 'Do you really want to end the game?',
                icon: 'question',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                showDenyButton: true,
            }).then((result) => {
                if (!result.isConfirmed) {
                    return;
                }
                settings.value.step = 0;
                settings.value.games = [];
                settings.value.players = settings.value.players.map(p => {
                    p.score = 0;
                    p.win = 0;
                    return p;
                })
                router.push('/');
            });
            break;
        case 'view':
            open();
            break;

        default:
            break;
    }
}
</script>
<template>
    <Container>
        <div class="wrap mt-10">
            <h3 class="rowdies-bold text-5xl">Finish</h3>
        </div>
        <p>The Result is... </p>
        <div
            class="wrap max-h-[400px] mt-3 overflow-auto p-2 border border-gray bg-slate-800 bg-opacity-85 rounded montserrat-text">
            <table class="table-auto">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Win</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(player, index) of settings.players">
                        <td>#{{ index + 1 }}</td>
                        <td class="uppercase">{{ player.name }}</td>
                        <td>{{ player.score }}</td>
                        <td>{{ player.win }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="button-wrap mt-3 flex md:flex-row flex-col gap-1">
            <button @click="doAction('download')"
                class="button montserrat-text hover:opacity-80 focus:opacity-80 w-full md:max-w-md bg-green-600 px-3 py-2 rounded-full text-white font-bold text-lg">
                <span>Download</span>
            </button>
            <button @click="doAction('view')"
                class="button montserrat-text hover:opacity-80 focus:opacity-80 w-full md:max-w-md bg-yellow-400 px-3 py-2 rounded-full text-white font-bold text-lg">
                <span>Statistics</span>
            </button>
            <button @click="doAction('end')"
                class="button montserrat-text hover:opacity-80 focus:opacity-80 w-full md:max-w-md bg-red-700 px-3 py-2 rounded-full text-white font-bold text-lg">
                <span>End Game</span>
            </button>
        </div>
    </Container>
</template>
<style>
table tr th,
table tr td {
    padding-left: 10px;
    padding-right: 10px;
}
</style>