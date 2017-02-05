<template>
  <div>
    Hello {{ hello }}
  </div>
</template>

<script>
const Vue = require("vue");

module.exports = Vue.extend({
  data() {
    return {
      hello: "world",
    };
  },

  methods: {
  },
});
</script>