<template>
  <div class="supervise">
    <!-- 任务管理 -->
    <div class="left">
      <div id="map" ref="worldMap"></div>
      <!-- <world-map></world-map> -->
      <div class="mapChange">
        <a-row style="width:100%">
          <a-col :span="24">
            <a-checkbox @change="onChange">水质监测点</a-checkbox>
          </a-col>
          <a-col :span="24">
            <a-checkbox @change="onChange">风险源</a-checkbox>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="right">
      <h3 style="font-size: 16px;margin:10px 0 0 10px">水质监测点管理</h3>
      <a-divider style="margin: 5px 0 0; background-color: #888;" />
      <div style="padding: 0 10px">
        <a-tabs defaultActiveKey="1" @change="callback" v-model="actionTab" class="custom_tabs">
          <a-tab-pane tab="固定监测点" key="1">
            <section class="task_face">
              <a-list size="small" bordered :dataSource="fixedPointList" style="margin-top: 10px;">
                <a-list-item
                  slot="renderItem"
                  slot-scope="item, index"
                  :key="index"
                  @click="fixedPoint(item.name)"
                  :class="{active_item: item.clicked}"
                >
                  <a-row style="width:100%">
                    <a-col :span="20">{{item.name}}</a-col>
                    <a-col :span="4" style="text-align:right;">
                      <a-popconfirm
                        title="确定要删除吗?"
                        @confirm="fixedConfirmDelete(item.name)"
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
            </section>
          </a-tab-pane>
          <a-tab-pane tab="人工监测点" key="2" forceRender>
            <section class="task_face">
              <a-list size="small" bordered :dataSource="peoplePointList" style="margin-top: 10px;">
                <a-list-item
                  slot="renderItem"
                  slot-scope="item, index"
                  :key="index"
                  @click="peoplePoint(item.name)"
                  :class="{active_item: item.clicked}"
                >
                  <a-row style="width:100%">
                    <a-col :span="20">{{item.name}}</a-col>
                    <a-col :span="4" style="text-align:right;">
                      <a-popconfirm
                        title="确定要删除吗?"
                        @confirm="peopleConfirmDelete(item.name)"
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
            </section>
          </a-tab-pane>
        </a-tabs>
        <a-button type="primary" block class="bottom_add" @click="addTask">添加</a-button>
      </div>
    </div>
    <!-- 添加 -->
    <add-water-point ref="addWaterPoint" :pointInfo="pointInfo"></add-water-point>
  </div>
</template>

<script>
import AddWaterPoint from './modules/AddWaterPoint.vue'

export default {
  name: 'TaskManage',
  components: {
    'add-water-point': AddWaterPoint
  },
  data() {
    return {
      addRiverShow: false, // 气泡卡片
      actionTab: '1', //tab

      fixedPointList: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.21493, lng: 121.49566 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.22344, lng: 121.47892 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.20649, lng: 121.47712 } }
      ],
      peoplePointList: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.26493, lng: 121.45566 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.27344, lng: 121.43892 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.25649, lng: 121.43712 } }
      ],
      addRiverShow: false,
      addLineShow: false, // 线路任务显示
      addPointShow: false, // 点任务显示
      // 添加线路任务
      checkNick: false,
      form: this.$form.createForm(this),

      // 地图对象
      map: {},
      // 地图节点对象（里面含节点对象、区域对象、任务弹窗对象）
      mapPoint: new Map(),
      pointInfo: { id: Number, name: String, clicked: Boolean, latlng: { lat: Number, lng: Number } } // 点信息
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      //初始化地图控件
      let zoom = 14
      this.map = new T.Map('map')
      this.map.centerAndZoom(new T.LngLat(121.495505, 31.21098), zoom)
      this.markerTool = new T.MarkTool(this.map, { follow: true })
      this.allPointTask(this.fixedPointList)
    },
    allPointTask(pointLists) {
      this.map.clearOverLays()
      for (const item of pointLists) {
        this.drawAllPoint(item.latlng)
      }
    },
    // 添加标注图片
    drawAllPoint(latlng) {
      let marker = new T.Marker(latlng)
      this.map.addOverLay(marker)
      marker.addEventListener('click', this.taskPointClick)
      marker.addEventListener('mouseover', this.taskPointMouse)
      marker.addEventListener('mouseout	', this.taskPointMouse)
    },
    // 任务点点击移入移出事件
    taskPointMouse(index) {
      if (this.actionTab == 1) {
        for (const item of this.fixedPointList) {
          if (index.lnglat.lat === item.latlng.lat && index.lnglat.lng === item.latlng.lng) {
            item.clicked = true
          } else {
            item.clicked = false
          }
        }
      } else {
        for (const item of this.peoplePointList) {
          if (index.lnglat.lat === item.latlng.lat && index.lnglat.lng === item.latlng.lng) {
            item.clicked = true
          } else {
            item.clicked = false
          }
        }
      }
    },
    // 任务点点击事件
    taskPointClick(index) {
      console.log(index.lnglat.lat, index.lnglat.lng)
      this.$refs.addWaterPoint.add()
      if (this.actionTab == 1) {
        for (const item of this.fixedPointList) {
          if (index.lnglat.lat === item.latlng.lat && index.lnglat.lng === item.latlng.lng) {
            item.clicked = true
            this.pointInfo = item
          } else {
            item.clicked = false
          }
        }
      } else {
        for (const item of this.peoplePointList) {
          if (index.lnglat.lat === item.latlng.lat && index.lnglat.lng === item.latlng.lng) {
            item.clicked = true
            this.pointInfo = item
          } else {
            item.clicked = false
          }
        }
      }
    },
    // 注册添加点击事件
    addTaskPoint() {
      this.markerTool.open()
      this.markerTool.getMarkers()
      this.markerTool.addEventListener('mouseup', this.addTaskPointed)
    },
    // 返回标注点的坐标
    addTaskPointed(e) {
      this.$refs.addWaterPoint.add()
      console.log(e)
    },

    // tab切换
    callback(key) {
      let arr = []
      this.map.clearOverLays()
      if (key == 1) {
        this.allPointTask(this.fixedPointList)
        for (const item of this.fixedPointList) {
          arr.push(item.latlng)
          this.map.setViewport(arr)
        }
      } else {
        this.allPointTask(this.peoplePointList)
        for (const item of this.peoplePointList) {
          arr.push(item.latlng)
          this.map.setViewport(arr)
        }
      }
    },

    // 地图选项
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    // 固定监测点
    fixedPoint(index) {
      this.defaultRiver = index
      this.fixedPointList.forEach(value => {
        if (value.name === index) {
          value.clicked = true
          let arr = []
          arr.push(value.latlng)
          this.map.setViewport(arr)
        } else {
          value.clicked = false
        }
      })
    },
    // 人工监测点
    peoplePoint(index) {
      this.defaultRiver = index
      this.peoplePointList.forEach(value => {
        if (value.name === index) {
          value.clicked = true
          let arr = []
          arr.push(value.latlng)
          this.map.setViewport(arr)
        } else {
          value.clicked = false
        }
      })
    },
    // 固定监测点删除
    fixedConfirmDelete(index) {
      console.log(index)
      this.fixedPointList.splice(this.fixedPointList.findIndex(item => item.name === index), 1)
      this.$message.success('删除成功')
      this.allPointTask(this.fixedPointList)
      this.defaultRiver = null
    },
    // 人工监测点删除
    peopleConfirmDelete(index) {
      this.peoplePointList.splice(this.peoplePointList.findIndex(item => item.name === index), 1)
      this.$message.success('删除成功')
      this.allPointTask(this.peoplePointList)
      this.defaultRiver = null
    },
    cancelDelete(e) {
      // this.$message.error('Click on No')
    },
    // 添加任务按钮
    addTask() {
      if (this.actionTab == 1) {
        this.addTaskPoint()
      } else {
        this.addTaskPoint()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.supervise {
  position: relative;
  height: calc(100vh - 64px);
  width: 100vw;
}
#map {
  width: 100%;
  height: 100%;
}
.mapChange {
  position: fixed;
  left: 10px;
  bottom: 10px;
  width: 120px;
  z-index: 1500;
}
.weather {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 120px;
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
.right {
  position: relative;
  width: 300px;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  // padding: 10px;
  background-color: white;
}
.task_face {
  width: 100%;
  height: calc(100vh - 180px);
  overflow: auto;
}

.ant-spin-container {
  .ant-list-item:hover {
    background-color: #eee;
  }
  .active_item {
    background-color: #eee;
  }
}
.ant-form-item {
  margin-bottom: 0;
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
