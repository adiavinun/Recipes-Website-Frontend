<template>
<div>
    <RecipePreviewList title="Explore these Recipes" pageType="random" :recipesList="recipes" class="RandomRecipes" />
   <div class="new">
        <b-button @click="updateNewRandomRecipes">view other recipes!</b-button> <!--  עדיין לא עובד כמו שצריך-->
    </div>    
</div>
</template>

<script>
import RecipePreviewList from "./RecipePreviewList.vue";
export default {
  name: "RandomRecipes",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateNewRandomRecipes();
  },
  methods: {
    async updateNewRandomRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_url + "/recipes/3randomRecipes"
        );

        const recipes = response.data.recipes;
        this.recipes = [];
        this.recipes.push(...recipes);

        if(this.$root.store.username){
          var ids = recipes.map(function (recipe) {
            return recipe.id;
          });
          console.log(ids);
          try{
          const infoResponse = await this.axios.get(
          this.$root.store.server_url + "/user/previewRecipeInfo/id/["+ ids + "]"
          );
          console.log(infoResponse); 
          recipes.map(function (recipe) {
            recipe.watched = infoResponse.data[recipe.id].watched; 
            recipe.favorite = infoResponse.data[recipe.id].favorite;
          });
          }
          catch (error) {
            console.log(error);
          }
        }


      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
