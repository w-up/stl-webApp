<template>
  <div class="supervise">
    <!-- 任务管理 -->
    <div class="left">
      <div id="map" ref="worldMap"></div>
      <!-- <world-map></world-map> -->
      <div class="mapChange">
        <a-row style="width:100%">
          <a-col :span="24">
            <a-checkbox @change="mapChooseItem">水质监测点</a-checkbox>
          </a-col>
          <a-col :span="24">
            <a-checkbox @change="mapChooseItem">风险源</a-checkbox>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="right">
      <h3 style="font-size: 16px; font-weight: 600; margin:10px 0 0 10px; text-align:center;">任务管理</h3>
      <a-divider style="margin: 10px 0 0;" />
      <div style="padding: 0 10px">
        <a-tabs defaultActiveKey="1" @change="callback" v-model="actionTab" class="custom_tabs">
          <a-tab-pane tab="线路任务" key="1">
            <section class="task_face">
              <a-list
                size="small"
                bordered
                :dataSource="lineTaskList"
                style="margin-top: 10px;"
                v-show="!addLineShow"
              >
                <a-list-item
                  slot="renderItem"
                  slot-scope="item, index"
                  :key="index"
                  @click="chooseLineTask(item.id)"
                  :class="{active_item: item.clicked}"
                >
                  <a-row style="width:100%">
                    <a-col :span="20">{{item.name}}</a-col>
                    <a-col :span="4" style="text-align:right;">
                      <a-popconfirm
                        title="确定要删除吗?"
                        @confirm="confirmLineDelete(item.id)"
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
              <a-form v-show="addLineShow" style="width: 100%;">
                <a-form-item
                  label="任务名称"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input placeholder="请输入任务名称" v-model="lineList.title" />
                </a-form-item>
                <a-form-item
                  label="任务内容"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input placeholder="请输入任务内容" v-model="lineList.content" />
                </a-form-item>
                <a-form-item
                  label="月计划次数"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input placeholder="请输入月计划次数" v-model="lineList.times" />
                </a-form-item>
                <a-form-item
                  label="涉及线路"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :data="lineList"
                    name="kmz"
                    :headers="headers"
                    action="/server/data/admin/task/save"
                    :on-preview="handlePreview"
                    :on-success="handleSuccess"
                    :on-change="uploadChange"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    accept=".kmz, .kml"
                    :limit="1"
                    :auto-upload="false"
                  >
                    <a-button type="primary" icon="upload">上传KMZ文件</a-button>
                  </el-upload>
                </a-form-item>
                <a-form-item
                  label="高度(m)"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input placeholder="请输入高度" v-model="lineList.altitude" />
                </a-form-item>
                <a-form-item
                  label="长度(m)"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input placeholder="请输入长度" v-model="lineList.length" />
                </a-form-item>
                <a-form-item
                  label="时长(min)"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input placeholder="请输入时长" v-model="lineList.duration" />
                </a-form-item>
                <a-form-item
                  label="速度(km/h)"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input placeholder="请输入速度" v-model="lineList.velocity" />
                </a-form-item>
                <a-form-item
                  label="任务模板"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-select style="width: 100%" v-model="lineList.template">
                    <a-select-option value="uav">无人机</a-select-option>
                    <a-select-option value="manual">人工调查</a-select-option>
                    <a-select-option value="water">水质调查</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  label="关联河道"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-select
                    showSearch
                    mode="multiple"
                    :allowClear="true"
                    placeholder="请输入河流添加"
                    optionFilterProp="children"
                    style="width: 100%"
                    @change="handleChange"
                    :filterOption="filterOption"
                    v-model="riverId"
                  >
                    <a-select-option
                      :value="item.id"
                      v-for="(item, index) in riverList"
                      :key="index"
                    >{{item.name}}</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  label="人员配置"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <el-checkbox-group v-model="roleId">
                    <div v-for="(city, index)  in personnelList" :key="index" style>
                      <el-checkbox :label="city.id" style="width: 100px;">{{city.name}}</el-checkbox>
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        v-model="city.num"
                        style="width: 70px;margin-left:5px"
                      />
                    </div>
                  </el-checkbox-group>
                </a-form-item>
                <a-form-item
                  label="设备配置"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                ></a-form-item>
                <a-collapse size="small" style="margin-top:10px;" :bordered="false">
                  <a-collapse-panel :style="customStyle" v-for=" item in equipmentList" :key="item.id">
                    <template slot="header"> {{item.name}}</template>
                    <a-collapse size="small" style="margin-top:10px;" :bordered="false">
                      <a-collapse-panel :style="customStyle" v-for=" option in item.children" :key="option.id">
                        <template slot="header"> {{option.name}}</template>
                        <a-checkbox-group  style="display:flex;flex-wrap:wrap;" v-model="deviceTypeId">
                          <a-row style="width:100%" v-for="index in option.children" :key="index.id">
                            <a-col :span="12" offset="4" style="height:30px;">
                              <a-checkbox :value="index.id" @change="peopleChoose">{{index.name}}</a-checkbox>
                            </a-col>
                            <a-col :span="8" style="height:30px;text-align:right;">
                              <a-input-number
                                size="small"
                                :min="1"
                                :max="100000"
                                :defaultValue="1"
                                @change="peopleNum"
                                v-model="index.num"
                                style="width: 70px;"
                              />
                            </a-col>
                          </a-row>
                        </a-checkbox-group>
                      </a-collapse-panel>
                    </a-collapse>
                  </a-collapse-panel>
                </a-collapse>
                <a-form-item
                  label="备注"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input placeholder="请输入备注" v-model="lineList.remark" />
                </a-form-item>
                <a-form-item
                  label="人员职责"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input placeholder="请输入人员职责" v-model="lineList.duty" />
                </a-form-item>
              </a-form>
            </section>
          </a-tab-pane>
          <a-tab-pane tab="点任务" key="2" forceRender>
            <section class="task_face">
              <a-collapse defaultActiveKey="1" accordion style="margin-top:10px;">
                <!-- -->
                <a-collapse-panel
                  v-show="!addPointShow"
                  v-for="item in pointTaskList"
                  :key="item.id"
                  :style="customStyle"
                  class="custom_list"
                >
                  <template slot="header">
                    <a-row style="width:100%">
                      <a-col :span="9">{{item.name}}</a-col>
                      <a-col :span="14" style="text-align:right;" :pull="1">
                        <a-button
                          size="small"
                          type="primary"
                          style="margin-right:10px;"
                          @click="choosePointEdit(item.id)"
                        >编辑</a-button>
                        <a-button size="small" type="primary" @click="chooseTask(item.id)">添加点</a-button>
                      </a-col>
                    </a-row>
                  </template>
                  <a-list
                    size="small"
                    :bordered="false"
                    :dataSource="item.pointList"
                    v-show="!addLineShow"
                  >
                    <a-list-item
                      slot="renderItem"
                      slot-scope="point, index"
                      :key="index"
                      @click="choosePointTask(item.id, point.name)"
                      :class="{active_item: point.clicked}"
                      style="padding: 10px 16px;"
                    >
                      <a-row style="width:100%">
                        <a-col :span="17">{{point.name}}</a-col>
                        <a-col :span="6" style="text-align:right;">
                          <a-popconfirm
                            title="确定要删除吗?"
                            @confirm="confirmPiontDelete(point.id, point.name)"
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
                </a-collapse-panel>
              </a-collapse>
              <a-form v-show="addPointShow" style="width: 100%;">
                <a-form-item
                  label="任务名称"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input placeholder="请输入任务名称" v-model="spotList.title" />
                </a-form-item>
                <a-form-item
                  label="任务内容"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-textarea :autosize="{ minRows: 2, maxRows: 6 }" v-model="spotList.content" />
                </a-form-item>
                <a-form-item
                  label="任务高度"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input placeholder="请输入任务高度" v-model="spotList.altitude" />
                </a-form-item>
                <a-form-item
                  label="任务时长(min)"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input placeholder="请输入任务时长" v-model="spotList.duration" />
                </a-form-item>
                <a-form-item
                  label="备注"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-textarea
                    placeholder="请输入备注信息"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    v-model="spotList.remark"
                  />
                </a-form-item>
                <a-form-item
                  label="任务职责"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-input placeholder="请输入任务职责" v-model="spotList.duty" />
                </a-form-item>
                <a-form-item
                  label="任务模板"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <a-select placeholder="请选择" style="width: 100%" v-model="spotList.template">
                    <a-select-option value="uav">无人机</a-select-option>
                    <a-select-option value="manual">人工调查</a-select-option>
                    <a-select-option value="water">水质调查</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  label="任务图标"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <div style="display:flex">
                    <viewer>
                      <img :src="attachmentJpg" alt style="height:30px;margin-right:10px" />
                    </viewer>
                    <el-upload
                      class="upload-demo"
                      ref="upload1"
                      :data="spotList"
                      name="kmz"
                      :headers="headers"
                      action="/server/data/admin/task/save"
                      :on-preview="handlePreview"
                      :on-success="handleSuccess1"
                      :on-change="uploadChange1"
                      :show-file-list="false"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      :limit="1"
                      :auto-upload="false"
                    >
                      <a-button type="primary" icon="upload">上传</a-button>
                    </el-upload>
                  </div>
                </a-form-item>
                <a-form-item
                  label="人员配置"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                >
                  <el-checkbox-group v-model="spotList.roleId">
                    <div v-for="(city, index)  in personnelList" :key="index" style>
                      <el-checkbox :label="city.id" style="width: 100px;">{{city.name}}</el-checkbox>
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        v-model="city.num"
                        style="width: 50px;margin-left:5px"
                      />
                    </div>
                  </el-checkbox-group>
                </a-form-item>
                <a-form-item
                  label="设备配置"
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                ></a-form-item>
                <a-collapse size="small" style="margin-top:10px;" :bordered="false">
                  <a-collapse-panel :style="customStyle" v-for=" item in equipmentList" :key="item.id">
                    <template slot="header"> {{item.name}}</template>
                    <a-collapse size="small" style="margin-top:10px;" :bordered="false">
                      <a-collapse-panel :style="customStyle" v-for=" option in item.children" :key="option.id">
                        <template slot="header"> {{option.name}}</template>
                        <a-checkbox-group  style="display:flex;flex-wrap:wrap;" v-model="deviceTypeId">
                          <a-row style="width:100%" v-for="index in option.children" :key="index.id">
                            <a-col :span="12" offset="4" style="height:30px;">
                              <a-checkbox :value="index.id" @change="peopleChoose">{{index.name}}</a-checkbox>
                            </a-col>
                            <a-col :span="8" style="height:30px;text-align:right;">
                              <a-input-number
                                size="small"
                                :min="1"
                                :max="100000"
                                :defaultValue="1"
                                @change="peopleNum"
                                v-model="index.num"
                                style="width: 70px;"
                              />
                            </a-col>
                          </a-row>
                        </a-checkbox-group>
                      </a-collapse-panel>
                    </a-collapse>
                  </a-collapse-panel>
                </a-collapse>
              </a-form>
            </section>
          </a-tab-pane>
        </a-tabs>
        <a-button
          type="primary"
          block
          class="bottom_add"
          @click="addTask"
          v-show="(actionTab==1 && !addLineShow) || (actionTab==2 && !addPointShow)"
        >{{actionTab==1?"添加线路任务":"添加点任务"}}</a-button>
        <!-- 线路任务按钮 -->
        <a-row
          v-show="(actionTab==1 && addLineShow) || (actionTab==2 && addPointShow)"
          style="width:100%;"
          class="bottom_add"
          type="flex"
          justify="space-around"
          align="middle"
        >
          <a-col :span="6">
            <a-button type="primary" block @click="taskCancel">取消</a-button>
          </a-col>
          <a-col :span="6">
            <a-popconfirm
              title="确定要删除吗?"
              @confirm="spotDel()"
              @cancel="cancelDelete"
              okText="确定"
              cancelText="取消"
            >
              <a-button type="primary" block>删除</a-button>
            </a-popconfirm>
          </a-col>
          <a-col :span="6">
            <a-button type="primary" block @click="taskSave">保存</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
    <!-- 鼠标跟随弹窗 -->
    <div
      class="mouse_alert"
      v-show="alertShow"
      :style="{left: alertLeft + 'px', top: alertTop + 'px'}"
    >
      <span>{{defaultLineTask}}</span>
    </div>
    <!-- 添加河流 -->
    <add-task-point ref="addTaskPoint"></add-task-point>
  </div>
</template>

<script>
// import WorldMap from "../../components/map/WorldMap.vue";
import Vue from 'vue'
import AddTaskPoint from './modules/AddTaskPoint.vue'
import { setUserProjection } from 'ol/proj'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import {
  taskList,
  getTaskSave,
  roleList,
  getTaskDetail,
  getRiverList,
  taskSpotPage,
  taskPointDel,
  taskRemove,
  structDeviceList
} from '@/api/login'
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const formTailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
export default {
  name: 'TaskManage',
  components: {
    // 'world-map': WorldMap
    'add-task-point': AddTaskPoint
  },
  data() {
    return {
      attachmentJpg: '', //图片
      alertLeft: -1000,
      alertTop: -1000,
      taskId: '',
      alertShow: false,
      fileList: [], //上传列表
      personnelList: [], //人员列表
      equipmentList:[],//设备列表
      //线任务数据
      lineList: {
        id: '',
        projectId: this.$store.state.id,
        type: 'line',
        title: '',
        content: '',
        altitude: '',
        duration: '',
        length: '',
        velocity: '',
        remark: '',
        times: '',
        duty: '',
        template: '',
        roleId: '',
        roleNum: '',
        deviceId: '',
        deviceNum:'',
        deviceTypeId:'',
        deviceNum: '',
        riverId: ''
      },
      roleId: [], //分配人员角色
      deviceTypeId: [], //任务分配设备
      deviceId: [], //分配设备
      riverId: [], //关联河道
      spotList: {
        //点任务数据
        title: '',
        id: '',
        projectId: this.$store.state.id,
        type: 'dot',
        content: '',
        altitude: '',
        duration: '',
        remark: '',
        duty: '',
        template: '',
        roleId: [],
        deviceNum:'',
        roleNum: ''
      },
      headers: {
        Authorization: '',
        'X-TENANT-ID': 'jl:jlgis@2019'
      },
      addRiverShow: false, // 气泡卡片
      actionTab: '1', //tab
      defaultLineTask: '无人机正射影像',
      lineTaskList: [
        // {
        //   id: 0,
        //   name: '无人机正射影像',
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
        //   id: 1,
        //   name: '无人机倾斜影像',
        //   clicked: false,
        //   lineData: [
        //     { lat: 31.20752, lng: 121.51531 },
        //     { lat: 31.20186, lng: 121.50759 },
        //     { lat: 31.19944, lng: 121.52106 },
        //     { lat: 31.19944, lng: 121.53106 }
        //   ]
        // },
        // {
        //   id: 2,
        //   name: '无人机人工拍照',
        //   clicked: false,
        //   lineData: [
        //     { lat: 31.21564, lng: 121.42895 },
        //     { lat: 31.22873, lng: 121.47788 },
        //     { lat: 31.26706, lng: 121.47677 }
        //   ]
        // }
      ],
      addRiverShow: false,
      addLineShow: false, // 线路任务显示
      addPointShow: false, // 点任务显示
      // 添加线路任务
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),

      defaultRiver: '黄浦江',
      riverList: [
        // {
        //   id: 0,
        //   name: '黄浦江',
        //   clicked: true
        // },
        // {
        //   id: 1,
        //   name: '大治河',
        //   clicked: false
        // },
        // {
        //   id: 2,
        //   name: '川杨河',
        //   clicked: false
        // },
        // {
        //   id: 3,
        //   name: '蕰藻浜',
        //   clicked: false
        // },
        // {
        //   id: 4,
        //   name: '龙华港',
        //   clicked: false
        // },
        // {
        //   id: 5,
        //   name: '太浦河',
        //   clicked: false
        // },
        // {
        //   id: 6,
        //   name: '太湖',
        //   clicked: false
        // }
      ],
      customStyle: 'background: #fff;margin: 0;overflow: hidden', // 折叠面板样式
      pointTaskList: [
        //任务点
        // {
        //   id: 0,
        //   name: '360',
        //   pointList: [
        //     { id: 0, name: '坐标点1', clicked: false, latlng: { lat: 31.21493, lng: 121.49566 } },
        //     { id: 1, name: '坐标点2', clicked: false, latlng: { lat: 31.22344, lng: 121.47892 } },
        //     { id: 2, name: '坐标点3', clicked: false, latlng: { lat: 31.20649, lng: 121.47712 } }
        //   ]
        // },
        // {
        //   id: 1,
        //   name: '人工调查点',
        //   pointList: [
        //     { id: 0, name: '调查点1', clicked: false, latlng: { lat: 31.20752, lng: 121.51531 } },
        //     { id: 1, name: '调查点2', clicked: false, latlng: { lat: 31.20186, lng: 121.50759 } },
        //     { id: 2, name: '调查点3', clicked: false, latlng: { lat: 31.19944, lng: 121.52106 } }
        //   ]
        // }
      ],

      // 地图对象
      map: {},
      once: 0 // 移入次数
    }
  },
  mounted() {
    this.initMap()
    this.getLineList()
    this.getRoleList()
    this.riverListGet()
    this.getStructDeviceList()
    this.headers.Authorization = Vue.ls.get(ACCESS_TOKEN)
  },
  watch: {
    checkedKeys(val) {
      console.log('onCheck', val)
    }
  },
  methods: {
    //点线列表
    getList() {
      var data = {
        type:'dot',
        id:this.$store.state.id
      }
      taskList(data).then(res => {
          var arr = res.data.data
          arr.forEach(v => {
            v.name = v.title
            v.pointList = []
            this.gettTaskPointList(v.id)
          })
          this.pointTaskList = arr
        })
        .catch(err => {})
    },
    getLineList() {
      var data = {
        type:'line',
        id:this.$store.state.id
      }
      taskList(data).then(res => {
          var arr = res.data.data
          arr.forEach(v => {
            v.clicked = false
            v.name = v.title
            v.lineData = v.coordinate
          })
          this.lineTaskList = arr
          this.drawAllLine()
        })
        .catch(err => {})
    },
    //人员配置列表
    getRoleList() {
      roleList('worker')
        .then(res => {
          var arr = res.data.data
          this.personnelList = arr
        })
        .catch(err => {})
    },
    getStructDeviceList(){
      structDeviceList().then(res=>{
        var arr = res.data
        this.equipmentList = arr
      })
    },
    //任务点列表
    gettTaskPointList(key) {
      if (key != undefined) {
        taskSpotPage(key)
          .then(res => {
            var arr = res.data.data
            for (let a = 0; a < arr.length; a++) {
              // arr[a].latlng = {
              //   lat: '',
              //   lng: ''
              // }
              arr[a].clicked = false
              arr[a].latlng= arr[a].coordinate
              // arr[a].latlng.lng = arr[a].coordinate[0]
            }
            for (let i = 0; i < this.pointTaskList.length; i++) {
              if (this.pointTaskList[i].id == key) {
                this.pointTaskList[i].pointList = arr
              }
            }
            this.allPointTask()
          })
          .catch(err => {
            this.$message.error('失败请重试')
          })
      }
    },
    //河道列表
    riverListGet() {
      getRiverList(this.$store.state.id)
        .then(res => {
          var arr = res.data.data
          this.riverList = arr
        })
        .catch(err => {})
    },
    initMap() {
      //初始化地图控件
      let zoom = 14
      this.map = new T.Map('map')
      this.map.centerAndZoom(new T.LngLat(121.495505, 31.21098), zoom)
      this.markerTool = new T.MarkTool(this.map, { follow: true })
      this.drawAllLine()
    },
    // 添加所有的线
    drawAllLine() {
      this.map.clearOverLays()
      for (const item of this.lineTaskList) {
        if (item.clicked == true) {
          this.drawLine(item.lineData, 'red', 3, 0.5, item.id, item.name)
        } else {
          this.drawLine(item.lineData, 'blue', 3, 0.5, item.id, item.name)
        }
      }
    },
    // 线路任务
    chooseLineTask(index) {
      this.defaultLineTask = index
      console.log(index)

      for (const item of this.lineTaskList) {
        if (item.id === index) {
          item.clicked = true
          this.map.setViewport(item.lineData)
        } else {
          item.clicked = false
        }
      }
      this.drawAllLine()
    },
    // 绘制线
    drawLine(points, color, weight, opacity, id, name) {
      let line = new T.Polyline(points, {
        color: color, //线颜色
        weight: weight, //线宽
        opacity: opacity, //透明度
        id: id,
        name: name
      })
      //向地图上添加线
      this.map.addOverLay(line)
      line.addEventListener('click', this.taskLineClick)
      line.addEventListener('mouseover', this.taskLineMouseover)
      line.addEventListener('mousemove', this.taskLineMousemove)
      line.addEventListener('mouseout	', this.taskLineMouseout)
    },
    // 线路任务删除
    confirmLineDelete(id) {
      taskRemove(id)
        .then(res => {
          this.$message.success('保存成功')
          this.getLineList()
        })
        .catch(err => {
          this.$message.error(err.response.data.message)
        })
      this.defaultLineTask = null
    },
    //点任务删除
    spotDel() {
      if (this.spotList.id == '') {
        this.$message.error('请先保存任务')
      } else {
        taskRemove(this.spotList.id)
          .then(res => {
            this.$message.success('删除成功')
            this.taskCancel()
            this.getList()
          })
          .catch(err => {
            this.$message.error(err.response.data.message)
          })
      }
    },
    cancelDelete(e) {
      // this.$message.error('Click on No')
    },
    // 线点击事件
    taskLineClick(item) {
      console.log(item.target.options.id);
      getTaskDetail(item.target.options.id).then(res => {
          var arr = res.data
          this.lineList.title = arr.info.title
          this.lineList.id = arr.info.id
          this.lineList.content = arr.info.content
          this.lineList.altitude = arr.info.altitude
          this.lineList.duration = arr.info.duration
          this.lineList.remark = arr.info.remark
          this.lineList.duty = arr.info.duty
          this.lineList.template = arr.info.template.code
          // this.attachmentJpg = arr.info.kmz
          this.lineList.times = arr.info.times
          this.lineList.length = arr.info.length
          this.lineList.velocity = arr.info.velocity
          var sz = []
          var zs= []
          var aa =[]
          for(const item of arr.line.rivers){
            aa.push(item.id)
          }
          this.riverId =aa
          for (let i = 0; i < arr.staff.length; i++) {
            sz.push(arr.staff[i].role.id)
            for (let a = 0; a < this.personnelList.length; a++) {
              if (arr.staff[i].role.id == this.personnelList[a].id) {
                this.personnelList[a].num = arr.staff[i].amount
                break
              }
            }
          }
          this.roleId = sz
          for(const item of arr.device){
            zs.push(item.device.id)
            for(const d of this.equipmentList){
              for (const cc of d.children) {
                for (const aa of cc.children) {
                  if (item.device.id == aa.id) {
                    aa.num = item.amount
                    break
                  }
                }
              }
            }
          }
          this.deviceTypeId=zs
          
          console.log(arr)
        }).catch(err => {})
      this.addTask()
    },
    // 线移入事件
    taskLineMouseover(index) {
      let event = event || window.event //兼容写法
      this.alertLeft = event.pageX + 10
      this.alertTop = event.pageY - 44
      this.alertShow = true
      if (this.once == 1) {
        return
      }
      for (const item of this.lineTaskList) {
        if (item.id == index.target.options.id) {
          item.clicked = true
          this.defaultLineTask = item.name
        } else {
          item.clicked = false
        }
      }
      this.drawAllLine()
      this.once++
    },
    taskLineMousemove() {
      // let event = event || window.event //兼容写法
      // this.alertLeft = event.pageX + 10
      // this.alertTop = event.pageY - 44
      // this.alertShow = true
    },
    taskLineMouseout() {
      this.once--
      this.alertShow = false
      for (const item of this.lineTaskList) {
        item.clicked = false
      }
      this.drawAllLine()
    },
    // 添加所有的标注点
    allPointTask() {
      this.map.clearOverLays()
      for (const item of this.pointTaskList) {
        for (const point of item.pointList) {
          this.drawAllPoint(point.latlng, point.id, point.name, item.kmz)
        }
      }
    },
    // 添加标注图片
    drawAllPoint(latlng, id, title, iconUrl) {
      let icon = new T.Icon({
        iconUrl: iconUrl,
        iconSize: new T.Point(41, 40),
        iconAnchor: new T.Point(21, 40)
      })
      let marker = new T.Marker(latlng, { icon: icon, id: id, title: title })
      this.map.addOverLay(marker)
      marker.addEventListener('click', this.taskPointClick)
      marker.addEventListener('mouseover', this.taskPointMouse)
      marker.addEventListener('mouseout	', this.taskPointMouse)
    },
    // 点点击事件
    taskPointClick(index) {
      for (const item of this.pointTaskList) {
        for (const point of item.pointList) {
          if (index.target.options.id === point.id) {
            this.$refs.addTaskPoint.edit(point.id)
            point.clicked = true
          } else {
            point.clicked = false
          }
        }
      }
    },
    // 任务点点击移入移出事件
    taskPointMouse(index) {
      console.log(index)
      for (const item of this.pointTaskList) {
        for (const point of item.pointList) {
          if (index.target.options.id === point.id) {
            point.clicked = true
          } else {
            point.clicked = false
          }
        }
      }
    },
    // 任务点进入事件
    taskPointMouseover(index) {
      console.log(index)
    },
    // 任务点离开事件
    taskPointMouseout(index) {
      console.log(index)
    },
    // 注册添加点击事件
    addTaskPoint(index) {
      console.log(this.pointTaskList)
      for (const item of this.pointTaskList) {
        if (item.id == index) {
          let icon = new T.Icon({
            iconUrl: item.kmz,
            iconSize: new T.Point(41, 40),
            iconAnchor: new T.Point(21, 40)
          })
          let markerTool = new T.MarkTool(this.map, { icon: icon, follow: true })
          // this.markerTool.setIcon({icon: icon})
          markerTool.open()
          markerTool.addEventListener('mouseup', this.addTaskPointed)
        }
      }

      // let marker = new T.Marker(latlng, { icon: icon, id: id, name: name })
      // this.map.addOverLay(marker)
    },
    // 返回标注点的坐标
    addTaskPointed(e) {
      // console.log(e.currentLnglat.lng)
      // console.log(e.currentLnglat.lat)
      let geocode = new T.Geocoder()
      geocode.getLocation(e.currentLnglat, this.searchResult)
      // console.log(e)
    },
    searchResult(result) {
      this.$refs.addTaskPoint.add(result.formatted_address, result.location, this.taskId)
      if (result.getStatus() == 0) {
      } else {
        this.$message.error('获取地址失败')
      }
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },

    // 点任务选择
    chooseTask(key) {
      console.log(key)
      this.taskId = key
      this.addTaskPoint(key)
    },
    // 编辑
    choosePointEdit(id) {
      getTaskDetail(id).then(res => {
          var arr = res.data
          this.spotList.title = arr.info.title
          this.spotList.id = arr.info.id
          this.spotList.content = arr.info.content
          this.spotList.altitude = arr.info.altitude
          this.spotList.duration = arr.info.duration
          this.spotList.remark = arr.info.remark
          this.spotList.duty = arr.info.duty
          this.spotList.template = arr.info.template.code
          this.attachmentJpg = arr.info.kmz
          var sz = []
          var zs= []
          
          for (let i = 0; i < arr.staff.length; i++) {
            sz.push(arr.staff[i].role.id)
            for (let a = 0; a < this.personnelList.length; a++) {
              if (arr.staff[i].role.id == this.personnelList[a].id) {
                this.personnelList[a].num = arr.staff[i].amount
                break
              }
            }
          }
          this.spotList.roleId = sz
          for(const item of arr.device){
            zs.push(item.device.id)
            for(const d of this.equipmentList){
              for (const cc of d.children) {
                for (const aa of cc.children) {
                  if (item.device.id == aa.id) {
                    aa.num = item.amount
                    break
                  }
                }
              }
            }
          }
          this.deviceTypeId=zs
          
          console.log(arr)
        }).catch(err => {})
      this.addTask()
    },
    // 选择任务点
    choosePointTask(id, index) {
      for (const item of this.pointTaskList) {
        if (item.id === id) {
          for (const point of item.pointList) {
            if (index === point.name) {
              point.clicked = true
              console.log(point.latlng)
              let arr = []
              arr.push(point.latlng)
              this.map.setViewport(arr)
              // this.map.zoomOut()
            } else {
              point.clicked = false
            }
          }
        }
      }
    },
    // 删除任务点
    confirmPiontDelete(id, index) {
      taskPointDel(id)
        .then(res => {
          this.$message.success('保存成功')
          this.getList()
        })
        .catch(err => {
          this.$message.error(err.response.data.message)
        })
    },
    // 添加任务点
    addTaskPointAlert() {
      console.log('1')

      this.$refs.addTaskPoint.add()
    },
    // tab切换
    callback(key) {
      console.log(key)
      this.map.clearOverLays()
      if (key == 1) {
        this.drawAllLine()
      } else {
        this.getList()
      }
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
    mapChooseItem(e) {
      console.log(`checked = ${e.target.checked}`)
    },

    // 线路人员选择
    peopleChoose(checkedValues) {
     
    },
    // 线路人员配置人数
    peopleNum(value) {
      console.log('changed', value)
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
      if (this.actionTab == 1) {
        this.addLineShow = true
      } else if (this.actionTab == 2) {
        this.addPointShow = true
      }
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
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    // 线路任务按钮
    taskCancel() {
      if (this.actionTab == 1) {
        this.addLineShow = false
        this.lineList.id = ''
        this.lineList.title = ''
        this.lineList.content = ''
        this.lineList.altitude = ''
        this.lineList.duration = ''
        this.lineList.length = ''
        this.lineList.velocity = ''
        this.lineList.remark = ''
        this.lineList.times = ''
        this.lineList.duty = ''
        this.lineList.template = ''
        this.lineList.roleId = ''
        this.lineList.roleNum = ''
        this.lineList.deviceId = ''
        this.lineList.deviceNum = ''
        this.lineList.riverId = ''
        this.lineList.roleNum = ''
        this.roleId = []
        this.deviceId = []
        this.riverId = []
      } else if (this.actionTab == 2) {
        this.addPointShow = false
        this.spotList.title = ''
        this.spotList.id = ''
        this.spotList.content = ''
        this.spotList.altitude = ''
        this.spotList.duration = ''
        this.spotList.remark = ''
        this.spotList.duty = ''
        this.spotList.template = ''
        this.spotList.roleId = []
        this.spotList.roleNum = ''
        this.spotList.deviceTypeNum = ''
        this.attachmentJpg = ''
      }
      this.deviceTypeId = []
    },
    taskSave() {
      if (this.actionTab == 1) {
        for (let i = 0; i < this.roleId.length; i++) {
          for (let a = 0; a < this.personnelList.length; a++) {
            if (this.roleId[i] == this.personnelList[a].id) {
              if (this.lineList.roleNum != '') {
                this.lineList.roleNum =  this.lineList.roleNum +','+this.personnelList[a].num
              } else {
                this.lineList.roleNum = this.personnelList[a].num
              }
            }
          }
        }
        for (const item of this.deviceTypeId) {
          for (const ar of this.equipmentList) {
            for (const arrr of ar.children) {
              for (const arr of arrr.children) {
                if (item == arr.id) {
                  if (this.lineList.deviceNum != '') {
                    this.lineList.deviceNum =  this.lineList.deviceNum +','+arr.num
                  } else {
                    this.lineList.deviceNum = arr.num
                  }
                }
              }
            } 
          }
        }
        this.lineList.roleId = this.roleId.join(',')
        this.lineList.riverId = this.riverId.join(',')
        this.lineList.deviceId = this.deviceTypeId.join(',')
        var data = this.lineList
        if (this.fileList.length == 0) {
          getTaskSave(data)
            .then(res => {
              this.$message.success('保存成功')
              this.taskCancel()
              this.getLineList()
            }).catch(err => {
              this.$message.error(err.response.data.message)
            })
        } else {
          this.$refs.upload.submit()
        }
      } else if (this.actionTab == 2) {
        var data = this.spotList
        for (let i = 0; i < this.spotList.roleId.length; i++) {
          for (let a = 0; a < this.personnelList.length; a++) {
            if (this.spotList.roleId[i] == this.personnelList[a].id) {
              if (data.roleNum != '') {
                
                data.roleNum =  data.roleNum +','+this.personnelList[a].num
              } else {
                data.roleNum = this.personnelList[a].num
              }
            }
          }
        }
        for (const item of this.deviceTypeId) {
          for (const ar of this.equipmentList) {
            for (const arrr of ar.children) {
              for (const arr of arrr.children) {
                if (item == arr.id) {
                  if (data.deviceNum != '') {
                    data.deviceNum =  data.deviceNum +','+arr.num
                  } else {
                    data.deviceNum = arr.num
                  }
                }
              
              } 
            }
          }
        }
        data.deviceId = this.deviceTypeId.join(',')
        data.roleId = data.roleId.join(',')
        if (this.fileList.length == 0) {
          getTaskSave(data)
            .then(res => {
              var arr = res.data
              this.$message.success('保存成功')
              this.taskCancel()
              this.getList()
            })
            .catch(err => {
              this.$message.error(err.response.data.message)
            })
        } else {
          this.$refs.upload1.submit()
        }
      }
    },
    //上传
    submitUpload() {},
    //上传成功
    handleSuccess(response, file, fileList) {
      this.taskCancel()
      this.$message.success('保存成功')
      this.getLineList()
    },
    handleSuccess1(response, file, fileList) {
      this.taskCancel()
      this.$message.success('保存成功')
      this.getList()
    },
    uploadChange(file, fileList) {
      if (this.fileList.length == 0) {
        this.fileList = fileList
      } else {
        this.fileList = []
      }
    },
    uploadChange1(file, fileList) {
      if (this.fileList.length == 0) {
        this.fileList = fileList
        this.attachmentJpg = URL.createObjectURL(file.raw)
      } else {
        this.fileList = []
      }
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {}
  }
}
</script>
<style lang="less">
.ant-form input[type='file'] {
  display: none;
}
</style>
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
.mapChange {
  position: fixed;
  left: 10px;
  bottom: 10px;
  width: 120px;
  z-index: 1500;
}

.left {
  position: relative;
  width: calc(100% - 400px);
  height: 100%;
  display: inline-block;
  vertical-align: top;
}
.right {
  position: relative;
  width: 400px;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  // padding: 10px;
  background-color: white;
}
.task_face {
  width: 100%;
  height: calc(100vh - 205px);
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
