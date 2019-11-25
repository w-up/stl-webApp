<template>
  <div class="supervise">
    <div class="left">
      <div id="map" ref="worldMap"></div>
      <div class="mapChange">
        <a-row style="width:100%">
          <a-col :span="24">
            <a-checkbox @change="onChange">正射影像</a-checkbox>
          </a-col>
          <a-col :span="24">
            <a-checkbox @change="onChange">KMZ图层</a-checkbox>
          </a-col>
        </a-row>
      </div>
      <!-- <world-map></world-map> -->
    </div>
    <div class="right">
      <h3 style="font-size: 16px; font-weight: 600; margin:10px 0 0 10px; text-align:center;">街道管理</h3>
      <a-divider style="margin: 10px 0 10px;" />
      <div class="right_content">
        <a-select
          showSearch
          :allowClear="true"
          placeholder="请输入街道"
          optionFilterProp="children"
          style="width: 100%"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          :filterOption="filterOption"
          v-model="defaultRiver"
        >
          <a-select-option
            :value="item.name"
            v-for="(item, index) in riverList"
            :key="index"
          >{{item.name}}</a-select-option>
        </a-select>
        <a-list size="small" bordered :dataSource="riverList" style="margin-top: 10px;">
          <a-list-item
            slot="renderItem"
            slot-scope="item, index"
            :key="index"
            @click="chooseRiver(item.name, item.id)"
            :class="{active_item: item.clicked}"
          >
            <a-row style="width:100%">
              <a-col :span="20">{{item.name}}</a-col>
              <a-col :span="4" style="text-align:right;">
                <a-popconfirm
                  title="确定要删除吗?"
                  @confirm="confirmDelete(item.id)"
                  @cancel="cancelDelete"
                  okText="确定"
                  cancelText="取消"
                >
                  <a href="#">删除</a>
                </a-popconfirm>
              </a-col>
            </a-row>
          </a-list-item>
        </a-list>
        <a-popover title trigger="click" v-model="addRiverShow" class="bottom_add">
          <template slot="content">
            <a-button block @click="addDrawRiver">绘制</a-button>
            <el-upload
              class="upload-demo"
              ref="upload"
              :data="spotList"
              name="kmz"
              :headers="headers"
              action="/server/data/admin/street/save"
              :on-preview="handlePreview"
              :on-success="handleSuccess"
              :on-change="uploadChange"
              :show-file-list="false"
              :on-remove="handleRemove"
              :file-list="fileList"
              accept=".kmz, .kml"
              :limit="1"
              :auto-upload="false"
            >
              <a-button  block style="margin-top: 10px;">上传KMZ</a-button>
            </el-upload>
          </template>
          <a-button type="primary" block>添加街道</a-button>
        </a-popover>
      </div>
    </div>
    <!-- 鼠标跟随弹窗 -->
    <div
      class="mouse_alert"
      v-show="alertShow"
      :style="{left: alertLeft + 'px', top: alertTop + 'px'}"
    >
      <span>{{defaultRiver}}</span>
    </div>
    <!-- 添加街道 -->
    <add-street ref="addStreet"></add-street>
  </div>
</template>

<script>
// import WorldMap from "../../components/map/WorldMap.vue";
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import AddStreet from './modules/AddStreet.vue'
import { getStreetList, delStreet } from '@/api/login'
export default {
  name: 'StreetManage',
  components: {
    // 'world-map': WorldMap
    'add-street': AddStreet
  },
  data() {
    return {
      upload:'0',
      fileList:[],
      alertLeft: -1000,
      spotList:{
        projectId:'',
        name:'',
        controller:'',
        job:'',
        tel:'',
      },
      headers: {
        Authorization: '',
        'X-TENANT-ID': 'jl:jlgis@2019'
      },
      alertTop: -1000,
      alertShow: false,
      defaultRiver: '',
      riverList: [
        // {
        //   id: 0,
        //   name: '南京东路',
        //   clicked: true,
        //   lineData: [
        //     { lat: 31.21882, lng: 121.50364 },
        //     { lat: 31.21265, lng: 121.50227 },
        //     { lat: 31.20583, lng: 121.49703 },
        //     { lat: 31.19915, lng: 121.49197 },
        //     { lat: 31.19702, lng: 121.49591 },
        //     { lat: 31.2164, lng: 121.50757 },
        //     { lat: 31.21948, lng: 121.50758 }
        //     // { lat: 31.2164, lng: 121.50759 },
        //     // { lat: 31.21948, lng: 121.50759 }
        //   ]
        // },
        // {
        //   id: 1,
        //   name: '南京西路',
        //   clicked: false,
        //   lineData: [
        //     { lat: 31.25153, lng: 121.52409 },
        //     { lat: 31.25355, lng: 121.53085 },
        //     { lat: 31.25858, lng: 121.53934 },
        //     { lat: 31.25535, lng: 121.54334 },
        //     { lat: 31.2499, lng: 121.53353 },
        //     { lat: 31.24786, lng: 121.52737 },
        //     { lat: 31.24682, lng: 121.51709 },
        //     { lat: 31.25111, lng: 121.51711 }
        //   ]
        // },
        // {
        //   id: 2,
        //   name: '南京步行街',
        //   clicked: false,
        //   lineData: [
        //     { lat: 31.24539, lng: 121.48686 },
        //     { lat: 31.24616, lng: 121.48411 },
        //     { lat: 31.2466, lng: 121.4824 },
        //     { lat: 31.24612, lng: 121.48051 },
        //     { lat: 31.24484, lng: 121.47901 },
        //     { lat: 31.24462, lng: 121.47939 },
        //     { lat: 31.24543, lng: 121.48089 },
        //     { lat: 31.2459, lng: 121.48261 },
        //     { lat: 31.2448, lng: 121.4857 },
        //     { lat: 31.2444, lng: 121.4872 }
        //   ]
        // },
        // {
        //   id: 3,
        //   name: '浙江中路',
        //   clicked: false,
        //   lineData: [
        //     { lat: 31.21717, lng: 121.51336 },
        //     { lat: 31.21691, lng: 121.51454 },
        //     { lat: 31.21768, lng: 121.51566 },
        //     { lat: 31.21768, lng: 121.51763 },
        //     { lat: 31.21733, lng: 121.51748 },
        //     { lat: 31.21739, lng: 121.51568 },
        //     { lat: 31.21664, lng: 121.51456 },
        //     { lat: 31.21669, lng: 121.51387 },
        //     { lat: 31.21699, lng: 121.51323 }
        //   ]
        // },
        // {
        //   id: 4,
        //   name: '河南南路',
        //   clicked: false,
        //   lineData: [
        //     { lat: 31.21493, lng: 121.49566 },
        //     { lat: 31.22344, lng: 121.47892 },
        //     { lat: 31.20649, lng: 121.47712 },
        //     { lat: 31.20469, lng: 121.47482 },
        //     { lat: 31.21469, lng: 121.51482 }
        //   ]
        // },
        // {
        //   id: 5,
        //   name: '北京西路',
        //   clicked: false,
        //   lineData: [
        //     { lat: 31.20752, lng: 121.51531 },
        //     { lat: 31.20186, lng: 121.50759 },
        //     { lat: 31.19944, lng: 121.52106 },
        //     { lat: 31.19944, lng: 121.53106 }
        //   ]
        // }
      ],
      addRiverShow: false,
      // 地图对象
      map: {},
      polylineHandler: '',
      polygonTool: '', // 创建标注工具对象
      polygon: '', // 多边形对象
      points: [],
      once: 0 // 移入次数
    }
  },
  mounted() {
    this.headers.Authorization = Vue.ls.get(ACCESS_TOKEN)
    this.initMap()
    this.getList()
    // this.drawAllRiver()
  },
  methods: {
    getList() {
      getStreetList(this.$store.state.id).then(res => {
        let arr = res.data.data
        arr.forEach(v => {
          v.lineData = v.region
          v.clicked = false
        })
        this.riverList = arr
        this.drawAllRiver()
      }).catch(err => {})
    },
    initMap() {
      //初始化地图控件
      let zoom = 14
      this.map = new T.Map('map')
      this.map.centerAndZoom(new T.LngLat(121.495505, 31.21098), zoom)
      //创建比例尺控件对象
      //添加比例尺控件
      this.map.addControl(new T.Control.Scale())
      this.map.setMinZoom(4)
      this.map.setMaxZoom(18)
    },
    // 绘制所有河流
    drawAllRiver(index) {
      this.map.clearOverLays() //将之前绘制的清除
      for (const item of this.riverList) {
        if (item.clicked == true) {
          this.setPolylineFn(item.lineData, 'red', 3, 1, 0, item.id, item.name)
        } else {
          this.setPolylineFn(item.lineData, 'blue', 3, 1, 0, item.id, item.name)
        }
      }
    },
    zoomChange() {
      console.log(this.map.getZoom())
    },
    // 地图选项
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    // 搜索
    handleChange(index) {
      console.log(`selected ${index}`)
      this.riverList.forEach(value => {
        if (value.name === index) {
          value.clicked = true
        } else {
          value.clicked = false
        }
      })
    },
    handleBlur() {
      console.log('blur')
    },
    handleFocus() {
      console.log('focus')
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    // 选中河流
    chooseRiver(index, id) {
      this.defaultRiver = index
      for (const item of this.riverList) {
        if (item.id == id) {
          item.clicked = true
          this.map.setViewport(item.lineData)
          // this.map.zoomOut()
          // this.map.addEventListener('zoomend', this.zoomChange)
        } else {
          item.clicked = false
        }
        this.drawAllRiver()
      }
    },
    // 河流删除
    confirmDelete(index) {
      // console.log(index)
      delStreet(index)
        .then(res => {
          this.$message.success('删除成功')
          this.getList()
        })
        .catch(err => {
          this.$message.error(err.response.data.message)
        })
      // this.riverList.splice(this.riverList.findIndex(item => item.name === index), 1)
      // this.$message.success('删除成功')
      // this.drawAllRiver()
      this.defaultRiver = null
    },
    cancelDelete(e) {
      // this.$message.error('Click on No')
    },
    // 绘制按钮
    addDrawRiver() {
      //创建标注工具对象
      if (this.polylineHandler) this.polylineHandler.close()
      this.polylineHandler = new T.PolylineTool(this.map, {
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        fillColor: '#FFFFFF',
        fillOpacity: 0
      })
      this.polylineHandler.open()
      this.polylineHandler.setTips(`<p style="padding:0px;">单击确认起点, 双击完成绘制</p>`)
      this.$notification.warning({
        message: '提示',
        description: '请在地图上将街道绘制出来'
      })
      this.addRiverShow = false
      this.polylineHandler.addEventListener('draw', this.addDrawRivered)
    },
    // 绘制完成
    addDrawRivered(e) {
      console.log(e)
      console.log(e.currentLnglats)
      //创建面对象
      // this.map.clearOverLays() //将之前绘制的清除
      this.polylineHandler.clear() //清除之前绘制的多边形
      this.setPolylineFn(e.currentLnglats, 'blue', 3, 0.5, 0)
      this.$refs.addStreet.add(e.currentLnglats)
    },
    // 设置绘制的多边形
    setPolylineFn(lineData, color, weight, opacity, fillOpacity, id, title) {
      this.polygon = new T.Polygon(lineData, {
        color: color, //线颜色
        weight: weight, //线宽
        opacity: 0.5, //透明度
        fillColor: '#FFFFFF', //填充颜色
        fillOpacity: fillOpacity, // 填充透明度
        id: id,
        title: title
      })
      //向地图上添加面
      this.map.addOverLay(this.polygon)
      this.polygon.addEventListener('click', this.polygonClick)
      this.polygon.addEventListener('mouseover', this.polygonMouseover)
      this.polygon.addEventListener('mousemove', this.polygonMousemove)
      this.polygon.addEventListener('mouseout', this.polygonMouseout)
    },
    // 多边形点击事件
    polygonClick(index) {
      this.$refs.addStreet.add()
      console.log(index)
      for (const item of this.riverList) {
        if (item.id == index.target.options.id) {
          this.$refs.addStreet.getStreet(item.id)
          item.clicked = true
        } else {
          item.clicked = false
        }
      }
    },
    // 多边形移入事件
    polygonMouseover(index) {
      if (this.once == 1) {
        return
      }
      for (const item of this.riverList) {
        if (item.id == index.target.options.id) {
          item.clicked = true
          this.defaultRiver = item.name
        } else {
          item.clicked = false
        }
      }
      this.drawAllRiver()
      this.once++
    },
    polygonMousemove() {
      let event = event || window.event //兼容写法
      this.alertLeft = event.pageX + 10
      this.alertTop = event.pageY - 44
      this.alertShow = true
    },
    // 多边形移出事件
    polygonMouseout() {
      this.once--
      this.alertShow = false
      for (const item of this.riverList) {
        item.clicked = false
      }
      this.drawAllRiver()
    },
    // 上传按钮
    uploadChange(file, fileList) {
      if (this.upload =='0') {
        this.$refs.addStreet.add1()
        this.fileList = fileList
        this.upload = '1'
      } else {
        this.upload = '0'
        this.fileList = []
      }
    },
    uploadSave(data){
      this.spotList.projectId = data.projectId
      this.spotList.job = data.job
      this.spotList.name = data.name
      this.spotList.tel = data.tel
      this.spotList.controller = data.controller
      this.$refs.upload.submit()
    },
    del1(){
      this.fileList = []
    },
    handleSuccess(response, file, fileList) {
      this.getList()
      console.log('111');
      
      this.$message.success('保存成功')
      this.fileList = []
    },
    handleRemove(file, fileList) {
      
    },
    handlePreview(file) {
      
    }
  }
}
</script>
<style lang="less" scoped>
.mouse_alert {
  position: absolute;
  z-index: 999;
  border: 1px solid #333;
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 0 4px;
  border-radius: 3px;
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.5);
  span {
    color: rgba(255, 0, 0, 0.8);
    font-size: 14px;
  }
}
.supervise {
  position: relative;
  height: calc(100vh - 64px);
  width: 100vw;
}
#map {
  width: 100%;
  height: 100%;
}
.weather {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 200px;
  height: 40px;
  z-index: 999;
}
.menu {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  z-index: 999;
  margin: 0;
  padding: 0;
  // overflow: hidden;
  list-style-type: none;
  li {
    width: 100%;
    background: white;
    border-radius: 50%;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
    margin-top: 5px;
    img {
      width: 100%;
      height: 40px;
      padding: 10px;
    }
  }
}

.left {
  position: relative;
  width: calc(100% - 300px);
  height: 100%;
  display: inline-block;
  vertical-align: top;
}
.mapChange {
  position: fixed;
  left: 10px;
  bottom: 10px;
  width: 120px;
  z-index: 1500;
}
.right {
  position: relative;
  width: 300px;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  // padding: 10px;
  background-color: white;
  .right_content {
    padding: 0 10px;
    width: 100%;
    height: calc(100vh - 170px);
    overflow: auto;
  }
}

.ant-spin-container {
  .ant-list-item:hover {
    background-color: #eee;
  }
  .active_item {
    background-color: #eee;
  }
}

.bottom_add {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  margin: auto;
  width: 60%;
}
</style>
