import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const STORE_NAME = 'vue_uno_game'

export const useStore = defineStore('uno', {
    state: () => ({
        settings: useStorage(STORE_NAME,
            {
                max: 300, players: [
                    { order: 0, name: '', score: 0, win: 0, },
                    { order: 1, name: '', score: 0, win: 0, },
                    { order: 2, name: '', score: 0, win: 0, },
                    { order: 3, name: '', score: 0, win: 0, },
                    { order: 4, name: '', score: 0, win: 0, },
                ], step: 0, games: [], timeStart: 0, timeEnd: 0,
            },
            localStorage,
            {
                mergeDefaults: true,
            },
        ),
    }),
    actions: {
        updatePlayers(players) {
            this.settings = {
                ...this.settings,
                players,
            }
        },
        setMaxScore(max) {
            this.settings = {
                ...this.settings,
                max,
            }
        },
        updateSte(step) {
            this.settings = {
                ...this.settings,
                step,
            }
        },
    },
})