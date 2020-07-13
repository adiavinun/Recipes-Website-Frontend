<template>
  <div class="container">
    <h1 class="title"><b-icon icon="search"></b-icon>   Search</h1>
    <h4>What's your desire? <b-icon icon="chat-dots"></b-icon> </h4>
    
    <div style="display: flex;">
       <b-form @reset.prevent="onReset">
      <b-form-input id="search" v-model="searchContent" placeholder="The name of the recipe or dish you would like to look for" type="search" list="search-options-list" style="width:430px; padding: 5px;" ></b-form-input>
      <b-form-group label="Number of search results:">
      <b-form-radio-group id="radio-group-1" v-model="selected" :options="options" name="radio-options"></b-form-radio-group>
    </b-form-group>
      <b-form-group id="input-group-cuisines" label-cols-sm="3" label="cuisines:" label-for="cuisines">
        <b-form-select id="cuisines" v-model="cuisinesInput" name="cuisines" placeholder="Select by cuisine" :value="null">
          <option disabled value="">--Select by cuisine--</option>
        <option v-for="(cuisine, index) in cuisines" :value="cuisine" :key="index">{{cuisine}}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group id="input-group-diets" label-cols-sm="3" label="diets:" label-for="diets">
        <b-form-select id="diets" v-model="dietsInput" name="diets">
          <option disabled value="">--Select by diet--</option>
        <!--<option disabled selected value>Please Select Diet</option>-->
        <option v-for="(diet, index) in diets" :value="diet" :key="index">{{diet}}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group id="input-group-intolerances" label-cols-sm="3" label="intolerances:" label-for="intolerances">
        <b-form-select id="intolerances" v-model="intolerancesInput" name="intolerances">
          <option disabled value="">--Select by intolerance--</option>
        <!--<option disabled selected value>Please Select Intolerance</option>-->
        <option v-for="(intolerance, index) in intolerances" :value="intolerance" :key="index">{{intolerance}}</option>
        </b-form-select>
      </b-form-group>
    <!--  <b-button type="reset" variant="danger" @click="onReset()">Reset</b-button>-->
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <!--<b-button type="button" class="btn btn-primary" tyle="width:250px;" @click="search()" variant="primary">Search</b-button>-->
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <b-button type="button" class="btn btn-primary" style="width:430px;" @click="search()" variant="primary" :disabled="!searchContent.length">Search</b-button>
       <br><br><br>
       <b-form-group id="input-group-sort" label-cols-sm="3" label="Sort By:" label-for="Sort By">    
          <b-form-select v-model="sort" @change="sortby" :disabled="!recipes || !recipes.length" width="20px">
            <b-form-select-option :value="null" disabled>--Sort By--</b-form-select-option>
            <b-form-select-option value="timeHigh">Sort by time high to low</b-form-select-option>
            <b-form-select-option value="timeLow">Sort by time low to high</b-form-select-option>
            <b-form-select-option value="likeHigh">Sort by popular high to low</b-form-select-option>
            <b-form-select-option value="likeLow">Sort by popular low to how</b-form-select-option>
          </b-form-select>
      </b-form-group>
     
      <b-form-group v-if="recipes.length" id="input-group-intolerances" label-cols-sm="3" label-for="Your last search was" > 
      <br>       
       <h4 >The result search:</h4>
      
        <div v-for="r in recipes" :key="r.id"> 
        <RecipePreview title="The result search:" class="recipePreview" :recipe="r" />
        <br>
        </div>
      </b-form-group>
     <!--<h4>Your last search was:</h4>-->
    
      <b-form-group v-if="noResults" class="empty">
        <h4> No results returned</h4>
      </b-form-group>
     </b-form >
     <br>

    <!-- <div v-if="this.lastSearchTerm">
      Your last search was: {{this.lastSearchTerm}}
    </div>-->

    
    </div>
   
  </div>
</template>
<script>
import RecipePreview from "../components/RecipePreview";
export default {
  components: {
    RecipePreview
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
        "Vietnamese"
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
        "Whole30"
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
        "Wheat"
      ],
      searchContent: "",
      cuisinesInput: "",
      dietsInput: "",
      intolerancesInput: "",
      noResults: false,
      recipes: [],
      sort: null,
      selected: '5',
        options: [
          { text: '5', value: '5' },
          { text: '10', value: '10' },
          { text: '15', value: '15' },
        ],
      lastSearchTerm: "",
      
    };
  },
    mounted() {
    this.lastSearchTerm = localStorage.getItem("lastSearchTerm");
  },
  
  methods: {
    async search() {
      try {
        var searchRecipes;
        const response = await this.axios.get(
          //this.$root.BASE_URL + "/recipes/search/query/" + this.searchContent + "/amount/"+ this.selected,{
            "http://localhost:3000/recipes/search/query/" + this.searchContent + "/amount/"+ this.selected,{
            params: {
                query: this.searchContent,
                number: this.selected,
                ...(this.dietsInput.length > 0 ? {diet: `${this.dietsInput}`} : {}),
                ...(this.cuisinesInput.length > 0 ? {cuisine: `${this.cuisinesInput}`} : {}),
                ...(this.intolerancesInput.length > 0 ? {intolerance: `${this.intolerancesInput}`} : {})
              }
          }
        );
        searchRecipes = response.data;
         console.log(response);
        this.recipes = [];
        this.recipes.push(...searchRecipes);
        if (this.recipes.length == 0) {
          this.noResults = true;
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
      console.log("changed");
      console.log(this.num_of_recipes);
    }, 
    onReset() {
      this.form = {
        cuisines: "",
        diets: "",
        intolerances: "",
        searchContent: "",
        cuisinesInput: "",
        dietsInput: "",
        intolerancesInput: "",
        noResults: false,
        recipes: [],
        sort: null,
        selected: '5',
      };
       this.$nextTick(() => {
        this.$reset();
      });
    }
    
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}
 .empty{
   color: red;
 }
</style>