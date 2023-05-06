<template>
    <AppHeader></AppHeader>
    <h1>Add new work</h1>
    <form @submit.prevent="updateWork">
        <label for="name">Work name</label>
        <input type="text" name="name" id="name" v-model="formInput.name">
        <label for="details">Description</label>
        <input type="text" name="details" id="details" v-model="formInput.details">
        <label for="expireDate">Expire Date</label>
        <VueDatePicker v-model="formInput.date"></VueDatePicker>
        <button>{{ this.id ? "Update" : "Create" }}</button>
        <div v-if="created">{{ this.id ? "Updated" : "Created" }}</div>
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
    props: {
        id: {type: String, required: true},
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
        async updateWork() {
            try {
                const result = await axios.patch('/api/work/edit', {
                    _id: this.id,
                    name: this.formInput.name,
                    details: this.formInput.details,
                    expireDate: this.formInput.date,
                }, {
                    headers: {
                        Authorization: this.accessToken,
                    }
                })

                this.created = true
            } catch (error) {
                console.log(error);
            }
        }
    },
    computed: {
        ...mapState(useStateStore, ['accessToken', 'user'])
    },
    async created() {
        try {
            const result = await axios.post('/api/work/getOneWork', {
                id: this.id,
            }, {
                headers: {
                    Authorization: this.accessToken,
                }
            })

            this.formInput = {
                name: result.data.result.name,
                details: result.data.result.details,
                date: result.data.result.expireDate,
            }
        } catch (error) {
            console.log(error);
        }
    }
}
</script>