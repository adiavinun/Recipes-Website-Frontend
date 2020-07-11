<template>
<div>
    <RecipePreviewList title="Explore these Recipes" pageType="random" :recipesList="recipes" class="RandomRecipes" />
    <div class="new">
        <b-button v-on:click="this.updateNewRandomRecipes">view other recipes!</b-button> 
        <!--<ButtonRandom  v-on:addItem="this.updateNewRandomRecipes"> view other recipes!</ButtonRandom>-->
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
 /* props: { 
    recipesList: {
      type: Array,
      required: true,
    },
  },*/
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
          //this.$root.store.server_url + "/recipes/3randomRecipes"
          "http://localhost:3000/recipes/3randomRecipes",
          
           //{params: {number: 3}}
        );
        console.log(response);
        const recipes = response.data.recipes;
        this.recipes = [];
        this.recipes.push(...recipes);

       /* if(this.$root.store.username){
          var ids = recipes.map(function (recipe) {
            return recipe.id;
          });
          console.log(ids);
          try{
          const infoResponse = await this.axios.get(
          //this.$root.store.server_url + "/user/previewRecipeInfo/id/["+ ids + "]"
          "http://localhost:3000/user/previewRecipeInfo/id/["+ ids + "]"
          );
          console.log(infoResponse); 
          recipes.map(function (recipe) {
            recipe.watched = infoResponse.data[recipe.id].watched; 
            recipe.favorite = infoResponse.data[recipe.id].favorite;
          });*/
          }
          catch (error) {
            console.log(error);
          }
       // }


     /* } catch (error) {
        console.log(error);
      }*/
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
