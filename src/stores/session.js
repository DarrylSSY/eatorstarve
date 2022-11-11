import {defineStore} from 'pinia'

export const useSessionStore = defineStore('session', {
    state: () => {
        return {
            username: '',
            keywords: '',
        }

    },
    getters: {
        getUsername() {
            return this.username
        },

        getKeywords() {
            // console.log(this.keywords)
            return this.keywords
        }
    },
    actions: {
        setUsername(username) {
            this.username = username
        },

        setKeywords(keywords) {
            this.keywords = keywords
        }

    }
});