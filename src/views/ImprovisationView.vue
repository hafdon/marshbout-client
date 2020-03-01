<template>
    <b-container>
        <div class="text-left" v-html="improvisation"></div>
    </b-container>
</template>

<script>
import improvisation from '@/assets/improvisation.md'
export default {
    data() {
        return {
            improvisation,
        }
    },
}
</script>

<style></style>
