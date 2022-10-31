<template>
<div class="nes-container">
    <label>
      <input v-model="response" type="radio" class="nes-radio"  value="yes"  @keyup.enter="onEnter" />
      <span>Yes</span>
    </label>
    <label>
      <input  v-model="response" type="radio" class="nes-radio" value="no" @keyup.enter="onEnter" />
      <span>No</span>
    </label>

    {{ response }}
</div>
</template>

<script>
export default {
  name: "YesNoRadio",
  prop: {
    test: String
  },
  data() {
    return {
      response: ''
    }
  },
  methods: {
    onEnter: function() {
      alert('success');
    }
  }
}
</script>

<style>

</style>