<script>
import { defineStore } from 'pinia';

export const useStateStore = defineStore('state', {
    state: () => ({
        accessToken: "",
        user: {},
    }),
})
</script>