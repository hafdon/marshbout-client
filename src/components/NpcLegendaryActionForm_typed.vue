<template>
    <b-form v-on="listeners" v-bind="attrs">
        <slot></slot>
        <b-form-group class="m-0">
            <b-row>
                <b-col xs="12" lg="8">
                    <b-form-group label="Name">
                        <b-form-input
                            type="text"
                            v-model="liveForm.legendary.name"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col xs="12" lg="4">
                    <b-form-group label="Cost">
                        <b-form-input
                            type="number"
                            v-model="liveForm.legendary.cost"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form-group>

        <b-form-group class="m-0" label="Description">
            <b-form-textarea
                rows="3"
                v-model="liveForm.legendary.description"
            ></b-form-textarea>
        </b-form-group>
        <b-button type="submit">Submit</b-button>
    </b-form>
</template>

<script>
export default {
    name: 'NpcLegendaryActionForm',
    props: {},
    watch: {},
    data() {
        return {}
    },
    computed: {
        listeners() {
            const { ...listeners } = this.$listeners
            return listeners
        },
        attrs() {
            const { ...attrs } = this.$attrs

            return attrs
        },
    },
    methods: {
        // onSubmit() {
        //     console.log('npclegendaryactionform: submit')
        //     this.$emit('submit')
        // },
    },
}
</script>
