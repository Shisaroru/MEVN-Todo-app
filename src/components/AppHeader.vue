<script>
import { mapState } from "pinia"
import { useStateStore } from "../store/store.vue";

export default {
    computed: {
        ...mapState(useStateStore, ['accessToken', 'user'])
    },
}
</script>

<template>
    <nav class="nav-container">
        <h2 id="app-name">{{ "Hello, " + this.user.name }}</h2>
        <router-link class="link" :to="{ name: 'dashboard' }">
            Dashboard
        </router-link>
        <router-link class="link" :to="{ name: 'add' }">
            Add new works
        </router-link>
        <router-link class="link" :to="{ name: 'login' }">
            Log out
        </router-link>
    </nav>
</template>

<style scoped>
#app-name {
    margin: 0;
}

.nav-container {
    display: flex;
    align-items: baseline;
    padding: 15px 5px;
    gap: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
}

.link {
    text-decoration: none;
    color: grey;
}

.link:visited {
    color: grey;
}

.link:hover {
    color: white;
}
</style>