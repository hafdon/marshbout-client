<template>
    <ZView :title="title" :heading="heading">
        <CombatTracker></CombatTracker>
    </ZView>
</template>

<script>
import CombatTracker from '@/components/CombatTracker.vue'
export default {
    name: 'CombatTrackerView',
    components: { CombatTracker },
    data() {
        return {
            title: 'combat',
            heading: '',
        }
    },
}
</script>

<style>
</style>