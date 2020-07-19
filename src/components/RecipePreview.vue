<template>
  <div>
    <!--<b-card-group deck>-->
      <b-card class="card">
        <router-link
          :to="{
            name: 'recipe',
            params: { recipeId: recipe.id, likes: recipe.aggregateLikes },
          }"
          class="recipe-preview"
        >
          <b-card-img
            :src="recipe.image"
            img-top
            img-width="180"
            img-height="240"
            class="image"
          />
          <br />
          <br />
          <br />
          <b-card-title
            :title="recipe.title"
            class="recipe-title"
            style="font-size: 20px"
          >
            {{ recipe.title }}
          </b-card-title>
        </router-link>
        <b-card-body class="body">
          <b-card-text>
            <b-icon-clock-history></b-icon-clock-history>
            {{ recipe.readyInMinutes }} min
            <b-icon-hand-thumbs-up
              v-if="recipe.aggregateLikes >= 0"
            ></b-icon-hand-thumbs-up
            >{{ recipe.aggregateLikes }}
          </b-card-text>
          <b-card-text>
            <small v-if="recipe.vegetarian"
              ><b-card-img
                src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594558862/Vegetarian-2-512_jzy0lc.png"
                class="vegetarian"
              ></b-card-img>
            </small>
            <small v-if="recipe.vegan"
              ><b-card-img
                src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594558435/100-vegan-2-512_rscngh.png"
                class="vegan"
              ></b-card-img>
            </small>
            <small v-if="recipe.glutenFree"
              ><b-card-img
                src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594490038/glutenfree_l1cde5.webp"
                class="gluten"
              ></b-card-img>
            </small>
          </b-card-text>
          <b-card-text
            v-if="this.$root.store.username && recipe.aggregateLikes >= 0"
          >
            <small v-if="recipe.watched" class="h4 mb-2"
              ><b-icon-eye></b-icon-eye
            ></small>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <AddToFavorites
              v-if="this.$root.store.username && recipe.aggregateLikes >= 0"
              :recipeID="recipe.id"
              :isSaved="recipe.saved"
            ></AddToFavorites>
          </b-card-text>
        </b-card-body>
      </b-card>
   <!-- </b-card-group>-->
  </div>
</template>

<script>
import AddToFavorites from "../components/AddToFavorites";

import { BIconClockHistory, BIconHandThumbsUp, BIconEye } from "bootstrap-vue";

export default {
  components: {
    BIconClockHistory,
    BIconHandThumbsUp,
    BIconEye,
    AddToFavorites,
  },
  
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
.body {
  font-size: 17px;
  color: black;
}
.vegan {
  width: 45px;
}
.vegetarian {
  width: 45px;
}
.gluten {
  width: 50px;
}
.button {
  font-size: 16px;
}
.image:hover {
  transform: scale(1.2);
}
.card {
  background-color: rgba(0, 0, 0, 0.2);
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
}
.recipe-title {
  color: black;
  font-weight: bold;
}
</style>
