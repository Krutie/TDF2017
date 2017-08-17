<template> <g> 
    <g class="stagePath">
        <path id="stagePath" fill="none" stroke-miterlimit="10" d="M69.6 280c-44.2-44.2-44.2-115.8 0-160s115.8-44.2 160 0 44.2 115.8 0 160"/>
        <use xlink:href="#stagePath"/>
       <text class="title">
         <textPath xlink:href="#stagePath" startOffset="5%">
           {{ stage.ROUTE }}
         </textPath>
       </text>
    </g>
    <g class="dist">
    <path id="dist" fill="none" stroke-miterlimit="10" d="M68.8 257C37.4 212 48.3 150 93 118.7c45-31.4 106.8-20.5 138.2 24.4s20.5 106.6-24.3 138"/>
    <use xlink:href="#dist"/>
       <text>
         <textPath xlink:href="#dist" startOffset="5%" v-if="">
          {{ stage.NAME }} * {{ stage.DISTANCE }} * {{ stage.TYPE }} 
         </textPath>
       </text>
    </g>
       <routeIcon :rType="stage.TYPE"> </routeIcon>

</g> </template>
<script>
// import { mapGetters, mapActions } from 'vuex'
import routeIcon from './RouteIcon.vue'

export default {
  name: 'rearfender',
  props: ['stage'],
  components: { routeIcon },
}
</script>
<style scoped>
    /*.title {   }*/
    .dist,  .stagePath{ opacity: 0; fill: #ffeb3b ; font-size: 8px;}
</style>