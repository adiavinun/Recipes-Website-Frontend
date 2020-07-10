<template>
  <div class="container">
   <!-- <h1 class="title">Main Page</h1>-->
   
    <b-container class="bv-example-row">
      <b-row >
        <b-col >
          <RandomRecipes title="Explore these Recipes" pageType="random" :recipesList="recipes" class="RandomRecipes" />
          
        </b-col>
        <b-col>
          <div v-if="!$root.store.username" to="/login" >
            <Login />
           </div>
           <div v-else >
             <RecipePreviewList
             title="Last Visited Recipes"
             pageType="lastSeen"
             :recipesList="recipes"
            :class="{
              RandomRecipes: true,
              blur: !$root.store.username,
              center: true,
            }"
            disabled
          > </RecipePreviewList>
          </div>
         
        </b-col>
      </b-row>
    </b-container>
   
  </div>
</template>

<script>
import RandomRecipes from "../components/RandomRecipes.vue";
import RecipePreviewList from "../components/RecipePreviewList.vue";
import RecipePreview from "../components/RecipePreview.vue";
import Login from "../pages/LoginPage";
export default {
  components: {
    RecipePreviewList,
    Login,
    RandomRecipes,
  
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
  text-align: center;
}
.new {
  margin: 10px 0 10px;
  text-align: center;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

</style>
