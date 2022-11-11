<template>
    <dialog id="exitModal" class="nes-dialog is-rounded dialog">
        <div >
            <h4>Wait!</h4>
            <p>Heading back to Home Page?<br><br>
            </p>
            <small>
                Note: You can check this results again by rejoining this room! <br>
            </small>

            <br>
            <button type="button" class="nes-btn is-warning" style="margin-bottom:10px;" @click="home">Yes, Goodbye!</button>
            <a class="nes-btn" onclick="document.getElementById('exitModal').close()">Cancel</a>
        </div>
    </dialog>

    <body>

        <div class=" container container-sm p-0" style="align-items: end; height:100%">

            <!-- Top Bar -->
            <div class=" container container-sm " style="position: relative; width: 100%;">
                <div class="row top gx-4">
                    <div class="col-3 col-md-2 ps-0 col-content">
                        <button
                            type="button"
                            class="nes-btn is-error"
                            onclick="document.getElementById('exitModal').showModal();"
                        >
                            Exit
                        </button>
                    </div>

                    <div class="col-6 col-md-8 col-content px-2 px-sm-4 px-md-5 py-4 py-sm-2 py-md-2">
                        <h4 class="logo">Eat or Starve</h4>
                    </div>

                    <div class="user col-3 col-md-2 col-content nes-container">
                        {{ username }}
                    </div>
                </div>
            </div>
            


            <!-- Result Gallery -->
            <div class="gallery">
                <div id="suggestions" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner nes-container px-1 py-2 p-sm-3">
                        <!-- <div v-for="(details, name) in top3_locations" :key="name" class="carousel-item active">
                            <div class="card">
                                <div class="row gx-4">
                                    <div class="col-md-4">
                                        <img :src="details.img_url" class="img-fluid rounded-start" alt="result1">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">{{name}}</h5>
                                            <div class="card-text">
                                                {{details.rating}} 
                                                <br>
                                                {{details.type}}
                                                <br>
                                                {{details.address}}
                                                <br>
                                                Located in: {{details.building_name}}
                                                <br>
                                                Status: {{details.opening_time}}
                                                <div class="row">
                                                    <div v-for="tag in tags" :key="tag.id" class="col">
                                                        <a class="nes-btn is-error tag-style" :href="'https://www.google.com/search?q=' + tag" target="_blank">
                                                            <span>{{tag}}</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
                                            <!-- <button type="button" class="nes-btn is-warning open_map" @click="window.location.href='map_url'">Open URL</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <GenerateResultsComponent :code="code"></GenerateResultsComponent>

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

        </div>
        <UsernameCheckerComponent />
        <div class="container p-0" style="margin: auto;">
            <DialogueBox :message="keywords" type="developer"></DialogueBox>
        </div>
    </body>
</template>

<script>
import DialogueBox from '@/components/DialogueBox.vue';
import GenerateResultsComponent from '@/components/GenerateResultsComponent.vue';
import { useSessionStore } from '../stores/session';
import router from "@/router";
import UsernameCheckerComponent from '@/components/UsernameCheckerComponent.vue';

export default {
    name: "ResultView",
    components: { DialogueBox, GenerateResultsComponent, UsernameCheckerComponent },
    setup() {
        const store = useSessionStore();
        return {
            username: store.getUsername,
            keywords: store.getKeywords,
        };
    },
    data() {
        return {
            code: this.$route.params.code,
            }
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
    position: absolute;
    top: 0;
    width: 100%;
}

.col-content {
    height: 70px;
}

button.is-error {
    width: 100%;
    height: 62.4px;
}

.logo {
    /* padding-top: 17.8px; */
    text-align: center;
    margin: 0;
    font-size: 3.2vw ;
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
    display: block;
    overflow: auto;
    /* background-attachment: fixed; */
    /* box-shadow: 7px 12px 18px rgba(0, 0, 0, 0.25); */
    /* align-items: center; */

    /* background-color: black; */
}

.carousel-inner {
    margin: auto;
    height: 50%;
}

.gallery {
    margin: auto;
    padding-top: 20vh;
    padding-bottom: 120px;
    width: 80%;
    /* height:max-content; */
    /* margin-bottom: 200px; */
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
    padding: 40px 60px;
    width: 40%;
}

small {
    text-align: left;
}

/* .tag-style {
    font-size: 8pt;
    height: 30px;
    padding: 3px 10px;
    width: auto;
} */

.card-body .col {
    /* width: fit-content; */
    width: fit-content;
    /* margin: 1em auto; */
    /* padding: 5px; */
}

.card-body .row {
    width: auto;
}


</style>