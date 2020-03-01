<template>
    <b-container>
        <b-card no-body v-for="(r, index) in recaps" :key="index">
            <template v-slot:header>
                <h4>Session {{index}}</h4>
            </template>
            <b-card-body>
                <div class="text-left" v-html="r"></div>
            </b-card-body>
        </b-card>
    </b-container>
</template>

<script>
import session001 from '@/assets/recaps/session001.md'
import session017 from '@/assets/recaps/session017.md'
export default {
    data() {
        return {
            recaps: [session001, session017],
        }
    },
}
</script>

<style></style>
