<template>
    <fabric-canvas :id="'gridtesting2'" :height="400" :width="400">
        <fabric-dot-grid
            :id="'gridtesting2'"
            :gridSize="gridSize"
            :gridHeight="gridHeight"
            :gridWidth="gridWidth"
        ></fabric-dot-grid>
        <fabric-rectangle :id="'rectGridTesting2'"></fabric-rectangle>
    </fabric-canvas>
</template>

<script>
export default {
    name: 'FabricDotSnapGrid',
    data() {
        return {
            gridSize: 40,
            gridHeight: 400,
            gridWidth: 400,
        }
    },
}
</script>

<style></style>
