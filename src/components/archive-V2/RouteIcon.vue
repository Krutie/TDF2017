<template>
<g>
  <g v-if="rType == 'Flat' " class="flat">
      <path d="M224.153,58.567c0.142-0.851,0.199-1.417,0.199-2.155v-0.255h-22.284v0.114c0,0.68,0.057,1.275,0.198,2.126h22.001
        L224.153,58.567z"/>
      <circle fill="none" stroke="#000000" stroke-width="2" cx="213.294" cy="57.291" r="17.294"/>
    </g>
  <g v-if="rType == 'Hilly' " class="hilly">
      <path d="M224.465,60.507V59.94l-3.771-6.096l-3.516,6.096h-0.708l-3.346-5.784l-3.345,5.784h-0.425l-3.487-6.067l-3.686,6.067
        v0.567H224.465z"/>
      <circle fill="none" stroke="#000000" stroke-width="3" cx="213.408" cy="57.133" r="17.294"/>
    </g>
  <g v-if="rType == 'Mountain' " class="mountain">
      <path d="M224.323,63.228v-0.906l-6.804-11.228l-6.578,11.198l-4.366-7.569l-4.536,7.569c0,0.284,0,0.652,0.057,0.936H224.323z"/>
      <circle fill="none" stroke="#000000" stroke-width="4" cx="213.209" cy="57.133" r="17.294"/>
    </g> 
    <g v-if="rType == 'Individual Time Trial' " class="itt">
    <circle fill="none" stroke="#000000" stroke-width="1" cx="213.209" cy="57.133" r="17.294"/>
    </g>
</g>
</template>
<script>
    export default {
        name: 'routeicon', 
        props: ['rType'],
    }
</script>
<style scoped>
.flat, .hilly, .mountainm .itt { opacity: 0; }
</style>