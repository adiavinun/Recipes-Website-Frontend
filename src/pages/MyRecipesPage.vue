<template>
  <div class="container">
    <h1 class="title">My Recipes</h1>
    <RecipePreviewList class="MyRecipes center" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  }
};
</script>

<style lang="scss" scoped>
.MyRecipes {
  margin: 10px 0 10px;
}
</style>
