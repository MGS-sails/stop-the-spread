<template>
    <div>
        <v-navigation-drawer absolute permanent color="primary" class="sts-sidenav">
            <template v-slot:prepend>
                <v-list-item v-for="chat in chats" :key="chat.id">
                    <v-list-item-content>
                        <v-btn text @click="chatWithUser(chat.id)">
                            {{ chat.userName }}
                        </v-btn>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-navigation-drawer>
        <div class="sidenav-neighbor">
            <v-row class="text-center messages-area">
                <v-col cols="12" v-if="chatInitiated">
                    <v-card width="800" height="100" v-for="message in currentChat.messages" :key="message.id"
                            class="mb-3 message-card"
                            :class="[message.senderID === authUser.uid ? 'mr-auto' : 'ml-auto']"
                            :color="(message.senderID === authUser.uid ? 'primary' : 'secondary')"
                            shaped style="overflow-y: auto">
                        <v-card-text
                                :class="[message.senderID === authUser.uid ? 'text-right' : 'text-left']">
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
                messageContent: null

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
                })
            },
            sendMessage() {
                db.collection("chats").doc(this.currentChat.id).collection("messages").add({
                    content: this.messageContent,
                    senderID: this.authUser.uid,
                    senderName: this.authUser.firstName + this.authUser.lastName,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    this.messageContent = null;
                })
            }
        }
    }
</script>

<style>
    .sidenav-neighbor {
        padding-left: 20rem;
        padding-right: 5rem;
    }

    .sts-sidenav {
        max-height: 100vh;
        overflow: scroll;
    }

    .messages-area {
        max-height: 75vh;
        overflow-y: scroll;
    }

    .compose-area {
        max-height: 20vh;
    }
</style>
