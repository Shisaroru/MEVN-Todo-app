<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 15px;
    width: 100%;
}

.navigate {
    width: 15%;
    border: 1px solid black;
    padding: 10px;
    transition: border 0.1s ease-out;
}


.navigate:hover {
    cursor: pointer;
}

.navigate-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 10px;
}

#finished {
    background-color: rgb(17, 186, 63);
    color: white;
}

#late {
    background-color: rgb(207, 10, 10);
    color: white;
}

.work-container {
    display: flex;
    width: 40%;
    justify-content: center;
    border: 1px solid black;
    border-radius: 10px;
    background-color: lightblue;
    padding: 5px;
}

.list-work {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 5px 0;
}

.work-info {
    width: 60%;
    padding: 5px;
}

.work-services {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

a.service-button {
    text-decoration: none;
    color: white;
    display: flex;
    justify-content: center;
    border: 1px solid black;
    border-radius: 5px;
    width: 50%;
    background-color: orange;
}

a.service-button:visited {
    color: white;
}

.service-button {
    color: white;
    width: 50%;
    border: 1px solid black;
    border-radius: 5px;
    padding: 3px;
}

.delete {
    background-color: rgb(207, 10, 10);
}

.finished {
    background-color: rgb(17, 186, 63);
    color: white;
}

.unfinished {
    background-color: grey;
}

.late {
    background-color: rgb(207, 10, 10);
    color: white;
}

.date {
    font-style: italic;
}
</style>

<template>
    <AppHeader></AppHeader>
    <div class="container">
        <div class="navigate-container">
            <button class="navigate" id="inprogress" type="button" @click="this.type = 'inprogress'">Inprogress</button>
            <button class="navigate" id="finished" type="button" @click="this.type = 'finished'">Finished</button>
            <button class="navigate" id="late" type="button" @click="this.type = 'late'">Late</button>
        </div>
        <div v-for="work in works" class="list-work">
            <div v-if="(type === 'inprogress' && new Date(work.expireDate) > Date.now() && work.finished === false)"
                class="work-container">
                <div class="work-info">
                    <h2>{{ work.name }}</h2>
                    <p>{{ work.details }}</p>
                    <p class="date">{{ "Expire " + formatDate(work.expireDate) }}</p>
                </div>
                <div class="work-services">
                    <router-link :to="{ path: `/edit/${work._id}` }" class="service-button">Edit</router-link>
                    <button type="button" @click="deleteWork(work._id)" class="service-button delete">Delete</button>
                    <button type="button" @click="toggleFinished(work._id, work.finished)"
                        class="service-button finished">Finish</button>
                </div>
            </div>
            <div v-else-if="(type === 'finished' && work.finished === true)" class="work-container finished">
                <div class="work-info">
                    <h2>{{ work.name }}</h2>
                    <p>{{ work.details }}</p>
                </div>
                <div class="work-services">
                    <router-link :to="{ path: `/edit/${work._id}` }" class="service-button">Edit</router-link>
                    <button type="button" @click="deleteWork(work._id)" class="service-button delete">Delete</button>
                    <button type="button" @click="toggleFinished(work._id, work.finished)"
                        class="service-button unfinished">Unfinish</button>
                </div>
            </div>
            <div v-else-if="(type === 'late' && new Date(work.expireDate) <= Date.now() && work.finished === false)"
                class="work-container late">
                <div class="work-info">
                    <h2>{{ work.name }}</h2>
                    <p>{{ work.details }}</p>
                    <p class="date">{{ "Deadline was " + formatDate(work.expireDate) }}</p>
                </div>
                <div class="work-services">
                    <router-link :to="{ path: `/edit/${work._id}` }" class="service-button">Edit</router-link>
                    <button type="button" @click="deleteWork(work._id)" class="service-button delete">Delete</button>
                    <button type="button" @click="toggleFinished(work._id, work.finished)"
                        class="service-button finished">Finish</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from '../components//AppHeader.vue'

import { mapState } from "pinia"
import { useStateStore } from "../store/store.vue";
import axios from 'axios';
import { format } from 'timeago.js';

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
                        return { ...work, finished: !finishStatus }
                    }
                    return work
                })

            } catch (error) {
                console.log(error);
            }
        },
        formatDate(date) {
            return format(date)
        }
    }
}
</script>