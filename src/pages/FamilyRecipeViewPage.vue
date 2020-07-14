<template>
  <div class="container">
    <div v-if="recipe">
      <div class="header">
        <h1>{{ recipe.title }}</h1>
        <h5> By: {{recipe.recipeOwner}}</h5>
        <h5>Occasion: {{recipe.whenUsuallyMakeRecipe}}</h5>
        <img :src="recipe.image" class="center" />
        <br />
      </div>
      <div class="recipe-body">
        <div class="mb-3"></div>
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
          <div class="wrapped">
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
export default {
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;
      //personal recipe
      console.log(this.$route.params);
      response = await this.axios.get(
        this.$root.BASE_URL + "/user/myFamilyRecipeFull/id/",
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
/* .recipe-header{

} */
</style>
