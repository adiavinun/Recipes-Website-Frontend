<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Home</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <span v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        <b-dropdown text="Personal" size="sm">
          <b-dropdown-item :to="{ name: 'myrecipes' }">My Recipes</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'favorite' }">Favorite Recipes</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'family' }">Family Recipes</b-dropdown-item>
        </b-dropdown>
        {{ $root.store.username }}: <button @click="Logout">Logout</button>|
      </span>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
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
