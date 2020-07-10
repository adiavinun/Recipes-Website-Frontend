<template>
  <div class="container">
    <div v-if="recipe">
      <div class="header">
        <h1>{{ recipe.title }}</h1>
        <h5 v-if="recipe.vegetarian && recipe.vegan && recipe.glutenFree">
          vegetarian, vegan, gluten free
        </h5>
        <h5 v-else-if="recipe.vegetarian && recipe.vegan">
          vegetarian, vegan
        </h5>
        <h5 v-else-if="recipe.vegan && recipe.glutenFree">
          vegan, gluten free
        </h5>
        <h5 v-else-if="recipe.vegetarian && recipe.glutenFree">
          vegetarian, gluten free
        </h5>
         <h5 v-else-if="recipe.vegetarian">
          vegetarian
        </h5>
        <h5 v-else-if="recipe.vegan">
          vegan
        </h5>
        <h5 v-else-if="recipe.glutenFree">
          gluten free
        </h5>

        <img :src="recipe.image" class="center" />
        <br>
      </div>
      <div class="recipe-body">
        <div class="mb-3">
          <b-container class="table">
            <b-row>
              <b-col
                ><b-icon-clock-history></b-icon-clock-history> Ready in
                {{ recipe.readyInMinutes }} minutes
              </b-col>
              <b-col
                ><b-icon-hand-thumbs-up></b-icon-hand-thumbs-up>
                {{ recipe.aggregateLikes }} likes</b-col
              >
              <b-col
                ><b-icon-people></b-icon-people>
                {{ recipe.servings }} servings</b-col
              >
              <b-col 
                ><button style ="color:#F874C4"><b-icon-heart-fill ></b-icon-heart-fill></button>
                Add to favorites</b-col
              >
            </b-row>
          </b-container>
        </div>
        <div class="wrapper">
          <div class="wrapped">
            <strong style= "font-size: 18px">Ingredients:</strong>
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.id"
              >
                {{ r.nameAndAmount }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <strong style= "font-size: 18px">Instructions:</strong>
            <ol>
              <li v-for="s in recipe.instructions" :key="s.number">
                {{ s }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BIconClockHistory,
  BIconHandThumbsUp,
  BIconPeople,
  BIconHeartFill,
} from "bootstrap-vue";

export default {
  components: {
    BIconClockHistory,
    BIconHandThumbsUp,
    BIconPeople,
    BIconHeartFill,
  },
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;
      //try {
      //personal recipe
      /*if (this.$root.store.username) {
          response = await this.axios.get(
            this.$$root.BASE_URL + "/user/myPersonalRecipeFull/id/" + this.$route.params.recipeId,
            { withCredentials: true }
          );
        } else {*/
      /*response = await this.axios.get(
          "http://localhost:3000/recipes/fullRecipeInfo/id/[" +
            //this.$$root.BASE_URL + "/recipes/fullRecipeInfo/id/[" +
            this.$route.params.recipeId +
            "]",
          { withCredentials: true }
        );
        console.log(response.data[0].instructions);
        //}
        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      let _recipe = response.data[0];*/
      //get watched and saved

      //this.recipe = _recipe;
      this.recipe = {
        id: 638741,
        title: "Chipotle Black Bean Soup with Avocado Cream",
        readyInMinutes: 45,
        aggregateLikes: 37,
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        image: "https://spoonacular.com/recipeImages/638741-556x370.jpg",
        ingredients: [
          {
            nameAndAmount:
              "1 small ripe avocado, pitted, peeled and cut into cubes (about 1/2 cup)",
          },
          {
            nameAndAmount:
              "3 cans (about 15 ounces each) black beans, rinsed and drained",
          },
          { nameAndAmount: "4 large carrots, peeled and diced (about 2 cups)" },
          {
            nameAndAmount:
              "4 cups Swanson® Chicken Broth (Regular, Natural Goodness® or Certified Organic)",
          },
          {
            nameAndAmount:
              "1 can (7 ounces) chipotle peppers in adobo sauce, minced",
          },
          { nameAndAmount: "2 tablespoons chopped fresh cilantro leaves" },
          { nameAndAmount: "1 tablespoon lemon juice" },
          { nameAndAmount: "2 tablespoons olive oil" },
          { nameAndAmount: "2 large onions, diced (about 2 cups)" },
          { nameAndAmount: "1/4 cup sour cream" },
        ],
        instructions: [
          "Soak two 12- x 7-inch (30 x 18 cm) untreated cedar…er for at least 30 minutes or for up to 24 hours.",
          "Place salmon fillets on top of each plank.",
          "In small bowl, whisk together oil, lemon rind and …mustard, salt and pepper; brush some over salmon.",
          "Place planks on grill over medium-high heat; close…r until fish flakes easily when tested with fork.",
          "Dill Sauce:Meanwhile, in small bowl, combine sour cream, cucumber, dill, chives, salt and pepper.",
          "Serve planks on platter with dill sauce.",
        ],
        servings: 8,
      };
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async addToFavorites() {
      try {
        this.recipe.favorite = true;
        const post = await this.axios.post(
          this.$root.BASE_URL + "/user/addFavRecipe",
          {
            recipe_id: this.recipe.id,
            withCredentials: true,
          }
        );
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>

<style scoped>
.header{
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
/* .recipe-header{

} */
</style>
