<template>
    <g class="wheel">
      <circle v-for="n in num" class="chainwheel" cx="300" cy="220" r="16"/>
    </g>
</template>
<script>
import { map } from 'underscore'; 
export default {
  name: 'chainwheel',
  props: ['stageId', 'num'],
  mounted(){
    this.makeChainWheel();
  }, 
  watch: {
    stageId(newValue) {
        this.rotateWheel(newValue);
    }
  },
  methods: {
      makeChainWheel(){
          let spokes = document.querySelectorAll(".chainwheel")
          let angle = 360/this.num;
          map(spokes, (index, key) => {
            TweenMax.fromTo(index, 2, {
              rotation: angle, transformOrigin: "0% 50%", opacity: 0
            }, {
              rotation: angle*key, transformOrigin: "0% 50%", opacity: 0.9
            })
          });
      }, // end of makeWheel
      rotateWheel(_stageId) {
        var angle = 360/this.num;
        TweenMax.to(".wheel", 3, {
              rotation: 10*_stageId+'_cw', transformOrigin: "50% 50%", opacity: 0.9
            }, 1)
      },
  }, // end of methods
}
</script>
<style scoped>
.chainwheel { fill:none; stroke-width: 0.2; stroke-dasharray: 0; fill-opacity: 0.3; }
</style>
