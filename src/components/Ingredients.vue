<template>
  <div>
    <strong style="font-size: 18px">Ingredients:</strong>
    <ul>
      <li v-for="(r, index) in ingredients" :key="index + '_' + r.id">
        {{ r.nameAndAmount }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
name: "Ingredients",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
