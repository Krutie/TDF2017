<template>
  <g v-if="team">
      <path class="detail4" id="detail4" stroke="none" fill="none" d="M422 315.4c-59.8-4.3-107-54.2-107-115.2 0-63.8 51.7-115.5 115.5-115.5S546 136.3 546 200s-51.7 115.6-115.5 115.6"/>
      <use xlink:href="#detail4"/>
      <text class="text6">
           <textPath xlink:href="#detail4" startOffset="40%" fill="#f71b16">
          {{ team.NAME }} of {{ team.COUNTRY }}
           </textPath>
      </text>

    <path class="detail5" id="detail5" stroke="none" fill="none" d="M423.4 300.5C371.2 297 330 253.3 330 200.2c0-55.5 45-100.5 100.5-100.5S531 144.6 531 200s-45 100.6-100.5 100.6"/>
   <use xlink:href="#detail5"/>
      <text class="text7">
           <textPath xlink:href="#detail5" startOffset="40%" >
          Out of {{ team.RIDERS }} riders,
           </textPath>
      </text>
  </g>
</template>
<script>
export default {
  name: 'teamdetail',
  props: ['team'],
  watch: {
    team(newValue) {
      this.$nextTick(function() {
         this.arrangeTeamDetail()
      })
    },
  }, 
  methods: {
    arrangeTeamDetail(){
          TweenMax.staggerFromTo([".detail4", ".detail5"], 1, {
             rotation: 0, 
          }, {
            rotation: 45, transformOrigin: "50% 50%",
          }, 1);
        TweenMax.staggerFromTo([".text6", ".text7"], 1, {
             opacity: 0
          }, {
            opacity: 1
          }, 1);
    }, // end of arrangeStages()
  }, // end of methods
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
text { fill:#232321; font-size: 10px; }
.text6, .text7 { opacity: 0; }
</style>