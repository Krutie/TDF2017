<template>
  <div id="app">
    <stage></stage>
    <footerArea></footerArea>
  </div>
</template>

<script>
import stage from './components/stage'
import footerArea from './components/footerArea.vue'


export default {
  name: 'app',
  components: {
    stage, footerArea
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
  margin-top: 5px;
}
 .fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
