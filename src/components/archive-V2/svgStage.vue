<template>
  <g class="svgStage">
  <rearFender v-if="getStageDetail" :stage="getStageDetail"></rearFender>
  <g v-if="getStageDetail" class="stageDetail">
       <text class="detail" x="235" y="105"> {{ getStageDetail.DATE }}  </text>
       <text class="detail" x="200" y="90"> {{ getStageDetail.KEY_MOMENT }} </text>
   </g>
    <circle fill="#673AB7" cx="150" cy="200" r="90" fill-opacity="0" style="stroke-opacity: 0.5; stroke: yellow; stroke-dasharray: 1 2; stroke-width: 5;" /> 
      <g v-for="stage in stages" class="degree" v-on:click="[rotateCircle(stage)]">
        <text x="196" y="197"
        :id="stage.ID" :class="StageId ==stage.ID ? 'active' : ''"> 
            {{ stage.NAME }} 
        </text>
         <rect id="rect1" x="150" y="200"
           width="83" height="1" style="fill: transparent; stroke: yellow; stroke-width: 0.5; stroke-dasharray: 1 1" />
       </g>       
  </g>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import rearFender from './rearFender.vue'

export default {
  name: 'stage',
  props: ['StageId', 'began'],
  components: { rearFender },
  watch: {
    began(newValue) {
        this.makeStageCircle();
        this.animateStageDetail(); // for stagedetail animation
    },
    StageId(newValue) {
      let stage = _.find(this.stages, (s) => {
        return s.ID == newValue;
      })
      this.rotateCircle(stage)   
        this.animateStageDetail(); // for stagedetail animation
    }
  },
  computed: {
    ...mapGetters({
        stages: 'getStages',
        teams: 'getTeams'
    }),
    stageLength() {
       return this.stages.length;
    }, 
    getStageDetail() {
      return _.find(this.stages, (t) => { 
        return t.ID == this.StageId 
      })
    }, 
  },
  methods: {
    ...mapActions({
        fetchStages: 'fetchStages',
        fetchTeams: 'fetchTeams'
    }),
    animateStageDetail() {
         // rotateStageRoute
      var tl = new TimelineMax();
        tl.staggerFromTo([".stagePath", ".dist", ".winner"], 1, {
           rotation: 0, opacity: 0
        }, {
          rotation: 15, transformOrigin: "50% 60%" , opacity: 1,
          ease: Circ.easeOut
        }, 1)

        tl.staggerFromTo([".detail"], 1, {
           rotation: 0, opacity: 0
        }, {
          opacity: 1, ease: Circ.easeOut
        }, 1)
         tl.staggerFromTo([".flat", ".hilly" , ".mountain", ".itt"], 1, {
           rotation: 45, opacity: 0, transformOrigin: "50% 50%"
        }, {
          rotation: 0, opacity: 1, ease: Circ.easeOut, transformOrigin: "50% 50%"
        }, 1)


    }, // end of animateStageDetail()
    makeStageCircle() {    
        var degrees = $(".degree");
        var spokes = $(".stageSpoke");
        var angle = 360/this.stageLength;
        degrees.each(function(index, item) {
          TweenMax.to(item, 2, {
             rotation: angle*index, transformOrigin: "0% 100%", opacity: 0.9
          }, 1);
        });

         spokes.each(function(index, item) {
          TweenMax.to(item, 3, {
             rotation: angle*index, transformOrigin: "0% 100%", opacity: 0.9
          }, 1);
        });

      }, // end of makeStageCircle
      rotateCircle(stage) {
        this.eventHub.$emit('stageClicked', { currentStageID: stage.ID } );
        var degrees = $(".degree");
        var angle = 360/this.stageLength;
        _.map(degrees, (index, key) => {
            if(stage.ID == key+1) {
                TweenLite.to(index, 2, {
                    rotation: 0+'_short', transformOrigin: "0% 100%"
                });    
            } else if (key == 0) {
                TweenLite.to(index, 2, {
                    rotation: (stage.ID*angle)-angle+'_short', transformOrigin: "0% 100%"
                }); 
            }else {
                TweenLite.to(index, 2, {
                rotation: key*angle+'_short', transformOrigin: "0% 100%"
                });
            }
        })
      }, // end of makeWheel
  }, // end of methods
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a { color: yellow; }
.active { 
    font-weight: bold;  fill: #00BCD4;
 }
.btn { 
  padding: 15px;
  color: #41b883;
  cursor: pointer;
 }
.degree {
    font-size: 8px;
    cursor: pointer;
    fill: #FFEB3B;
    opacity: 0;
  }
  .dist { opacity: 0;  }
  .stageDetail text { fill: #ffeb3b ; font-size: 8px;}
  .detail { opacity: 0 ; }
</style>
