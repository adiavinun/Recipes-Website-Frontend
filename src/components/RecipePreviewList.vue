<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    pageType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes(this.pageType);
  },
  methods: {
    async updateRecipes(type) {
      try {
        var recipes;
        if (type && type == "random" && this.pageType == type){
          const response = await this.axios.get(
          "https://ass3-2-adi-nicole.herokuapp.com/recipes/3randomRecipes"
          );
          recipes = response.data;
        }
        else if (type && type == "lastSeen" && this.pageType == type){
          const response = await this.axios.get(
          "https://ass3-2-adi-nicole.herokuapp.com/user/last3SeenRecipes",
          { withCredentials: true }
          );
          recipes = response.data;
        }
        else if (type && type == "myrecipes" && this.pageType == type){
          const response = await this.axios.get(
          "https://ass3-2-adi-nicole.herokuapp.com/user/myPersonalRecipesPreview",
          { withCredentials: true }
          );
          recipes = response.data;
        }
        else if (type && type == "family" && this.pageType == type){
          const response = await this.axios.get(
          "https://ass3-2-adi-nicole.herokuapp.com/user/myFamilyRecipesPreview",
          { withCredentials: true }
          );
          recipes = response.data;
        }
          else if (type && type == "favorite" && this.pageType == type){
          const response = await this.axios.get(
          "https://ass3-2-adi-nicole.herokuapp.com/user/myFavRecipes",
          { withCredentials: true }
          );
          recipes = response.data;
        }
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
