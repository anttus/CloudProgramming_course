<template>
  <div>
    <form @submit="checkForm">
      <input
        ref="messageInput"
        type="text"
        v-model="title"
        name="title"
        placeholder="Kirjoita viesti"
      >
      <button type="submit" value="Lähetä" class="btn">Lähetä</button>
    </form>
  </div>
</template>

<script>
import uuid from "uuid";

export default {
  name: "AddMessage",
  data() {
    return {
      title: "",
      error: ""
    };
  },
  methods: {
    addItem(e) {
      e.preventDefault();
      const newMessage = {
        id: uuid.v4(),
        title: this.title
      };
      // Send up to parent
      this.$emit("add-message", newMessage);
      this.title = "";
    },
    checkForm: function(e) {
      if (this.title) {
        this.addItem(e);
        return true;
      }
      this.error = "";
      if (!this.title);
      e.preventDefault();
    },
  },
  mounted: function() {
    this.$refs.messageInput.focus();
  }
};
</script>

<style scoped>
form {
  display: flex;
  max-width: 500px;
  align-content: center;
  margin: auto;
  margin-top: 40px;
}

input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid rgb(0, 0, 0);
  font-size: 15px;
}

input[type="submit"] {
  flex: 2;
}

.btn {
  padding: 11px;
  font-size: 15px;
  margin-left: 5px;
}
</style>
