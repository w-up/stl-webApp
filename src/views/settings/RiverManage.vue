<template>
  <div class="supervise">
    <div class="left">
      <div id="map" ref="worldMap">
        <div class="mapAlert">
          <a-row style="width:100%">
            <a-col :span="18">
              <p>请在地图上将河道绘制出来</p>
            </a-col>
            <a-col :span="5" :offset="1">
              <a-button>保存河道</a-button>
            </a-col>
          </a-row>
        </div>
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
      </div>
      <!-- <world-map></world-map> -->
    </div>
    <div class="right">
      <a-select
        showSearch
        :allowClear="true"
        placeholder="请输入河流"
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
          @click.stop="chooseRiver(item.name, item.id)"
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
          <a-button block @click="addDrawRiver()">绘制</a-button>
          <a-button block @click="addUploadRiver" style="margin-top: 10px;">上传KMZ</a-button>
        </template>
        <a-button type="primary" block>添加河道</a-button>
      </a-popover>
    </div>
    <!-- 添加河流 -->
    <add-river ref="addRiver"></add-river>
  </div>
</template>

<script>
// import WorldMap from "../../components/map/WorldMap.vue";
import AddRiver from './modules/AddRiver.vue'

export default {
  name: 'RiverManage',
  components: {
    // 'world-map': WorldMap
    'add-river': AddRiver
  },
  data() {
    return {
      defaultRiver: '黄浦江',
      riverList: [
        {
          id: 0,
          name: '黄浦江',
          clicked: true,
          riverData: [
            {
              lat: 31.21882,
              lng: 121.50364
            },
            {
              lat: 31.21265,
              lng: 121.50227
            },
            {
              lat: 31.20583,
              lng: 121.49703
            },
            {
              lat: 31.19915,
              lng: 121.49197
            },
            {
              lat: 31.19702,
              lng: 121.49591
            },
            {
              lat: 31.2164,
              lng: 121.50759
            },
            {
              lat: 31.21948,
              lng: 121.50759
            }
          ]
        },
        {
          id: 1,
          name: '大治河',
          clicked: false,
          riverData: [
            {
              lat: 31.25153,
              lng: 121.52409
            },
            {
              lat: 31.25355,
              lng: 121.53085
            },
            {
              lat: 31.25858,
              lng: 121.53934
            },
            {
              lat: 31.25535,
              lng: 121.54334
            },
            {
              lat: 31.2499,
              lng: 121.53353
            },
            {
              lat: 31.24786,
              lng: 121.52737
            },
            {
              lat: 31.24682,
              lng: 121.51709
            },
            {
              lat: 31.25111,
              lng: 121.51711
            }
          ]
        },
        {
          id: 2,
          name: '川杨河',
          clicked: false,
          riverData: [
            {
              lat: 31.24539,
              lng: 121.48686
            },
            {
              lat: 31.24616,
              lng: 121.48411
            },
            {
              lat: 31.2466,
              lng: 121.4824
            },
            {
              lat: 31.24612,
              lng: 121.48051
            },
            {
              lat: 31.24484,
              lng: 121.47901
            },
            {
              lat: 31.24462,
              lng: 121.47939
            },
            {
              lat: 31.24543,
              lng: 121.48089
            },
            {
              lat: 31.2459,
              lng: 121.48261
            },
            {
              lat: 31.2448,
              lng: 121.4857
            },
            {
              lat: 31.2444,
              lng: 121.4872
            }
          ]
        },
        {
          id: 3,
          name: '蕰藻浜',
          clicked: false,
          riverData: [
            {
              lat: 31.21717,
              lng: 121.51336
            },
            {
              lat: 31.21691,
              lng: 121.51454
            },
            {
              lat: 31.21768,
              lng: 121.51566
            },
            {
              lat: 31.21768,
              lng: 121.51763
            },
            {
              lat: 31.21733,
              lng: 121.51748
            },
            {
              lat: 31.21739,
              lng: 121.51568
            },
            {
              lat: 31.21664,
              lng: 121.51456
            },
            {
              lat: 31.21669,
              lng: 121.51387
            },
            {
              lat: 31.21699,
              lng: 121.51323
            }
          ]
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
      addRiverShow: false,
      // 地图对象
      map: {},
      polylineHandler: '',
      polygonTool: '', // 创建标注工具对象
      polygon: '', // 多边形对象
      points: []
    }
  },
  mounted() {
    this.initCruisePlan()
    this.drawAllRiver()
  },
  methods: {
    initCruisePlan() {
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
        if (item.riverData !== undefined) {
          this.setPolylineFn(item.riverData, 'blue', 3, 0)
          this.polygon.addEventListener('click', this.polygonClick)
          // 文字标注
          let latArr=[], lngArr=[];
          for (const itemPoint of item.riverData) {
            latArr.push(Number(itemPoint.lat))
            lngArr.push(Number(itemPoint.lng))
          }
          let lat = (Math.max(...latArr) + Math.min(...latArr)) / 2
          let lng = (Math.max(...lngArr) + Math.min(...lngArr)) / 2
          let latlngobj = { lat: lat, lng: lng }
          let label = new T.Label({
            text: `<b>${item.name}<b>`,
            position: latlngobj,
            offset: new T.Point(-40, 0)
          })
          this.map.addOverLay(label)
          label.setLngLat(latlngobj)
          this.map.addEventListener("zoomend", this.zoomChange)
        }
      }
    },
    zoomChange() {
      console.log(this.map.getZoom());
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
      this.riverList.forEach(value => {
        if (value.name === index) {
          value.clicked = true
          if (value.riverData !== undefined) {
            this.drawAllRiver()
            this.setBounds(value.riverData)
            // this.map.zoomOut()
            this.map.addEventListener("zoomend", this.zoomChange)
          }
        } else {
          value.clicked = false
        }
      })
    },
    setBounds(lineArr) {
      this.map.setViewport(lineArr)
      this.setPolylineFn(lineArr, 'red', 3, 0)
      this.polygon.addEventListener('click', this.polygonClick)
    },
    // 河流删除
    confirmDelete(index) {
      console.log(index)
      this.riverList.splice(this.riverList.findIndex(item => item.name === index), 1)
      this.$message.success('删除成功')
      this.drawAllRiver()
      this.defaultRiver = null
    },
    cancelDelete(e) {
      // this.$message.error('Click on No')
    },
    // 绘制按钮
    addDrawRiver() {
      //创建标注工具对象
      this.polygonTool = new T.PolygonTool(this.map, {
        showLabel: true,
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        fillColor: '#FFFFFF',
        fillOpacity: 0.3
      })
      if (this.polylineHandler) this.polylineHandler.close()
      this.polylineHandler = new T.PolylineTool(this.map)
      this.polylineHandler.open()
      this.polylineHandler.setTips(`<p style="padding:0px;margin:-3px 0 0;">双击完成绘制</p>`)
      this.$notification.warning({
        message: '提示',
        description: '请在地图上将河道绘制出来'
      })
      this.addRiverShow = false
      this.polylineHandler.addEventListener('draw', this.addDrawRivered)
      this.polylineHandler.addEventListener('addpoint', this.addDrawRivering)
    },
    addDrawRivering(e) {
      console.log(e)
      // var latlng = e.currentLnglats[e.currentLnglats.lenght-1]
      // var label = new T.Label({
      //    text: "zuobiao",
      //   // text: `<span>${e.currentLnglats[e.currentLnglats.lenght-1].lng}, ${e.currentLnglats[e.currentLnglats.lenght-1].lat}</span>`,
      //   position: latlng,
      //   offset: new T.Point(-9, 0)
      // })
      // //创建地图文本对象
      // this.map.addOverLay(label)
    },
    // 绘制完成
    addDrawRivered(e) {
      console.log(e)
      console.log(e.currentLnglats)
      //创建面对象
      // this.map.clearOverLays() //将之前绘制的清除
      this.polylineHandler.clear() //清除之前绘制的多边形
      this.setPolylineFn(e.currentLnglats, 'blue', 3, 0)
      console.log(e.currentPolyline.Qr.lat)
      let lat = (e.currentPolyline.Qr.Lq.lat + e.currentPolyline.Qr.kq.lat) / 2
      let lng = (e.currentPolyline.Qr.Lq.lng + e.currentPolyline.Qr.kq.lng) / 2
      let latlngobj = { lat: lat, lng: lng }
      // 文字标注
      let label = new T.Label({
        text: '<b>文字标注!!!<b>',
        position: latlngobj,
        offset: new T.Point(-40, -30)
      })
      this.map.addOverLay(label)
      label.setLngLat(latlngobj)

      this.$refs.addRiver.add()
    },
    // 设置绘制的多边形
    setPolylineFn(lineData, color, weight, fillOpacity) {
      this.polygon = new T.Polygon(lineData, {
        color: color, //线颜色
        weight: weight, //线宽
        opacity: 0.5, //透明度
        fillColor: '#FFFFFF', //填充颜色
        fillOpacity: fillOpacity // 填充透明度
      })
      //向地图上添加面
      this.map.addOverLay(this.polygon)
    },
    // 多边形点击事件
    polygonClick(index) {
      console.log(index.target.Qr)
      console.log(index.target.Qr.Lq)
      console.log(index.target.Qr.kq)
    },
    // 多边形鼠标进入事件
    polygonMouseover(riverItem) {
      console.log(riverItem.name)
    },
    // 多边形离开事件
    polygonMouseout(riverItem) {
      console.log(riverItem.name)
    },
    // 上传按钮
    addUploadRiver() {
      console.log('123')
      console.log(currentDistance)
      console.log(allPolylines)
      this.$refs.addRiver.add()
      this.addRiverShow = false
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
  position: relative;
}
.mapChange {
  position: absolute;
  right: 10px;
  bottom: 10px;
  text-align: right;
  width: 120px;
  z-index: 1500;
}
.mapAlert {
  position: absolute;
  display: none;
  left: 10px;
  bottom: 10px;
  width: 300px;
  height: 40px;
  z-index: 1500;
  p {
    width: 100%;
    text-align: center;
    font-size: 14px;
    line-height: 32px;
    height: 100%;
    background: #1890ff;
    color: white;
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
