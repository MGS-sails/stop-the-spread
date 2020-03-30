<template>
    <div>
        <v-navigation-drawer absolute parmanent color="primary" class="sts-sidenav" v-model="drawer">
            <v-list>
                <v-list-item two-line @click="$router.replace('/')" style="color: white !important;">
                    <v-list-item-avatar>
                        <img :src="require('../assets/logo1.svg')">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Available Medics</v-list-item-title>
                        <v-list-item-subtitle>Select a medic to chat with</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item v-for="medic in medics" :key="medic.id" @click="chatWithMedic(medic.id)" style="color: white !important;">
                    <v-list-item-avatar>
                        <img src="https://ptetutorials.com/images/user-profile.png">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{ medic.title + ' ' + medic.firstName + ' ' + medic.lastName }}
                        </v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <div class="sidenav-neighbor">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-row class="text-center messages-area">
                <v-col cols="12" v-if="chatInitiated">
                    <v-card width="800" height="100" v-for="message in currentChat.messages" :key="message.id"
                            class="mb-3 message-card"
                            :class="[message.senderID === authUser.uid ? 'mr-auto' : 'ml-auto']"
                            :color="(message.senderID === authUser.uid ? 'primary' : 'secondary')"
                            shaped style="overflow-y: auto">
                        <v-card-subtitle class="text-right">{{ moment.unix(message.createdAt).format('MM ddd, h:mm:ss') }}</v-card-subtitle>
                        <v-card-text class="text-left">
                            <div :class="{'sent-message': message.senderID === authUser.uid, 'received-message': message.senderID !== authUser.uid}">
                                {{ message.content }}
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" v-else>
                    <div class="display-1">
                        Select a medic to chat with
                    </div>
                </v-col>
            </v-row>

            <div class="mt-3 compose-area" v-if="chatInitiated">
                <v-textarea solo v-model="messageContent" rows="5">
                </v-textarea>
                <v-btn color="primary" @click="sendMessage">Send</v-btn>
            </div>
        </div>


    </div>
</template>

<script>
    import db from "../db";
    import firebase from "firebase";
    import moment from "moment";

    export default {
        name: "UserChat",
        data() {
            return {
                authUser: null,
                medics: [],
                chatInitiated: false,
                currentChat: {
                    id: null,
                    messages: []
                },
                messageContent: null,
                drawer: true,
                moment: moment
            }
        },
        mounted() {
            firebase.auth().onAuthStateChanged(authUser => {
                if (authUser) {
                    this.authUser = authUser;
                }
            })
            db.collection("medics").onSnapshot(snapshot => {
                let snapData = [];
                snapshot.forEach(doc => {
                    snapData.push({
                        id: doc.id,
                        title: doc.data().title,
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName
                    })
                });
                this.medics = snapData;
            })
        },
        methods: {
            addNewChat(medicID) {
                db.collection("chats").add({
                    medicID: medicID,
                    uid: this.authUser.uid + medicID,
                    userName: this.authUser.displayName
                }).then(data => {
                    db.collection("chats").where("uid", "==", this.authUser.uid + medicID).get().then(snapshot => {
                        snapshot.forEach(doc => {
                            this.currentChat.id = doc.id;
                        })
                        this.fetchMessages();
                    })
                })
            },
            chatWithMedic(medicID) {
                db.collection("chats").where("uid", "==", this.authUser.uid + medicID)
                    .get().then(docs => {
                    if (docs.size === 0) { //does not exist
                        this.addNewChat(medicID);
                    } else {
                        db.collection("chats")
                            .where("uid", "==", this.authUser.uid + medicID)
                            .get().then(snapshot => {
                            snapshot.forEach(doc => {
                                this.currentChat.id = doc.id;
                                console.log('current chat', this.currentChat);
                            })
                            this.fetchMessages();
                        })
                    }
                });
            },
            sendMessage() {
                db.collection("chats").doc(this.currentChat.id).collection("messages").add({
                    content: this.messageContent,
                    senderID: this.authUser.uid,
                    senderName: this.authUser.firstName + this.authUser.lastName,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    this.messageContent = null;
                    this.scrollToNewMessage();
                })
            },
            scrollToNewMessage() {
                let box = document.querySelector('.messages-area');
                box.scrollTop = 0;
            },
            fetchMessages() {
                db.collection("chats").doc(this.currentChat.id).collection("messages").orderBy("createdAt", "asc").onSnapshot(snapshot => {
                    let messages = [];
                    snapshot.forEach(doc => {
                        messages.unshift(doc.data())
                    })
                    this.currentChat.messages = messages;
                    this.chatInitiated = true;
                    this.scrollToNewMessage()
                })
            }
        }
    }
</script>
