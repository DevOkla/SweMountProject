<script>
import canvasD from "../components/canvas.vue";
export default {
  components: {
    canvasD,
  },
}
</script>

<template>
  <main>
    <h1 >Calculator</h1>  
    <div class="divElem">
    <canvasD
      :A="5 * 100"
      :B="3 * 100"
      :C="7 * 100"
      :shape="0"
      :bredd="1000"
      :hojd="1400"
      :vikt="50"
      :nockhojd="5"
      :typTak="0"
      :canvasNum="0"
    />
  </div>

    </main>
</template>

<style>
.divElem {
  width: 95vw;
  max-width: 1216px;
  margin: auto;
}
</style>