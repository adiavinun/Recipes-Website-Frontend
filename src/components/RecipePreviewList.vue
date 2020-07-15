<template>
  <b-container>
    <h3 class="title">
      {{ title }}
      <slot></slot>
    </h3>
    <b-row>
      <div v-if="pageType === 'family'">
        <!--<b-row>-->
          <b-col v-for="r in recipes" :key="r.id">
            <FamilyRecipePreview class="recipePreview" :recipe="r" />
            <br>
          </b-col>
        <!--</b-row>-->
      </div>
      <div v-else-if="pageType === 'random'">
        <!--<b-row>-->
          <b-col v-for="r in recipesList" :key="r.id">
            <RecipePreview class="recipePreview" :recipe="r" />
            <br>
          </b-col>
         <!--</b-row>-->
      </div>
      <div v-else-if="pageType === 'search'">
        <!--<b-row>-->
          <b-col v-for="r in recipesList" :key="r.id">
            <RecipePreview class="recipePreview" :recipe="r" />
            <br>
          </b-col>
         <!--</b-row>-->
      </div>
      <div v-else>
         <!--<b-row>-->
          <b-col v-for="r in recipes" :key="r.id">
            <RecipePreview class="recipePreview" :recipe="r" />
            <br>
          </b-col>
         <!--</b-row>-->
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
    },
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
        //have their own component
        console.log(this.recipesList);
        if (this.pageType != "random" && this.pageType != "search") {
          var recipes;
          //let url = "https://ass3-2-adi-nicole.herokuapp.com/";
          let url = "http://localhost:3000/";
          if (this.pageType == "lastSeen") {
            url += "user/last3SeenRecipes";
          } else if (this.pageType == "myrecipes") {
            url += "user/myPersonalRecipesPreview";
          } else if (this.pageType == "family") {
            url += "user/myFamilyRecipesPreview";
          } else if (this.pageType == "favorite") {
            url += "user/myFavRecipes";
          }
          const response = await this.axios.get(url, { withCredentials: true });
          recipes = response.data;

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
          }
          this.recipes = [];
          for (var i = 0; i < recipes.length; i++) {
            var currRecipe = recipes[i];
            if (recipeInfo) {
              currRecipe.watched = recipeInfo[currRecipe.id].watched;
              currRecipe.saved = recipeInfo[currRecipe.id].saved;
            }
            this.recipes.push(currRecipe);
          }
          //console.log(recipes);
        }
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
.title{
    color: #2c3e50;
    -webkit-text-stroke-width: 1px;
    text-align: center;
    font-family:"Trebuchet MS", Helvetica, sans-serif;
    font-size: 30px;
    font-weight: bold;
}
</style>
