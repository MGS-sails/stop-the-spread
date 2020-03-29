<template>
    <v-container>
        <v-card>
            <v-tabs color="primary" right>
                <v-tab v-for="(region, index) in regions" :key="index">{{ region.name }}</v-tab>
                <v-tab-item v-for="(region, index) in regions" :key="index">
                    <v-container>
                        <HelplineTable :region="region"/>
                    </v-container>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
    import HelplineTable from "../components/HelplineTable";
    export default {
        name: "StateHelplines",
        components: {
            HelplineTable
        },
        data() {
            return {
                regions: [
                    {
                        name: 'NORTH-CENTRAL',
                        states: [
                            {
                                name: 'Benue State',
                                helplines: '090186022439, 07025031214',
                            },
                            {
                                name: 'Federal Capital Territory',
                                helplines: '08099936312, 07080631500',
                            },
                            {
                                name: 'Kogi State',
                                helplines: '0704485619, 07088292249, 08150953486, 08095227003, 07043402122',
                            },
                            {
                                name: 'Kwara State',
                                helplines: '090620100001, 09062010002',
                            },
                            {
                                name: 'Niger State',
                                helplines: '08038246018, 09093093642, 08077213070',
                            },
                            {
                                name: 'Plateau State',
                                helplines: '07032864444, 08035422711, 08065486416, 08035779917',
                            },

                        ]
                    },
                    {
                        name: 'NORTH-WEST',
                        states: [
                            {
                                name: 'Kaduna State',
                                helplines: '08035871662, 08025088304, 08032401473, 08037808191',
                            },
                            {
                                name: 'Kano State',
                                helplines: '08039704476, 08037038597, 09093995333, 09093995444',
                            },
                            {
                                name: 'Katsina State',
                                helplines: '09035037114, 09047092428',
                            },
                            {
                                name: 'Sokoto State',
                                helplines: '08032311116, 08022069567, 08035074228, 08035074228, 07031935037, 08036394462',
                            },
                            {
                                name: 'Zamfara State',
                                helplines: '08035626731, 08035161538, 081613330774, 08065408696, 08105009888',
                            },

                        ]
                    },
                    {
                        name: 'NORTH-EAST',
                        states: [
                            {
                                name: 'Adamawa State',
                                helplines: '08031230359, 07080601139',
                            },
                            {
                                name: 'Bauchi State',
                                helplines: '08032717887, 08059600898, 08033698036, 08080330216, 08036911698',
                            },
                            {
                                name: 'Borno State',
                                helplines: '08088159881, 080099999999',
                            },
                            {
                                name: 'Gombe State',
                                helplines: '08103371257',
                            },
                            {
                                name: 'Taraba State',
                                helplines: '08032501165, 08065508675, 08039359368, 08037450227',
                            },
                            {
                                name: 'Yobe State',
                                helplines: '08131834764, 07041116027',
                            },

                        ]
                    },
                    {
                        name: 'SOUTH-SOUTH',
                        states: [
                            {
                                name: 'Akwa Ibom State',
                                helplines: '09045575515, 07035211919, 08028442194, 08037934966, 0902330092',
                            },
                            {
                                name: 'Bayelsa State',
                                helplines: '08039216821, 07019304970, 08151693570',
                            },
                            {
                                name: 'Cross River State',
                                helplines: '09036281412, 08050907736 (Whatsapp), 08031230527',
                            },
                            {
                                name: 'Delta State',
                                helplines: '08033521961, 08035078541, 08030758179, 08031230021',
                            },
                            {
                                name: 'Edo State',
                                helplines: '08084096723, 08064258163, 08035835529',
                            },
                            {
                                name: 'Rivers State',
                                helplines: '08056109538, 08031888093, 08033124314',
                            },

                        ]
                    },
                    {
                        name: 'SOUTH-EAST',
                        states: [
                            {
                                name: 'Abia State',
                                helplines: '07002242362, 070ABIADOC',
                            },
                            {
                                name: 'Anambra State',
                                helplines: '08030953771, 08117567363, 08145434416',
                            },
                            {
                                name: 'Enugu State',
                                helplines: '08182555550, 117, 112',
                            },
                            {
                                name: 'Ebonyi State',
                                helplines: '09020332489',
                            },
                            {
                                name: 'Imo State',
                                helplines: '080995555577, 07087110839',
                            },

                        ]
                    },
                    {
                        name: 'SOUTH-WEST',
                        states: [
                            {
                                name: 'Ogun State',
                                helplines: '08188978392, 08188978392',
                            },
                            {
                                name: 'Ondo State',
                                helplines: '080COVID19, 08002684319, 0700COVID19, 07002684319, 07001COVID19, 070012684319',
                            },
                            {
                                name: 'Osun State',
                                helplines: '08035025692, 08033908772, 08056456250',
                            },
                            {
                                name: 'Oyo State',
                                helplines: '08038210122, 08023229267, 08073431342',
                            },
                            {
                                name: 'Ekiti State',
                                helplines: '09062970434, 09062970435, 09062970436, 112',
                            },
                            {
                                name: 'Lagos State',
                                helplines: '08000CORONA, 08023169485, 08033565529, 08052817243, 08028971864',
                            },

                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
