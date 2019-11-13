<template>
  <div id="wrapper">
    <div id="pano"></div>
  </div>
</template>
<script>
import PhotoSphereViewer from 'photo-sphere-viewer'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
export default {
  name: 'vtour',
  components: {},
  data() {
    return {
      factoryLink: require('./img/test36001.jpg'),
    }
  },
  mounted() {
    this.initPhotoSphere()
  },
  methods: {
    initPhotoSphere() {
      this.PSV = PhotoSphereViewer({
        container: document.getElementById('pano'),
        panorama: this.factoryLink,
        caption: '黄浦江支流',
        size: {
          width: '100%',
          height: '100%'
        },
        time_anim: false,
        default_long: 1.4441088145446443,
        default_lat: 0.0800613513013615,
        default_long: Math.PI / 2,
        default_fov: 90,
        sphere_correction: { pan: 30.01, tilt: 0, roll: 0 },
        // max_fov: 100,         // 最大缩放值
        // min_fov: 99,          // 最小缩放值
        // default_fov: 100, // 默认缩放值，在1-179之间
        // latitude_range: [0,0],//禁止上下滑动
        // mousewheel: false,    // 禁止鼠标滚轮缩放
        // navbar: false,
        navbar: ['autorotate', 'zoom', 'markers', 'caption', 'fullscreen'],
        theta_offset: 1000 // 旋转速度
        // markers: this.markersData
      })
    }
  }
}
</script>
<style scoped>
#wrapper {
  position: relative;
  height: calc(100vh - 64px);
  width: 100vw;
}
#pano {
  height: 100%;
  width: 100%;
}
</style>

