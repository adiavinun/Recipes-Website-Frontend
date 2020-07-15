<template>
  <div class="container">
    <div v-if="recipe">
      <div class="header">
        <h1>{{ recipe.title }}</h1>
        <span v-if="recipe.vegetarian">
          <img
            src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594558862/Vegetarian-2-512_jzy0lc.png"
            class="vegetarian"
          />
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span v-if="recipe.vegan">
          <img
            src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594558435/100-vegan-2-512_rscngh.png"
            class="vegan"
          />
        </span>
        <span v-if="recipe.glutenFree">
          <img
            src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594490038/glutenfree_l1cde5.webp"
            class="gluten"
          />
        </span>
        <img :src="recipe.image" class="center" />
        <br />
      </div>
      <div class="recipe-body">
        <div class="mb-3">
          <b-container class="table">
            <b-row>
              <b-col
                ><b-icon-clock-history></b-icon-clock-history> Ready in
                {{ recipe.readyInMinutes }} minutes
              </b-col>
              <b-col v-if="recipe.aggregateLikes >= 0"
                ><b-icon-hand-thumbs-up></b-icon-hand-thumbs-up>
                {{ recipe.aggregateLikes }} likes</b-col
              >
              <b-col v-if="recipe.servings"
                ><b-icon-people></b-icon-people>
                {{ recipe.servings }} servings</b-col
              >
              <b-col v-if="this.$root.store.username && recipe.aggregateLikes >= 0"
                ><small v-if="!recipe.saved"
                  ><button @click="addToFavorites" class="button">
                    <b-icon-heart-fill
                      style="color:#F874C4"
                    ></b-icon-heart-fill></button
                ></small>
               <small v-if="recipe.saved"><b-icon-heart-fill style="color:#F874C4"></b-icon-heart-fill></small>
              
            <!--<small v-else>
              <b-icon-heart-fill style="color:#F874C4"></b-icon-heart-fill>
            </small>-->
              </b-col>
            </b-row>
          </b-container>
        </div>
        <div class="wrapper">
          <div class="wrapped">
            <strong style="font-size: 18px">Ingredients:</strong>
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.id"
              >
                {{ r.nameAndAmount }}
              </li>
            </ul>
          </div>
          <div v-if="recipe.aggregateLikes >= 0" class="wrapped">
            <strong style="font-size: 18px">Instructions:</strong>
            <ol>
              <li v-for="s in recipe.instructions" :key="s.number">
                {{ s }}
              </li>
            </ol>
          </div>
          <div v-else class="wrapped">
            <strong style="font-size: 18px">Instructions:</strong>
            <ol>
              <li v-for="s in recipe.instructions" :key="s.number">
                {{ s.description }}
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
      likes: null,
      //vegan: require('@/assets/vegan.JPG')
    };
  },
 
  async created(){
    this.created()
  }, 
 
  methods: {
    async created() {
    try {
      let response;
      let _recipe;
      //personal recipe
      console.log(this.$route.params);
      if (this.$route.params.likes >= 0) {
        response = await this.axios.get(
          //"http://localhost:3000/recipes/fullRecipeInfo/id/[" +
            this.$root.store.BASE_URL + "/recipes/fullRecipeInfo/id/[" +
            this.$route.params.recipeId +
            "]",
          { withCredentials: true }
        );
        _recipe = response.data[0];
      } else {
        response = await this.axios.get(
               this.$root.store.BASE_URL + "/user/myPersonalRecipeFull/id/"+
          //"http://localhost:3000/user/myPersonalRecipeFull/id/" +
            //"https://ass3-2-adi-nicole.herokuapp.com/user/myPersonalRecipeFull/id/" +
            this.$route.params.recipeId,
          { withCredentials: true }
        );
        _recipe = response.data;
      }
      console.log(_recipe);
      //console.log(response.data[0].instructions);
      //}
      // console.log("response.status", response.status);
      //if (response.status !== 200) this.$router.replace("/NotFound");
      //console.log(response.data);
      //console.log(this.$route.params);
      //console.log("im here1");
      if (this.$root.store.username) {
        //console.log("im here2");
        if (this.$route.params.likes) {
          //console.log("im here3");
          const post = await this.axios.post(
             this.$root.store.BASE_URL + "/user/addSeenRecipe",
            //"http://localhost:3000/user/addSeenRecipe",
            //"https://ass3-2-adi-nicole.herokuapp.com/user/addSeenRecipe",
            {
              recipe_id: this.$route.params.recipeId,
              withCredentials: true,
            }
          );
        }
        const responseRecipeInfo = await this.axios.get(
          this.$root.store.BASE_URL + "/user/recipeInfo/id/[" +
          //"http://localhost:3000/user/recipeInfo/id/[" +
            this.$route.params.recipeId +
            "]",
          //"https://ass3-2-adi-nicole.herokuapp.com/user/recipeInfo/id/[" + recipe_ids + "]",
          { withCredentials: true }
        );
        var recipeInfo = responseRecipeInfo.data;
      }
      this.recipe = _recipe;
      if (recipeInfo) {
        this.recipe.watched = recipeInfo[this.recipe.id].watched;
        this.recipe.saved = recipeInfo[this.recipe.id].saved;
      }
      console.log(this.recipe);
      /*this.recipe = {
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
      };*/
    } catch (error) {
      //console.log("error.response.status", error.response.status);
      console.log(error);
      this.$router.replace("/NotFound");
      return;
    }
  },
    async addToFavorites() {
      console.log(this.recipe);
      try {
        const post = await this.axios.post(
          this.$root.store.BASE_URL + "/user/addFavRecipe",
          //"http://localhost:3000/user/addFavRecipe",
          {
            recipe_id: this.recipe.id,
            withCredentials: true,
          }
        );
        this.recipe.saved="",
        this.recipe.saved = true;
      } catch (error) {
        console.log(error.response);
      }
    },
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
.vegetarian {
  width: 52px;
}
.vegan {
  width: 50px;
}
.gluten {
  width: 54px;
}
</style>
