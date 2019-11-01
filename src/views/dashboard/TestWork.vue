<template>
  <div style="width:100%;height:100%;">
    <div class="main">
      <div id="map" class="map"></div>
    </div>
    <input id="swipe" class="swipe" type="range"/>
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
  name: 'TestWork',
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
      console.log("imglayerGroup" + imglayerGroup);
      var map = new Map({
        target:"map",
        layers:[
          imglayerGroup,veclayerGroup
        ],
        view: new View({
          projection: "EPSG:4326",
          center: [121.495505, 31.21098],
          zoom: 14
        })
      });
      var swipe = document.getElementById("swipe");
      console.log(swipe.value);
      console.log(vec_c);
      vec_c.on('prerender',function(event){
        console.log("******************************");
        console.log("event:" +event);
        
        var ctx = event.context;
        
        var width = ctx.canvas.width * (swipe.value / 100);
        console.log(width);

        ctx.save();
        ctx.beginPath();
        ctx.rect(width,0,ctx.canvas.width - width,ctx.canvas.height);
        ctx.clip();
      });
      vec_c.on('postrender',function(event){
        var ctx = event.context;
        ctx.restore();
      });
      swipe.addEventListener('input',function(){
        map.render();
      },false);
    },
    
  }
}
</script>

<style lang="less" scoped>
  .ol-zoom{
    display:none;
  }
  .main{
    width:100%;height:calc(100vh - 64px);
  }
  .map{
    width: 100%;
    height: 95%;
  }
  .swipe{
    position: absolute;
    bottom:10px;
    left: 0;
    z-index: 999;
    width: 100%;
  }
</style>

