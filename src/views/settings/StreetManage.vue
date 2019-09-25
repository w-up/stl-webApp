<template>
  <div class="supervise">
    <div class="left">
      <div id="map" ref="worldMap"></div>
      <!-- <world-map></world-map> -->
    </div>
    <div class="right">
      <a-select
        showSearch
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
          @click="chooseRiver(item.name)"
          :class="{active_item: item.clicked}"
        >
          <a-row style="width:100%">
            <a-col :span="20">{{item.name}}</a-col>
            <a-col :span="4" style="text-align:right;">
              <a-popconfirm
                title="确定要删除吗?"
                @confirm="confirmDelete(item.name)"
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
          <a-button block @click="addUploadRiver" style="margin-top: 10px;">上传KMZ</a-button>
        </template>
        <a-button type="primary" block>添加街道</a-button>
      </a-popover>
    </div>
    <div class="weather">
      <!-- <img src="./img/weather.jpg" alt /> -->
    </div>
    <ul class="menu">
      <li>
        <!-- <img src="./img/compass.png" alt="指北针" title="指北针" /> -->
      </li>
    </ul>
    <!-- 添加街道 -->
    <add-street ref="addStreet"></add-street>
  </div>
</template>

<script>
// import WorldMap from "../../components/map/WorldMap.vue";
import AddStreet from './modules/AddStreet.vue'
export default {
  name: 'StreetManage',
  components: {
    // 'world-map': WorldMap
    'add-street': AddStreet
  },
  data() {
    return {
      defaultRiver: '南京东路',
      riverList: [
        {
          id: 0,
          name: '南京东路',
          clicked: true
        },
        {
          id: 1,
          name: '南京西路',
          clicked: false
        },
        {
          id: 2,
          name: '北京东路',
          clicked: false
        },
        {
          id: 3,
          name: '北京西路',
          clicked: false
        },
        {
          id: 4,
          name: '南京路步行街',
          clicked: false
        },
        {
          id: 5,
          name: '浙江南路',
          clicked: false
        },
        {
          id: 6,
          name: '浙江北路',
          clicked: false
        }
      ],
      addRiverShow: false,
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
    // 选中街道
    chooseRiver(index) {
      this.defaultRiver = index
      this.riverList.forEach(value => {
        if (value.name === index) {
          value.clicked = true
        } else {
          value.clicked = false
        }
      })
    },
    // 街道删除
    confirmDelete(index) {
      console.log(index)
      this.riverList.splice(this.riverList.findIndex(item => item.name === index), 1)
      this.$message.success('删除成功')
      this.defaultRiver = null
    },
    cancelDelete(e) {
      // this.$message.error('Click on No')
    },
    // 绘制按钮
    addDrawRiver() {
      this.$refs.addStreet.add();
      this.addRiverShow = false;
    },
    // 上传按钮
    addUploadRiver() {
      this.$refs.addStreet.add();
      this.addRiverShow = false;
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
  width: calc(100% - 320px);
  height: 100%;
  display: inline-block;
  vertical-align: top;
}
.right {
  position: relative;
  width: 320px;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  padding: 10px;
  background-color: white;
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
