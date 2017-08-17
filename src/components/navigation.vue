<template>
    <g>
        <transition name="fade">
            <g v-if="currentStageId>1" @click="$emit('backStage')">
                <rect x="100" y="350" width="100" height="25" rx="4" class="rect"/>
                <text x="116" y="365" class="title"> Previous Stage </text>
             </g>
        </transition>
        <transition name="fade">
            <g v-if="currentStageId<stageLength" @click="$emit('nextStage')">
                <rect x="390" y="350" width="100" height="25" rx="4" class="rect"/>
                <transition name="fade">
                    <text v-if="currentStageId > 0" x="415" y="366" class="title"> Next Stage </text>
                </transition>
             </g>
        </transition>
    </g>
</template>
<script>
    export default{
        name:'navigation',
        props:['currentStageId', 'stageLength'],
    }
</script>
<style scoped>
.rect {fill: #00BCD4; fill-opacity:0.5; fill:#00BCD4; cursor: pointer; }
.title { fill:white; font-size: 8px; text-transform:uppercase; cursor: pointer;}
</style>