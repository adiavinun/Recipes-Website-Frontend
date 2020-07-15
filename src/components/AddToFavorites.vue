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
        this.saved = true;
      } catch (error) {
        console.log(error.response);
      }
    },
   },
};
</script>

<style scoped></style>
