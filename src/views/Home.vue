<template>
    <b-card no-body>
        <b-card-body>
            <div class="home">
                <img alt="Vue logo" src="../assets/logo.png" />
            </div>

            <div class="float-left" v-html="thoughts"></div>
        </b-card-body>
    </b-card>
</template>

<script>
import thoughts from '@/assets/thoughts.md'

export default {
    name: 'Home',
    created() {},
    data() {
        return {
            thoughts,
        }
    },
}
</script>
<style>
h1 {
    text-align: left;
}
</style>
