<template>
  <div class="container">
    
    <h1 class="title">Recipes</h1>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <RandomRecipes :recipesArray="recipesList" class="RandomRecipes" />
          <ButtonRandomRecipes v-on:represhRandom="updateNewRandomRecipes"/>
        </b-col>
        <b-col>
          <div v-if="!$root.store.username" to="/login">
            <Login />
          </div>
          <div v-else>
            <RecipePreviewList title="Last Watched Recipes:" pageType="lastSeen"
              :class="{
                RandomRecipes: true,
                blur: !$root.store.username,
                center: true,
              }"
              disabled
            />
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
import ButtonRandomRecipes from "../components/ButtonRandomRecipes.vue";
import Login from "../pages/LoginPage";
export default {
  components: {
    RecipePreviewList,
    Login,
    RandomRecipes,
    ButtonRandomRecipes,
  },
  data() {
    return {
      recipesList: [],
    };
  },
  mounted() {
    this.updateNewRandomRecipes();
  },
  methods: {
    async updateNewRandomRecipes() {
      try {
        //console.log("im here");
        const response = await this.axios.get(
          //this.$root.store.server_url + "/recipes/3randomRecipes"
          this.$root.store.BASE_URL + "/recipes/3randomRecipes",
          //"http://localhost:3000/recipes/3randomRecipes",
          {
            params: {
              limitLicense: true,
              number: 3,
            },
          }
        );
        const recipes = response.data;
        if (this.$root.store.username) {
          const recipe_ids = [];
          for (var i = 0; i < recipes.length; i++) {
            recipe_ids.push(recipes[i].id);
          }
          //console.log(recipe_ids);
          const responseRecipeInfo = await this.axios.get(
            this.$root.store.BASE_URL + "/user/recipeInfo/id/[" + recipe_ids + "]",
            //"http://localhost:3000/user/recipeInfo/id/[" + recipe_ids + "]",
            //"https://ass3-2-adi-nicole.herokuapp.com/user/recipeInfo/id/[" + recipe_ids + "]",
            { withCredentials: true }
          );
          var recipeInfo = responseRecipeInfo.data;
          //console.log("im here2");

        }
        this.recipesList = [];
        for (var i = 0; i < recipes.length; i++) {
          var currRecipe = recipes[i];
          if (recipeInfo) {
            currRecipe.watched = recipeInfo[currRecipe.id].watched;
            currRecipe.saved = recipeInfo[currRecipe.id].saved;
          }
          this.recipesList.push(currRecipe);
        }
        //console.log(this.recipesList);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
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
.title{
    background: url("https://previews.123rf.com/images/romastudio/romastudio1603/romastudio160300234/54088727-healthy-food-background-and-copy-space-studio-photo-of-different-fruits-and-vegetables-on-white-wood.jpg");
    color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    text-align: center;
    font-family:"Trebuchet MS", Helvetica, sans-serif;
    font-size: 50px;
    font-weight: bold;
}
</style>
