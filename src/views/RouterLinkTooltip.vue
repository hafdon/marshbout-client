<template>
    <div class="td_name">
        <b-form-textarea
            v-on="listeners"
            v-bind="attrs"
            :value="value"
            @input="input"
        ></b-form-textarea>

        <router-link
            :id="`tooltip_target_${row.item.resource}_${row.item.id}`"
            :to="{
                path: `/${row.item.resource}/${row.item.id}`,
            }"
            >{{ displayName(row.item) }}</router-link
        >
        <b-tooltip
            container="prep_view_container"
            placement="bottom"
            :target="`tooltip_target_${row.item.resource}_${row.item.id}`"
        >
            <b-card no-body>
                <b-card-body>
                    <EndpointDisplay
                        :url="`${row.item.resource}/${row.item.id}`"
                    ></EndpointDisplay>
                </b-card-body>
            </b-card>
        </b-tooltip>
    </div>
</template>

<script>
export default {
    name: '',
    inheritAttrs: false,
    props: ['value'],
    data() {
        return {}
    },
    computed: {
        listeners() {
            const { ...listeners } = this.listeners
            return listeners
        },
        attrs() {
            const { ...attrs } = this.attrs
            return attrs
        },
    },
    methods: {
        input(value) {
            this.emit('input', value)
        },
    },
}
</script>

<style scoped>
.description {
    text-align: left;
    font-size: 0.75em;
}
.td_name {
    text-align: left;
}
.cheatsheet {
    font-size: 0.75em;
    text-align: left;
    opacity: 0.9;
}
.tooltip .tooltip-inner {
    max-width: 700px !important;
    width: 700px !important;
    color: black;
    /* opacity: 1 !important; */
}
/* 
.tooltip.show {
     opacity: 1 !important; 
} */
</style>
