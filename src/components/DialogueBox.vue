<template>
    <div class="box nes-container is-rounded">
        <div v-if="type == 'developer'" class="row">
            <div class="col-1">
                <i class="nes-octocat animate"></i>
            </div>
            <div class="col-11 text">
                <p class="typewriter">{{text}}</p>
            </div>
        </div>


        <div v-if="type == 'user'" >
            <h5 class="typewriter question" style="text-align: center; margin:auto">{{ question }} {{ category }}!</h5>
            <img
                class="profile"
                :src="
                'https://avatars.dicebear.com/api/pixel-art/' + username + '.svg'
                "
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "DialogueBox",
    props: {
        message: String,
        type: String,
        question: String,
        category: String,
    },
    data() {
        return {
            text: this.message
        }
    },
    
    created() {
    setTimeout(() => this.visible =  ``, 3500)
    },
}
</script>

<style>
    .box {
        height: 120px;
        width: 1300px;
        position: fixed;
        bottom: 0;
    }

    .text {
        padding: 10px 30px 0px 30px;
        /* text-align: center; */
        align-items: center;
    }

    .col-1, .col-11  {
        height: 72px
    }

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