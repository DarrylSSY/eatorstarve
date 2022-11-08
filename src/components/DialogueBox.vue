<template>
    <div class="row gx-4">
        <div class="nes-container col-12 box is-rounded">
            {{text}}
        </div>
    </div>
</template>

<script>
export default {
    name: "DialogueBox",
    props: {
        message: String,
    },
    data() {
        return {
            text: this.message
        }
    }
}
</script>

<style>
    .box {
        height: 120px;
        width: 1300px;
        position: fixed;
        bottom: 0;
        background-color: white;
    }
</style>