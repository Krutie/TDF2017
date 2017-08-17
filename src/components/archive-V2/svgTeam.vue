<template> 
<g class="svgTeam"> 
      <frontFender v-if="getTeamDetail" :team="getTeamDetail" :stage="getStageDetail"></frontFender>
{{ getTeamDetail }}
      <circle fill="#673AB7" cx="430" cy="200" r="90" fill-opacity="0" style="stroke-opacity: 0.5; stroke: yellow; stroke-dasharray: 1 2; stroke-width: 5;"/>
      <g class="team" v-for="team in teams">
        <text x="347" y="197" :id="team.ID" 
        :class="getStageDetail.UCI_CODE ==team.UCI_CODE ? 'active' : ''"> 
              {{ team.UCI_CODE }}
        </text>
        <rect id="rect1" x="347" y="200" width="83" height="1" style="fill: transparent; fill-opacity: 0.5; stroke: yellow; stroke-width: 0.5; stroke-dasharray: 1 1" />
    </g>
  </g>
</template>
<script>
import { mapGetters } from 'vuex'
import frontFender from './frontFender.vue'
export default {
  name: 'team',
  props: ['StageId', 'began', 'still'],
  components: { frontFender },
  computed: {
    ...mapGetters({
        stages: 'getStages',
        teams: 'getTeams'
    }),
    getStageDetail() {
      return _.find(this.stages, (t) => { 
        return t.ID == this.StageId 
      })
    }, 
    getTeamDetail() {
        return _.find(this.teams, (t) => { 
            return t.UCI_CODE == this.getStageDetail.UCI_CODE 
        })
    }, 
    getFirstStage() {
        return _.first(this.stages)
    }, 
    teamLength() {
       return this.teams.length;
    }
  },
   watch: {
    getStageDetail: function(newValue) {
      this.animateTeamName(); // for stagedetail animation
      this.rotateTeams(newValue);
    },
    began: function(newValue) {
      this.animateTeamName(); // for stagedetail animation
      this.rotateTeams(this.getFirstStage);
    }, 
  },
  methods: {   
    animateTeamName() {
      var tl = new TimelineMax();
      tl.staggerFromTo([".teamPath", ".tName", ".tName2"], 1, {
           rotation: 0, opacity: 0
        }, {
          rotation: 15, transformOrigin: "50% 65%" , opacity: 1,
          ease: Circ.easeOut
        }, 1)
    }, // end of animateIt()
    rotateTeams(stage) {
        // find the selected team
        let team = _.find(this.teams, (t) => { 
            if(t)
                return t.UCI_CODE == stage.UCI_CODE 
        })
        var degrees = $(".team");
        var angle = 360/this.teamLength;
        _.map(degrees, (index, key) => {
            if(team.ID == key+1) {
                TweenMax.to(index, 2, {
                    rotation: 0+'_short', transformOrigin: "100% 100%", opacity: 0.9, delay: 3,
                    onComplete: this.enableNav
                    // onBegin: this.disableNav,
                });    
            } else if (key == 0) {
                TweenMax.to(index, 2, {
                    rotation: (team.ID*angle)-angle+'_short',transformOrigin: "100% 100%", opacity: 0.9, delay: 2,
                }); 
            } else {
                TweenMax.to(index, 2, {
                rotation: key*angle+'_short', 
                transformOrigin: "100% 100%", opacity: 0.9, delay: 1,
                });
            } // end of if statement
        })
      }, // end of rotateTeams
      enableNav() {
        this.eventHub.$emit('animationEnded');
      }, // end of enableNav
      disableNav() {
        this.eventHub.$emit('animationStarted');
      }, // end of disableNav
    } // end of methods
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active { 
    font-weight: bold;  fill: #00BCD4;
 }
.team {
    font-size: 8px;
    cursor: pointer;
    fill: #FFEB3B;
    opacity: 0;
  }
  .teamDetail {
    position: absolute; width: 200px; height: 200px; text-align: center;
    border-radius: 50%; background-color: #FFF; 
  }
  text {  font-size: 8px; fill: #FFEB3B;}
</style>
