import {defineStore} from 'pinia'

export const useSessionStore = defineStore('session', {
    state: () => {
        return {
            username: '',
        }

    },
    getters: {
        getUsername() {
            return this.username
        },

    },
    actions: {
        setUsername(username) {
            this.username = username
        },
    }
});