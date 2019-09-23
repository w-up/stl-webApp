<template>
  <div style="width:100%; height:100%;">
    <div id="map" ref="worldMap" @click.right="rightMenu"></div>
    <!-- 鼠标右键 -->
    <div
      class="map_right"
      v-show="menuModal"
      v-clickoutside="menuOutside"
      v-bind:style="{ top: activeTop + 'px', left: activeLeft + 'px' }"
    >
      <a-list size="small" bordered :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item">{{item}}</a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorldMap',
  components: {},
  data() {
    return {
      menuModal: false,
      activeTop: 0,
      activeLeft: 0,
      data: [
        '查看历史数据',
        '手机影像',
        '全景图',
        '风险管理',
        '影像对比'
      ],

      // 地图对象
      map: {},
      // 地图节点对象（里面含节点对象、区域对象、任务弹窗对象）
      mapPoint: new Map()
    }
  },
  // directives: { clickoutside }, //自定义指令点击空白右键消失
  mounted() {
    this.initCruisePlan()
  },
  methods: {
    // 右键时间
    rightMenu() {
      // 右键弹出菜单
      this.menuModal = true;
      let totalWidth = this.$refs.worldMap.getBoundingClientRect().width; //总宽度
      let totalHeight = this.$refs.worldMap.getBoundingClientRect().height; //页面总高度
      if (totalWidth - event.pageX < 150) {
        //边缘检测
        if (totalHeight - event.pageY < 130) {
          this.activeLeft = event.pageX - 150; //给left赋值
          this.activeTop = totalHeight - 130; //给top赋值
        } else {
          this.activeLeft = event.pageX - 150; //给left赋值
          this.activeTop = event.pageY; //给top赋值
        }
      } else {
        if (totalHeight - event.pageY < 130) {
          this.activeLeft = event.pageX; //给left赋值
          this.activeTop = totalHeight - 130; //给top赋值
        } else {
          this.activeLeft = event.pageX; //给left赋值
          this.activeTop = event.pageY; //给top赋值
        }
      }
    },
    menuOutside() {
      this.menuModal = false;
    },
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
    }
  },
  watch: {
    /*transferAttribute: (n,o)=>{
          console.log(n);
      }*/
  }
}
</script>

<style scoped>
.map_right {
  position: fixed;
  z-index: 2500;
  width: 150px;
  background: white;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
}
.ant-list-item:hover {
  background-color: aliceblue;
  cursor: pointer;
}

#map {
  width: 100%;
  height: 100%;
}
</style>