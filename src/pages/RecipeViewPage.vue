<template>
  <div class="container">
    <div v-if="recipe">
      <div class="header">
       
        <h1 class="title">{{ recipe.title }}</h1>
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
              <b-col>
                <AddToFavorites
                  v-if="this.$root.store.username && recipe.aggregateLikes >= 0"
                  :recipeID="this.recipe.id"
                  :isSaved="this.isSaved"
                ></AddToFavorites>
              </b-col>
            </b-row>
          </b-container>
        </div>
        <div class="wrapper">
          <div class="wrapped">
            <Ingredients :ingredients="this.recipe.ingredients"></Ingredients>
          </div>
          <div class="wrapped">
            <Instructions :instructions="this.recipe.instructions" :likes="recipe.aggregateLikes"></Instructions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddToFavorites from "../components/AddToFavorites";
import Ingredients from "../components/Ingredients";
import Instructions from "../components/Instructions";

import {
  BIconClockHistory,
  BIconHandThumbsUp,
  BIconPeople,
} from "bootstrap-vue";

export default {
  components: {
    BIconClockHistory,
    BIconHandThumbsUp,
    BIconPeople,
    AddToFavorites,
    Ingredients,
    Instructions,
  },
  data() {
    return {
      recipe: null,
      likes: null,
      isSaved: false,
      isWatched: false,
    };
  },

  async created() {
    this.created();
  },

  methods: {
    async created() {
      try {
        let response;
        let _recipe;
       // console.log(this.$route.params);
        if (this.$route.params.likes >= 0) {
          response = await this.axios.get(
            //"http://localhost:3000/recipes/fullRecipeInfo/id/[" +
            this.$root.store.BASE_URL +
              "/recipes/fullRecipeInfo/id/[" +
              this.$route.params.recipeId +
              "]",
            { withCredentials: true }
          );
          _recipe = response.data[0];
        } else {
          response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/user/myPersonalRecipeFull/id/" +
              //"http://localhost:3000/user/myPersonalRecipeFull/id/" +
              //"https://ass3-2-adi-nicole.herokuapp.com/user/myPersonalRecipeFull/id/" +
              this.$route.params.recipeId,
            { withCredentials: true }
          );
          _recipe = response.data;
        }
        //console.log(_recipe);
        //console.log(response.data[0].instructions);
        //}
        // console.log("response.status", response.status);
        //if (response.status !== 200) this.$router.replace("/NotFound");
        //console.log(response.data);
        //console.log(this.$route.params);
        //console.log("im here1");
        if (this.$root.store.username) {
         // console.log("im here2");
          if (this.$route.params.likes >= 0) {
           // console.log("im here3");
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
            this.$root.store.BASE_URL +
              "/user/recipeInfo/id/[" +
              //"http://localhost:3000/user/recipeInfo/id/[" +
              this.$route.params.recipeId +
              "]",
            //"https://ass3-2-adi-nicole.herokuapp.com/user/recipeInfo/id/[" + recipe_ids + "]",
            { withCredentials: true }
          );
          var recipeInfo = responseRecipeInfo.data;
          //console.log(recipeInfo);
        }
        this.recipe = _recipe;
        if (recipeInfo) {
          this.isWatched = recipeInfo[this.recipe.id].watched;
          this.isSaved = recipeInfo[this.recipe.id].saved;
        }
        //console.log(this.recipe);
      } catch (error) {
        //console.log("error.response.status", error.response.status);
        console.log(error);
        this.$router.replace("/NotFound");
        return;
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
