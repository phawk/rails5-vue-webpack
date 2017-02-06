<template>
  <div>
    <form @submit.prevent="create">
      <input type="text" v-model="firstName" placeholder="First name">
      <input type="text" v-model="lastName" placeholder="Last name">
      <input type="text" v-model="email" placeholder="Email">
      <input type="text" v-model="phone" placeholder="Phone">

      <input type="submit" value="Save">

      <div class="errorMsg" v-show="errorMsg">{{ errorMsg }}</div>
    </form>
  </div>
</template>

<script>
const Vue = require("vue");
const contacts = require("helpers/resources").contacts;
const bus = require("helpers/bus");

module.exports = Vue.extend({
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      errorMsg: null,
    };
  },

  methods: {
    create() {
      var params = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        phone: this.phone
      };

      contacts.save(params).then((resp) => {
        bus.$emit("contact-created", resp.data);
      }, (resp) => {
        console.error("Failed to create contact", resp);
        this.errorMsg = resp.body.join(", ");
      });
    }
  },
});
</script>
