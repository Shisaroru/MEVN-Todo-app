<style scoped>
.container {
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 10px;
    min-height: 85vh;
}

.input-field {
    padding: 5px 5px;
    margin-left: 5px;
    width: 40%;
}

#title {
    text-align: center;
}

.picker {
    display: flex;
    width: 30%;
}

.submit {
    width: 20%;
    align-self: center;
    padding: 3px;
    border-radius: 5px;
    background-color: rgb(17, 186, 63);
    color: white;
}

.text {
    align-self: center;
    font-size: 1.2em;
}
</style>

<template>
    <AppHeader></AppHeader>
    <h1 id="title">Edit work</h1>
    <form class="container" @submit.prevent="updateWork">
        <div>
            <label for="name">Work name</label>
            <input type="text" name="name" id="name" v-model="formInput.name" required class="input-field">
        </div>
        <div>
            <label for="details">Description</label>
            <input type="text" name="details" id="details" v-model="formInput.details" required class="input-field">
        </div>
        <div class="picker">
            <label for="expireDate">Expire Date</label>
            <VueDatePicker v-model="formInput.date"></VueDatePicker>
        </div>
        <button class="submit">Update</button>
        <div v-if="created" class="text">Updated</div>
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
        id: { type: String, required: true },
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