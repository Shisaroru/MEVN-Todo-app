<template>
    <AppHeader></AppHeader>
    <div>
        <h1>This is dashboard</h1>
        <button type="button" @click="this.type = 'inprogress'">Inprogress</button>
        <button type="button" @click="this.type = 'finished'">Finished</button>
        <button type="button" @click="this.type = 'late'">Late</button>
        <div v-for="work in works">
            <div v-if="(type === 'inprogress' && new Date(work.expireDate) > Date.now() && work.finished === false)">
                {{ work.name }}
                <div>
                    <router-link :to="{ path: `/edit/${work._id}`}">Edit</router-link>
                </div>
                <button type="button" @click="deleteWork(work._id)">Delete</button>
                <button type="button" @click="toggleFinished(work._id, work.finished)">Finish</button>
            </div>
            <div v-else-if="(type === 'finished' && work.finished === true)">
                {{ work.name }}
                <div>
                    <router-link :to="{ path: `/edit/${work._id}` }">Edit</router-link>
                </div>
                <button type="button" @click="deleteWork(work._id)">Delete</button>
                <button type="button" @click="toggleFinished(work._id, work.finished)">Unfinish</button>
            </div>
            <div v-else-if="(type === 'late' && new Date(work.expireDate) <= Date.now() && work.finished === false)">
                {{ work.name }}
                <div>
                    <router-link :to="{ path: `/edit/${work._id}` }">Edit</router-link>
                </div>
                <button type="button" @click="deleteWork(work._id)">Delete</button>
                <button type="button" @click="toggleFinished(work._id, work.finished)">Finish</button>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from '../components//AppHeader.vue'

import { mapState } from "pinia"
import { useStateStore } from "../store/store.vue";
import axios from 'axios';

export default {
    components: {
        AppHeader
    },
    data() {
        return {
            works: [],
            type: "inprogress",
        }
    },
    async created() {
        try {
            const result = await axios.post('/api/work/getWorks', {
                userId: this.user._id,
            }, {
                headers: {
                    Authorization: this.accessToken,
                }
            })

            this.works = result.data.result;
        } catch (error) {
            console.log(error);
        }
    },
    computed: {
        ...mapState(useStateStore, ['accessToken', 'user'])
    },
    methods: {
        async deleteWork(id) {
            try {
                const result = await axios.delete('/api/work/delete', {
                    headers: {
                        Authorization: this.accessToken,
                    },
                    data: {
                        _id: id,
                    }
                })

                this.works = this.works.filter((value) => {
                    return value._id !== id;
                });
            } catch (error) {
                console.log(error);
            }
        },
        async toggleFinished(id, finishStatus) {
            try {
                const result = await axios.post('/api/work/finished', {
                    _id: id,
                    finished: !finishStatus,
                }, {
                    headers: {
                        Authorization: this.accessToken,
                    }
                })

                this.works = this.works.map((work) => {
                    if (work._id === id) {
                        return {...work, finished: !finishStatus}
                    }
                    return work
                })

            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>