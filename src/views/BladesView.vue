<template>
    <b-card no-body
        ><template v-slot:header
            ><span class="float-left text-left"
                ><b-form-group
                    ><b-button @click="getRandom">push me</b-button
                    ><b-form-checkbox v-model="blades_faction"
                        >Use Blades Factions</b-form-checkbox
                    ></b-form-group
                ></span
            ></template
        ><b-card-body>
            <b-list-group v-if="stuff.length" class="text-left">
                <b-list-group-item v-for="(s, index) in stuff" :key="index">
                    <strong>{{ s.head }}</strong> {{ s.body }}
                </b-list-group-item>
            </b-list-group>
        </b-card-body></b-card
    >
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'BladesView',
    data() {
        return {
            stuff: [],
            blades_faction: true,
        }
    },
    computed: {
        ...mapGetters({ getRandomEl: 'getRandomEl' }),
    },
    methods: {
        async getRandom() {
            try {
                let { data } = await this.$axios.request({
                    method: 'get',
                    url: 'blades',
                })

                let endpoints = Object.getOwnPropertyNames(data)
                let stuff = []
                endpoints.forEach(el => {
                    let head = el
                    if (head === 'roles') {
                        stuff.push({
                            head: 'client',
                            body: this.getRandomEl(data[el]),
                        })
                        head = 'target'
                    }
                    stuff.push({
                        head,
                        body: this.getRandomEl(data[el]),
                    })
                })

                stuff.push(await this.stuffWiffRandom('faction'))
                stuff.push(await this.stuffWiffRandom('npc', 'client'))
                stuff.push(await this.stuffWiffRandom('npc', 'target'))
                stuff.push(
                    await this.stuffWiffRandom('description', 'desc', 'content')
                )

                this.stuff = stuff
            } catch (e) {
                console.log(e)
            }
        },
        async stuffWiffRandom(url, label = '', prop = 'name') {
            try {
                let { data } = await this.$axios.request({
                    method: 'get',
                    url,
                })

                return {
                    head: label ? label : url,
                    body: this.getRandomEl(data)[prop],
                }
            } catch (e) {
                console.log(e)
            }
        },
    },
}
</script>
