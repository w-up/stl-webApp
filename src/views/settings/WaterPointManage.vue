<template>
  <div class="supervise">
    <!-- 任务管理 -->
    <div class="left">
      <div id="map" ref="worldMap" @click="addTaskPoint"></div>
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
      <a-tabs defaultActiveKey="1" @change="callback" v-model="actionTab" class="custom_tabs">
        <a-tab-pane tab="固定监测点" key="1">
          <section class="task_face">
            <a-list
              size="small"
              bordered
              :dataSource="lineTaskList"
              style="margin-top: 10px;"
            >
              <a-list-item
                slot="renderItem"
                slot-scope="item, index"
                :key="index"
                @click="chooseLineTask(item.name)"
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
          </section>
        </a-tab-pane>
        <a-tab-pane tab="人工监测点" key="2" forceRender>
          <section class="task_face">
            <a-list
              size="small"
              bordered
              :dataSource="lineTaskList"
              style="margin-top: 10px;"
            >
              <a-list-item
                slot="renderItem"
                slot-scope="item, index"
                :key="index"
                @click="chooseLineTask(item.name)"
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
          </section>
        </a-tab-pane>
      </a-tabs>
      <a-button
        type="primary"
        block
        class="bottom_add"
        @click="addTask"
      >添加</a-button>
    </div>
    <!-- 添加 -->
    <add-water-point ref="addWaterPoint"></add-water-point>
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

      lineTaskList: [
        {
          id: 0,
          name: '监测点1',
          clicked: true
        },
        {
          id: 1,
          name: '监测点2',
          clicked: false
        },
        {
          id: 2,
          name: '监测点3',
          clicked: false
        }
      ],
      addRiverShow: false,
      addLineShow: false, // 线路任务显示
      addPointShow: false, // 点任务显示
      // 添加线路任务
      checkNick: false,
      form: this.$form.createForm(this),

      defaultRiver: '黄浦江',
      riverList: [
        {
          id: 0,
          name: '黄浦江',
          clicked: true
        },
        {
          id: 1,
          name: '大治河',
          clicked: false
        },
        {
          id: 2,
          name: '川杨河',
          clicked: false
        },
        {
          id: 3,
          name: '蕰藻浜',
          clicked: false
        },
        {
          id: 4,
          name: '龙华港',
          clicked: false
        },
        {
          id: 5,
          name: '太浦河',
          clicked: false
        },
        {
          id: 6,
          name: '太湖',
          clicked: false
        }
      ],

      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],

      // 地图对象
      map: {},
      // 地图节点对象（里面含节点对象、区域对象、任务弹窗对象）
      mapPoint: new Map()
    }
  },
  mounted() {
    this.initCruisePlan()
  },
  watch: {
    checkedKeys(val) {
      console.log('onCheck', val)
    }
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
    // 添加任务点
    addTaskPoint() {
      this.$refs.addTaskPoint.add()
    },
    // tab切换
    callback(key) {
      console.log(key)
    },
    // 树形图
    onSelect(keys) {
      console.log('Trigger Select', keys)
    },
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    // 地图选项
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },

    // 线路任务
    chooseLineTask(index) {
      this.defaultRiver = index
      this.lineTaskList.forEach(value => {
        if (value.name === index) {
          value.clicked = true
        } else {
          value.clicked = false
        }
      })
    },
    // 线路任务删除
    confirmDelete(index) {
      console.log(index)
      this.lineTaskList.splice(this.lineTaskList.findIndex(item => item.name === index), 1)
      this.$message.success('删除成功')
      this.defaultRiver = null
    },
    cancelDelete(e) {
      // this.$message.error('Click on No')
    },
    // 线路任务添加
    check() {
      this.form.validateFields(err => {
        if (!err) {
          console.info('success')
        }
      })
    },
    handleChange(e) {
      this.checkNick = e.target.checked
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true })
      })
    },
    // 添加任务按钮
    addTask() {
      this.$refs.addWaterPoint.add();
    },
    // 关联河道
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
    // 线路任务按钮
    taskCancel() {
      if (this.actionTab == 1) {
        this.addLineShow = false
      } else if (this.actionTab == 2) {
        this.addPointShow = false
      }
    },
    taskSave() {
      if (this.actionTab == 1) {
        this.addLineShow = false
      } else if (this.actionTab == 2) {
        this.addPointShow = false
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
  padding: 10px;
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
