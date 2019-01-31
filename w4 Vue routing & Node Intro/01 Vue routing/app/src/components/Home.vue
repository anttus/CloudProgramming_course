<template>
  <div id="app">
    <h1>Simple Vue chat</h1>
    <Messages v-bind:messages="messages"/>
    <AddMessage v-on:add-message="addMessage"/>
  </div>
</template>

<script>
import AddMessage from "./AddMessage";
import Messages from "./Messages";

export default {
  name: "Home",
  components: {
    Messages,
    AddMessage
  },
  props: {},
  data() {
    return {
      messages: []
    };
  },
  methods: {
    addMessage(newMessage) {
      this.messages = [...this.messages, newMessage];
    }
  },
  watch: {
    messages: {
      handler() {
        localStorage.setItem("messages", JSON.stringify(this.messages));
      },
      deep: true
    }
  },
  mounted() {
    if (localStorage.getItem("messages"))
      this.messages = JSON.parse(localStorage.getItem("messages"));
  }
};
</script>

<style scoped>
</style>
