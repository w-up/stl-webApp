<template>
    <div>
        <baidu-map class="map" :center="{lng:121.495505,lat:31.21098}" :zoom="14" ak="KCzp8claYra8uYAvahElV9oKUT6j7Gx1">
            <bm-panorama class="panorma"></bm-panorama>
        </baidu-map>
    </div>
</template>
<script> 
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmPanorama from 'vue-baidu-map/components/controls/Panorama'
export default {
    name:'panormaControl',
    components:{
        BaiduMap,
        BmPanorama
    },
    data(){
        return{

        }
    },
    mounted(){
        
    },
    methods:{
        initBaiduMap(){
            // var map = new BMap.Map('map');
            // var point = new BMap.Point(121.495505, 31.21098);
            // map.centerAddZoom(point,12);
            // map.addTileLayer(new BMap.PanoramaCoverageLayer());
        }
    }   
}
</script>
<style lang="less" scoped>
    .map{
        width: 100%;
        height:calc(100vh - 64px);
    }
</style>
