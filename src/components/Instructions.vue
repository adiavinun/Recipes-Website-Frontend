<template>
  <div>
    <div v-if="this.likes >= 0">
      <strong style="font-size: 18px">Instructions:</strong>
      <ol>
        <li v-for="s in instructions" :key="s.number">
          {{ s }}
        </li>
      </ol>
    </div>
    <div v-else>
      <strong style="font-size: 18px">Instructions:</strong>
      <ol>
        <li v-for="s in instructions" :key="s.number">
          {{ s.description }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "Instructions",
  props: {
    instructions: {
      type: Array,
      required: true,
    },
    likes: {
      type: Number,
    },
  },
};
</script>

<style scoped></style>
