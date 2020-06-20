<template>
  <div class="container">
<<<<<<< HEAD
    <h1 class="title">Main Page</h1>
    <RecipePreviewList title="Random Recipes:" pageType="random" class="RandomRecipes center" />
    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to login to view this</router-link>
    <RecipePreviewList
      title="Last Viewed Recipes:"
      pageType="lastSeen"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
=======
   <!-- <h1 class="title">Main Page</h1>-->
    <b-container class="bv-example-row">
      <b-row >
        <b-col >
          <RecipePreviewList title="Explore these Recipes" recipeType="random" class="RandomRecipes" />
          <br>
          <div class="new">
            <button @click="updateNewRandomRecipes">View other Recipes!</button> <!--  עדיין לא עובד כמו שצריך-->
          </div>
        </b-col>
        <b-col>
          <div v-if="!$root.store.username" to="/login" >
            <Login />
           </div>
           <div v-else >
             <RecipePreviewList
            title="Last Watched Recipes"
            :class="{
              RandomRecipes: true,
              blur: !$root.store.username,
              center: true,
            }"
            disabled
          > </RecipePreviewList>
          </div>
         
        </b-col>
      </b-row>
    </b-container>
   
>>>>>>> 5a4b4f632225dbbe2e7d17076c4ed16479fd807e
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import RecipePreview from "../components/RecipePreview.vue";
import Login from "../pages/LoginPage";
export default {
  components: {
    RecipePreviewList,
    Login,
  
  },
   
  methods: {
    updateNewRandomRecipes() { //<!-- לא מצליח-->
      this.$emit("updateRecipes", "random");
    },
   
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
  text-align: center;
}
.new {
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
