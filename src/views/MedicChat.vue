<template>
    <div>
        <v-navigation-drawer absolute permanent color="primary" class="sts-sidenav" v-model="drawer">
            <v-list>
                <v-list-item two-line @click="$router.replace('/')" style="color: white !important;">
                    <v-list-item-avatar>
                        <img :src="require('../assets/logo1.svg')">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Active Chats</v-list-item-title>
                        <v-list-item-subtitle>Select a user below</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item v-for="chat in chats" :key="chat.id" @click="chatWithUser(chat.id)" style="color: white !important;">
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ chat.userName }}
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
                        No active conversation
                    </div>
                </v-col>
            </v-row>

            <div class="mt-3" v-if="chatInitiated">
                <v-textarea solo v-model="messageContent">
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
        name: "MedicChat",
        data() {
            return {
                authUser: null,
                medic: null,
                chats: [],
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
                    db.collection("medics").where("email", '==', this.authUser.email).get()
                        .then(snapshot => {
                            snapshot.forEach(doc => {
                                this.medic = doc.data();
                                this.medic.id = doc.id;
                            });
                            db.collection("chats").where("medicID", "==", this.medic.id).get()
                                .then(snapshot => {
                                    let snapData = [];
                                    snapshot.forEach(doc => {
                                        snapData.push({
                                            id: doc.id,
                                            uid: doc.data().uid,
                                            medicID: doc.data().medicID,
                                            userName: doc.data().userName
                                        })
                                    });
                                    this.chats = snapData;
                                })
                        })
                }
            })
        },
        methods: {
            chatWithUser(chatID) {
                this.currentChat.id = chatID;
                db.collection("chats").doc(chatID).collection("messages")
                    .orderBy("createdAt", "asc").onSnapshot(snapshot => {
                    let snapData = [];
                    snapshot.forEach(doc => {
                        snapData.unshift({
                            id: doc.id,
                            content: doc.data().content,
                            createdAt: doc.data().createdAt,
                            senderID: doc.data().senderID,
                            senderName: doc.data().senderName
                        })
                    })
                    this.currentChat.messages = snapData;
                    this.chatInitiated = true;
                    this.scrollToNewMessage()
                })
            },
            scrollToNewMessage() {
                let box = document.querySelector('.messages-area');
                box.scrollTop = 0;
            },
            sendMessage() {
                db.collection("chats").doc(this.currentChat.id).collection("messages").add({
                    content: this.messageContent,
                    senderID: this.authUser.uid,
                    senderName: this.authUser.firstName + this.authUser.lastName,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    this.messageContent = null;
                    this.scrollToNewMessage()
                })
            }
        }
    }
</script>
