<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-card width="500">
                    <v-card-text style="max-height: 80vh; min-height: 80vh; overflow: scroll">
                        <div v-for="message in messages"
                             :key="message.id"
                             :class="{'sent-message': message.sentByUser, 'received-message': !message.sentByUser}">
                            {{ message.content }}
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-card>
            <v-card-text>
                <v-card-text>
                    <v-textarea></v-textarea>
                </v-card-text>
                <v-card-actions>Send</v-card-actions>
            </v-card-text>
        </v-card>

    </v-container>
</template>

<script>
    export default {
        name: "UserChat",
        data() {
            return {
                messages: [
                    {
                        content: 'Hello',

                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
