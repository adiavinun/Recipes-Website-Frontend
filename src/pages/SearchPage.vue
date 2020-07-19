<template>
  <div class="container">    
    <h1 class="title"><b-icon icon="search"></b-icon> Search</h1>
    <h4>What's your desire? <b-icon icon="chat-dots"></b-icon></h4>
    <div style="display: flex;">
      <b-form @reset.prevent="onReset">
        <b-form-input
          id="search"
          v-model="searchContent"
          placeholder="recipe or dish name"
          type="search"
          list="search-options-list"
          style="width: 430px; padding: 5px;"
        ></b-form-input>
        <b-form-group label="Number of search results:">
          <b-form-radio-group
            id="radio-group-1"
            v-model="selected"
            :options="options"
            name="radio-options"
          ></b-form-radio-group>
        </b-form-group>
        <b-form-group
          id="input-group-cuisines"
          label-cols-sm="3"
          label="cuisines:"
          label-for="cuisines"
        >
          <b-form-select
            id="cuisines"
            v-model="cuisinesInput"
            name="cuisines"
            placeholder="Select by cuisine"
            :value="null"
          >
            <option disabled value="">--Select cuisine--</option>
            <option
              v-for="(cuisine, index) in cuisines"
              :value="cuisine"
              :key="index"
              >{{ cuisine }}</option
            >
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-diets"
          label-cols-sm="3"
          label="diets:"
          label-for="diets"
        >
          <b-form-select id="diets" v-model="dietsInput" name="diets">
            <option disabled value="">--Select diet--</option>
            <!--<option disabled selected value>Please Select Diet</option>-->
            <option v-for="(diet, index) in diets" :value="diet" :key="index">{{
              diet
            }}</option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-intolerances"
          label-cols-sm="3"
          label="intolerances:"
          label-for="intolerances"
        >
          <b-form-select
            id="intolerances"
            v-model="intolerancesInput"
            name="intolerances"
          >
            <option disabled value="">--Select intolerance--</option>
            <!--<option disabled selected value>Please Select Intolerance</option>-->
            <option
              v-for="(intolerance, index) in intolerances"
              :value="intolerance"
              :key="index"
              >{{ intolerance }}</option
            >
          </b-form-select>
        </b-form-group>
        <!--  <b-button type="reset" variant="danger" @click="onReset()">Reset</b-button>-->
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <!--<b-button type="button" class="btn btn-primary" tyle="width:250px;" @click="search()" variant="primary">Search</b-button>-->
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <center>
        <b-button
          type="button"
          class="btn"
          style="width:230px;  margin-left: auto;
    margin-right: auto;"
          @click="search()"
          variant="primary"
          :disabled="!searchContent.length"
          >Search</b-button
        >
        </center>
        <br /><br /><br />
        <b-form-group
          id="input-group-sort"
          label-cols-sm="3"
          label="Sort By:"
          label-for="Sort By"
        >
          <b-form-select
            v-model="sort"
            @change="sortby"
            :disabled="!recipes || !recipes.length"
            width="20px"
          >
            <b-form-select-option :value="null" disabled
              >--Sort By--</b-form-select-option
            >
            <b-form-select-option value="timeHigh"
              >Sort by time high to low</b-form-select-option
            >
            <b-form-select-option value="timeLow"
              >Sort by time low to high</b-form-select-option
            >
            <b-form-select-option value="likeHigh"
              >Sort by popularity high to low</b-form-select-option
            >
            <b-form-select-option value="likeLow"
              >Sort by popularity low to how</b-form-select-option
            >
          </b-form-select>
        </b-form-group>

        <!--<b-form-group v-if="!noResults && !recipes.length && this.lastSearchTerm" class="lastSearchTerm">
        <div v-if="this.lastSearchTerm">
              <h4>Your last search was:</h4> {{this.lastSearchTerm}}
        </div>
        </b-form-group>-->

        <b-form-group
          v-if="recipes.length"
          id="input-group-intolerances"
          label-cols-sm="3"
          label-for="Your last search was"
        >
          <br />
          <div v-if="this.lastSearchTerm && $root.store.username">
            <h4>Your last search was: {{ this.lastSearchTerm }}</h4>
          </div>
      
          <!--<h4 >The result search:</h4>-->
        <RecipePreviewList
            title="Results:"
            pageType="search"
            :recipesList="recipes"
            class="SearchRecipes"
          />
        <!--<div v-for="r in recipes" :key="r.id"> 
        <RecipePreview title="The result search:" class="recipePreview" :recipe="r" />
        <br>
        </div>-->
        </b-form-group>
        <!--<h4>Your last search was:</h4>-->

        <b-form-group v-if="noResults" class="empty">
          <h4>No results returned</h4>
        </b-form-group>
      </b-form>
      <br />
    </div>
  </div>
</template>
<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
    
  },
  data() {
    return {
      cuisines: [
        "",
        "African",
        "American",
        "British",
        "Cajun",
        "Caribbean",
        "Chinese",
        "Eastern European",
        "European",
        "French",
        "German",
        "Greek",
        "Indian",
        "Irish",
        "Italian",
        "Japanese",
        "Jewish",
        "Korean",
        "Latin American",
        "Mediterranean",
        "Mexican",
        "Middle Eastern",
        "Nordic",
        "Southern",
        "Spanish",
        "Thai",
        "Vietnamese",
      ],
      diets: [
        "",
        "Gluten Free",
        "Ketogenic",
        "Vegetarian",
        "Lacto-Vegetarian",
        "Ovo-Vegetarian",
        "Vegan",
        "Pescetarian",
        "Paleo",
        "Primal",
        "Whole30",
      ],
      intolerances: [
        "",
        "Dairy",
        "Egg",
        "Gluten",
        "Grain",
        "Peanut",
        "Seafood",
        "Sesame",
        "Shellfish",
        "Soy",
        "Sulfite",
        "Tree Nut",
        "Wheat",
      ],
      searchContent: "",
      cuisinesInput: "",
      dietsInput: "",
      intolerancesInput: "",
      noResults: false,
      recipes: [],
      sort: null,
      selected: "5",
      options: [
        { text: "5", value: "5" },
        { text: "10", value: "10" },
        { text: "15", value: "15" },
      ],
      lastSearch: "",
      lastSearchTerm: "",
    };
  },
  mounted() {
    this.lastSearchTerm = localStorage.getItem("lastSearchTerm");
    this.loadHistorySearch();
  },

  methods: {
    async loadHistorySearch() {
      try {
        if (this.$root.store.username) {
          if (localStorage.lastSearch) {
            this.recipes = JSON.parse(localStorage.lastSearch);
            //console.log(this.recipes);
           
          }
        } else {
          if (localStorage.lastSearch) {
            localStorage.removeItem("lastSearch");
          }
        }
        //console.log(localStorage.lastSearch);
      } catch (err) {
        console.log(err.response);
      }
    },

    async search() {
      try {
        var searchRecipes;
        const response = await this.axios.get(
            this.$root.store.BASE_URL + "/recipes/search/query/" + this.searchContent + "/amount/"+ this.selected,{
            //"http://localhost:3000/recipes/search/query/" + this.searchContent + "/amount/"+ this.selected,{
            params: {
              query: this.searchContent,
              number: this.selected,
              ...(this.dietsInput.length > 0
                ? { diet: `${this.dietsInput}` }
                : {}),
              ...(this.cuisinesInput.length > 0
                ? { cuisine: `${this.cuisinesInput}` }
                : {}),
              ...(this.intolerancesInput.length > 0
                ? { intolerance: `${this.intolerancesInput}` }
                : {}),
            },
          }
        );
        searchRecipes = response.data;
        //console.log(searchRecipes);
        if (this.$root.store.username) {
          const recipe_ids = [];
          for (var i = 0; i < searchRecipes.length; i++) {
            recipe_ids.push(searchRecipes[i].id);
          }
          //console.log(recipe_ids);
          const responseRecipeInfo = await this.axios.get(
            this.$root.store.BASE_URL + "/user/recipeInfo/id/[" + recipe_ids + "]",
            //"http://localhost:3000/user/recipeInfo/id/[" + recipe_ids + "]",
            //"https://ass3-2-adi-nicole.herokuapp.com/user/recipeInfo/id/[" + recipe_ids + "]",
            { withCredentials: true }
          );
          var recipeInfo = responseRecipeInfo.data;
          //console.log(recipeInfo);
        }
        this.recipes = [];
        for (var i = 0; i < searchRecipes.length; i++) {
          var currRecipe = searchRecipes[i];
          if (recipeInfo) {
            currRecipe.watched = recipeInfo[currRecipe.id].watched;
            currRecipe.saved = recipeInfo[currRecipe.id].saved;
          }
          this.recipes.push(currRecipe);
        }
        //console.log(this.recipes);

        localStorage.setItem("lastSearchTerm", this.searchContent);
        this.lastSearchTerm = this.searchContent;
      
        localStorage.setItem("lastSearch", JSON.stringify(this.recipes));
        
        if (this.recipes.length == 0) {
          this.noResults = true;
        }
        else{
          this.noResults = false;
        }
      } catch (err) {
        console.log(err.response);
        //this.form.submitError = err.response.data.message;
      }
    },
    sortby() {
      if (this.sort == "timeLow") {
        function compareTime(a, b) {
          if (a.readyInMinutes < b.readyInMinutes) return -1;
          if (a.readyInMinutes > b.readyInMinutes) return 1;
          return 0;
        }
        return this.recipes.sort(compareTime);
      } else if (this.sort == "timeHigh") {
        function compareTime(a, b) {
          if (a.readyInMinutes < b.readyInMinutes) return 1;
          if (a.readyInMinutes > b.readyInMinutes) return -1;
          return 0;
        }
        return this.recipes.sort(compareTime);
      } else if (this.sort == "likeHigh") {
        function compareLikes(a, b) {
          if (a.aggregateLikes < b.aggregateLikes) return 1;
          if (a.aggregateLikes > b.aggregateLikes) return -1;
          return 0;
        }
        return this.recipes.sort(compareLikes);
      } else if (this.sort == "likeLow") {
        function compareLikes(a, b) {
          if (a.aggregateLikes < b.aggregateLikes) return -1;
          if (a.aggregateLikes > b.aggregateLikes) return 1;
          return 0;
        }
        return this.recipes.sort(compareLikes);
      }
      //console.log("changed");
      //console.log(this.num_of_recipes);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}
.empty {
  color: red;
}
.title{
    background: url("https://previews.123rf.com/images/romastudio/romastudio1603/romastudio160300234/54088727-healthy-food-background-and-copy-space-studio-photo-of-different-fruits-and-vegetables-on-white-wood.jpg");
    color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    text-align: center;
    font-family:"Trebuchet MS", Helvetica, sans-serif;
    font-size: 43px;
    font-weight: bold;
}

</style>
