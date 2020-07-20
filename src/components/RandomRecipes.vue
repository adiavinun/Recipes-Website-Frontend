<template>
<div>
    <RecipePreviewList title="Explore These Recipes:" pageType="random"  :recipesList="recipesArray" class="RandomRecipes" />
    
    <!--<b-button v-on:click="this.updateNewRandomRecipes">view other recipes!</b-button> -->
        

    
</div>
</template>

<script>
import RecipePreviewList from "./RecipePreviewList.vue";
export default {
  name: "RandomRecipes",
  components: {
    RecipePreviewList
  },
 
  props: {
      recipesArray: {
        type: Array,
        required: true,
      }
  },

};
</script>

<style lang="scss" scoped>

</style>
