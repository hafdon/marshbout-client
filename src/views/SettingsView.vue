<template>
    <b-container>
        <b-card no-body>
            <b-card-body>
                <b-button @click="toggleKeyboardShortcuts"
                    >Toggle Keyboard Shortcuts</b-button
                >
                <b-form-group label="auto hide delay in seconds">
                    <b-form-input
                        type="number"
                        v-model="autoHideDelay"
                    ></b-form-input>
                    <b-button @click="setDelay()">set delay</b-button>
                </b-form-group>
                {{ getAutoHideDelay }}
            </b-card-body>
        </b-card>
    </b-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
    name: 'SettingsView',
    data() {
        return {
            keyboard_shortcuts: this.keyboardShortcuts,
            autoHideDelay: 0,
        }
    },
    created() {
        this.autoHideDelay = +this.getAutoHideDelay / 1000
    },
    watch: {
        keyboard_shortcuts: {
            handler() {
                debugger
                this.toggleKeyboardShortcuts()
            },
        },
        getAutoHideDelay: {
            handler() {
                return true
            },
        },
    },
    computed: {
        ...mapGetters({
            keyboardShortcuts: 'keyboardShortcuts',
            getAutoHideDelay: 'getAutoHideDelay',
        }),
    },
    methods: {
        ...mapMutations({
            toggleKeyboardShortcuts: 'toggleKeyboardShortcuts',
            setAutoHideDelay: 'setAutoHideDelay',
        }),
        setDelay() {
            console.log('set Delay', this.autoHideDelay * 1000)
            this.setAutoHideDelay(this.autoHideDelay * 1000)
        },
    },
}
</script>

<style></style>
