<template>
  <div>
    <div class="header">
      <router-link to="/contacts/new">+ Create new</router-link>
    </div>

    <div class="sidebar">
      <contacts-list :contacts="contacts"></contacts-list>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
const _ = require("underscore");
const Vue = require("vue");
const ContactsList = require("components/contacts-list.vue");
const contacts = require("helpers/resources").contacts;
const bus = require("helpers/bus");

module.exports = Vue.extend({
  components: {
    ContactsList
  },

  data() {
    return {
      contacts: [],
    };
  },

  created() {
    contacts.get().then((resp) => {
      this.contacts = resp.data;
      this.sortContacts();
    }, (resp) => {
      console.error("Error fetching contacts");
    });

    bus.$on("contact-created", (contact) => {
      this.contacts.push(contact);
      this.$nextTick(() => {
        this.sortContacts();
      });
    });

    bus.$on("contact-updated", (contact) => {
      var found = _.find(this.contacts, { id: contact.id });
      if (!found) return;

      _.extend(found, contact);

      this.sortContacts();
    });

    bus.$on("contact-deleted", (contact) => {
      var found = _.find(this.contacts, { id: contact.id });
      if (!found) return;

      this.contacts = _.without(this.contacts, found);
    });
  },

  methods: {
    sortContacts() {
      console.log("Sort contacts");
      this.contacts = _.sortBy(this.contacts, function(contact) { return contact.last_name; });
    },
  },
});
</script>
