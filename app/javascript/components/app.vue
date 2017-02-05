<template>
  <div>
    Hello {{ hello }}
  </div>
</template>

<script>
const Vue = require("vue");
const contacts = require("helpers/resources").contacts;

module.exports = Vue.extend({
  data() {
    return {
      contacts: [],
      hello: "world",
    };
  },

  created() {
    contacts.get().then((resp) => {
      this.contacts = resp.data;
    }, (resp) => {
      console.error("Error fetching contacts");
    });
  },

  methods: {
  },
});
</script>