<template>
  <div class="supervise"> 
    <div id="map" ref="worldMap" v-show="showView"></div>
    <!-- <div class="showMap" v-show="!showView">
      <div class="half">
          <div id="roadMap" class="vmap"></div>
      </div>
      <div class="half">
          <div id="aerialMap" class="vmap"></div>
      </div>
    </div> -->
    <div class="showMap" id="showmap">
      <div class="half">
          <div id="roadMap" class="vmap"></div>
      </div>
      <div class="half">
          <div id="aerialMap" class="vmap"></div>
      </div>
    </div>
    <!-- <div class="left">
      <world-map></world-map>
    </div>-->
    <!-- <div class="right">456546</div> -->
    <div class="weather">
      <img src="../../assets/sun.png" alt="天气" />
      <h3>29</h3>
      <div class="text" style="margin-left:4px;">
        <h5>℃ 晴(实时)</h5>
        <p>晴转多云 24~29℃</p>
      </div>
      <div class="text" style="margin-left:10px;">
        <h5>2019/10/01</h5>
        <p>星期一</p>
      </div>
    </div>
    <div class="time_line">
      <ul class="time_ul">
        <li>
          <h6 style="font-size:12px;text-align:center;">2019.09</h6>
          <a-tooltip
            placement="right"
            class="time_item"
            trigger="hover"
            v-for="item in 30"
            :key="item"
          >
            <template slot="title">
              <span>2019.09.{{item}}</span>
            </template>
            <a-icon
              type="minus"
              class="icon_style"
              :class="{'time_color_red':item%3 == 0,'time_color_blue':item%3 == 1,'time_color_gray':item%3 == 2}"
            />
            <p>{{item}}</p>
          </a-tooltip>
        </li>
        <li>
          <h6 style="font-size:12px;text-align:center;">2019.08</h6>
          <a-tooltip
            placement="right"
            class="time_item"
            trigger="hover"
            v-for="item in 31"
            :key="item"
          >
            <template slot="title">
              <span>2019.08.{{item}}</span>
            </template>
            <a-icon
              type="minus"
              class="icon_style"
              :class="{'time_color_red':item%3 == 0,'time_color_blue':item%3 == 1,'time_color_gray':item%3 == 2}"
            />
            <p>{{item}}</p>
          </a-tooltip>
        </li>
      </ul>
      <div class="time_set">
        <a-popover placement="rightBottom" trigger="click">
          <template slot="content">
            <a-range-picker @change="setTime" />
          </template>
          <template slot="title">
            <span>设置时间段</span>
          </template>
          <a-button type="primary" icon="setting" block></a-button>
        </a-popover>
      </div>
    </div>
    <ul class="menu">
      <li @click="compass">
        <img src="./img/compass.png" alt="指北针" title="指北针" />
      </li>
      <li @click="setCenter">
        <img src="./img/restoration.png" alt="复位" title="复位" />
      </li>
      <li>
        <a-popover placement="left" arrowPointAtCenter trigger="click">
          <template slot="content">
            <a-radio-group>
              <a-radio-button value="0" @click="addPoint">点</a-radio-button>
              <a-radio-button value="1" @click="addLineTool">线</a-radio-button>
              <a-radio-button value="2">面</a-radio-button>
              <a-radio-button value="3" @click="addLineToolNum">测量</a-radio-button>
            </a-radio-group>
          </template>
          <template slot="title">
            <span>工具</span>
          </template>
          <img src="./img/draw.png" alt="工具" title="工具" />
        </a-popover>
      </li>
      <li>
        <a-popover placement="leftBottom" arrowPointAtCenter trigger="click">
          <template slot="content">
            <a-row style="width: 100%;">
              <a-col :span="24">
                <!-- <span>2D影像图</span> -->
                <a-radio-group @change="onMapChange" v-model="mapType">
                  <a-radio-button value="a">2D影像图</a-radio-button>
                  <a-radio-button value="b">卫星影像图</a-radio-button>
                </a-radio-group>
              </a-col>
            </a-row>
            <a-row style="width: 100%; margin-top: 8px;">
              <a-col :span="16">
                <span>道路标注</span>
              </a-col>
              <a-col :span="8">
                <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
              </a-col>
            </a-row>
          </template>
          <template slot="title">
            <span>图像</span>
          </template>
          <img src="./img/map.png" alt="图像" title="图像" />
        </a-popover>
      </li>
      <li>
        <img src="./img/screenshot.png" alt="截图" title="截图" />
      </li>
      <li @click="mapZoomIn">
        <img src="./img/max.png" alt="放大" title="放大" />
      </li>
      <li @click="mapZoomOut">
        <img src="./img/min.png" alt="缩小" title="缩小" />
      </li>
      <li>
        <a-popover placement="leftBottom" arrowPointAtCenter trigger="click">
          <template slot="content" style="overflow-y: scroll;">
            <a-list size="small">
              <a-list-item>
                <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                  <a-col :span="18">
                    <p style="margin:0;">查看历史数据</p>
                  </a-col>
                  <a-col :span="6">
                    <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                  </a-col>
                </a-row>
              </a-list-item>
              <a-popover placement="leftBottom" arrowPointAtCenter trigger="click">
                <template slot="content">
                  <a-list size="small">
                    <a-list-item @click="sharedView">
                      <p style="margin:0;">双球对比</p>
                    </a-list-item>
                    <a-list-item>
                      <p style="margin:0;">卷帘对比</p>
                    </a-list-item>
                  </a-list>
                </template>
                <template slot="title">
                  <span>影像对比</span>
                </template>
                <a-list-item>
                  <p style="margin:0;">影像对比</p>
                </a-list-item>
              </a-popover>
              <a-popover placement="leftBottom" arrowPointAtCenter trigger="click">
                <template slot="content">
                  <a-list size="small">
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">手机照片</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">无人机照片</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">360全景图</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                  </a-list>
                </template>
                <template slot="title">
                  <span>影像管理</span>
                </template>
                <a-list-item>
                  <p style="margin:0;">影像管理</p>
                </a-list-item>
              </a-popover>

              <a-popover placement="leftBottom" arrowPointAtCenter trigger="click">
                <template slot="content">
                  <a-list size="small">
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">风险地图</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">水质</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">水面漂浮物</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">河岸风险源</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">水土流失</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">水面率</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">底泥</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">专项调查点</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                  </a-list>
                </template>
                <template slot="title">
                  <span>风险管理</span>
                </template>
                <a-list-item>
                  <p style="margin:0;">风险管理</p>
                </a-list-item>
              </a-popover>
              <a-popover placement="leftBottom" arrowPointAtCenter trigger="click">
                <template slot="content">
                  <a-list size="small">
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">河道连通性</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">水陆分布</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                  </a-list>
                </template>
                <template slot="title">
                  <span>其他</span>
                </template>
                <a-list-item>
                  <p style="margin:0;">其他</p>
                </a-list-item>
              </a-popover>
            </a-list>
          </template>
          <template slot="title">
            <span>更多</span>
          </template>
          <img src="./img/more.png" alt="更多" title="更多" />
        </a-popover>
      </li>
    </ul>
    <!-- 风险源信息 -->
    <risk-source-info ref="riskInfo"></risk-source-info>
  </div>
</template>

<script>
// import WorldMap from "../../components/map/WorldMap.vue";
import RiskSourceInfo from './modules/RiskSourceInfo'

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import LayerGroup from 'ol/layer/Group';
import XYZ from "ol/source/XYZ"; 

export default {
  name: 'Supervise',
  components: {
    // 'world-map': WorldMap
    'risk-source-info': RiskSourceInfo
  },
  data() {
    return {
      mapType: 'a',
      checked: false,
      showView:true,
      // 地图对象
      map: null,
      // 地图节点对象（里面含节点对象、区域对象、任务弹窗对象）
      mapPoint: new Map(),
      markerTool: '', // 工具-点
      lineTool: '', //工具-线
      lineToolNum: '' //工具-测距
    }
  },
  mounted() {
    this.initMap()
    // this.showMap()
  },
  methods: {
    initMap() {
      //初始化地图控件
      let zoom = 14
      this.map = new T.Map('map')
      this.map.centerAndZoom(new T.LngLat(121.495505, 31.21098), zoom)
      this.markerTool = new T.MarkTool(this.map, { follow: true })
      this.lineTool = new T.PolylineTool(this.map, {
        showLabel: false
      })
      this.lineToolNum = new T.PolylineTool(this.map, {
        showLabel: true
      })
    },
    // 复位
    setCenter() {
      let lng = 121.095505
      let lat = 31.21098
      let zoom = 10
      this.map.panTo(new T.LngLat(lng, lat), zoom)
    },
    // 放大
    mapZoomIn() {
      this.map.zoomIn()
    },
    // 缩小
    mapZoomOut() {
      this.map.zoomOut()
    },

    // 工具-点
    addPoint() {
      this.markerTool.open()
      this.markerTool.addEventListener('mouseup', this.addPointed)
    },
    // 返回标注点的坐标
    addPointed(e) {
      console.log(e)
      this.$refs.riskInfo.riskInfo()
    },
    // 工具-线
    addLineTool() {
      this.lineTool.open()
      this.lineTool.setTips(`<p style="padding:0px;">单击确认起点, 双击结束绘制</p>`)
    },
    // 工具-面
    // 工具-测量
    addLineToolNum() {
      this.lineToolNum.open()
      this.lineToolNum.setTips(`<p style="padding:0px;">单击确认起点, 双击结束绘制</p>`)
    },
    // 设置时间段
    setTime(date, dateString) {
      console.log(date, dateString)
    },
    // 更多
    onSelect(keys) {
      console.log('Trigger Select', keys)
    },
    onExpand() {
      console.log('Trigger Expand')
    },
    // 开关
    onChangeSwitch(checked) {
      console.log(this.checked)
      console.log(`a-switch to ${checked}`)
    },
    // 指北针
    compass() {
      this.$refs.riskInfo.riskInfo()
    },
    // 图像
    onMapChange(e) {
      console.log(`checked = ${e.target.value}`)
    },
    getTdLayer(lyr){
        var url = "http://t{0-7}.tianditu.com/DataServer?T=" + lyr + "&x={x}&y={y}&l={z}&tk=b4840c07acad9f2144370bb8abaf80fc"
        var layer = new TileLayer({
            source: new XYZ({
            url: url
            })
        });
        return layer;
    },
    showMap(){
      var vec_c = this.getTdLayer("vec_w");
      var cva_c = this.getTdLayer("cva_w");
      var img_c = this.getTdLayer("img_w");

      var veclayerGroup = new LayerGroup({
          layers:[vec_c,cva_c]
      });
      var imglayerGroup = new LayerGroup({
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
    },
    sharedView(){
      this.showView = false;
      var show = document.getElementById("showmap");
      show.style.display = "block";
      this.showMap()
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
.vmap{
  width: 100%;
  height: 100%;
}
.showMap{
  display: none;
}
@media (min-width: 800px) {
    .half {
        padding: 0 10px;
        width: 50%;
        height:calc(100vh - 64px);
        float: left;
    }
}
#map {
  width: 100%;
  height: 100%;
}
.weather {
  position: absolute;
  left: 80px;
  top: 10px;
  width: 360px;
  height: 60px;
  background-color: rgba(255, 255, 255, 1);
  opacity: 0.9;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid rgb(204, 204, 204);
  z-index: 999;
  display: flex;
  display: -webkit-flex;
  img {
    width: 58px;
    height: 58px;
  }
  h3 {
    font-size: 50px;
    line-height: 60px;
    margin: 0;
  }
  .text {
    h5 {
      line-height: 30px;
      font-size: 15px;
      font-weight: 600;
      margin: 0;
    }
    p {
      line-height: 30px;
      font-size: 15px;
      margin: 0;
    }
  }
}
.time_line {
  position: absolute;
  left: 0;
  top: 0;
  width: 70px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1009;
  ul {
    width: 100%;
    height: calc(100% - 35px);
    overflow: auto;
    li {
      width: 100%;
      position: relative;
      .time_item {
        width: 100%;
        p {
          display: none;
          margin: 0;
          width: 100%;
          font-size: 12px;
          padding: 3px 10px;
          text-align: center;
          cursor: default;
        }
        .icon_style {
          position: relative;
          font-size: 24px;
          display: block;
          width: 100%;
        }
      }
      .time_item:hover {
        p {
          display: block;
        }
        .icon_style {
          display: none;
        }
      }
      .time_color_red {
        color: red;
      }
      .time_color_blue {
        color: rgb(57, 236, 66);
      }
      .time_color_gray {
        color: rgb(180, 180, 180);
      }
    }
  }
  .time_set {
    position: absolute;
    bottom: 4px;
    width: 100%;
    height: 30px;
    text-align: center;
  }
}

.menu {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  z-index: 999;
  margin: 0;
  padding: 0;
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

.ant-col-6 {
  text-align: right;
}
</style>
