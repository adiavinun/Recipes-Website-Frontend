<template>
  <div class="container">
    <h1 class="title">My Recipes</h1>
    <div>
      <RecipePreviewList title="" pageType="myrecipes" class="MyRecipes center" />
    </div>
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
