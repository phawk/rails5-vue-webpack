const Vue = require("vue");
const VueResource = require("vue-resource");
const exports = {};

Vue.use(VueResource);

exports.contacts = Vue.resource("/api/contacts{/id}");

module.exports = exports;
