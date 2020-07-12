<template>
  <div class="container">
    <h1 class="title"><b-icon icon="search"></b-icon>Search Page</h1>
    <h2>What's your desire? <b-icon icon="chat-dots"></b-icon> </h2>
    
    <div style="display: flex;">
       <b-form >
      <b-form-input id="search" v-model="searchContent" placeholder="The name of the recipe or dish you would like to look for" type="search" list="search-options-list" style="width:400px; padding: 5px;" ></b-form-input>
      <b-form-group id="input-group-cuisines" label-cols-sm="3" label="cuisines:" label-for="cuisines">
        <b-form-select id="cuisines" v-model="cuisinesInput" name="cuisines" placeholder="Select by cuisine" :value="null">
          <option disabled value="">Select by cuisine</option>
        <!--<option disabled selected value>Please Select Cuisine</option>-->
        <option v-for="(cuisine, index) in cuisines" :value="cuisine" :key="index">{{cuisine}}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group id="input-group-diets" label-cols-sm="3" label="diets:" label-for="diets">
        <b-form-select id="diets" v-model="dietsInput" name="diets">
          <option disabled value="">Select by Diet</option>
        <!--<option disabled selected value>Please Select Diet</option>-->
        <option v-for="(diet, index) in diets" :value="diet" :key="index">{{diet}}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group id="input-group-intolerances" label-cols-sm="3" label="intolerances:" label-for="intolerances">
        <b-form-select id="intolerances" v-model="intolerancesInput" name="intolerances">
          <option disabled value="">Select by Intolerance</option>
        <!--<option disabled selected value>Please Select Intolerance</option>-->
        <option v-for="(intolerance, index) in intolerances" :value="intolerance" :key="index">{{intolerance}}</option>
        </b-form-select>
      </b-form-group>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="button" class="btn btn-primary" tyle="width:250px;" @click="search()" variant="primary">Search</b-button>

     </b-form >
    </div>
   
  </div>
</template>
<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    //RecipePreviewList
  },

  data() {
    return {
      cuisines: [
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
      recipes: [],
    
    };
  },
  mounted() {
    
  },

};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>