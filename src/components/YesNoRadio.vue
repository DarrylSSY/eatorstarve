<template>
  <!-- <div class="nes-container"> -->
    <!-- <div :style="{'visibility': visible}" class="nes-container yesno d-inline-block"> -->

    <label>
      <input v-model="value" type="radio" class="nes-radio" name="answer" checked @keydown.enter.prevent="$emit('yesFunction')"/>
      <span>Yes</span>
    </label>


    <label>
      <input v-model="value" type="radio" class="nes-radio" name="answer" @keydown.enter.prevent="$emit('noFunction')" />
      <span>No</span>
    </label>

    <!-- </div> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: "YesNoRadio",
  prop: {
    test: String,
  },

  emits: {
    yesFunction: null,
    noFunction: null
  },

  data() {
    return {
      response: ''
    }
  },
}
</script>

<style>

</style>