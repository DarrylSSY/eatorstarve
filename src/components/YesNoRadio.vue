<template>

  <label>
    <input
      v-model="value"
      type="radio"
      class="nes-radio"
      name="answer"
      checked
      @keydown.enter.prevent="$emit('yesFunction')"
    />
    <span>Yes</span>
  </label>

  <label>
    <input
      v-model="value"
      type="radio"
      class="nes-radio"
      name="answer"
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
