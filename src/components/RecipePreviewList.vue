<template>
  <b-container>
    <h3>
     {{ title }}:
      <slot></slot>
    </h3>
    <b-row >
       <div v-if="pageType === 'family'">
          <b-row >
          <b-col v-for="r in recipes" :key="r.id">    
          <FamilyRecipePreview class="recipePreview" :recipe="r" />
          </b-col>
           </b-row >
        </div>
        <div v-else-if="pageType === 'random'">
           <b-row >
          <b-col v-for="r in recipesList" :key="r.id"> 
          <RecipePreview class="recipePreview" :recipe="r" />
          </b-col>
           </b-row >
        </div>
        <div v-else>
           <b-row >
          <b-col v-for="r in recipes" :key="r.id"> 
          <RecipePreview class="recipePreview" :recipe="r" />
          </b-col>
           </b-row >
        </div>
      
    </b-row>


  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import FamilyRecipePreview from "./FamilyRecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview, 
    FamilyRecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    pageType: {
      type: String,
      required: true,
    },
    recipesList: {
      type: Array,

    }
  },

  
   
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes(this.pageType);
  },
 
  methods: {
    async updateRecipes() {
      try {
        var recipes;
        //let url = "https://ass3-2-adi-nicole.herokuapp.com/";
        let url = "http://localhost:3000/"
        /*if (this.pageType == "random") {
            url += "recipes/3randomRecipes";
        } else*/ if (this.pageType == "lastSeen") {
            url += "user/last3SeenRecipes";
        } else if (this.pageType == "myrecipes") {
            url += "user/myPersonalRecipesPreview";
        } else if (this.pageType == "family") {
            url += "user/myFamilyRecipesPreview";
        } else if (this.pageType == "favorite") {
            url += "user/myFavRecipes";
        }
        const response = await this.axios.get(
            url, { withCredentials: true }
        );
        recipes = response.data;

        if (this.$root.store.username) {
          const recipe_ids = Object.keys(recipes);
          const responseRecipeInfo = await this.axios.get(
            //this.$root.BASE_URL + "/user/recipeInfo/id/[" + recipe_ids + "]",
            "http://localhost:3000/user/recipeInfo/id/[" + recipe_ids + "]",
            //"https://ass3-2-adi-nicole.herokuapp.com/user/recipeInfo/id/[" + recipe_ids + "]",
            { withCredentials: true }
          );
          var recipeInfo = responseRecipeInfo.data;
        }
        this.recipes = [];
        for (var recipe_id in recipes) {
          var currRecipe = recipes[recipe_id];
          if (recipeInfo) {
            currRecipe.watched = recipeInfo[recipe_id].watched;
            currRecipe.saved = recipeInfo[recipe_id].saved;
          }
          this.recipes.push(currRecipe);
        }
        //sconsole.log(recipes);
      } catch (error) {
        console.log(error);
      }
    },
    
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
