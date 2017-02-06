<template>
  <div>
    <div class="main-header">
      <ul class="nav">
        <li>
          <router-link to="/contacts/new">+ Create new</router-link>
        </li>
      </ul>
      <h1>Contacts</h1>
    </div>

    <div class="sidebar">
      <contacts-list :contacts="contacts"></contacts-list>
    </div>

    <router-view class="container"></router-view>
  </div>
</template>

<script>
const _ = require("underscore");
const ContactsList = require("components/contacts-list.vue");
const api = require("helpers/api");
const bus = require("helpers/bus");

module.exports = {
  components: {
    ContactsList
  },

  data() {
    return {
      contacts: [],
    };
  },

  created() {
    api.get("contacts").then((resp) => {
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
      this.contacts = _.sortBy(this.contacts, function(contact) { return contact.last_name; });
    },
  },
};
</script>

<style>
html, body {
  height: 100%;
  min-height: 100%;
}

body {
  $font-stack: -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
    "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

  margin: 0;
  font-family: $font-stack;
  position: relative;
}

.main-header {
  background-color: #f9f9f9;
  border-bottom: solid 1px #d7d7d7;
  padding: 15px 30px;

  h1 {
    font-size: 1em;
    margin: 0;
  }
  .nav {
    float: right;
    text-align: right;
    list-style: none;
    margin: 0;
    padding: 0;
    &>li {
      display: inline-block;
      margin-left: 15px;
    }

    a {
      text-decoration: none;
    }
  }
}

.sidebar {
  top: 49px;
  left: 0;
  bottom: 0;
  position: absolute;
  width: 300px;
  border-right: solid 1px #d7d7d7;
  overflow-y: auto;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    & > li {
      padding: 0;
      &.header {
        padding: 10px 20px;
      }
      border-bottom: solid 1px #efefef;

      a {
        display: block;
        padding: 20px;
        text-decoration: none;
        color: #212121;

        &:hover {
          background-color: #f9f9f9;
        }
      }
    }
  }
}

.container {
  margin-left: 301px;
  padding: 30px;
}
</style>