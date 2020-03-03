<template>
    <b-container>
        <b-card no-body>
            <b-card-body>
                <b-button @click="toggleKeyboardShortcuts">Toggle Keyboard Shortcuts</b-button>
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
        }
    },
    watch: {
        keyboard_shortcuts: {
            handler() {
                debugger
                this.toggleKeyboardShortcuts()
            },
        },
    },
    computed: {
        ...mapGetters({ keyboardShortcuts: 'keyboardShortcuts' }),
    },
    methods: {
        ...mapMutations({
            toggleKeyboardShortcuts: 'toggleKeyboardShortcuts',
        }),
    },
}
</script>

<style></style>
