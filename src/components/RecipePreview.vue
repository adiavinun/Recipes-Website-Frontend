<template>
  <div>
    <b-card-group deck>
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
            img-width="150"
            img-height="240"
            class="image"
          />
          <br />
          <br />
          <br />
          <b-card-title
            :title="recipe.title"
            class="recipe-title"
            style="font-size: 19px"
          >
            {{ recipe.title }}
          </b-card-title>
        </router-link>
        <b-card-body class="body">
          <b-card-text>
            <b-icon-clock-history></b-icon-clock-history>
            {{ recipe.readyInMinutes }} min
            <b-icon-hand-thumbs-up></b-icon-hand-thumbs-up
            >{{ recipe.aggregateLikes }}
          </b-card-text>
          <b-card-text>
            <small v-if="recipe.vegetarian"
              ><b-card-img
                src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594489780/vegetarian_tsdzrb.png"
                class="vegetarian"
              ></b-card-img>
            </small>
            <small v-if="recipe.vegan"
              ><b-card-img
                src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594489562/vegan_bwcoze.png"
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
            v-if="this.$root.store.username && recipe.aggregateLikes"
          >
            <large v-if="recipe.watched" class="h4 mb-2"
              ><b-icon-eye></b-icon-eye
            ></large>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <large v-if="!recipe.saved"
              ><button
                @click="addToFavorites"
                style="color:#F874C4"
                class="button"
              >
                <b-icon-heart-fill></b-icon-heart-fill></button
            ></large>
            <large v-else-if="recipe.saved"
              ><b-icon-heart-fill style="color:#F874C4"></b-icon-heart-fill
            ></large>
          </b-card-text>
        </b-card-body>
      </b-card>
    </b-card-group>
  </div>
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
  font-size: 16px;
  color: black;
}
.vegan {
  width: 35px;
}
.vegetarian {
  width: 35px;
}
.gluten {
  width: 40px;
}
.button {
  font-size: 16px;
}
.image:hover {
  transform: scale(1.2);
}
.card {
  background-color: rgba(0, 0, 0, 0.1);
}
.recipe-title{
  color: black;
  font-weight: bold;
}

</style>
