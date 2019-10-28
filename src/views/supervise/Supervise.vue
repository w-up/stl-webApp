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
    </div>-->
    <div class="showMap" id="showmap">
      <div class="half">
        <div id="roadMap" class="vmap"></div>
      </div>
      <div class="half">
        <div id="aerialMap" class="vmap"></div>
      </div>
    </div>
    <div id="layerMap" class="layerMap">
      <div class="main">
        <div id="lmap" class="lmap"></div>
      </div>
      <input id="swipe" class="swipe" type="range" />
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
              <a-radio-button value="2" @click="addPolygonTool">面</a-radio-button>
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
        <img src="./img/screenshot.png" @click="printImage" alt="截图" title="截图" />
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
                    <a-switch size="small" v-model="historyData" />
                  </a-col>
                </a-row>
              </a-list-item>
              <a-popover placement="leftBottom" arrowPointAtCenter trigger="click">
                <template slot="content">
                  <a-list size="small">
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">双球对比</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch
                            size="small"
                            checkedChildren="开"
                            unCheckedChildren="关"
                            v-model="sharedChecked"
                            @click="sharedView"
                          />
                        </a-col>
                      </a-row>
                      <!-- <p style="margin:0;">双球对比</p> -->
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">卷帘对比</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch
                            size="small"
                            checkedChildren="开"
                            unCheckedChildren="关"
                            v-model="swipeChecked"
                            @click="layerSwipe"
                          />
                        </a-col>
                      </a-row>
                      <!-- <p style="margin:0;">卷帘对比</p> -->
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
                          <a-switch size="small" v-model="phonePhoto" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">无人机照片</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="UAVPhoto" />
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
                          <a-switch size="small" v-model="riskMap" @click="onRiskMap" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">水质</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="waterQuality" @click="onWaterQuality" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">水面漂浮物</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="waterFlotage" @click="onWaterFlotage" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">河岸风险源</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="riverRisk" @click="onRiverRisk" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">水土流失</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="waterLandLoss" @click="onWaterLandLoss" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">水面率</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="waterRatio" @click="onWaterRatio" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">底泥</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="bottomMud" @click="onBottomMud" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">专项调查点</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="surveyPoint" @click="onSurveyPoint" />
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
                          <a-switch size="small" v-model="riverLink" @click="onRiverLink" />
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                        <a-col :span="18">
                          <p style="margin:0;">水陆分布</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="landAndWater" @click="onLandAndWater" />
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
    <!-- 添加风险源 -->
    <add-risk-source ref="addRisk"></add-risk-source>
    <!-- 照片编辑 -->
    <phone-edit ref="photoEdit"></phone-edit>
  </div>
</template>

<script>
// import WorldMap from "../../components/map/WorldMap.vue";
import RiskSourceInfo from './modules/RiskSourceInfo'
import AddRiskSource from './modules/AddRiskSource'
import PhotoEdit from './modules/PhotoEdit'

// import 'ol/ol.css'
// import Map from 'ol/Map'
// import View from 'ol/View'
// import TileLayer from 'ol/layer/Tile'
// import LayerGroup from 'ol/layer/Group'
// import XYZ from 'ol/source/XYZ'

// import OSM from 'ol/source/OSM'
// 拖拽缩放
// import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction'

// 截图
import htmlToImage from 'html-to-image'

export default {
  name: 'Supervise',
  components: {
    // 'world-map': WorldMap
    'risk-source-info': RiskSourceInfo,
    'add-risk-source': AddRiskSource,
    'phone-edit': PhotoEdit
  },
  data() {
    return {
      mapType: 'a',
      checked: false,
      sharedChecked: false,
      swipeChecked: false,
      showView: true,
      canDownload: true, // 是否可以下载
      // 地图对象
      map: null,

      markerTool: '', // 工具-点
      lineTool: '', //工具-线
      lineToolNum: '', //工具-测距

      mapLayer: '', // 地图图层

      historyData: false, // 历史数据
      phonePhoto: false, // 手机照片
      phonePhotoTool: '', // 手机照片工具
      UAVPhoto: false, // 无人机照片
      UAVPhotoTool: '', // 无人机照片工具
      historyPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.21493, lng: 121.49566 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.22344, lng: 121.47892 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.20649, lng: 121.47712 } }
      ],
      phonePhotoPoints: [
        {
          id: 0,
          name: '监测点1',
          clicked: false,
          imgUrl: require('../../assets/loginBg.jpg'),
          latlng: { lat: 31.22493, lng: 121.51566 }
        },
        {
          id: 1,
          name: '监测点2',
          clicked: false,
          imgUrl: require('../../assets/loginBg.jpg'),
          latlng: { lat: 31.24344, lng: 121.49892 }
        },
        {
          id: 2,
          name: '监测点3',
          clicked: false,
          imgUrl: require('../../assets/loginBg.jpg'),
          latlng: { lat: 31.22649, lng: 121.49712 }
        }
      ],
      UAVPhotoPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.24493, lng: 121.52566 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.25344, lng: 121.50892 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.23649, lng: 121.50712 } }
      ],

      riskMap: false, // 风险地图
      riskMapPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.23493, lng: 121.51566 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.24344, lng: 121.49892 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.22649, lng: 121.49712 } }
      ],
      waterQuality: false, // 水质
      waterQualityPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.24235, lng: 121.52235 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.25335, lng: 121.50335 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.23435, lng: 121.50445 } }
      ],
      waterFlotage: false, // 水质漂浮物
      waterFlotagePoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.22222, lng: 121.52222 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.23555, lng: 121.50555 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.22333, lng: 121.51333 } }
      ],
      riverRisk: false, // 河岸风险源
      riverRiskPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.20333, lng: 121.49999 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.21666, lng: 121.48666 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.22999, lng: 121.47333 } }
      ],
      waterLandLoss: false, // 水土流失
      waterLandLossPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.09999, lng: 121.50333 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.16666, lng: 121.48333 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.05555, lng: 121.49666 } }
      ],
      waterRatio: false, // 水面率
      waterRatioPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.26023, lng: 121.50565 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.2396, lng: 121.5164 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.22994, lng: 121.50955 } }
      ],
      bottomMud: false, // 底泥
      bottomMudPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.23564, lng: 121.51066 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.24315, lng: 121.49606 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.23668, lng: 121.49656 } }
      ],
      surveyPoint: false, // 专项调查点
      surveyPointPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.23941, lng: 121.50384 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.24682, lng: 121.49964 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.25364, lng: 121.51648 } }
      ],

      riverLink: false, // 河道连通性
      riverLinkPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.23841, lng: 121.516833 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.24611, lng: 121.49364 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.26, lng: 121.51684 } }
      ],
      landAndWater: false, // 水陆分布
      landAndWaterPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.25031, lng: 121.51681 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.24304, lng: 121.49392 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.2645, lng: 121.49356 } }
      ]
    }
  },
  watch: {
    // 历史数据
    historyData() {
      this.watchAllSwitch()
    },
    // 手机照片
    phonePhoto() {
      this.watchAllSwitch()
    },
    // 无人机照片
    UAVPhoto() {
      this.watchAllSwitch()
    },
    // 风险地图
    riskMap() {
      this.watchAllSwitch()
    },
    // 水质
    waterQuality() {
      this.watchAllSwitch()
    },
    // 水质漂浮物
    waterFlotage() {
      this.watchAllSwitch()
    },
    // 河岸风险源
    riverRisk() {
      this.watchAllSwitch()
    },
    // 水土流失
    waterLandLoss() {
      this.watchAllSwitch()
    },
    // 水面率
    waterRatio() {
      this.watchAllSwitch()
    },
    // 底泥
    bottomMud() {
      this.watchAllSwitch()
    },
    // 专项调查点
    surveyPoint() {
      this.watchAllSwitch()
    },
    // 河道连通性
    riverLink() {
      this.watchAllSwitch()
    },
    // 水陆分布
    landAndWater() {
      this.watchAllSwitch()
    }
  },
  mounted() {
    this.initMap()
    // this.showMap()
    // this.showSwipeMap()
  },
  methods: {
    initMap() {
      //初始化地图控件
      let zoom = 14
      this.map = new T.Map('map')
      this.map.centerAndZoom(new T.LngLat(121.495505, 31.21098), zoom)
      //添加比例尺控件
      this.map.addControl(new T.Control.Scale())
      this.map.setMinZoom(4)
      this.map.setMaxZoom(18)

      // this.phonePhotoTool = new T.MarkTool(this.map, { follow: true })
      // this.UAVPhotoTool = new T.MarkTool(this.map, { follow: true })
      this.phonePhotoTool = new T.Marker()
      this.UAVPhotoTool = new T.Marker()
      this.markerTool = new T.MarkTool(this.map, { follow: true })
      this.lineTool = new T.PolylineTool(this.map, {
        showLabel: false
      })
      this.lineToolNum = new T.PolylineTool(this.map, {
        showLabel: true
      })
      // this.map = new Map({
      //   target: 'map',
      //   view: new View({
      //     center: [12149550, 3121098],
      //     zoom: 12
      //   }),
      //   layers: [
      //     new TileLayer({
      //       source: new XYZ({
      //         url: 'https://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=b4840c07acad9f2144370bb8abaf80fc'
      //       }),
      //       isGroup: true,
      //       name: '天地图路网'
      //     }),
      //     new TileLayer({
      //       source: new XYZ({
      //         url: 'https://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=b4840c07acad9f2144370bb8abaf80fc'
      //       }),
      //       isGroup: true,
      //       name: '天地图文字标注'
      //     })
      //   ],
      //   // interactions: defaultInteractions().extend([new DragRotateAndZoom()])
      // })
    },
    // 指北针
    compass() {},
    // 复位
    setCenter() {
      let lng = 121.095505
      let lat = 31.21098
      let zoom = 10
      this.map.panTo(new T.LngLat(lng, lat), zoom)
    },

    // 工具-点
    addPoint() {
      this.markerTool.open()
      this.markerTool.addEventListener('mouseup', this.addPointed)
    },
    // 返回标注点的坐标
    addPointed(e) {
      console.log(e)
      this.$refs.addRisk.add()
    },
    // 工具-线
    addLineTool() {
      this.lineTool.open()
      this.lineTool.setTips(`<p style="padding:0px;">单击确认起点, 双击结束绘制</p>`)
    },
    // 工具-面
    addPolygonTool() {
      let polygonTool = new T.PolygonTool(this.map, {
        showLabel: true,
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        fillColor: '#FFFFFF',
        fillOpacity: 0.5
      })
      polygonTool.open()
    },
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

    // 图像
    onMapChange(e) {
      this.map.clearLayers()
      let twoDimensionURL =
        'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=b4840c07acad9f2144370bb8abaf80fc'
      let wordLabel = 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=b4840c07acad9f2144370bb8abaf80fc'
      let satelliteURL =
        'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=b4840c07acad9f2144370bb8abaf80fc'
      //创建自定义图层对象
      if (e.target.value == 'a') {
        console.log(`checked = ${e.target.value}`)
        let mapLayer2d = new T.TileLayer(twoDimensionURL, { minZoom: 4, maxZoom: 18 })
        this.map.addLayer(mapLayer2d)
      } else if (e.target.value == 'b') {
        console.log(`checked = ${e.target.value}`)
        //将图层增加到地图上
        let mapLayerSatellite = new T.TileLayer(satelliteURL, { minZoom: 4, maxZoom: 18 })
        this.map.addLayer(mapLayerSatellite)
      }
      let mapLayerWord = new T.TileLayer(wordLabel, { minZoom: 4, maxZoom: 18 })
      this.map.addLayer(mapLayerWord)
      this.map.clearLayers()
    },
    printImage() {
      if (!this.canDownload) {
        return
      }
      this.canDownload = false
      this.$notification.open({
        message: '提示',
        description: '正在截取地图, 请稍等...'
      })
      var node = document.getElementById('map')
      htmlToImage
        .toPng(node)
        .then((dataUrl) => {
          // console.log(dataUrl)
          var str = 'map' + this.getNowTime() //以下代码为下载此图片功能
          var triggerDownload = $('<a>')
            .attr('href', dataUrl)
            .attr('download', str + '.png')
            .appendTo('body')
          triggerDownload[0].click()
          triggerDownload.remove()
          setTimeout(() => {
            this.canDownload = true
          }, 1500)
        })
        .catch(function(error) {
          console.error('oops, something went wrong!', error)
        })
    },
    // 获取当前时间
    getNowTime() {
      let myDate = new Date()
      let y = myDate.getFullYear() //获取完整的年份(4位,1970-????)
      let m = this.setTimeLayout(myDate.getMonth() + 1) //获取当前月份(0-11,0代表1月)
      let d = this.setTimeLayout(myDate.getDate()) //获取当前日(1-31)
      let hh = this.setTimeLayout(myDate.getHours()) //获取当前小时数(0-23)
      let mm = this.setTimeLayout(myDate.getMinutes()) //获取当前分钟数(0-59)
      let ss = this.setTimeLayout(myDate.getSeconds()) //获取当前秒数(0-59)
      let timeStr = y + m + d + hh + mm + ss
      return timeStr
    },
    // 设置时间格式
    setTimeLayout(time) {
      if (Number(time) < 10) {
        time = '0' + time
      }
      return time.toString()
    },
    // 放大
    mapZoomIn() {
      this.map.zoomIn()
    },
    // 缩小
    mapZoomOut() {
      this.map.zoomOut()
    },
    // 更多-历史数据
    onHistoryData() {
      if (this.historyData) {
        this.allPointTask(this.historyPoints)
      }
    },
    // 手机照片
    onPhonePhoto() {
      if (this.phonePhoto) {
        this.allImageTask(this.phonePhotoPoints)
      }
    },
    // 无人机照片
    onUAVPhoto() {
      if (this.UAVPhoto) {
        this.allPointTask(this.UAVPhotoPoints)
      }
    },
    // 风险地图
    onRiskMap() {
      if (this.riskMap) {
        this.allPointTask(this.riskMapPoints)
      }
    },
    // 水质
    onWaterQuality() {
      if (this.waterQuality) {
        this.allPointTask(this.waterQualityPoints)
      }
    },
    // 水质漂浮物
    onWaterFlotage() {
      if (this.waterFlotage) {
        this.allPointTask(this.waterFlotagePoints)
      }
    },
    // 河岸风险源
    onRiverRisk() {
      if (this.riverRisk) {
        this.allPointTask(this.riverRiskPoints)
      }
    },
    // 水土流失
    onWaterLandLoss() {
      if (this.waterLandLoss) {
        this.allPointTask(this.waterLandLossPoints)
      }
    },
    // 水面率
    onWaterRatio() {
      if (this.waterRatio) {
        this.allPointTask(this.waterRatioPoints)
      }
    },
    // 底泥
    onBottomMud() {
      if (this.bottomMud) {
        this.allPointTask(this.bottomMudPoints)
      }
    },
    // 专项调查点
    onSurveyPoint() {
      if (this.surveyPoint) {
        this.allPointTask(this.surveyPointPoints)
      }
    },
    // 河道连通性
    onRiverLink() {
      if (this.riverLink) {
        this.allPointTask(this.riverLinkPoints)
      }
    },
    // 水陆分布
    onLandAndWater() {
      if (this.landAndWater) {
        this.allPointTask(this.landAndWaterPoints)
      }
    },
    // 监听所有的开关属性
    watchAllSwitch() {
      this.map.clearOverLays()
      // 历史数据
      this.onHistoryData()
      // 手机照片
      this.onPhonePhoto()
      // 无人机照片
      this.onUAVPhoto()
      // 风险地图
      this.onRiskMap()
      // 水质
      this.onWaterQuality()
      // 水质漂浮物
      this.onWaterFlotage()
      // 河岸风险源
      this.onRiverRisk()
      // 水土流失
      this.onWaterLandLoss()
      // 水面率
      this.onWaterRatio()
      // 底泥
      this.onBottomMud()
      // 专项调查点
      this.onSurveyPoint()
      // 河道连通性
      this.onRiverLink()
      // 水陆分布
      this.onLandAndWater()
    },

    allPointTask(pointLists) {
      // this.map.clearOverLays()
      console.log(pointLists)
      // let arr = []
      for (const item of pointLists) {
        // arr.push(item.latlng)
        this.drawAllPoint(item.latlng)
      }
      // this.map.setViewport(arr)
    },
    // 添加标注图片
    drawAllPoint(latlng) {
      let markerTool = new T.Marker(latlng)
      this.map.addOverLay(markerTool)
      markerTool.addEventListener('click', this.taskPointClick)
    },
    // 任务点点击事件
    taskPointClick(index) {
      this.$refs.riskInfo.riskInfo()
      // for (const item of this.historyPoints) {
      //   if (index.lnglat.lat === item.latlng.lat && index.lnglat.lng === item.latlng.lng) {
      //     console.log(index.lnglat.lat, index.lnglat.lng)
      //     this.$refs.riskInfo.riskInfo()
      //   }
      // }
    },
    // 绘制图片
    allImageTask(pointLists) {
      // this.map.clearOverLays()
      console.log(pointLists)
      // let arr = []
      for (const item of pointLists) {
        // arr.push(item.latlng)
        this.drawAllImage(item.latlng, item.imgUrl)
      }
      // this.map.setViewport(arr)
    },
    // 添加手机照片
    drawAllImage(latlng, img) {
      //创建图片对象
      let icon = new T.Icon({
        iconUrl: img,
        iconSize: new T.Point(70, 45),
        iconAnchor: new T.Point(35, 45)
      })
      //向地图上添加自定义标注
      let marker = new T.Marker(latlng, { icon: icon })
      marker.addEventListener('click', this.taskImageClick)
      this.map.addOverLay(marker)
    },
    // 任务照片点击
    taskImageClick(index) {
      this.$refs.photoEdit.showVisible()
      // for (const item of this.historyPoints) {
      //   if (index.lnglat.lat === item.latlng.lat && index.lnglat.lng === item.latlng.lng) {
      //     console.log(index.lnglat.lat, index.lnglat.lng)
      //     this.$refs.riskInfo.riskInfo()
      //   }
      // }
    },
    getTdLayer(lyr) {
      var url =
        'http://t{0-7}.tianditu.com/DataServer?T=' + lyr + '&x={x}&y={y}&l={z}&tk=b4840c07acad9f2144370bb8abaf80fc'
      var layer = new TileLayer({
        source: new XYZ({
          url: url
        })
      })
      return layer
    },
    showMap() {
      // this.map.removeLayer(map1);
      // this.map.removeLayer(map2);
      var vec_c = this.getTdLayer('vec_w')
      var cva_c = this.getTdLayer('cva_w')
      var img_c = this.getTdLayer('img_w')

      var veclayerGroup = new LayerGroup({
        layers: [vec_c, cva_c]
      })
      var imglayerGroup = new LayerGroup({
        layers: [img_c, cva_c]
      })
      var view = new View({
        projection: 'EPSG:4326',
        center: [121.495505, 31.21098],
        zoom: 14
      })
      var map1 = new Map({
        target: 'roadMap',
        layers: [veclayerGroup],
        view: view
      })
      var map2 = new Map({
        target: 'aerialMap',
        layers: [imglayerGroup],
        view: view
      })
    },
    sharedView() {
      if (this.sharedChecked == true) {
        this.showView = false
        this.swipeChecked = false
        var layerMap = document.getElementById('layerMap')
        layerMap.style.display = 'none'
        var show = document.getElementById('showmap')
        show.style.display = 'block'
        this.showMap()
      }
      if (this.sharedChecked == false) {
        var show = document.getElementById('showmap')
        show.style.display = 'none'
        this.showView = true
      }
    },
    showSwipeMap() {
      var vec_c = this.getTdLayer('vec_w')
      var cva_c = this.getTdLayer('cva_w')
      var img_c = this.getTdLayer('img_w')

      var veclayerGroup = new LayerGroup({
        layers: [vec_c, cva_c]
      })
      var imglayerGroup = new LayerGroup({
        layers: [img_c, cva_c]
      })

      var lmap = new Map({
        target: 'lmap',
        layers: [imglayerGroup, veclayerGroup],
        view: new View({
          projection: 'EPSG:4326',
          center: [121.495505, 31.21098],
          zoom: 14
        })
      })
      var swipe = document.getElementById('swipe')
      vec_c.on('prerender', function(event) {
        var ctx = event.context
        var width = ctx.canvas.width * (swipe.value / 100)

        ctx.save()
        ctx.beginPath()
        ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height)
        ctx.clip()
      })
      vec_c.on('postrender', function(event) {
        var ctx = event.context
        ctx.restore()
      })
      swipe.addEventListener(
        'input',
        function() {
          lmap.render()
        },
        false
      )
    },
    layerSwipe() {
      if (this.swipeChecked == true) {
        this.showView = false
        this.sharedChecked = false
        var show = document.getElementById('showmap')
        show.style.display = 'none'
        var layerMap = document.getElementById('layerMap')
        layerMap.style.display = 'block'
        this.showSwipeMap()
      }
      if (this.swipeChecked == false) {
        var layerMap = document.getElementById('layerMap')
        layerMap.style.display = 'none'
        this.showView = true
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
.vmap {
  width: 100%;
  height: 100%;
}
.showMap {
  display: none;
}
.main {
  width: 100%;
  height: calc(100vh - 64px);
}
.layerMap {
  display: none;
}
.lmap {
  width: 100%;
  height: 95%;
}
.swipe {
  position: absolute;
  bottom: 10px;
  left: 0;
  z-index: 888;
  width: 100%;
}
@media (min-width: 800px) {
  .half {
    padding: 0 10px;
    width: 50%;
    height: calc(100vh - 64px);
    float: left;
  }
}
#map {
  width: 100%;
  height: 100%;
  position: relative;
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
  z-index: 888;
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
  z-index: 888;
  ul {
    width: 100%;
    height: calc(100% - 35px);
    overflow: auto;
    margin: 0;
    padding: 0;
    list-style-type: none;
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
