<template>
  <div class="hello">
    <div class="btn" v-on:click="[started = true]">Begin Infographic</div>
    <stage :began="started" :StageId="currentStageID" ></stage>
    <chainwheel :began="started" :StageId="currentStageID"></chainwheel>
    <team :began="started" :StageId="currentStageID" ></team>
    <div v-show="started">
      <a v-if="currentStageID > 1" style="cursor:pointer;" v-on:click="backStage()" > 
          Back  </a>
      <a v-if="currentStageID < stageLength" style="cursor:pointer;" v-on:click="nextStage()" > Next  </a>
    </div>
  </div>
</template>
<script>
import Stage from './Stage.vue'
import Chainwheel from './ChainWheel.vue'
import Team from './Team.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'tdf',
  components: { Stage, Chainwheel, Team },
  data() {
    return {
       currentStageID: 1,  
       started: false,
       rotate: 1,
    }
  }, // end of data
  created(){
    this.fetchStages()
    this.fetchTeams()
    this.eventHub.$on('stageClicked', (s)=> {  this.shoutOut(s) })
  },
  computed: {
    ...mapGetters({
        stages: 'getStages',
        teams: 'getTeams'
    }),
    stageLength() {
       return this.stages.length;
    }, 
  },
  methods: {
    ...mapActions({
        fetchStages: 'fetchStages',
        fetchTeams: 'fetchTeams'
    }),
    shoutOut(s) { this.currentStageID = s.currentStageID; },
    nextStage() { this.currentStageID += 1 },
    backStage() { this.currentStageID -= 1 },
  }, // end of methods
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a { color: yellow; }
.active { 
    font-weight: bold;  color: #00BCD4;
 }
.btn { 
  padding: 15px;
  color: #41b883;
  cursor: pointer;
 }
.degree {
    position: absolute;
    width: 150px;
    height: 0;
    text-align: right;
    cursor: pointer;
    display: inline-block;
    font-size: 15px;
    color: #FFEB3B;
    cursor: pointer;
    opacity: 0;
    border: 0.5px dashed rgba(255, 235, 59, 0.38);
    border-left-color: transparent;
    border-bottom-color: transparent;
  }
</style>
