<template>
  <div v-if="getStageDetail" class="detail">
   <!-- {{ getStageDetail }} -->
    <div class="item downTube"> {{ getStageDetail.NAME }} </div>
    <div class="item seatTube"> {{ getStageDetail.DISTANCE }} </div>
    <div class="item topTube"> {{ getStageDetail.WINNER }} of 
    {{ getStageDetail.UCI_CODE }} </div>
    <div style="left: 55%; position: absolute; top: 50%;"> 
        <div class="team" v-for="team in teams">
            <div :id="team.ID" :class="getStageDetail.UCI_CODE ==team.UCI_CODE ? 'active' : ''" > 
                    TEAM {{ team.UCI_CODE }} 
            </div>
        </div>
    </div>
  </div>
    

</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'detail',
  props: ['stgeid'],
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
    teamLength() {
       return this.teams.length;
    }
  },
   watch: {
    getStageDetail: function(newValue) {
      console.log('newValue');
      console.log(newValue);
      this.animateIt();
      // this.makeTeams();
      this.rotateTeams(newValue);
    }
  },
  methods: {
     makeTeams() {    
        var degrees = $(".team");
        var angle = 360/this.teamLength;
        degrees.each(function(index, item) {
          TweenMax.fromTo(item, 1, {
             rotation: index,
          }, {
             rotation: angle*index, transformOrigin: "100% 100%",
          }, 1);
        });
      }, // end of makeTeams
        animateIt() {
            var items = $(".item");
             items.each(function(index, elem) {
              TweenMax.fromTo(elem, 2, {
                x:0, opacity: 0
              }, {
                x:index*15, opacity: 0.9,
                transformOrigin: "0% 0%"
              }, 2);

              TweenMax.fromTo($(".topTube"), 2, {
                rotation: 0
              }, {
                rotation: '-2_short', transformOrigin: "0% 0%"
              }, 2);

              TweenMax.fromTo($(".seatTube"), 2, {
                rotation: 0
              }, {
                rotation: '65_short', transformOrigin: "0% 0%"
              }, 2);

              TweenMax.fromTo($(".downTube"), 2, {
                rotation: 0
              }, {
                rotation: '310_short', transformOrigin: "0% 0%"
              }, 2);
            });
        }, // end of animateIt()
        rotateTeams(stage) {
            // find the selected team
            let team = _.find(this.teams, (t) => { 
                return t.UCI_CODE == stage.UCI_CODE 
            })
            var degrees = $(".team");
            var angle = 360/this.teamLength;
            _.map(degrees, (index, key) => {
                if(team.ID == key+1) {
                    TweenLite.to(index, 2, {
                        rotation: 0+'_short', transformOrigin: "100% 100%"
                    });    
                } else if (key == 0) {
                    TweenLite.to(index, 2, {
                        rotation: (team.ID*angle)-angle+'_short', transformOrigin: "100% 100%"
                    }); 
                } else {
                    TweenLite.to(index, 2, {
                    rotation: key*angle+'_short', 
                    transformOrigin: "100% 100%"
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
    font-weight: bold; 
    color: #00BCD4;
 }
  .team {
      position: absolute;
        width: 260px;
        height: 0;
        text-align: center;
        cursor: pointer;
        display: inline-block;
        font-size: 15px;
        color: #FFEB3B;
        cursor: pointer;
        padding-top: 3px;
        padding-bottom: 10px;
      }
    .detail { 
        color: #FFF;
        margin-left: 50%;
        text-align: left; 
    }
    .item { 
        padding: 5px;
     }
     .seatTube, .downTube, .topTube { 
        height: 10px;
        width: 200px;
        color: #FFF;
        position: absolute;
      }
      .seatTube { 
       left: 39.3%;
        top: 24.5%;
        width: 217px;
        height: 15px;
        border-radius: 20px;
        background: rgba(3, 169, 244, 0.61);
        padding-left: 40px;
       }
       .downTube { 
            top: 56.2%;
    left: 48%;
            background: rgba(255, 235, 59, 0.71);
            width: 272px;
            height: 15px;
            border-radius: 20px;
            padding-left: 40px;
        }
        .topTube { 
            top: 25%;
            left: 36%;
            width: 269px;
            height: 15px;
            border-radius: 20px;
            background: rgba(233, 30, 99, 0.65);
            padding-left: 40px;
         }
</style>
