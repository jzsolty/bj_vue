import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state () {
        return {
            user: localStorage.getItem('user'),
        }
    },
    mutations: {
        userSet (state, user){
            state.user = user;
        }
    }
})

export default store