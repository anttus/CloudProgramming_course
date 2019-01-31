<template>
  <div class="list-message">
    <div class="message">{{date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() +": "+ message.title}}</div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ["message"],
  data() {
      return {
          date: new Date,
      }
  }
};
</script>

<style scoped>
.list-message {
  margin-top: 5px;
  max-width: 900px;
  display: flex;
}

.message {
  padding-left: 10px;
  text-align: left;
  align-content: center;
}
</style>

