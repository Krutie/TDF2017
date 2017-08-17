<template>
  <div class="detail">
  <div v-if="getStageDetail" class="stageDetail">
     <div class="item"> {{ getStageDetail.KEY_MOMENT }} </div>
     <div class="item"> {{ getStageDetail.ROUTE }} </div>
     <div class="item" style="font-size: 20px;"> {{ getStageDetail.WINNER }} </div>
      <div class="item"> {{ getStageDetail.DATE }} </div>
     <div class="item"> {{ getStageDetail.NAME }} </div>
     <div class="item" id="distance"> {{ getStageDetail.DISTANCE }} </div>
     <!-- <div class="item"> {{ getStageDetail.UCI_CODE }} </div> -->
     <!-- <div class="item"> {{ getStageDetail.TYPE }} </div> -->
   </div>
    <div v-if="getStageDetail" class="frontWheel"> 
        <div class="team" v-for="team in teams">
            <div :id="team.ID" :class="getStageDetail.UCI_CODE ==team.UCI_CODE ? 'active' : ''" > 
                   {{ team.UCI_CODE }}
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'detail',
  props: ['stgeid', 'started'],
  computed: {
    ...mapGetters({
        stages: 'getStages',
        teams: 'getTeams'
    }),
    getStageDetail() {
      return _.find(this.stages, (t) => { 
        return t.ID == this.stgeid 
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
      this.animateIt(); // for stagedetail animation
      this.rotateTeams(newValue);
    },
    started: function(newValue) {
        this.animateIt(); // for stagedetail animation
      this.rotateTeams(this.getFirstStage);
    }, 
  },
  methods: {
    animateIt() {
        var items = $(".item");
         _.map(items, (item, key) => {
          TweenMax.fromTo(item, 2, {
            x:key*5, opacity: 0
          }, {
            x:key*12, opacity: 0.9,
          }, 2);
        });
    }, // end of animateIt()
    rotateTeams(stage) {
        // Scramble Distance Numbers
        var counter = { var: 0};
        TweenMax.to(counter, 2, {
            var: stage.DISTANCE,
            onUpdate: function() {
                $('#distance').html(counter.var)
            }, ease:Power2.easeOut
        });
        // find the selected team
        let team = _.find(this.teams, (t) => { 
            if(t)
                return t.UCI_CODE == stage.UCI_CODE 
        })
        var degrees = $(".team");
        var angle = 360/this.teamLength;
        _.map(degrees, (index, key) => {
            if(team.ID == key+1) {
                TweenLite.to(index, 2, {
                    rotation: 0+'_short', transformOrigin: "100% 100%", opacity: 0.9
                });    
            } else if (key == 0) {
                TweenLite.to(index, 2, {
                    rotation: (team.ID*angle)-angle+'_short',transformOrigin: "100% 100%", opacity: 0.9
                }); 
            } else {
                TweenLite.to(index, 2, {
                rotation: key*angle+'_short', 
                transformOrigin: "100% 100%", opacity: 0.9
                });
            } // end of if statement
        })
      }, // end of rotateTeams
    } // end of methods
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active { 
    font-weight: bold;  color: #00BCD4;
 }
.team {
    position: absolute;
    width: 150px;
    height: 0px;
    text-align: left;
    cursor: pointer;
    display: inline-block;
    font-size: 15px;
    color: #FFEB3B;
    cursor: pointer;
    border: 1px dashed rgba(255, 235, 59, 0.38);
    border-left-color: transparent;
    border-bottom-color: transparent;
    opacity: 0; 
  }
  .teamDetail {
    position: absolute; width: 200px; height: 200px; text-align: center;
    border-radius: 50%; background-color: #FFF; 
  }
.detail { 
    color: #FFF; margin-left: 50%; text-align: left; 
}
.item { 
    padding: 3px; 
    opacity: 0;
     background-image: linear-gradient(140deg, rgba(255, 87, 34, 0.31) 0%, transparent 100%);
    border-radius: 20px;
    margin: 3px;
 }
.stageDetail{
    position: absolute; left: 35%; top: 20%; z-index: -10;
    font-size: 14px;
}
.frontWheel {
    position: absolute; 
    top: 50%; left: 60%;
}
@media only screen 
  and (min-device-width: 320px)  and (max-device-width: 480px)
  and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    .stageDetail{
        position: absolute; left: 36%; top: 39%; z-index: -10;
    }
    .frontWheel {
        position: absolute; top: 50%; left: 60%;
    }
}

@media only screen 
  and (min-device-width: 320px)  and (max-device-width: 480px)
  and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    .frontWheel {
        position: absolute; top: 50%; left: 60%;
    }
}
</style>
