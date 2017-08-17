<template>
    <div class="wheel">
      <div class="spoke" v-for="n in spokeNumber"> </div>
    </div>
</template>
<script>
import Detail from './Detail.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'wheel',
  props: ['spokeNumber', 'started'],
  watch: {
     started: function(newValue) {
        this.makeWheel();
    }, 
  },
  methods: {
      makeWheel(){
          var spokes = $(".spoke");
          var angle = 360/this.spokeNumber;
          spokes.each(function(index, item) {
            TweenMax.fromTo(item, 2, {
              top: '50%', rotation: angle, transformOrigin: "0% 0%", opacity: 0
            }, {
              top: '50%', rotation: angle*index, transformOrigin: "0% 0%", opacity: 0.9
            }, 1)
            TweenMax.set(item, {
              top: '50%', rotation: angle*index, transformOrigin: "0% 0%", opacity: 0.9
            });
          });
      }, // end of makeWheel
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
