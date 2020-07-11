<template>
  <div class="new">
    <button v-on:click="represh">view other recipes!</button>
  </div>
</template>

<script>
export default {
    name: "ButtonRandomRecipes",

    methods: {
        represh() {
        this.$emit("represhRandom");
        }
    }
};
</script>

<style lang="scss" scoped>
.new {
  margin: 10px 0 10px;
  text-align: center;
}
</style>