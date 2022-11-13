<template>
  <label>
    <input
      v-model="value"
      checked
      class="nes-radio"
      name="answer"
      type="radio"
      @keydown.enter.prevent="$emit('yesFunction')"
    />
    <span>Yes</span>
  </label>

  <label>
    <input
      v-model="value"
      class="nes-radio"
      name="answer"
      type="radio"
      @keydown.enter.prevent="$emit('noFunction')"
    />
    <span>No</span>
  </label>
</template>

<script>
export default {
  name: "YesNoRadio",
  prop: {
    test: String,
  },

  emits: {
    yesFunction: null,
    noFunction: null,
  },

  data() {
    return {
      response: "",
    };
  },
};
</script>

<style></style>
