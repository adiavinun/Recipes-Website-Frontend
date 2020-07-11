<template>
  <router-link
    :to="{
      name: 'recipe',
      params: { recipeId: recipe.id, likes: recipe.aggregateLikes },
    }"
    class="recipe-preview"
  >
    <b-card
      no-body
      :img-src="recipe.image"
      img-alt="Image"
      class="recipe-image"
      img-top
    >
      <b-card-body class="body">
        <b-card-title
          :title="recipe.title"
          class="recipe-title"
          style="font-size: 16px"
        >
          {{ recipe.title }}
        </b-card-title>
        <b-card-text>
          <b-icon-clock-history></b-icon-clock-history>
          {{ recipe.readyInMinutes }} min
          <b-icon-hand-thumbs-up></b-icon-hand-thumbs-up
          >{{ recipe.aggregateLikes }}
        </b-card-text>
      </b-card-body>

      <b-list-group flush class="body">
        <b-list-group-item
          ><b-card-text v-if="recipe.vegetarian">vegetarian</b-card-text>
          <b-card-text v-if="recipe.vegan">vegan</b-card-text>
          <b-card-text v-if="recipe.glutenFree">gluten free</b-card-text>

          <b-card-img src="/images/Capture.PNG" bottom></b-card-img
        ></b-list-group-item>
        <b-list-group-item
          v-if="this.$root.store.username && recipe.aggregateLikes"
          ><b-card-text v-if="recipe.watched"
            ><b-icon-eye></b-icon-eye
          ></b-card-text>
          <b-card-text
            v-if="!recipe.saved"
            ><button @click="addToFavorites" style="color:#F874C4">
              <b-icon-heart-fill></b-icon-heart-fill></button
          ></b-card-text>
          <b-card-text
            v-else-if="recipe.saved"
            ><b-icon-heart-fill style="color:#F874C4"></b-icon-heart-fill
          ></b-card-text>
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <!--<b-card
      :title="recipe.title"
      :img-src="recipe.image"
      img-alt="Card Image"
      text-variant="white"
      class="recipe-image"
      sub-title="Subtitle"
      style="max-width: 20rem; max-length: 30rem"
    >
      <b-card-text>
        Some quick example text to build on the card and make up the bulk of the
        card's content.
      </b-card-text>
    </b-card>-->

    <!--<b-card-group deck>
      <b-card
        overlay
        :title="recipe.title"
        :img-src="recipe.image"
        img-alt="Card Image"
        img-width="500"
        img-height="200"
        img-top
      >
        <b-card-text>
          <div v-if="recipe.aggregateLikes">{{ recipe.aggregateLikes }} likes</div>
          <br />
          vegetarian: {{ recipe.vegetarian }}
          <br />
          vegan: {{ recipe.vegan }}
          <br />
          gluten free: {{ recipe.glutenFree }}
        </b-card-text>
        <template v-slot:footer>
          <small class="text-muted"
            >Ready in {{ recipe.readyInMinutes }} minutes</small
          >
        </template>
      </b-card>
    </b-card-group>-->
  </router-link>
</template>

<script>
import {
  BIconClockHistory,
  BIconHandThumbsUp,
  BIconHeartFill,
  BIconEye,
} from "bootstrap-vue";

export default {
  components: {
    BIconClockHistory,
    BIconHandThumbsUp,
    BIconHeartFill,
    BIconEye,
  },
  data() {
    return {
      image_load: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async addToFavorites() {
      try {
        const post = await this.axios.post(
          "http://localhost:3000/user/addFavRecipe",
          {
            recipe_id: this.recipe.id,
            withCredentials: true,
          }
        );
        this.recipe.saved = true;
      } catch (error) {
        console.log(error.response);
      }
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
  font-size: 13px;
}
</style>
