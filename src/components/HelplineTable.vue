<template>
    <v-card>
        <v-card-title>
            {{ region.name }}
            <v-spacer></v-spacer>
            <v-text-field v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hide-details>
            </v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="region.states" hide-default-footer :search="search"></v-data-table>
    </v-card>
</template>

<script>
    export default {
        name: "HelplineTable",
        props: ['region'],
        data() {
            return {
                search: '',
                headers: [
                    {
                        value: 'name'
                    },
                    {
                        text: 'HELPLINES',
                        value: 'helplines'
                    }
                ]
            }
        },
    }
</script>
