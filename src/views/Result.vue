<template>
    <dialog id="exitModal" class="nes-dialog is-rounded dialog">
        <div >
            <h4>You are about to Exit to Home</h4>
            <p>some text</p>

            <button type="button" class="nes-btn is-warning" style="margin-bottom:10px;" @click="home">Confirm</button>
            <a class="nes-btn" onclick="document.getElementById('exitModal').close()">Cancel</a>
        </div>
    </dialog>

    <body>

        <div class="container-sm">

            <!-- Top Bar -->
            <div class="row top gx-4">
                <div class="col-2 col-md-2 ps-0 col-content">
                    <button
                        type="button"
                        class="nes-btn is-error"
                        onclick="document.getElementById('exitModal').showModal();"
                    >
                        Exit
                    </button>
                </div>

                <div class="col-8 col-content">
                    <h4 class="logo">Eat or Starve</h4>
                </div>

                <div class="user col-2 col-content nes-container">
                    {{ username }}
                </div>
            </div>


            <!-- Result Gallery -->
            <div class="gallery">
                <div id="suggestions" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner nes-container">
                        <div v-for="(details, name) in top3_locations" :key="name" class="carousel-item active">
                            <div class="card">
                                <div class="row gx-4">
                                    <div class="col-md-4">
                                        <img :src="details.img_url" class="img-fluid rounded-start" alt="result1">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">{{name}}</h5>
                                            <p class="card-text">
                                                {{details.rating}} 
                                                <br>
                                                {{details.type}}
                                                <br>
                                                {{details.address}}
                                                <br>
                                                Located in: {{details.building_name}}
                                                <br>
                                                Status: {{details.opening_time}}
                                            </p>
                                            <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
                                            <button type="button" class="nes-btn is-warning open_map" @click="window.location.href='map_url'">Open URL</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="arrow-buttons">
                        <button class="carousel-control-prev" type="button" data-bs-target="#suggestions" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#suggestions" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>

            <DialogueBox message="<insert funny shit>" type="developer"></DialogueBox>
        </div>
    </body>
</template>

<script>
import DialogueBox from '@/components/DialogueBox.vue';
import { useSessionStore } from '../stores/session';
import router from "@/router";

export default {
    name: "ResultView",
    components: { DialogueBox },
    setup() {
        const store = useSessionStore();
        return {
            username: store.getUsername,
        };
    },
    data() {
        return {
            code: this.$route.params.code,
            answered: [],
            // will need retrive data after generation of result
            top3_locations: {
                "Name": {
                    img_url: "",
                    rating: "",
                    type: "",
                    address: "",
                    building_name: "",
                    opening_time: "",
                    tags: [],
                    map_url: ""
                },
                "Name2": {
                    img_url: "",
                    rating: "",
                    type: "",
                    address: "",
                    building_name: "",
                    opening_time: "",
                    tags: [],
                    map_url: ""
                },
            }
        };
    },

    methods: {
        home: function () {
            router.push("/");
        },
    }
    
}
</script>

<style scoped>

div.nes-container {
    background-color: white;
}

.top {
    padding-top: 24px;
}

.col-content {
    height: 70px;
}

button.is-error {
    width: 100%;
    height: 62.4px;
}

.logo {
    padding: 17.8px 0px;
    text-align: center;
    margin: 0;
}

.user {
    padding: 20px;
    text-align: center;
}

body {
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0.3)),
    linear-gradient(0deg,
        rgba(245, 200, 95, 0.66),
        rgba(245, 200, 95, 0.66)),
        url(../assets/bg1.jpeg);
    box-shadow: 7px 12px 18px rgba(0, 0, 0, 0.25);
    /* background-color: black; */
}

.carousel-inner {
    margin: auto;
    height: 460px;
}

.gallery {
    margin: auto;
    margin-top: 60px;
    width: 80%;
    /* border: 4px black solid; */
}

.card, .card .row {
    width: 100%;
    height: 100%;
    border: 0px;
}

.arrow-buttons {
    width: 80%;
    top: 20%
}

.open_map {
    width: 100%;
}

.carousel-control-prev, .carousel-control-next {
    margin: auto 4px;
    background-color: #f7d51d;
    height: 15%;
    width: 6%;
    /* border-radius: 50%; */
}

.dialog {
    padding: 40px;
    width: 40%;
}
</style>