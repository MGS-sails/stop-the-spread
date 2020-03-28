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
                            href="https://github.com/vuetifyjs/vuetify/releases/latest"
                            target="_blank"
                            large color="#4ABB8A"
                            style="color: white"
                    >
                        <span class="mr-2">Chat with a Medic</span>
                        <v-icon>mdi-chat</v-icon>
                    </v-btn>
                    <v-btn
                            href="https://github.com/vuetifyjs/vuetify/releases/latest"
                            target="_blank"
                            large color="#3B536B"
                            style="color: white"
                    >
                        <span class="mr-2">Report symptoms</span>
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
                    href: 'https://github.com/vuetifyjs/vuetify-loader',
                },
                {
                    text: 'Twitter',
                    href: 'https://github.com/vuetifyjs/vuetify',
                },
                {
                    text: 'Instagram',
                    href: 'https://github.com/vuetifyjs/awesome-vuetify',
                },
            ],
            essentialGuidelines: [
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
                    text: 'NCDC - 09087878766',
                    href: 'https://vuetifyjs.com/components/api-explorer',
                },
                {
                    text: 'NHIS - 09087878766',
                    href: 'https://vuetifyjs.com/layout/pre-defined',
                },
                {
                    text: 'Ministry of Health - 09087878766',
                    href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
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
