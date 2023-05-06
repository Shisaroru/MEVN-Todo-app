<template>
    <div>
        <form @submit.prevent="login">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="formInput.email">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model="formInput.password">
            <button>Login</button>
            <div v-if="error">Login failed</div>
        </form>
    </div>
</template>

<script>
import { mapWritableState } from "pinia"
import { useStateStore } from "../store/store.vue";
import axios from "axios";

export default {
    data() {
        return {
            formInput: {
                email: "",
                password: "",
            },
            error: false,
        }
    },
    methods: {
        async login() {
            try {
                const result = await axios.post('/api/user/login', {
                    email: this.formInput.email,
                    password: this.formInput.password,
                })

                this.accessToken = result.data.accessToken;
                this.user = result.data.user;

                this.error = false;
                this.$router.push({
                    name: 'dashboard'
                })
            } catch (error) {
                this.error = true;
                console.log(error);
            }
        }
    },
    computed: {
        ...mapWritableState(useStateStore, ['accessToken', 'user'])
    }
}
</script>