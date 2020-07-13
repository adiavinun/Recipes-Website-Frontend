<template>
  <div class="container">
    <!-- <h1 class="title">Main Page</h1>-->

    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <RandomRecipes :recipesArray="recipesList" class="RandomRecipes" />
          <br />
          <ButtonRandomRecipes v-on:represhRandom="updateNewRandomRecipes">
          </ButtonRandomRecipes>
          <!-- <div>
             <button @click="this.updateNewRandomRecipes">Refresh</button>
          </div>-->
        </b-col>
        <b-col>
          <div v-if="!$root.store.username" to="/login">
            <Login />
          </div>
          <div v-else>
            <RecipePreviewList
              title="Last Visited Recipes:"
              pageType="lastSeen"
              :class="{
                RandomRecipes: true,
                blur: !$root.store.username,
                center: true,
              }"
              disabled
            >
            </RecipePreviewList>
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
        const response = await this.axios.get(
          //this.$root.store.server_url + "/recipes/3randomRecipes"
          "http://localhost:3000/recipes/3randomRecipes",
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
            //this.$root.BASE_URL + "/user/recipeInfo/id/[" + recipe_ids + "]",
            "http://localhost:3000/user/recipeInfo/id/[" + recipe_ids + "]",
            //"https://ass3-2-adi-nicole.herokuapp.com/user/recipeInfo/id/[" + recipe_ids + "]",
            { withCredentials: true }
          );
          var recipeInfo = responseRecipeInfo.data;
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
</style>
