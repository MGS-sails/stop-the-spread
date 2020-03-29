<template>
    <div>
        <v-navigation-drawer absolute parmanent color="#4ABB8A" id="sts-sidenav">
            <template v-slot:prepend>
                <v-list-item v-for="medic in medics" :key="medic.id">
                    <!--                    <v-list-item-avatar>-->
                    <!--                        <img src="https://ptetutorials.com/images/user-profile.png">-->
                    <!--                    </v-list-item-avatar>-->

                    <v-list-item-content>
                        <!--                        <v-list-item-title>{{ medic.title + ' ' + medic.firstName + ' ' + medic.lastName }}</v-list-item-title>-->
                        <v-btn text @click="chatWithMedic(medic.id)" class="text-left">
                            {{ medic.title + ' ' + medic.firstName + ' ' + medic.lastName }}
                        </v-btn>
                        <!--                        <v-list-item-subtitle>chatting with 5 other users</v-list-item-subtitle>-->
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
                        Select a medic to chat with
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
                messageContent: null
            }
        },
        mounted() {
            firebase.auth().onAuthStateChanged(authUser => {
                if (authUser) {
                    this.authUser = authUser;
                }
            })
            db.collection("medics").onSnapshot(snapshot => {
                const snapData = [];
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
                    userName: this.authUser.firstName + this.authUser.lastName
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
                })
            },
            fetchMessages() {
                db.collection("chats").doc(this.currentChat.id).collection("messages").orderBy("createdAt", "asc").onSnapshot(snapshot => {
                    let messages = [];
                    snapshot.forEach(doc => {
                        messages.unshift(doc.data())
                    })
                    this.currentChat.messages = messages;
                    this.chatInitiated = true;
                    console.log('fetched', this.currentChat);
                })
            }
        }
    }
</script>

<style scoped>
    .sidenav-neighbor {
        padding-left: 20rem;
        padding-right: 5rem;
    }

    #sts-sidenav {
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
