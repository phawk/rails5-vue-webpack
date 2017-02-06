<style scope>
table {
  margin: 30px 0;
  border: solid 1px #efefef;
  padding: 5px;

  th, td {
    padding: 5px;
  }

  th {
    text-align: left;
  }
}

.actions {
  list-style: none;
  margin: 0;
  padding: 0;
  &>li {
    display: inline-block;
    margin-right: 15px;
  }
}
</style>

<template>
  <div>
    <h1>{{ contact.first_name }} {{ contact.last_name }}</h1>

    <ul class="actions">
      <li>
        <router-link :to="'/contacts/'+ contact.id +'/edit'">Edit</router-link>
      </li>
      <li>
        <a href="" @click.prevent="deleteContact">Delete</a>
      </li>
    </ul>

    <table>
      <thead>
        <tr>
          <th colspan="2">Contact information</th>
        </tr>
      </thead>
      <tr>
        <th>Email</th>
        <td>{{ contact.email }}</td>
      </tr>
      <tr>
        <th>Phone</th>
        <td>{{ contact.phone }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
const api = require("helpers/api");
const bus = require("helpers/bus");

module.exports = {
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

      api.get("contacts/"+ id).then((resp) => {
        this.contact = resp.data;
      }, (resp) => {
        console.error("Error getting contact", resp);
      });
    },

    deleteContact() {
      if (window.confirm("Are you sure?")) {
        api.delete("contacts/"+ this.contact.id).then((resp) => {
          bus.$emit("contact-deleted", this.contact);
          this.$router.push('/');
        }, (resp) => {
          console.error("Error getting contact", resp);
        });
      }
    }
  },
};
</script>
