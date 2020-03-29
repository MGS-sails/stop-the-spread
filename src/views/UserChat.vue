<template>
    <div>
        <v-navigation-drawer absolute parmanent color="#4ABB8A" id="sts-sidenav">
            <template v-slot:prepend>
                <v-list-item two-line v-for="medic in medics" :key="medic.id">
                    <v-list-item-avatar>
                        <img src="https://ptetutorials.com/images/user-profile.png">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{ medic.title + ' ' + medic.firstName + ' ' + medic.lastName }}</v-list-item-title>
<!--                        <v-list-item-subtitle>chatting with 5 other users</v-list-item-subtitle>-->
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-navigation-drawer>
        <div class="sidenav-neighbor">
            <v-row class="text-center messages-area">
                <v-col cols="12">
                    <v-card width="800" height="100" v-for="message in messages" :key="message.id"
                            class="mb-3 message-card"
                            :class="[message.sender ? 'mr-auto' : 'ml-auto']"
                            :color="(message.sender ? 'primary' : 'secondary')" shaped style="overflow-y: auto">
                        <v-card-text
                                :class="[message.sender ? 'text-right' : 'text-left']">
                            <div :class="{'sent-message': message.sentByUser, 'received-message': !message.sentByUser}">
                                {{ message.content }}
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <div class="mt-3">
                <v-textarea solo>
                </v-textarea>
                <v-btn color="primary">Send</v-btn>
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
                medics: [],
                messages: [
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
                        sender: true,
                        senderName: 'Jamie Vardy',
                        createdAt: 'Tue 12 Mar'
                    },
                    {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
                        sender: false,
                        senderName: 'Doctor Solomon',
                        createdAt: 'Tue 12 Mar'
                    },
                    {
                        content: 'Hello',
                        sender: true,
                        senderName: 'Doctor Solomon',
                        createdAt: 'Tue 12 Mar'
                    },
                    {
                        content: 'Hello',
                        sender: false,
                        senderName: 'Doctor Solomon',
                        createdAt: 'Tue 12 Mar'
                    },
                    {
                        content: 'Hello',
                        sender: false,
                        senderName: 'Doctor Solomon',
                        createdAt: 'Tue 12 Mar'
                    },
                    {
                        content: 'Hello',
                        sender: true,
                        senderName: 'Doctor Solomon',
                        createdAt: 'Tue 12 Mar'
                    },
                    {
                        content: 'Hello',
                        sender: false,
                        senderName: 'Doctor Solomon',
                        createdAt: 'Tue 12 Mar'
                    },
                    {
                        content: 'Hello',
                        sender: true,
                        senderName: 'Doctor Solomon',
                        createdAt: 'Tue 12 Mar'
                    },
                    {
                        content: 'Hello',
                        sender: false,
                        senderName: 'Doctor Solomon',
                        createdAt: 'Tue 12 Mar'
                    },
                    {
                        content: 'Hello',
                        sender: false,
                        senderName: 'Doctor Solomon',
                        createdAt: 'Tue 12 Mar'
                    }

                ]
            }
        },
        mounted() {
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
