<template>
  <div id="nav">
    <b-nav tabs>
      <b-nav-item class="nav2"
        ><router-link :to="{ name: 'main' }"
          ><b-icon icon="house-door"></b-icon>Home
        </router-link>
      </b-nav-item>

      <b-nav-item class="nav2"
        ><router-link :to="{ name: 'search' }"
          ><b-icon icon="search"></b-icon>Search</router-link
        >
      </b-nav-item>

      <b-nav-item class="nav2"
        ><router-link :to="{ name: 'about' }"
          ><b-icon icon="receipt"></b-icon>About</router-link
        >
      </b-nav-item>
      <b-navbar-nav class="ml-auto" right>
        <span v-if="!$root.store.username">
          <b-nav tabs fill class="nav2" right>
            <b-nav-item disabled right> Hello Guest: </b-nav-item>
            <b-nav-item>
              <router-link :to="{ name: 'register' }"
                ><b-icon icon="person-circle"></b-icon>Register</router-link
              ></b-nav-item>

            <b-nav-item right>
              <router-link :to="{ name: 'login' }"
                ><b-icon icon="lock"></b-icon>Login</router-link
              ></b-nav-item
            >
          </b-nav>
        </span>

        <span v-else>
          <b-nav right>
            <b-dropdown text="Personal" size="sm" right>
              <b-icon icon="person-lines-fill"></b-icon>
              <b-dropdown-item :to="{ name: 'myrecipes' }"
                >My Recipes</b-dropdown-item
              >
              <b-dropdown-item :to="{ name: 'favorite' }"
                >Favorite Recipes</b-dropdown-item
              >
              <b-dropdown-item :to="{ name: 'family' }"
                >Family Recipes</b-dropdown-item
              >
            </b-dropdown>

            <b-dropdown :text="$root.store.username" size="sm" right>
              <b-dropdown-item active @click="Logout">Log Out</b-dropdown-item>
            </b-dropdown>
            
            <!--לנסות להוסיף תמונות פרופיל בצד-->
            <!-- <img :src="$root.store.profileImg" class="profile-image" /> -->

            <!--לבדוק אם יש עוד דרך אחרת או לוותר על זה בכללי-->
          </b-nav>
        </span>
      </b-navbar-nav>
    </b-nav>
   
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";


#nav {
  
  padding: 30px;
  font-size: 17px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  
}
.nav2{
  -webkit-text-stroke-width: 0.5px;
}

#nav a.router-link-exact-active {
  color: #1BA224;
}
</style>
