<template>
  <div>
    <form @submit.prevent="createOrUpdate">
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
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      errorMsg: null,
    };
  },

  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      const id = this.$route.params.id;

      if (id) {
        // Load contact to edit
        contacts.get({ id: id }).then((resp) => {
          this.id = resp.data.id;
          this.firstName = resp.data.first_name;
          this.lastName = resp.data.last_name;
          this.email = resp.data.email;
          this.phone = resp.data.phone;
        }, (resp) => {
          console.error("Error fetching contact");
        });
      }
    },

    resetForm() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.phone = "";
    },

    getParams() {
      return {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        phone: this.phone
      };
    },

    createOrUpdate() {
      if (this.id) {
        this.update();
      } else {
        this.create();
      }
    },

    create() {
      contacts.save(this.getParams()).then((resp) => {
        bus.$emit("contact-created", resp.data);

        this.resetForm();

        this.$router.push('/contacts/'+ resp.data.id);
      }, (resp) => {
        console.error("Failed to create contact", resp);
        this.errorMsg = resp.body.join(", ");
      });
    },

    update() {
      contacts.update({ id: this.id }, this.getParams()).then((resp) => {
        bus.$emit("contact-updated", resp.data);

        this.resetForm();

        this.$router.push('/contacts/'+ resp.data.id);
      }, (resp) => {
        console.error("Failed to update contact", resp);
        this.errorMsg = resp.body.join(", ");
      });
    }
  },
});
</script>
