<template>
    <b-card no-body>
        <template v-slot:header>
            <span class="float-left text-left">
                <b-form-group>
                    <b-button @click="getRandom">push me</b-button>
                    <b-form-checkbox v-model="blades_faction"
                        >Use Blades Factions</b-form-checkbox
                    >
                </b-form-group>
            </span>
        </template>
        <template v-slot:footer>
            <b-form-group>
                <b-button @click="live = !live">Edit?</b-button>
                <b-button :disabled="!canSubmit" @click="onSave"
                    >Save me</b-button
                >
            </b-form-group>
        </template>
        <b-card-body>
            <!-- <b-list-group v-if="stuff.length" class="text-left">
                <b-list-group-item v-for="(s, index) in stuff" :key="index">
                    <strong>{{ s.head }}</strong>
                    {{ s.body }}
                </b-list-group-item>
            </b-list-group>-->
            <b-form-group v-if="stuff.length" class="text-left m-0 p-0">
                <b-form class="m-0 p-0">
                    <b-form-group
                        class="m-0 p-0"
                        v-for="(s, index) in stuff"
                        :key="index"
                    >
                        <b-row class="m-0 p-0">
                            <b-col cols="2" class="m-0 px-1"
                                ><b-button @click="add(index, s.head)"
                                    >Add</b-button
                                ><b-button @click="remove(index)"
                                    >Remove</b-button
                                ></b-col
                            >
                            <b-col cols="2" class="m-0 px-1">
                                <div class="text-right m-0 p-0">
                                    <label class="m-0 p-0">
                                        <strong class="m-0 p-0">
                                            {{ s.head }}
                                        </strong>
                                    </label>
                                </div>
                            </b-col>
                            <b-col class="m-0 px-1">
                                <b-form-input
                                    class="m-0 p-0"
                                    v-model="s.body"
                                    :plaintext="!live"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                    </b-form-group>
                </b-form>
            </b-form-group>
        </b-card-body>
    </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'BladesView',
    data() {
        return {
            stuff: [],
            blades_faction: true,
            canSubmit: false,
            live: false,
        }
    },
    mounted() {
        document.title = 'Randomizer'
    },
    computed: {
        ...mapGetters({ getRandomEl: 'getRandomEl' }),
    },
    methods: {
        async onSave() {
            this.canSubmit = false
            try {
                let { data } = await this.$axios.request({
                    url: 'randoms',
                    method: 'post',
                    data: { timestamp: Date.now(), data: this.stuff },
                })
                console.log({ data })
                this.$bvToast.toast('Yep.', {
                    title: 'Successfully saved.',
                    variant: 'success',
                    toaster: 'b-toaster-bottom-right',
                })
            } catch (e) {
                console.log(e)
            }
        },
        async add(index, endpoint) {
            try {
                let { data } = await this.$axios.request({
                    method: 'get',
                    url: 'blades',
                })

                console.log({ data, data_endpoint: data[endpoint], endpoint })

                this.stuff.splice(index, 0, {
                    head: endpoint,
                    body: this.getRandomEl(data[endpoint])?.name
                        ? this.getRandomEl(data[endpoint]).name
                        : this.getRandomEl(data[endpoint]),
                })
            } catch (e) {
                console.log(e)
            }
            return true
        },
        async remove(index) {
            this.stuff.splice(index, 1)
        },
        async getRandom() {
            try {
                let { data } = await this.$axios.request({
                    method: 'get',
                    url: 'blades',
                })

                let endpoints = Object.getOwnPropertyNames(data)
                let stuff = []
                endpoints.forEach(el => {
                    let head = el === 'roles' ? 'client' : el
                    // we also want to do a role for client and target
                    stuff.push({
                        head,
                        body: this.getRandomEl(data[el])?.name
                            ? this.getRandomEl(data[el]).name
                            : this.getRandomEl(data[el]),
                    })
                })

                stuff.push(await this.stuffWiffRandom('faction'))
                let { data: tables } = await this.$axios.request({
                    method: 'get',
                    url: 'tables',
                })

                stuff.push({
                    head: 'demon desire',
                    body: this.getRandomEl(tables.desires).name,
                })

                stuff.push({
                    head: 'faction scheme',
                    body: this.getRandomEl(tables.villains.schemes),
                })
                stuff.push({
                    head: 'defining mission',
                    body: this.getRandomEl(tables.missions).name,
                })
                stuff.push({
                    head: 'goal',
                    body: this.getRandomEl(tables.goals).name,
                })

                stuff.push(await this.stuffWiffRandom('npc', 'client'))
                stuff.push(
                    await this.stuffWiffRandom('description', 'desc', 'content')
                )
                stuff.push(await this.stuffWiffRandom('npc', 'target'))
                stuff.push(
                    await this.stuffWiffRandom('description', 'desc', 'content')
                )

                stuff.push(
                    await this.stuffWiffRandom('lexeme', 'word', 'headword')
                )
                stuff.push(
                    await this.stuffWiffRandom('lexeme', 'word', 'headword')
                )
                stuff.push(
                    await this.stuffWiffRandom('lexeme', 'word', 'headword')
                )
                stuff.push(
                    await this.stuffWiffRandom(
                        'bible?tags_like=hook',
                        'hook',
                        'name'
                    )
                )
                stuff.push(
                    await this.stuffWiffRandom(
                        'bible?tags_like=twist',
                        'twist',
                        'name'
                    )
                )

                stuff.push({
                    head: 'notes',
                    body: '',
                })

                this.stuff = stuff
                this.canSubmit = true
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
<style scoped>
input:focus,
textarea:focus,
select:focus {
    outline: none;
}
</style>
