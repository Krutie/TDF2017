<template>
  <div class="hello">
    <div style="position: absolute; top: 50%; left: 25%;">
        <div class="degree" v-for="stage in stages">
            <div :id="stage.ID" :class="StageId ==stage.ID ? 'active' : ''"
              v-on:click="[rotateCircle(stage)]"> 
                {{ stage.NAME }} 
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'stage',
  props: ['StageId', 'began'],
  watch: {
    began(newValue) {
      this.makeStageCircle();
    },
    StageId(newValue) {
      let stage = _.find(this.stages, (s) => {
        return s.ID == newValue;
      })
      this.rotateCircle(stage)
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
  },
  methods: {
    ...mapActions({
        fetchStages: 'fetchStages',
        fetchTeams: 'fetchTeams'
    }),
    makeStageCircle() {    
        var degrees = $(".degree");
        var angle = 360/this.stageLength;
        degrees.each(function(index, item) {
          TweenMax.fromTo(item, 3, {
          top: '0%', rotation: index, transformOrigin: "0% 5%",
          }, {
            top: '50%', rotation: angle*index, transformOrigin: "0% 5%", opacity: 0.9
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
