<template>
  <v-app>
    <v-app-bar
      app
      color="#4ABB8A"
      dark
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
      <router-link to="/volunteer" tag="span" class="mr-2">
        <v-btn text>
          Volunteer
        </v-btn>
      </router-link>
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
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Chat with a Medic</span>
        <v-icon>mdi-chat</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
<!--      <router-view/>-->
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
