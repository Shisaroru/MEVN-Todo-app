<template>
    <AppHeader></AppHeader>
    <h1>Add new work</h1>
    <form @submit.prevent="createWork">
        <label for="name">Work name</label>
        <input type="text" name="name" id="name" v-model="formInput.name">
        <label for="details">Description</label>
        <input type="text" name="details" id="details" v-model="formInput.details">
        <label for="expireDate">Expire Date</label>
        <VueDatePicker v-model="formInput.date"></VueDatePicker>
        <button>Create</button>
        <div v-if="created">Created</div>
    </form>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import AppHeader from '../components/AppHeader.vue';

import { mapState } from "pinia"
import { useStateStore } from "../store/store.vue";
import axios from 'axios';

export default {
    components: {
        VueDatePicker,
        AppHeader,
    },
    data() {
        return {
            formInput: {
                name: "",
                details: "",
                date: null,
            },
            created: false,
        }
    },
    methods: {
        async createWork() {
            try {
                const result = await axios.post('/api/work/add', {
                    userId: this.user._id,
                    name: this.formInput.name,
                    details: this.formInput.details,
                    expireDate: this.formInput.date,
                }, {
                    headers: {
                        Authorization: this.accessToken,
                    }
                })

                this.formInput = {
                    name: "",
                    details: "",
                    date: null,
                }
                this.created = true
            } catch (error) {
                console.log(error);
            }
        }
    },
    computed: {
        ...mapState(useStateStore, ['accessToken', 'user'])
    }
}
</script>