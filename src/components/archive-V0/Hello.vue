<template>
  <div class="hello">
    <div class="btn" v-on:click="[makeStages(), started = true]">Begin Infographic</div>
    <div style="position: absolute; top: 50%; left: 25%;">
        <div class="degree" v-for="stage in stages">
            <div :id="stage.ID" :class="currentStageID ==stage.ID ? 'active' : ''"
              v-on:click="[currentStageID = stage.ID, rotateDegrees(stage)]"> 
                {{ stage.NAME }} 
            </div>
        </div>
    </div>
      <detail :stgeid="currentStageID" :started="started"></detail>    
      <wheel :spokeNumber="stageLength" :started="started"></wheel>
      <a v-if="currentStageID > 1" style="cursor:pointer;" v-on:click="backStage()" > 
        Back 
      </a>
      <a v-if="currentStageID < stageLength" style="cursor:pointer;" v-on:click="nextStage()" > 
        Next 
      </a>
  </div>
</template>
<script>
import Detail from './Detail.vue'
import Wheel from './Wheel.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'hello',
  components: { Detail, Wheel },
  data () {
    return {
       currentStageID: 1,  started: false
    }
  }, // end of data
  created(){
    this.fetchStages()
    this.fetchTeams()
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
    nextStage(){
        this.currentStageID += 1
        // Find stage
        let stage = _.find(this.stages, (s) => {
          return s.ID == this.currentStageID
        })
        this.rotateDegrees(stage)
    },
    backStage() {
       this.currentStageID -= 1
        // Find stage
        let stage = _.find(this.stages, (s) => {
          return s.ID == this.currentStageID
        })
        this.rotateDegrees(stage)
    },
    makeStages() {    
        var degrees = $(".degree");
        var angle = 360/this.stageLength;
        degrees.each(function(index, item) {
          TweenMax.fromTo(item, 3, {
          top: '0%', rotation: index, transformOrigin: "0% 5%",
          }, {
            top: '50%', rotation: angle*index, transformOrigin: "0% 5%", opacity: 0.9
          }, 1);
        });
      }, // end of makeLeaves
      rotateWheel(stage) {
        var wheel = $(".wheel"); 
        var angle = 360/this.stageLength;
        TweenMax.to(wheel, 2, {
            rotation: stage.ID*angle+'_short', transformOrigin: "50% 50%"
        }, 2)
      },
      rotateDegrees(stage) {
        var degrees = $(".degree");
        var angle = 360/this.stageLength;
        _.map(degrees, (index, key) => {
            if(stage.ID == key+1) {
                TweenLite.to(index, 2, {
                    rotation: 0+'_short', transformOrigin: "0% 0%"
                });    
            } else if (key == 0) {
                TweenLite.to(index, 2, {
                    rotation: (stage.ID*angle)-angle+'_short', transformOrigin: "0% 0%"
                }); 
            }else {
                TweenLite.to(index, 2, {
                rotation: key*angle+'_short', transformOrigin: "0% 0%"
                });
            }
        })
        this.rotateWheel(stage);
      }, // end of makeWheel
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
