<style scoped>
#container {
    background: url(../assets/background.jpg) no-repeat;
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-container {
    border: 1px solid white;
    border-radius: 15px;
    padding: 15px 10px;
    min-width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background: transparent;
    backdrop-filter: blur(8px);
    color: midnightblue;
}

.input-field {
    border: none;
    border-bottom: 1px solid black;
    padding: 5px 5px;
    background: transparent;
    width: 100%;
}

.input-field:focus {
    outline: none;
}

.input-container {
    width: 80%;
}

#submit-button {
    width: 80%;
    color: white;
    border-radius: 10px;
    border: 1px solid white;
    background-color: midnightblue;
    padding: 10px 0;
}

.link {
    text-decoration: none;
}

.link:visited {
    color: blue;
}

.error {
    color: red;
}
</style>

<template>
    <div id="container">
        <form class="form-container" @submit.prevent="register">
            <h1>Register</h1>
            <div class="input-container">
                <label for="name">Name</label>
                <input class="input-field" type="name" name="name" id="name" v-model="formInput.name" required>
            </div>
            <div class="input-container">
                <label for="email">Email</label>
                <input class="input-field" type="email" name="email" id="email" v-model="formInput.email" required>
            </div>
            <div class="input-container">
                <label for="password">Password</label>
                <input class="input-field" type="password" name="password" id="password" v-model="formInput.password"
                    required minlength="6">
            </div>
            <button id="submit-button">Register</button>
            <router-link :to="{ name: 'login' }" class="link">
                Already have an account? Login now
            </router-link>
            <div v-if="error" class="error">Register failed, check your information again</div>
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
                name: "",
                email: "",
                password: "",
            },
            error: false,
        }
    },
    methods: {
        async register() {
            try {
                const result = await axios.post('/api/user/register', {
                    name: this.formInput.name,
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