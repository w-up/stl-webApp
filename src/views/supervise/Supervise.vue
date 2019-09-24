<template>
  <div class="supervise">
    <div id="map" ref="worldMap"></div>
    <!-- <div class="left">
      <world-map></world-map>
    </div>-->
    <!-- <div class="right">456546</div> -->
    <div class="weather">
      <img src="./img/weather.jpg" alt="">
    </div>
    <ul class="menu">
      <li @click="compass">
        <img src="./img/compass.png" alt="指北针" title="指北针" />
      </li>
      <li>
        <img src="./img/restoration.png" alt="复位" title="复位" />
      </li>
      <li>
        <a-popover placement="left" arrowPointAtCenter trigger="click">
          <template slot="content">
            <a-radio-group>
              <a-radio-button value="0">点</a-radio-button>
              <a-radio-button value="1">线</a-radio-button>
              <a-radio-button value="2">面</a-radio-button>
              <a-radio-button value="3">测量</a-radio-button>
            </a-radio-group>
          </template>
          <template slot="title">
            <span>工具</span>
          </template>
          <img src="./img/screenshot.png" alt="工具" title="工具" />
        </a-popover>
      </li>
      <li>
        <img src="./img/max.png" alt="放大" title="放大" />
      </li>
      <li>
        <img src="./img/min.png" alt="缩小" title="缩小" />
      </li>
      <li>
        <a-popover placement="leftBottom" arrowPointAtCenter trigger="click">
          <template slot="content">
            <a-list size="small" :dataSource="dataItem">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-row style="width: 100%;">
                  <a-col :span="16">
                    <span>{{item.title}}</span>
                  </a-col>
                  <a-col :span="8">
                    <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                  </a-col>
                </a-row>
              </a-list-item>
            </a-list>
          </template>
          <template slot="title">
            <span>图像</span>
          </template>
          <img src="./img/map.png" alt="图像" title="图像" />
        </a-popover>
      </li>
      <li>
        <a-popover placement="leftBottom" arrowPointAtCenter trigger="click">
          <template slot="content" style="overflow-y: scroll;">
            <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
            <a-directory-tree multiple defaultExpandAll @select="onSelect" @expand="onExpand">
              <a-tree-node title="查看历史数据" key="0-4"></a-tree-node>
              <a-tree-node title="影像对比" key="0-0">
                <a-tree-node title="双球对比" key="0-0-0" isLeaf />
                <a-tree-node title="卷帘对比" key="0-0-1" isLeaf />
              </a-tree-node>
              <a-tree-node title="影像管理" key="0-1">
                <a-tree-node title="手机照片" key="0-1-0" isLeaf />
                <a-tree-node title="无人机照片" key="0-1-1" isLeaf />
                <a-tree-node title="360全景图" key="0-1-2" isLeaf />
              </a-tree-node>
              <a-tree-node title="风险管理" key="0-2">
                <a-tree-node title="风险地图" key="0-2-0" isLeaf />
                <a-tree-node title="水质" key="0-2-1" isLeaf />
                <a-tree-node title="水面漂浮物" key="0-2-2" isLeaf />
                <a-tree-node title="河岸风险源" key="0-2-3" isLeaf />
                <a-tree-node title="水土流失" key="0-2-4" isLeaf />
                <a-tree-node title="水面率" key="0-2-5" isLeaf />
                <a-tree-node title="底泥" key="0-2-6" isLeaf />
                <a-tree-node title="专项调查点" key="0-2-7" isLeaf />
              </a-tree-node>
              <a-tree-node title="其他" key="0-3">
                <a-tree-node title="河道连通性" key="0-3-0" isLeaf />
                <a-tree-node title="水陆分布" key="0-3-1" isLeaf />
              </a-tree-node>
            </a-directory-tree>
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
export default {
  name: 'Supervise',
  components: {
    // 'world-map': WorldMap
    'risk-source-info': RiskSourceInfo
  },
  data() {
    return {
      dataItem: [
        {
          id: 0,
          src: require('../../../public/loading/option2/loading.svg'),
          title: '2D影像图'
        },
        {
          id: 1,
          src: require('../../../public/loading/option2/loading.svg'),
          title: '卫星影像图'
        },
        {
          id: 2,
          src: require('../../../public/loading/option2/loading.svg'),
          title: '道路标注'
        },
        {
          id: 3,
          src: require('../../../public/loading/option2/loading.svg'),
          title: '河道标注'
        }
      ],
      checked: false,
      // 地图对象
      map: {},
      // 地图节点对象（里面含节点对象、区域对象、任务弹窗对象）
      mapPoint: new Map()
    }
  },
  mounted() {
    this.initCruisePlan()
  },
  methods: {
    initCruisePlan() {
      const that = this
      //初始化地图控件
      let zoom = 14
      that.map = new T.Map('map')
      that.map.centerAndZoom(new T.LngLat(121.495505, 31.21098), zoom)
      // this.map.TileLayerOptions({zIndex: 1});

      // 初始化天气插件
      /*        let a = d.getElementById('weather-float-he')
        if (a) {
          a.parentNode.removeChild(a)
        }
        a = d.createElement('div')
        a.id = 'weather-float-he'
        let b = d.getElementsByTagName('body')[0]
        b.appendChild(a);
        let c = d.createElement('link')
        c.rel = 'stylesheet'
        c.href = 'https://apip.weatherdt.com/float/static/css/tqw_widget_float.css?v=0101'
        let s = d.createElement('script')
        s.src = 'https://apip.weatherdt.com/float/static/js/tqw_widget_float.js?v=0101'
        let sn = d.getElementsByTagName('script')[0]
        sn.parentNode.insertBefore(c, sn)
        sn.parentNode.insertBefore(s, sn);*/
    },
    onChange() {},
    hiddenMenuChange(expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
    },
    // 注册事件
    // 注册添加点击事件
    addMapClick() {
      this.removeMapClick()
      this.map.addEventListener('click', this.MapClick)
    },
    // 地图点击事件
    MapClick(e) {
      const postion = []
      const that = this
      let icon = new T.Icon({
        iconUrl: 'http://api.tianditu.gov.cn/img/map/markerA.png',
        iconSize: new T.Point(19, 27),
        iconAnchor: new T.Point(10, 25)
      })
      //向地图上添加自定义标注
      // let marker = new T.Marker(new T.LngLat(postion), {icon: icon});
      let marker = new T.Marker(new T.LngLat(e.lnglat.lng, e.lnglat.lat), { icon: icon })
      this.map.addOverLay(marker)
      //向地图上添加圆
      let circle = new T.Circle(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 1000, {
        color: 'blue',
        weight: 2,
        opacity: 0.5,
        fillColor: '#FFFFFF',
        fillOpacity: 0.5,
        lineStyle: 'solid'
      })
      this.map.addOverLay(circle)

      // 添加文字标注
      let labeName = '专向调查点' + (this.mapPoint.size + 1)
      let label = new T.Label({
        text: `<b style="border-radius: 3px">${labeName}<b>`,
        position: marker.getLngLat(),
        offset: new T.Point(-56, 20)
      })
      this.map.addOverLay(label)

      // 向mapPoint对象添加节点
      let mapPointChild = { marker: marker, circle: circle, label: label }
      this.mapPoint.set(labeName, mapPointChild)

      // 向地图注册标注点击事件
      //移除标注的点击事件，防止多次注册
      removeMarkerClick()
      //注册标注的点击事件
      marker.addEventListener('click', MarkerClick)

      function removeMarkerClick() {
        //移除标注的点击事件
        marker.removeEventListener('click', MarkerClick)
      }

      function MarkerClick(e) {
        console.log('这是标注点击事件' + e)
        console.log(e)
        //设置显示地图的中心点和级别
        // that.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat));
        that.map.centerAndZoom(new T.LngLat(e.lnglat.lng + 0.01, e.lnglat.lat))
      }
    },
    // 地图删除事件
    removeMapClick() {
      this.map.removeEventListener('click', this.MapClick)
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    // 弹窗点击确认事件
    modalClick(v) {
      this[v].click()
    },
    //右侧菜单列表追加任务
    additionalTask(o) {},
    // 打开弹窗
    openPopup(v) {
      this.transferAttribute = this[v]
      this.transferAttribute.visible = true
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
    compass() {
      this.$refs.riskInfo.riskInfo()
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
.weather {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 200px;
  height: 40px;
  z-index: 2500;
}
.menu {
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 40px;
  z-index: 2500;
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
  /* width: calc(100% - 320px); */
  width: 100%;
  height: 100%;
  background: yellow;
  display: inline-block;
  vertical-align: top;
}
.right {
  width: 320px;
  height: 100%;
  background: yellowgreen;
  display: inline-block;
  vertical-align: top;
}
</style>
