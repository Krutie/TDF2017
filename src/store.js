import $ from 'jquery'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state =  {
      stages: [],
      teams: []
  }
const getters = {
    getStages: state => state.stages, 
    getTeams: state => state.teams
} 
const mutations = {
    FETCH_STAGES(state,payload) {
        state.stages = payload 
    },
    FETCH_TEAMS(state,payload) {
        state.teams = payload
    }
}
const actions = {
  fetchStages({commit}) { 
        $.getJSON('https://raw.githubusercontent.com/Krutie/dataRepo/master/tdf/stages.json', (data) => { 
            commit("FETCH_STAGES",data) 
        }) 
    },
    fetchTeams({commit}) { 
        $.getJSON('https://raw.githubusercontent.com/Krutie/dataRepo/master/tdf/teams.json', (data) => { 
            commit("FETCH_TEAMS",data) 
        }) 
    }  
}
let store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
}) // end of store
export default store 