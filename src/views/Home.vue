<template>
    <div>
        <b-card no-body>
            <b-card-body>
                <div class="home">
                    <img alt="Vue logo" src="../assets/logo.png" />
                </div>

                <div class="float-left" v-html="thoughts"></div>
            </b-card-body>
        </b-card>
        <div>
            <FormTextareaMarkdown v-model="textarea"></FormTextareaMarkdown>
        </div>
        <!-- <Moveable
            class="moveable"
            v-bind="moveable"
            @drag="handleDrag"
            @resize="handleResize"
            @scale="handleScale"
            @rotate="handleRotate"
            @warp="handleWarp"
            @pinch="handlePinch"
        >
            <span>Vue Moveable</span>
        </Moveable> -->
        <!-- <div>
            <hsc-window-style-metal :closeButton="true" :isOpen.sync="isOpen"
                >>
                <hsc-window title="Window 1">
                    Parameters:
                    <fieldset>
                        <legend>&alpha;</legend>
                        <input type="range" />
                    </fieldset>
                    <fieldset>
                        <legend>&beta;</legend>
                        <input type="range" />
                    </fieldset>
                </hsc-window>

                <button @click="isOpen = !isOpen">Toggle Window 1</button>
            </hsc-window-style-metal>
        </div> -->
        <!-- <div>
            <fabric-canvas
                :id="'gridtesting2'"
                :height="gridHeight"
                :width="gridWidth"
            >
                <fabric-dot-grid
                    :id="'gridtesting2'"
                    :gridSize="gridSize"
                    :gridHeight="gridHeight"
                    :gridWidth="gridWidth"
                ></fabric-dot-grid>
                 <fabric-rectangle :id="'rectGridTesting2'"></fabric-rectangle>
         <fabric-line :id="'fabric-line-id-'"></fabric-line>
                <fabric-circle id="fabirc-circle"></fabric-circle>
            </fabric-canvas>
        </div>  -->
    </div>
</template>

<script>
// import FabricDocSnapGrid from '@/components/FabricDocSnapGrid.vue'
import thoughts from '@/assets/thoughts.md'

export default {
    name: 'Home',
    created() {},
    components: {},
    data() {
        return {
            thoughts,
            textarea: '',
            gridSize: 40,
            gridHeight: 400,
            gridWidth: 800,
            isOpen: true,
        }
    },
}
</script>
<style>
h1 {
    text-align: left;
}
</style>
