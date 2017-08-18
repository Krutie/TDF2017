<template>
    <svg version="1.1" id="Layer_1" class="svgStyle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="630px" height="400px" viewBox="0 0 630 400" enable-background="new 0 0 630 400" xml:space="preserve">

        <g class="cycleBody">
          <path d="M411 91v7.5c15.2 0 27.5-12.4 27.5-27.5 0-9-4.5-17-11.2-22.4.3-.4.6-1.5.6-2 0-1-.8-2-1.4-2.8 2-3 3.6-6.5 4.5-10.4.5-2.7.5-5.2.4-7.8 0 0-1-1.5-3.4-2-2.3-.4-4 .5-4 .5.3 3 .3 5.6 0 8-1 4-2.8 7.7-5.5 10h-54c-2.3 0-4.3 2-4.3 4.7 0 4.7 9.6 8.5 2.8 12.4-34.6 12-109.2 25.6-133.3 28l-12-36 13.8.5c4.2 0 7.5-2 8-6.2.2-4.2-3-6.5-7-6.8l-46.5-2c-4.2 0-7.5 2-8 6.2 0 4.2 3 6.4 7.6 6.7l15.4 1 20 55.3-70.3 87h-.5c-4.4 0-8.3 4-8.3 8.8 0 4.4 3.4 8.3 8 8.3 2.3 0 4.5-1 6-2.2 0 0 122 19 124.2 19 5.6 0 9.8-1.7 13.5-7.3l85-118.4 47 103.4c.8 3 4 4.4 7 3.2 3-1 4.6-4.4 3.5-7.4 0 0-65-148.3-65.6-149.2h40c11.2 0 20.2 9 20.2 20.3 0 11-9 20-20 20h-.3l.5-.3zM158.8 200.7c0-1.5-.5-3-1.5-4.2l67.6-77.7 42 95.2-108-13.4h-.2zm74.4-99l134.2-30 7.2 19c-.4 4.8-74.5 101-93 121l-48.4-110z"/>
          <text x="50" y="15" class="title"> 
            TOUR DE FRANCE 2017 * 104th Edition * 3540 Kilometres
          </text>
        </g>

      <circle cx="150" cy="200" r="90" class="wheel"/> 
      <g v-for="stage in stages" class="stage" 
      v-on:click="[activeStageId = stage.ID, rearrangeStages()]">
        <text x="196" y="197" :class="activeStageId ==stage.ID ? 'active' : ''"> 
            {{ stage.NAME }} 
        </text>
         <rect id="rect1" x="150" y="200" width="83" height="1" class="spoke" />
       </g>  

       <stagedetail :stage="activeStageDetail"></stagedetail>
       <team :team="activeTeam"></team>
       <chainwheel :stageId="activeStageId" :num="13"></chainwheel>
       <navigation :currentStageId="activeStageId" :stageLength="stages.length"
       @nextStage="nextStage()" @backStage="backStage()"></navigation>
    </svg>
</template>
<script>
import { map, find } from 'underscore'; 
import { mapGetters, mapActions } from 'vuex'
import stagedetail from './stagedetail.vue'
import team from './team.vue'
import chainwheel from './chainWheel.vue'
import navigation from './navigation.vue'
export default {
  name: 'stage',
  components: { stagedetail, team, chainwheel, navigation },
  data() {
    return {
      activeStageId: 1, 
    }
  }, // end of data
  created(){
    this.fetchStages()
  },
  computed: {
    ...mapGetters({
        stages: 'getStages',
        teams: 'getTeams'
    }),
    activeStageDetail() {
      return find(this.stages, (t) => { 
        return t.ID == this.activeStageId 
      })
    }, 
    activeTeam(){
        return find(this.teams, (team) => { 
            // console.log(this.stage.UCI_CODE)
            return team.UCI_CODE == this.activeStageDetail.UCI_CODE 
        })
    }, 
  },
  watch: {
    stages(newValue) {
      this.$nextTick(function() {
         this.arrangeStages()
      })
    },
    activeStageId(newValue) {
      this.rearrangeStages()
    }
  }, 
  methods: {
    ...mapActions({
        fetchStages: 'fetchStages',
    }),
    nextStage(){
      this.activeStageId += 1
    },
    backStage(){
      this.activeStageId -= 1
    },
    arrangeStages(){
        let degrees = document.querySelectorAll(".stage")
        let angle = 360/this.stages.length;
        map(degrees, (index, key) => {
          TweenMax.to(index, 2, {
             rotation: angle*key, transformOrigin: "0% 100%", opacity: 0.9
          }, 1);
        });
    }, // end of arrangeStages()
    rearrangeStages(){
        let degrees = document.querySelectorAll(".stage")
        let angle = 360/this.stages.length;
        map(degrees, (index, key) => {
            if(this.activeStageId == key+1) {
                TweenLite.to(index, 2, {
                    rotation: 0+'_short', transformOrigin: "0% 100%"
                });    
            } else if (key == 0) {
                TweenLite.to(index, 2, {
                    rotation: (this.activeStageId*angle)-angle+'_short', transformOrigin: "0% 100%"
                }); 
            }else {
                TweenLite.to(index, 2, {
                rotation: key*angle+'_short', transformOrigin: "0% 100%"
                });
            }
        })
    }, 
  }, // end of methods
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Layer_1 {  height: 80%; width: 80%; }
.svgStyle {  background-color: #a4d6d4; padding: 20px; border-radius: 10px; }
.wheel { fill:#232321; fill-opacity:0.7; stroke-opacity: 1; stroke: #2e4e4a; stroke-dasharray: .5 2;stroke-width: 7; }
.stage { font-size: 8px; cursor: pointer; fill: white; }
.spoke {  fill: transparent; stroke: white; stroke-width: 0.5; stroke-dasharray: 1 1; }
.active { font-weight: bold;  fill: #f17774; }
.cycleBody { fill:#f1f1f1; fill-opacity: 0.8; stroke: none;  }
.title { fill: #f71b16; }
</style>