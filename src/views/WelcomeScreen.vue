<script setup>
import { useRouter } from 'vue-router'
import Container from '@/components/Container.vue'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'

const store = useStore()
const { settings } = storeToRefs(store)
const router = useRouter()
function start(event) {
    settings.value.step = 0;
    router.push('/setup');
}
</script>
<template>
    <Container>
        <div class="wrap mt-10">
            <h3 class="rowdies-bold text-5xl">UNO GAME POINT</h3>
            <p class="rowdies-regular text-xl">Uno Scores Made Simple with Vue</p>
        </div>
        <div class="wrap mt-3">
            <button @click="start"
                class="button montserrat-text hover:opacity-80 focus:opacity-80 bg-amber-400 px-3 py-2 rounded-full text-black font-bold text-lg">Get
                started</button>
        </div>
    </Container>
</template>