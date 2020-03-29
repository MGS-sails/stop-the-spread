<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="5">
                <v-form>
                    <v-row>
                        <v-col>
                            <v-text-field solo type="text" v-model="symptom.patient.fullName" label="FULL NAME"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field solo type="text" v-model="symptom.patient.phoneNumber" label="PHONE NUMBER"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-textarea solo v-model="symptom.description" label="DESCRIBE YOUR SYMPTOMS"></v-textarea>
                    <v-text-field solo type="text" v-model="symptom.duration" label="FOR HOW LONG HAVE YOU HAD THESE SYMPTOMS ?"></v-text-field>
                    <v-row>
                        <v-col>
                            <v-text-field solo label="WHERE DO YOU LIVE ?" v-model="symptom.patient.address.firstLine"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field solo label="TOWN" v-model="symptom.patient.address.town"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>

                    <h3>
                        Add the people you have come into contact with
                    </h3>
                    <v-row v-for="(contact, index) in symptom.patient.contacts" :key="index">
                        <v-col cols="10">
                            <v-row>
                                <v-col>
                                    <v-text-field solo v-model="contact.fullName" label="FULL NAME"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field solo v-model="contact.phoneNumber" label="PHONE NUMBER"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-text-field solo v-model="contact.address.firstLine" label="ADDRESS"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field solo label="TOWN" v-model="contact.address.town"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col>
                            <v-btn color="red" @click="removeContact">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-btn color="secondary" @click="addContact">
                        Add another person
                    </v-btn>
                    <br><br>
                    <h3>
                        Your participation will go along way in helping to limit the spread of COVID-19.
                        We will send your symptoms to the relevant authorities. Thank you for your co-operation.
                    </h3>
                    <v-btn color="primary" large block @click.prevent="reportSymptoms">
                        Submit
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import firebase from "firebase";
    import db from "../db";
    export default {
        name: "ReportSymptoms",
        data() {
            return {
                authUser: null,
                symptom: {
                    description: null,
                    duration: null,
                    patient: {
                        fullName: null,
                        phoneNumber: null,
                        address: {
                            firstLine: null,
                            town: null
                        },
                        contacts: [
                            {
                                fullName: null,
                                address: {
                                    firstLine: null,
                                    town: null
                                }
                            }
                        ]
                    }
                }
            }
        },
        created() {
            firebase.auth().onAuthStateChanged(authUser => {
                this.authUser = authUser;
            })
        },
        methods: {
            addContact() {
                this.symptom.patient.contacts.push({
                    fullName: null,
                    phoneNumber: null,
                    address: {
                        firstLine: null,
                        town: null
                    }
                })
            },
            removeContact(index) {
                this.symptom.patient.contacts.splice(index, 1);
            },
            reportSymptoms() {
                db.collection("symptoms").add({
                    uid: this.authUser.uid,
                    description: this.symptom.description,
                    duration: this.symptom.duration,
                    patient: this.symptom.patient
                }).then(() => {
                    this.$router.push("/")
                })
            }
        }
    }
</script>

<style scoped>

</style>
