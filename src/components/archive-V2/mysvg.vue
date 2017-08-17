<template>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="630.5px" height="500.5px" viewBox="0 0 630.5 500.5" enable-background="new 0 0 630.5 500.5" xml:space="preserve">
    <!-- Infographic Title -->
     <path fill="none" id="tdf" stroke-miterlimit="10" d="M53.4 292.2C.4 239 .4 153 53.4 99.8c53.2-53 139.2-53 192.4 0 53 53.2 53 139.2 0 192.4"/>
    <use xlink:href="#tdf"/>
       <text style="fill:#FFEB3B; fill-opacity: 0.7; font-size: 12px;">
         <textPath xlink:href="#tdf" startOffset="5%" >
        TOUR DE FRANCE 2017 * 104th Edition * 3540 Kilometres
         </textPath>
       </text>

     <transition name="fade">
        <g v-if="!started" v-on:click="[started = true, still = false]">
            <circle id="pulse" fill="#ffeb3b" cx="315" cy="200" r="25"/>
            <circle fill="#673AB7" cx="315" cy="200" r="15"/>
        </g>
    </transition>
  <line x1="190" y1="95" x2="390" y2="95" style="stroke: rgba(255, 235, 59, 0.5); stroke-dasharray: 1 1;" />
     <transition name="fade">
         <g v-if="started && still">
         <g v-if="currentStageID>1" v-on:click="backStage()">
            <rect x="120" y="350" width="55" height="25" rx="4" style="pointer:cursor; fill: #00BCD4; fill-opacity:0.5; "/>
            <text x="125" y="366" style="fill:white; font-size: 10px; text-transform:uppercase;"> Stage {{ previousStage.ID }} </text>
             </g>
             <g v-if="currentStageID<stageLength" v-on:click="nextStage()">
            <rect x="410" y="350" width="55" height="25" rx="4" fill="#00BCD4" style="pointer:cursor; fill: #00BCD4; fill-opacity:0.5; "/>
             <text x="415" y="366" style="fill:white; font-size: 10px; text-transform:uppercase;"> Stage {{ comingStage.ID }} </text>

             </g>
        </g>
    </transition>
    <stage :began="started" :StageId="currentStageID" ></stage>
    <chainwheel :began="started" :StageId="currentStageID"></chainwheel>
    <team :began="started" :StageId="currentStageID" :still="still"></team>

    </svg>
</template>
<script>
import Stage from './svgStage.vue'
import Chainwheel from './svgChainWheel.vue'
import Team from './svgTeam.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'mysvg',
  components: { Stage, Chainwheel, Team },
  data() {
    return {
       currentStageID: 1,  
       started: false,
       // rotate: 1,
       still: true,
    }
  }, // end of data
  mounted() {
    TweenMax.fromTo('#pulse', 2, {
        scale: 0,  opacity:1, repeat: -1, transformOrigin: "50% 50%",
      }, { 
        scale: 1.5,  opacity: 0 , repeat: -1, transformOrigin: "50% 50%",
      }, 1);
  }, 
  created(){
      this.fetchStages()
    this.fetchTeams()
    this.pulsate()
    // }
    this.eventHub.$on('stageClicked', (s)=> {  
      this.shoutOut(s);
      this.still = false;
    })
    // this.eventHub.$on('animationStarted', (s)=> {  // this.still = false })
    this.eventHub.$on('animationEnded', (s)=> {  this.still = true })
  },
  computed: {
    ...mapGetters({
        stages: 'getStages',
        teams: 'getTeams'
    }),
    stageLength() {
       return this.stages.length;
    }, 
    StageDetail() {
      return _.find(this.stages, (t) => { 
        return t.ID == this.currentStageID 
      })
    },
    previousStage() {
     return _.find(this.stages, (t) => { 
        return t.ID == this.currentStageID-1 
      })
    },
    comingStage() {
      return _.find(this.stages, (t) => { 
        return t.ID == this.currentStageID+1 
      })
    }, 
  },
  methods: {
    ...mapActions({
        fetchStages: 'fetchStages',
        fetchTeams: 'fetchTeams'
    }),
    pulsate() {
     // pulsing motion
      TweenLite.fromTo($("#pulse"), 1, {
          scale: 0,  opacity:1, repeat: -1, transformOrigin: "50% 50%",
        }, { 
          scale: 1,  opacity: 0 , repeat: -1, transformOrigin: "50% 50%",
        }, 0);
    },
    shoutOut(s) { 
    this.fetchStages()
      this.currentStageID = s.currentStageID; },
    nextStage() { this.currentStageID += 1 },
    backStage() { this.currentStageID -= 1 },
  }, // end of methods
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Layer_1 {  height: 90%; width: 90%; }
a { color: yellow; }
.active { 
    font-weight: bold;  color: #00BCD4;
 }
.btn { 
  padding: 15px;
  color: #41b883;
  cursor: pointer;
 }
 .fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>