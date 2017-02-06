<template>
  <div>
    <ul>
      <li class="header"><strong>{{ contacts.length }} Contacts</strong></li>
      <li v-for="contact in contacts">
        <router-link :to="'/contacts/'+ contact.id" :exact="true">
          {{ contact.first_name }} {{ contact.last_name }}<br>
          {{ contact.email }} {{ contact.phone }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
const Vue = require("vue");
const contacts = require("helpers/resources").contacts;

module.exports = Vue.extend({
  props: {
    contacts: {
      type: Array,
      required: true
    }
  },

  methods: {
  },
});
</script>
