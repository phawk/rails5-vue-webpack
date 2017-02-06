const Vue = require("vue");
const VueRouter = require("vue-router");
const App = require("components/app.vue");
const NoContact = require("components/no-contact.vue");
const ContactForm = require("components/contact-form.vue");
const Contact = require("components/contact.vue");
const NotFound = require("components/not-found.vue");

Vue.use(VueRouter)

const routes = [
  { path: "/", component: NoContact },
  { path: "/contacts/new", component: ContactForm },
  { path: "/contacts/:id/edit", component: ContactForm },
  { path: "/contacts/:id", component: Contact },
  { path: '*', component: NotFound },
];

const router = new VueRouter({
  mode: "history",
  routes // short for routes: routes
});

new Vue({
  router,

  components: {
    "app": App,
  }
}).$mount("#app");
