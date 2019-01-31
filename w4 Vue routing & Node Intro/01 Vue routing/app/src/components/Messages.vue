<template>
  <div class="messageContainer">
    <div v-bind:key="message.id" v-for="message in messages">
      <Message v-bind:message="message"/>
    </div>
  </div>
</template>

<script>
import Message from "./Message";

export default {
  name: "Messages",
  components: {
    Message
  },
  props: ["messages"]
};
</script>

<style scoped>
.messageContainer {
  border: 1px solid gray;
  width: 500px;
  align-content: center;
  margin: auto;
  height: 600px;
  overflow: scroll;
}
</style>
