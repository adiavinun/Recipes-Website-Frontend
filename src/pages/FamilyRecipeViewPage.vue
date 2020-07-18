<template>
  <div class="container">
    <div v-if="recipe">
      <div class="header">
        <h1>{{ recipe.title }}</h1>
        <h5>By: {{ recipe.recipeOwner }}</h5>
        <h5>Occasion: {{ recipe.whenUsuallyMakeRecipe }}</h5>
        <img :src="recipe.image" class="center" />
        <br />
      </div>
      <div class="recipe-body">
        <div class="mb-3"></div>
        <div class="wrapper">
          <div class="wrapped">
            <Ingredients :ingredients="this.recipe.ingredients"></Ingredients>
          </div>
          <div class="wrapped">
            <Instructions
              :instructions="this.recipe.instructions"
              :likes="recipe.aggregateLikes"
            ></Instructions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ingredients from "../components/Ingredients";
import Instructions from "../components/Instructions";

export default {
  components: {
    Ingredients,
    Instructions,
  },
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      if (
        this.$root.store.myFamilyRecipesFull.find(
          (recipeFull) => recipeFull.id == this.$route.params.recipeId
        )
      ) {
        this.recipe = this.$root.store.myFamilyRecipesFull.find(
          (recipeFull) => recipeFull.id == this.$route.params.recipeId
        );
      } else {
        let response;
        //personal recipe
        //console.log(this.$route.params);
        response = await this.axios.get(
          this.$root.store.BASE_URL +
            "/user/myFamilyRecipeFull/id/" +
            //"http://localhost:3000/user/myFamilyRecipeFull/id/" +
            //"https://ass3-2-adi-nicole.herokuapp.com/user/myFamilyRecipeFull/id/" +
            this.$route.params.recipeId,
          { withCredentials: true }
        );

        //console.log(response.data[0].instructions);
        //}
        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
        let _recipe = response.data;
        this.recipe = _recipe;
        this.$root.store.myFamilyRecipesFull.push(this.recipe);
      }
    } catch (error) {
      //console.log("error.response.status", error.response.status);
      console.log(error);
      this.$router.replace("/NotFound");
      return;
    }
  },
};
</script>

<style scoped>
.header {
  font-family: Impact, Charcoal, sans-serif;
}
.wrapper {
  display: flex;
  background-color: gainsboro;
  border-style: groove;
  border-radius: 5px;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.table {
  background-color: gainsboro;
  border-style: groove;
  border-radius: 5px;
  padding: 2px;
}
</style>
