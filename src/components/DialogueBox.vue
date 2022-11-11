<template>
    <!-- <div class="container-sm" style="margin: auto;"> -->
    <div class="container box nes-container is-rounded p-1"> 
        <div class="row" style="width: 100%; margin:auto;">
            <div class="col-3 col-sm-2 col-md-2 col-lg-2 p-0" style="display: flex; justify-content:center;">
                <i class="nes-octocat animate"></i>
            </div>
            <div class="col-9 col-sm-9 col-md-9 col-lg-10 text text-break px-2">
                <p v-if="message.includes('spicy')">
                    <b>THE GROUP'S SELECTION:</b> 
                    <br>{{message}}
                </p>
                <div v-else>
                    <p class="typewriter d-none d-lg-block ">
                        {{message}}
                    </p>
                    <p class="d-lg-none d-md-block">
                        {{message}}
                    </p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "DialogueBox",
    props: {
        message: String,
        // type: String,
        question: String,
        category: String,
    },
    
    created() {
    setTimeout(() => this.visible =  ``, 3500)
    },
    async mounted() {
        console.log(this.text)
    }
}
</script>

<style>
    .text p {
        margin: 0;
    }

    .box {
        height: 120px;
        width: 98vw;
        position: fixed;
        bottom: 0;
        box-sizing: border-box;
    }

    .text {
        padding: 10px 30px 0px 30px;
        /* text-align: center; */
        align-items: center;
    }
/* 
    .col-1, .col-11  {
        height: 72px
    } */

    .profile {
        width: 15vw;
        right: -15px;
        position: absolute;
        bottom: -4px;
        }

    .question {
        padding-top: 25px;
    }

    .typewriter {
        overflow: hidden; /* Ensures the content is not revealed until the animation */
        /* border-right: .15em solid orange; The typwriter cursor */
        white-space: nowrap; /* Keeps the content on a single line */
        /* margin: 0 auto; Gives that scrolling effect as the typing happens */
        letter-spacing: .15em; /* Adjust as needed */
        /* margin: 0;
        margin-right: auto; */
        animation: 
            typing 2.5s steps(40, end),
            blink-caret .75s step-end infinite;
    }

    /* The typing effect */
    @keyframes typing {
        from { width: 0 }
        to { width: 100% }
    }

    /* The typewriter cursor effect */
    /* @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: orange; }
    } */

</style>