<template>
<!--   <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->

  <!-- <router-view/> -->
  <router-view v-slot="{ Component }">
    <transition name="scale" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

</template>

<script>


</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

html,body{
  width: 100%;
  height: 100%;
  font-family: 'PT Sans', sans-serif;
  color: #3d3d3d;
}

body{
    margin: 0;
}

#app{
  width: 100%;
  height: 100%;

}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}


.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

 * , *:before, *:after{ 
     box-sizing:border-box; 
     -moz-box-sizing:border-box; 
     -webkit-box-sizing:border-box; 
     -ms-box-sizing:border-box;
   }

a { text-decoration: none; }
</style>
