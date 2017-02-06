<template>
  <div>
    <ul>
      <li class="header"><strong>{{ contacts.length }} Contacts</strong></li>
      <li v-for="contact in contacts">
        <router-link :to="'/contacts/'+ contact.id" :exact="true">
          <strong>{{ contact.last_name }}</strong>, {{ contact.first_name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
module.exports = {
  props: {
    contacts: {
      type: Array,
      required: true
    }
  },

  methods: {
  },
};
</script>
