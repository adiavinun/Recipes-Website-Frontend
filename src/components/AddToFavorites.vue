<template>
  <small v-if="!this.saved"
    ><button @click="addToFavorites" class="button" type="button">
      <b-icon-heart-fill style="color:#F874C4"></b-icon-heart-fill></button
  ></small>
  <small v-else
    ><b-icon-heart-fill style="color:#F874C4"></b-icon-heart-fill
  ></small>
</template>

<script>
export default {
    name: "AddToFavorites",
    data() {
    return {
      saved: false,
    };
  },
  props: {
    recipeID: {
      type: Number,
      required: true,
    },
    isSaved: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    this.saved = this.isSaved;
  },
   methods: {
    async addToFavorites() {
      try {
        const post = await this.axios.post(
          this.$root.store.BASE_URL + "/user/addFavRecipe",
          //"http://localhost:3000/user/addFavRecipe",
          {
            recipe_id: this.recipeID,
            withCredentials: true,
          }
        );
        this.$root.store.favoriteRecipes = [];

        this.saved = true;
        if(localStorage.lastSearch){
          var recipes = JSON.parse(localStorage.lastSearch);
          //console.log(recipes);
         for (var i = 0; i < recipes.length; i++) {
            if(recipes[i].id == this.recipeID){
              if(this.saved != recipes[i].saved){
                recipes[i].saved = this.saved;        
              }
            }
          }
          localStorage.removeItem("lastSearch");
          //console.log(localStorage.lastSearch);
          //console.log(recipes);
          localStorage.setItem("lastSearch", JSON.stringify(recipes));
          //console.log(localStorage.lastSearch);
        }
      } catch (error) {
        console.log(error.response);
      }
    },
   },
};
</script>

<style scoped></style>
