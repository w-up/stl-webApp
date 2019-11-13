<template>
  <a-modal
    title="360全景图"
    class="panorama"
    width="90vw"
    style="top: 20px;"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :mask="true"
    :maskClosable="false"
    :centered="true"
    :footer="null"
  >
    <a-spin :spinning="confirmLoading">
      <a-card class="content">
        <div id="pano"></div>
      </a-card>
      <a-divider orientation="left"></a-divider>
      <a-row style="width:100%;" type="flex" justify="space-around">
        <a-col :span="3">
          <a-button block @click="handleCancel">取消</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block>保存</a-button>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>
import PhotoSphereViewer from 'photo-sphere-viewer'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
export default {
  components: {
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      PSV: '',
      factoryLink: require('../img/test36001.jpg'),
    }
  },
  computed: {},
  mounted: function() {
    // this.initPhotoSphere()
  },
  methods: {
    add() {
      this.visible = true
    },
    initPhotoSphere() {
      this.PSV = PhotoSphereViewer({
        container: 'pano',
        // panorama: this.testLink,
        panorama: this.factoryLink,
        size: {
          width: '100%',
          height: '100%'
        },
        caption: '黄浦江支流',
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
    },
    handleSubmit() {},
    handleCancel() {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
.panorama {
  top: 50px;
  .content {
    width: 100%;
    height: 60vh;
    #pano {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
