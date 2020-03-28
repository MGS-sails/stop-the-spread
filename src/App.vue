<template>
  <v-app>
    <v-app-bar
      app
      color="#4ABB8A"
      dark
      v-if="!route.meta.usesSideNav"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo1.svg')"
          transition="scale-transition"
          width="40"
        />
      </div>

      <router-link to="/" tag="span" class="mr-2">
        <v-btn text>
          Home
        </v-btn>
      </router-link>
      <router-link to="/about" tag="span" class="mr-2">
        <v-btn text>
          About
        </v-btn>
      </router-link>
      <VolunteerDialog/>
      <router-link to="/news" tag="span" class="mr-2">
        <v-btn text>
          News
        </v-btn>
      </router-link>
      <router-link to="/blog" tag="span" class="mr-2">
        <v-btn text>
          Blog
        </v-btn>
      </router-link>

      <v-spacer></v-spacer>


      <v-btn
              text
              @click="$router.push({name: 'User-Chat'})"
      >
        <span class="mr-2">Report your symptoms</span>
<!--        <v-icon>mdi-chat</v-icon>-->
      </v-btn>

      <v-btn
        text
        @click="goToAuthProtectedPage('User-Chat')"
      >
        <span class="mr-2">Chat with a Medic</span>
        <v-icon>mdi-chat</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view :authUser="user"/>
    </v-content>
  </v-app>
</template>

<script>
import VolunteerDialog from "./components/VolunteerDialog";
import db from "./db";
import Firebase from "firebase"
export default {
  name: 'App',
  components: {
    VolunteerDialog
  },

  data: () => ({
    authUser: null
  }),
  mounted() {
    Firebase.auth().onAuthStateChanged(authUser => {
      if(authUser) {
        this.authUser = authUser;
      }
    })
  },
  methods: {
    goToAuthProtectedPage(pageName) {
      if (this.authUser) {
        this.$router.push(pageName);
      } else {

      }
    }
  }
};
</script>
