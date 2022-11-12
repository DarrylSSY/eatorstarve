<template>
    <dialog id="exitModal" class="nes-dialog is-rounded dialog p-2 p-sm-4">
        <div >
            <h4>Wait!</h4>
            <p>Heading back to Home Page?<br><br>
            </p>
            <small>
                Note: You can check this results again by rejoining this room! <br>
            </small>

            <br>
            <button type="button" class="nes-btn is-warning" style="margin-bottom:10px;" @click="home">Yes, Goodbye!</button>
            <a class="nes-btn" @click="closeModal">Cancel</a>
        </div>
    </dialog>

    <body>

        <div class=" container container-sm p-0">

            <!-- Top Bar -->
            <div class=" container container-sm " style="position: relative; width: 100%;">
                <div class="row top gx-4">
                    <div class="col-4 col-md-3 col-lg-2 ps-0 col-content">
                        <button
                            type="button"
                            class="nes-btn is-error"
                            @click="openModal"
                        >
                            Exit
                        </button>
                    </div>

                    <div class="col-4 col-md-6 col-lg-8 col-content px-2 px-sm-4 px-md-5 py-3">
                        <h4 class="logo">Eat or Starve</h4>
                    </div>

                    <div class="user col-4 col-md-3 col-lg-2 col-content nes-container ">
                        <p>
                            {{code}}
                        </p>
                    </div>
                </div>
            </div>
        </div>


            <!-- Result Gallery -->
            <div class="gallery ">

                <div id="suggestions" class="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
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
                        <GenerateResultsComponent :code="code" @get-choices="getChoices" ></GenerateResultsComponent>

                    </div>
                    <div class="arrow-buttons">
                        <button class="carousel-control-prev" @click="playSound" type="button" data-bs-target="#suggestions" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" @click="playSound" type="button" data-bs-target="#suggestions" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <!-- copylink -->
                <div id="link" class="row justify-content-center gy-1">
                        <div class="col-8 col-md-7 col-lg-7 text-center is-rounded ps-0">
                            <input type="text" class="nes-input is-primary text-center" :value="currentUrl" style="width:calc(100% + 16px);"/>
                        </div>
                        <div class="col-8 col-md-3 col-lg-3 p-0 py-0">
                            <button
                            id="copy"
                                type="button"
                                class="nes-btn is-warning text-center"
                                @click="copy_link"
                            >
                                Copy Link
                            </button>
                        <div v-show="copySuccess" class="nes-balloon from-left" data-bs-toggle="popover" data-bs-trigger="focus">
                        <p>Copied!</p>
                    </div>
                </div>
            </div>

        </div>
        <div class="container p-0" style="margin: auto;">
            <DialogueBox :message="joke_list[rand_num]"></DialogueBox>
        </div>
    </body>
</template>

<script>
import DialogueBox from '@/components/DialogueBox.vue';
import GenerateResultsComponent from '@/components/GenerateResultsComponent.vue';
import { useSessionStore } from '../stores/session';
// import axios from "axios";
import router from "@/router";

export default {
    name: "ResultView",
    components: { GenerateResultsComponent, DialogueBox },
    setup() {
        const store = useSessionStore();
        return {
            username: store.getUsername,
            // keywords: store.getKeywords,
            currentUrl: "",
        };
    },
    data() {
        return {
            code: this.$route.params.code,
            choices: 'Test',
            received_keywords: '',
            // parameters: '',
            copySuccess: false,
            joke_list: [
                "What’s the best way to burn vegetables?\n Roast them.",
                "Which condiment adds the most kick?\n Horseradish.",
                "Why are butchers so hilarious?\n They always ham it up.",
                "What’s the best food when you’re so hungry you could eat a house?\n Cottage cheese, wall nuts, and kitchen sink cookies.",
                "Why are chefs so harsh?\n They’re always beating eggs.",
                "What’s the most desirable kitchen appliance?\n A “hot” plate.",
                "Which friends should you always take out to dinner?\n Your taste buds.",
                "How do you make a recipe pop with ginger?\n Play “Spice Girls” songs while you cook.",
                "What’s the best food to eat before a workout?\n Mussels.",
                "What part of a meal makes you the most sleepy?\n The nap-kin.",
                "What’s the main ingredient in canned laughter?\n Processed cheese.",
                "When is eating just like school?\n When you have three or four courses.",
                "What’s the most relaxing type of pasta?<\n Spa-ghetti.",
            ],
            rand_num: 0,
            }
    },
    // async beforeCreate() {
    //     // this.choices = this.received_keywords

    //     // qn 1
    //     await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/cuisine`).then(response => {
    //         this.parameters = response.data + ", ";
    //         // qn 2
    //     });
    //     await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/poultry`).then(response => {
    //         this.parameters += response.data + ", ";
    //     });
    //     // qn 3
    //     await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/price`).then(response => {
    //         if (response.data == "Rich Tai-Tai") {
    //             this.maxprice = 4;
    //             this.minprice = 3;
    //         }
    //         else if (response.data == "Middle-Class") {
    //             this.maxprice = 2;
    //             this.minprice = 1;
    //         }
    //         else {
    //             this.maxprice = 1;
    //             this.minprice = 0;
    //         }
    //     });
    //     // qn 4
    //     await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/texture`).then(response => {
    //         this.parameters += response.data + ", ";
    //     });
    //     // qn 5
    //     await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/base`).then(response => {
    //         this.parameters += response.data + ", ";
    //     });
    //     await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/spice`).then(response => {
    //         if (response.data == "Stomachache Come!!") {
    //             this.parameters += "spicy";
    //         }
    //         else if (response.data == "Little Kick") {
    //             this.parameters += "mild-spicy";
    //         }
    //         else {
    //             this.parameters += "non-spicy";
    //         }
    //     });
    //     await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/room/${this.code}/uniqueness`).then(response => {
    //         if (response.data == "Exotic") {
    //             this.parameters += ", unique";
    //         }
    //         else {
    //             this.parameters += " ";
    //         }
    //         // const keywords = useSessionStore()
    //         // keywords.setKeywords(this.parameters)
    //     });
    //     await axios.get(`${process.env.VUE_APP_BACKEND_URL}api/createdroom/info/${this.code}`).then(response => {
    //         this.parameters += response.data["settings"];
    //         this.coordinates += response.data["coordinates"];
    //     });
    //     // this.$emit("getChoices", this.parameters);
    //     // generate place

    // },


    created() {
    this.currentUrl = window.location.href;
    },

    beforeMount() {
        this.rand_num = Math.floor(Math.random() * this.joke_list.length)
    },

    // async mounted() {
    //     if (this.keywords == '') {
    //         this.choices = await fetchOnClient(/* ... */)
    //     }
    // },

    methods: {
        home: function () {
            let buttonpress = new Audio("../../buttonpress.mp3");
            buttonpress.play();
            router.push("/");
        },
        openModal: function() {
            document.getElementById('exitModal').showModal();
            let buttonpress = new Audio("../../buttonpress.mp3");
            buttonpress.play();
        },
        closeModal: function() {
            document.getElementById('exitModal').close()
            let buttonpress = new Audio("../../buttonpress.mp3");
            buttonpress.play();
        },
        playSound() {
            let buttonpress = new Audio("../../buttonpress.mp3");
            buttonpress.play();
        },
        // getChoices: function(choices) {
        //     this.received_keywords = choices
        // },
        copy_link: async function () {
            this.copySuccess = true;
            try {
                let buttonpress = new Audio("../../buttonpress.mp3");
                buttonpress.play();
                await navigator.clipboard.writeText(window.location.href);
                setTimeout(() => this.copySuccess = false, 5000)
            }
            catch ($e) {
                alert("Error copying link to clipboard");
            }
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
    font-size: 2vw;
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
    padding-top: 140px;
    padding-bottom: 140px;
    width: 75%;
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
    /* padding: 40px 60px; */
    width: fit-content;
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

#link {
    margin-top: 10px;
    width: 100%;
}

#copy {
    height: 85%;
}

#link .nes-input {
    height: 85;
}

.nes-balloon{
    position: absolute;
    bottom: 150px;
    right: 0px;
    z-index: 1;
}

@media screen and (max-width: 575px) {
        .logo {
            font-size: 1.8vh;
        }
        .gallery {
            margin: 0;
            width: 100%;
        }

    }


</style>
