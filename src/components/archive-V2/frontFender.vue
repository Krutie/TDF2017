<template>
    <g>
      <g class="tName">
           <path fill="none" id="tName" stroke-miterlimit="10" d="M333.4 300.2c-56-56-56-146.5 0-202.4 56-56 146.5-56 202.4 0s56 146.5 0 202.4"/>
           <use xlink:href="#tName"/>
         <text>
           <textPath  xlink:href="#tName" startOffset="40%" v-if="">
            Total {{ team.STAGE_VICTORIES }} stages won in #TDF2017.
           </textPath>
         </text>
      </g>
      <g class="tName2">
       <path fill="none" id="tName2" stroke-miterlimit="10" d="M343.3 290.3c-50.5-50.4-50.5-132.2 0-182.6 50.4-50.5 132.2-50.5 182.6 0 50.4 50.4 50.4 132.2 0 182.6"/>
      <use xlink:href="#tName2"/>
         <text>
           <textPath xlink:href="#tName2" startOffset="40%" v-if="">
            {{ team.RIDERS }} Riders
           </textPath>
         </text>
      </g>
    <g class="teamPath">
      <path fill="none" id="teamPath" stroke-miterlimit="10" d="M354.6 279c-44.2-44.2-44.2-115.8 0-160s115.8-44.2 160 0 44.2 115.8 0 160"/>
        <use xlink:href="#teamPath"/>
       <text>
         <textPath xlink:href="#teamPath" startOffset="45%">
        {{ team.NAME }} ({{ team.UCI_CODE }}) * {{ team.COUNTRY }} 
         </textPath>
       </text>
    </g>
      <g class="winner">
      <path fill="none" id="winner" stroke-miterlimit="10" d="M364.5 269c-38.7-38.6-38.7-101.4 0-140C403.2 90 466 90 504.7 129c38.7 38.6 38.7 101.4 0 140"/>
      <use xlink:href="#winner"/>
      <text>
        <textPath xlink:href="#winner" startOffset="55%" v-if="">
          {{ stage.WINNER }} wins {{ stage.NAME }}.
        </textPath>
      </text>
    </g>
  </g>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'frontfender',
  props: ['team', 'stage'],
}
</script>
<style scoped>
    text { fill: #00BCD4;  font-size: 8px; }
    .tName, .tName2, .winner, .teamPath { opacity: 0; }
</style>