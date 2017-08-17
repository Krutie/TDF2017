<template>
  <g v-if="stage">
      <path class="detail1" id="detail1" stroke="none" fill="none" d="M143.3 301.5C91 298 49.8 254.3 49.8 201.2c0-55.5 45-100.5 100.6-100.5S251 145.6 251 201s-45 100.6-100.6 100.6"/>
      <use xlink:href="#detail1"/>
      <text class="text1">
           <textPath xlink:href="#detail1" startOffset="10%">
          {{ stage.KEY_MOMENT }}
           </textPath>
      </text>

      <path class="detail2" id="detail2" stroke="none" fill="none" d="M142 316.4C82 312 34.8 262.2 34.8 201.2c0-63.8 51.8-115.5 115.6-115.5S266 137.3 266 201 214 316.8 150.3 316.8"/>
      <use xlink:href="#detail2"/>
      <text class="text2">
           <textPath xlink:href="#detail2" startOffset="20%" fill="#f71b16" >
          {{ stage.NAME }}
           </textPath>
      </text>
    
    <path class="detail3" id="detail3" stroke="none" fill="none" d="M423.4 300.5C371.2 297 330 253.3 330 200.2c0-55.5 45-100.5 100.5-100.5S531 144.6 531 200s-45 100.6-100.5 100.6"/>
   <use xlink:href="#detail3"/>
      <text class="text3">
           <textPath xlink:href="#detail3" startOffset="51%" >
          {{ stage.WINNER }} wins {{ stage.NAME }}
           </textPath>
      </text>

      <text x="50" y="28" class="text4"> {{ stage.DATE }} </text>
      <text x="50" y="330" class="text5"> {{ stage.DISTANCE }} KM * {{ stage.ROUTE }} * {{ stage.TYPE }} Route </text>
      <rect x="50" y="335" class="distance" :width="stage.DISTANCE" height="2" rx="1" fill="#d8615d" />
  </g>
</template>
<script>
export default {
  name: 'stagedetail',
  props: ['stage'],
  watch: {
    stage(newValue) {
      this.$nextTick(function() {
         this.arrangeStageDetail()
       })
    },
  }, 
  methods: {
    arrangeStageDetail(){
          TweenMax.staggerFromTo([".detail1", ".detail2"], 1, {
             rotation: 0, 
          }, {
            rotation: 45, transformOrigin: "50% 50%",
          }, 1);
          TweenMax.staggerFromTo([".detail3"], 1, {
             rotation: 0, delay: 1
          }, {
            rotation: 45, transformOrigin: "50% 50%",
          }, 1);
          TweenMax.staggerFromTo([".text1",".text2",".text3",".text4",".text5"], 1, {
             opacity: 0
          }, {
            opacity: 1
          }, 0.5);
        TweenMax.staggerFromTo(".distance", 1 , {
          width: 0, opacity: 0, 
        }, {
          width: this.stage.DISTANCE, opacity: 1,
        }, 0.5)
    }, // end of arrangeStages()
  }, // end of methods
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
text { fill:#232321; font-size: 12px; }
.text1, .text2, .text3, .text4, .text5 { opacity: 0; font-size: 10px;}
</style>