<template>
    <div style="width:100%;height:100%;">
        <div class="half">
            <div id="roadMap" class="map"></div>
        </div>
        <div class="half">
            <div id="aerialMap" class="map"></div>
        </div>
        <div style="clear:both;"></div>
    </div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import layerGroup from 'ol/layer/Group';
import XYZ from "ol/source/XYZ";


export default {
  name: 'SharedView',
  mounted(){
    this.initMap();
  },
  methods: {
    getTdLayer(lyr){
        var url = "http://t{0-7}.tianditu.com/DataServer?T=" + lyr + "&x={x}&y={y}&l={z}&tk=a659a60049b130a5d1fececfd5a6b822"
        var layer = new TileLayer({
            source: new XYZ({
            url: url
            })
        });
        return layer;
    },
    initMap(){
        var vec_c = this.getTdLayer("vec_w");
        var cva_c = this.getTdLayer("cva_w");
        var img_c = this.getTdLayer("img_w");

        var veclayerGroup = new layerGroup({
            layers:[vec_c,cva_c]
        });
        var imglayerGroup = new layerGroup({
            layers:[img_c,cva_c]
        });
        var view = new View({
            projection: "EPSG:4326",
            center: [121.495505, 31.21098],
            zoom: 14
        });
        var map1 = new Map({
            target: 'roadMap',
            layers: [veclayerGroup],
            view: view
        });
        var map2 = new Map({
            target: 'aerialMap',
            layers: [imglayerGroup],
            view: view
        });
    }
  }
}
</script>

<style lang="less" scoped>
    .map {
        width: 100%;
        height:100%;
    }
    @media (min-width: 800px) {
        .half {
            padding: 0 10px;
            width: 50%;
            height:calc(100vh - 64px);
            float: left;
        }
    }
</style>

