const App = require("components/app.vue");

if (document.getElementById("app")) {
  new App().$mount("#app");
}