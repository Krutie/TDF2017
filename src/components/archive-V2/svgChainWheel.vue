<template>
    <g class="wheel">
      <circle class="spoke" cx="300" cy="220" r="16" v-for="n in spokeNumber"
      style="stroke-width: 1; stroke: rgba(255, 235, 59, 0.5); stroke-dasharray: 1 1; fill: yellow; fill-opacity: 0" />
    </g>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'chainwheel',
  props: ['StageId', 'began'],
  computed: {
     ...mapGetters({
        stages: 'getStages',
    }),
    spokeNumber() {
      return 13
    }
  },
  watch: {
    stageLength() {
       // return this.stages.length;
    }, 
     began: function(newValue) {
        this.makeChainWheel();
    }, 
    StageId: function(newValue) {
      this.rotateWheel(newValue)
    },
  },
  methods: {
      makeChainWheel(){
          var spokes = $(".spoke");
          var angle = 360/this.spokeNumber;
          spokes.each(function(index, item) {
            TweenMax.fromTo(item, 2, {
              rotation: angle, transformOrigin: "0% 50%", opacity: 0
            }, {
              rotation: angle*index, transformOrigin: "0% 50%", opacity: 0.9
            }, 1)
          });
      }, // end of makeWheel
      rotateWheel(_stageId) {
        var wheel = $(".wheel"); 
        var angle = 360/this.spokeNumber;
        TweenMax.to([wheel], 2, {
              rotation: 10*_stageId, transformOrigin: "50% 50%", opacity: 0.9
            }, 1)
      },
  }, // end of methods
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wheel {
    position: absolute;
    top: 60%;
    left: 49%;
}
.spoke { 
    position: absolute;
    border: 0.5px dashed;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    color: #FFEB3B;
    padding: 10px;
    opacity: 0;
    }
</style>
