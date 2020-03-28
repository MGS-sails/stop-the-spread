<template>
    <div>
        <v-btn text @click="dialog = true">
            Volunteer as a Medic
        </v-btn>
        <v-dialog v-model="dialog" width="800">
            <v-card>
                <v-card-title>
                    Volunteer as a medic
                </v-card-title>
                <v-card-text v-if="showConfirmationMessage">
                    Thank you for volunteering.
                    We will be in touch with you to verify your account.
                </v-card-text>
                <v-card-text v-else>
                    <p>
                        We are looking for qualified medical personnel to help in guiding and advising those in need. Fill in the form below to volunteer
                    </p>
                    <v-form>
                        <div v-if="error">
                            {{ error }}
                        </div>
                        <v-text-field type="text" label="Title" placeholder="e.g Doctor, leave blank if not applicable" v-model="title"></v-text-field>
                        <v-text-field type="text" label="First name" v-model="firstName" required></v-text-field>
                        <v-text-field type="text" label="Middle name" v-model="middleName"></v-text-field>
                        <v-text-field type="text" label="Last name" v-model="lastName" required></v-text-field>
                        <v-text-field type="email" label="Email" v-model="email" required></v-text-field>
                        <v-text-field type="text" label="Phone number" v-model="phoneNumber" required></v-text-field>
                        <v-text-field type="password" label="Password" v-model="password" required></v-text-field>

                        <v-divider></v-divider>

                        <v-textarea label="tell us about your qualification" min="150"></v-textarea>

                        <v-btn @click.prevent="register"  large block>Register</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Firebase from "firebase"
    export default {
        name: "VolunteerDialog",
        data: () => ({
            dialog: false,
            title: null,
            firstName: null,
            middleName: null,
            lastName: null,
            phoneNumber: null,
            email: null,
            password: null,
            error: null,
            showConfirmationMessage: false
        }),
        methods: {
            register() {
                const info = {
                    email: this.email,
                    password: this.password
                };
                if (!this.error) {
                    Firebase.auth().createUserWithEmailAndPassword(info.email, info.password).then(userCredentials => {
                        return userCredentials.user.updateProfile({
                            role: 'Medic',
                            title: this.title,
                            firstName: this.firstName,
                            middleName: this.middleName,
                            lastName: this.lastName,
                            phoneNumber: this.phoneNumber,
                            email: this.email,
                            approved: true //left true for testing,
                        }).then(() => {
                            this.showConfirmationMessage = true;
                        })
                    }, error => {
                        this.error = error
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
