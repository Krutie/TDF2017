<template>
  <div id="app">
    <information></information>
    <stage></stage>
  </div>
</template>

<script>
import stage from './components/stage'
import information from './components/information.vue'


export default {
  name: 'app',
  components: {
    stage, information
  },
}
</script>

<style>
body { 
  font-family: 'Comfortaa', cursive;
  background-color: #91c7c5; text-align: center; 
}
body, html {      
  margin: 0; padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFF;
}
 .fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
