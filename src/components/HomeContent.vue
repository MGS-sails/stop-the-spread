<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-img
                        :src="require('../assets/logo1.svg')"
                        class="my-3"
                        contain
                        height="200"
                />
            </v-col>

            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">
                    Lets get you some help
                </h1>

                <!--        <p class="subheading font-weight-regular">-->
                <!--          For help and collaboration with other Vuetify developers,-->
                <!--          <br>please join our online-->
                <!--          <a-->
                <!--            href="https://community.vuetifyjs.com"-->
                <!--            target="_blank"-->
                <!--          >Discord Community</a>-->
                <!--        </p>-->
            </v-col>

            <v-col
                    class="mb-5"
                    cols="12"
            >
                <h2 class="headline font-weight-bold mb-3">
                    Emergency Contact Numbers
                </h2>

                <v-row justify="center">
                    <a
                            v-for="(contact, i) in emergencyContacts"
                            :key="i"
                            :href="contact.href"
                            class="subheading mx-3"
                            target="_blank"
                    >
                        {{ contact.text }}
                    </a>
                </v-row>
            </v-col>

            <v-col
                    class="mb-5"
                    cols="12"
            >
                <h2 class="headline font-weight-bold mb-3">
                    Essential Guidelines on Covid-19
                </h2>

                <v-row justify="center">
                    <a
                            v-for="(link, i) in essentialGuidelines"
                            :key="i"
                            :href="link.href"
                            class="subheading mx-3"
                            target="_blank"
                    >
                        {{ link.text }}
                    </a>
                </v-row>
            </v-col>

            <v-col
                    class="mb-5"
                    cols="12"
            >
                <h2 class="headline font-weight-bold mb-3">
                    Change Language
                </h2>

                <v-row justify="center">
                    <a class="subheading mx-3">
                        Hausa
                    </a>
                    <a class="subheading mx-3">
                        Igbo
                    </a>
                    <a class="subheading mx-3">
                        Yoruba
                    </a>
                    <a class="subheading mx-3">
                        Pidgin (Broken-Engish)
                    </a>
                </v-row>
            </v-col>

            <v-col
                    class="mb-5"
                    cols="12"
            >
                <h2 class="headline font-weight-bold mb-3">
                    Social Media
                </h2>

                <v-row justify="center">
                    <a
                            v-for="(soc, i) in socialMedia"
                            :key="i"
                            :href="soc.href"
                            class="subheading mx-3"
                            target="_blank"
                    >
                        {{ soc.text }}
                    </a>
                </v-row>
            </v-col>

            <v-col cols="12">
                <v-row justify="center">
                    <v-btn
                            class="mr-2"
                            large color="#4ABB8A"
                            style="color: white"
                            @click="$emit('medicChat')"
                    >
                        Medic Chat
                        <v-icon>mdi-chat</v-icon>
                    </v-btn>
                    <v-btn
                            large color="#3B536B"
                            style="color: white"
                            @click="$emit('reportSymptoms')"
                    >
                        Report symptoms
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        name: 'HelloWorld',

        data: () => ({
            socialMedia: [
                {
                    text: 'Facebook',
                    href: '#',
                },
                {
                    text: 'Twitter',
                    href: '#',
                },
                {
                    text: 'Instagram',
                    href: '#',
                },
            ],
            essentialGuidelines: [
                {
                    text: 'NCDC',
                    href: 'https://covid19.ncdc.gov.ng/',
                },
                {
                    text: 'WHO',
                    href: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019',
                },
                {
                    text: 'General Information',
                    href: 'https://www.google.com/covid19/',
                },
                {
                    text: 'UN',
                    href: 'https://www.un.org/en/coronavirus/covid-19-information-un-healthcare-workers',
                },
            ],
            emergencyContacts: [
                {
                    text: 'Nigeria Centre for Disease Control - 09087878766',
                    href: 'https://covid19.ncdc.gov.ng/',
                },
                {
                    text: 'List of All State Helplines',
                    href: '/state-helplines',
                },
            ],
        }),
    }
</script>
<style scoped>
    .v-application a {
        color: #4ABB8A;
    }
</style>
