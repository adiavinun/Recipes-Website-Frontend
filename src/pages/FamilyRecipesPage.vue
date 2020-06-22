<template>
  <div class="container">
    <h1 class="title">My Family Recipes</h1>
    <div>
      <RecipePreviewList title="" pageType="family" class="Family center" />
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
.Family {
  margin: 10px 0 10px;
}
</style>