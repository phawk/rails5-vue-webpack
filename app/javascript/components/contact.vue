<template>
  <div>
    <h1>{{ contact.first_name }} {{ contact.last_name }}</h1>

    <div class="actions">
      <a href="" @click.prevent="deleteContact">Delete</a>
      <router-link :to="'/contacts/'+ contact.id +'/edit'">Edit</router-link>
    </div>

    <p>
      <strong>Email</strong>
      {{ contact.email }}
    </p>
    <p>
      <strong>Telephone</strong>
      {{ contact.phone }}
    </p>
  </div>
</template>

<script>
const Vue = require("vue");
const contacts = require("helpers/resources").contacts;
const bus = require("helpers/bus");

module.exports = Vue.extend({
  data() {
    return {
      contact: {},
    };
  },

  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },

  created () {
    this.fetchData();
  },

  methods: {
    fetchData() {
      var id = this.$route.params.id;

      contacts.get({ id: id }).then((resp) => {
        this.contact = resp.data;
      }, (resp) => {
        console.error("Error getting contact", resp);
      });
    },

    deleteContact() {
      if (window.confirm("Are you sure?")) {
        contacts.delete({ id: this.contact.id }).then((resp) => {
          console.log("contact deleted");
          bus.$emit("contact-deleted", this.contact);

          this.$router.push('/');
        }, (resp) => {
          console.error("Error getting contact", resp);
        });
      }
    }
  },
});
</script>
