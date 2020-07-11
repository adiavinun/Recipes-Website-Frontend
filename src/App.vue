<template>

  <div id="app">
    
    <div id="nav">
      
    
      <b-nav tabs >
         
        <b-nav-item><router-link :to="{ name: 'main' }" ><b-icon icon="house-door"></b-icon>Home </router-link>  </b-nav-item>
        
        <b-nav-item><router-link :to="{ name: 'search' }" ><b-icon icon="search"></b-icon>Search</router-link> </b-nav-item>
         
        <b-nav-item><router-link :to="{ name: 'about' }"><b-icon icon="receipt"></b-icon>About</router-link> </b-nav-item> 
        <b-navbar-nav class="ml-auto">
        <span v-if="!$root.store.username">
           <b-nav tabs fill>
         
          <b-nav-item disabled> Hello Guest: </b-nav-item>
         <b-nav-item> <router-link :to="{ name: 'register' }" ><b-icon icon="person-circle"></b-icon>Register</router-link></b-nav-item>
          
         <b-nav-item> <router-link :to="{ name: 'login' }" ><b-icon icon="lock"></b-icon>Login</router-link></b-nav-item>
          </b-nav>
        </span>
        
        <span v-else >
          <b-nav>
          
          <b-nav-item disabled><b-icon icon="unlock"></b-icon> {{ $root.store.username }}: </b-nav-item>
         
        
          <b-dropdown text="Personal" size="sm"> 
             <b-icon icon="person-lines-fill"></b-icon>
            <b-dropdown-item :to="{ name: 'myrecipes' }" >My Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'favorite' }" >Favorite Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'family' }" >Family Recipes</b-dropdown-item>
            
          </b-dropdown>
          <b-nav-item active @click="Logout"><b-icon icon="power"></b-icon>Logout</b-nav-item>
        <!--לנסות להוסיף תמונות פרופיל בצד-->
          <!-- <img :src="$root.store.profileImg" class="profile-image" /> -->

         <!--לבדוק אם יש עוד דרך אחרת או לוותר על זה בכללי-->  
        </b-nav>
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
