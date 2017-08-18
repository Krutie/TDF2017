<template>
    <g>
        <circle cx="430" cy="200" r="90" class="wheel"/>
        <g v-for="team in teams" class="team">
            <text x="347" y="197"  :class = "[{ 'active': isActive(team.UCI_CODE) }]">
              {{ team.UCI_CODE }}
            </text>
            <rect id="rect1" x="347" y="200" width="83" height="1" class="spoke"/>
        </g>
        <teamdetail :team="activeTeam"></teamdetail>    
    </g>
</template>
<script>
    import { map, find } from 'underscore'; 
    import { mapGetters, mapActions } from 'vuex'
    import teamdetail from './teamdetail.vue'
    export default {
        name: 'team',
        props: ['stage'],
        components: { teamdetail },
        created() {
            this.fetchTeams()
        }, 
         computed: {
            ...mapGetters({
                teams: 'getTeams'
            }),
            activeTeam(){
                return find(this.teams, (team) => { 
                    if(this.stage.UCI_CODE)
                        return team.UCI_CODE == this.stage.UCI_CODE 
                    else
                        return team.UCI_CODE == "SKY" 
                })
            }, 
        }, // end of computed
        watch: {
            teams(newValue) {
              this.$nextTick(function() {
                 this.arrangeTeams();
              })
            },
            stage(newValue) { 
                this.rearrangeTeams()
            },
        }, 
        methods: {
            ...mapActions({
                fetchTeams: 'fetchTeams'
            }),
            arrangeTeams(){
                let degrees = document.querySelectorAll(".team")
                let angle = 360/this.teams.length;
                map(degrees, (index, key) => {
                  TweenMax.to(index, 2, {
                     rotation: angle*key, transformOrigin: "100% 100%", opacity: 0.9
                  }, 1);
                });
            }, // end of arrangeTeams()
            rearrangeTeams() {
                let degrees = document.querySelectorAll(".team")
                let angle = 360/this.teams.length;
                map(degrees, (index, key) => {
                    if(this.activeTeam.ID == key+1) {
                        TweenMax.to(index, 2, {
                            rotation: 0+'_short', transformOrigin: "100% 100%", opacity: 0.9, delay: 1,
                        });    
                    } else if (key == 0) {
                        TweenMax.to(index, 2, {
                            rotation: (this.activeTeam.ID*angle)-angle+'_short',transformOrigin: "100% 100%", opacity: 0.9, delay: 1,
                        }); 
                    } else {
                        TweenMax.to(index, 2, {
                        rotation: key*angle+'_short', 
                        transformOrigin: "100% 100%", opacity: 0.9, delay: 1,
                        });
                    } // end of if statement
                })
            }, // end of rearrangeTeams()
            isActive(uci_code) {
                if(this.stage && uci_code == this.stage.UCI_CODE) {
                        return true
                }
            }, // end of isActive()
        }, // end of methods 
    }
</script>
<style scoped>
.wheel { fill:#f71b16; fill-opacity: 0.7; stroke-opacity: 1; stroke: #FFEB3B; stroke-dasharray: 0.5 2;stroke-width: 7; stroke: #4e3c40; }
.team { font-size: 10px; cursor: not-allowed; fill: white; opacity: 0;}
.spoke { fill: transparent; fill-opacity: 0.5; stroke: white; stroke-width: 0.5; stroke-dasharray: 1 1; }
.active { font-weight: bold;  fill: #3b3a37; }
</style>