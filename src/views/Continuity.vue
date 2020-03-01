<template>
    <b-container fluid>
        <b-card-group columns>
            <b-card no-body bg-variant="light"
                ><b-card-body><ContinuityForm /></b-card-body>
            </b-card>
        </b-card-group>
        <b-card-group
            ><b-card no-body bg-variant="light"
                ><b-card-body><ContinuityList /></b-card-body></b-card
        ></b-card-group>
    </b-container>
</template>

<script>
import ContinuityForm from '@/components/ContinuityForm.vue'
import ContinuityList from '@/components/ContinuityList.vue'
export default {
    name: 'Continuity',
    components: {
        ContinuityForm,
        ContinuityList,
    },
    mounted() {
        document.title = 'Continuity'
    },
}
</script>

<style></style>
