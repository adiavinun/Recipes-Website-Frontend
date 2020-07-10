<template>

  <div id="app">
    <div id="nav">
      <b-nav tabs>
        <router-link :to="{ name: 'main' }">Home</router-link>|
        <router-link :to="{ name: 'search' }">Search</router-link>|
        <router-link :to="{ name: 'about' }">About</router-link>|
        <b-navbar-nav class="ml-auto">
        <span v-if="!$root.store.username">
          Hello Guest: 
          <router-link :to="{ name: 'register' }">Register</router-link>|
          <router-link :to="{ name: 'login' }">Login</router-link>|
        </span>
        <span v-else>
          <b-dropdown text="Personal" size="sm">
            <b-dropdown-item :to="{ name: 'myrecipes' }">My Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'favorite' }">Favorite Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'family' }">Family Recipes</b-dropdown-item>
          </b-dropdown>
          {{ $root.store.username }}: <button @click="Logout">Logout</button>
        <!--לנסות להוסיף תמונות פרופיל בצד-->
          <!-- <img :src="$root.store.profileImg" class="profile-image" /> -->

         <!--לבדוק אם יש עוד דרך אחרת או לוותר על זה בכללי-->  
        </span>
        </b-navbar-nav>
        </b-nav >
        </div>
      <router-view />
      
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
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app::before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('https://previews.123rf.com/images/romastudio/romastudio1603/romastudio160300280/54088843-healthy-food-background-studio-photo-of-different-fruits-on-white-wooden-table-high-resolution-produ.jpg');
  background-size: cover;
  top: 10%;
  opacity: 0.5;
  z-index: -1;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
