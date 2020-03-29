<template>
    <v-app>
        <v-app-bar
                app
                color="primary"
                v-if="!$route.meta.usesSideNav"
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
                    @click="goToChatPage"
            >
                <span class="mr-2">Chat with a Medic</span>
                <v-icon>mdi-chat</v-icon>
            </v-btn>
            <v-btn v-if="authUser" @click="logout" text>Logout</v-btn>
        </v-app-bar>

        <v-content>
            <div id="firebaseui-auth-container" class="mt-3"></div>
            <router-view :authUser="authUser" />
        </v-content>
    </v-app>
</template>

<script>
    import VolunteerDialog from "./components/VolunteerDialog";
    import db from "./db";
    import firebase from "firebase";

    export default {
        name: 'App',
        components: {
            VolunteerDialog
        },

        data: () => ({
            authUser: null,
            authDialog: false
        }),
        mounted() {
            firebase.auth().onAuthStateChanged(authUser => {
                if (authUser) {
                    this.authUser = authUser
                    console.log('man role', this.authUser);
                }
            })
        },
        methods: {
            goToChatPage() {
                if (this.authUser) {
                    let pageName =  '';
                    db.collection("medics").where("email", "==", this.authUser.email)
                        .get().then(docs => {
                        pageName = (docs.size > 0 ? 'MedicChat' : 'UserChat');
                        this.$router.push({name: pageName});
                    })
                } else {
                    this.authDialog = true;
                    const firebaseui = require('firebaseui');
                    const authUI = new firebaseui.auth.AuthUI(firebase.auth());
                    var uiConfig = {
                        callbacks: {
                            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                                // User successfully signed in.
                                // Return type determines whether we continue the redirect automatically
                                // or whether we leave that to developer to handle.
                                return true;
                            },
                            uiShown: function() {
                                // The widget is rendered.
                                // Hide the loader.
                                document.getElementById('loader').style.display = 'none';
                            }
                        },
                        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                        signInFlow: 'popup',
                        signInSuccessUrl: '/',
                        signInOptions: [
                            // Leave the lines as is for the providers you want to offer your users.
                            firebase.auth.EmailAuthProvider.PROVIDER_ID,
                            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                            firebase.auth.TwitterAuthProvider.PROVIDER_ID
                        ],
                        // Terms of service url.
                        tosUrl: '<your-tos-url>',
                        // Privacy policy url.
                        privacyPolicyUrl: '<your-privacy-policy-url>'
                    };
                    authUI.start('#firebaseui-auth-container', uiConfig)
                }
            },
            logout: function () {
                firebase.auth()
                    .signOut()
                    .then(() => {
                        this.authUser = null;
                        //this.$router.push("login");
                    });
            },

        }
    };
</script>
<style>
    .theme--light.v-btn {
        color: white;
    }
    .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
        color: white !important;
    }
    .theme--light.v-list-item .v-list-item__subtitle, .theme--light.v-list-item .v-list-item__action-text {
        color: white !important;
    }
</style>
