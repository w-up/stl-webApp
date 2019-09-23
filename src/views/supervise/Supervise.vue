<template>
  <div class="supervise">
    <div id="map" ref="worldMap"></div>
    <!-- <div class="left">
      <world-map></world-map>
    </div>-->
    <!-- <div class="right">456546</div> -->
    <div class="menu">
      <a-list size="small" bordered :dataSource="dataItem">
        <a-list-item slot="renderItem" slot-scope="item" @click="menuFun(item.title)">
          <a-popover placement="leftBottom" arrowPointAtCenter trigger="click">
            <template slot="content">
              <p>Content</p>
              <p>Content</p>
            </template>
            <template slot="title">
              <span>Title</span>
            </template>
            <img :src="item.src" :alt="item.title" :title="item.title" />
          </a-popover>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
// import WorldMap from "../../components/map/WorldMap.vue";
export default {
  name: 'Supervise',
  components: {
    // 'world-map': WorldMap
  },
  data() {
    return {
      dataItem: [
        {
          id: 0,
          src: require('../../../public/loading/option2/loading.svg'),
          title: '指北针'
        },
        {
          id: 1,
          src: require('../../../public/loading/option2/loading.svg'),
          title: '复位'
        },
        {
          id: 2,
          src: require('../../../public/loading/option2/loading.svg'),
          title: '工具'
        },
        {
          id: 3,
          src: require('../../../public/loading/option2/loading.svg'),
          title: '放大'
        },
        {
          id: 4,
          src: require('../../../public/loading/option2/loading.svg'),
          title: '缩小'
        },
        {
          id: 5,
          src: require('../../../public/loading/option2/loading.svg'),
          title: '图像'
        },
        {
          id: 6,
          src: require('../../../public/loading/option2/loading.svg'),
          title: '更多'
        }
      ],
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
    menuFun(index) {
      this.dataItem.forEach((value, i) => {
        if (index === value.title) {
          console.log(i)
          if (i == 0) {
          } else if (i == 1) {
          } else if (i == 2) {
          } else if (i == 3) {
          } else if (i == 4) {
          } else if (i == 5) {
          } else if (i == 6) {
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.supervise {
  position: relative;
  height: calc(100vh - 64px);
  width: 100vw;
}
#map {
  width: 100%;
  height: 100%;
}
.menu {
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 40px;
  z-index: 2500;
  background: white;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
}

.ant-list-bordered.ant-list-sm .ant-list-item {
  padding: 0;
}
.ant-list-item img {
  width: 40px;
  height: 40px;
  padding: 5px;
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
