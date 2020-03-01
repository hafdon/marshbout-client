<template>
    <b-form v-on="listeners" v-bind="attrs">
        <slot></slot>
        <b-form-group class="m-0">
            <b-row>
                <b-col xs="12" lg="8">
                    <b-form-group label="Name">
                        <b-form-input type="text" v-model="liveForm.legendary.name">Name</b-form-input>
                    </b-form-group>
                </b-col>
                <b-col xs="12" lg="4">
                    <b-form-group label="Cost" v-model="liveForm.legendary.cost">
                        <b-form-input type="number" step="1" min="1"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form-group>

        <b-form-group class="m-0" label="Description">
            <b-form-textarea rows="3" v-model="liveForm.legendary.entry"></b-form-textarea>
        </b-form-group>
    </b-form>
</template>

<script>
export default {
    name: 'NpcLegendaryActionForm',
    props: {
        liveForm: {
            type: Object,
            required: true,
        },
    },
    watch: {
        liveForm: {
            immediate: true,
            deep: true,
            handler(val) {
                console.log({ NpcLegendaryActionForm_liveForm: val })
            },
        },
    },
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
}
</script>
