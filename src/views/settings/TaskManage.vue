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
                @click="chooseLineTask(item.name)"
                :class="{active_item: item.clicked}"
              >
                <a-row style="width:100%">
                  <a-col :span="20">{{item.name}}</a-col>
                  <a-col :span="4" style="text-align:right;">
                    <a-popconfirm
                      title="确定要删除吗?"
                      @confirm="confirmLineDelete(item.name)"
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
                <a-input placeholder="请输入任务名称" />
              </a-form-item>
              <a-form-item
                label="任务内容"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入任务内容" />
              </a-form-item>
              <a-form-item
                label="月计划次数"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入月计划次数" />
              </a-form-item>
              <a-form-item
                label="涉及线路"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-upload
                  name="file"
                  :multiple="true"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  :headers="headers"
                  @change="handleUpload"
                >
                  <a-button>
                    <a-icon type="upload" />上传KMZ文件
                  </a-button>
                </a-upload>
              </a-form-item>
              <a-form-item
                label="高度(m)"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入高度" />
              </a-form-item>
              <a-form-item
                label="长度(m)"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入长度" />
              </a-form-item>
              <a-form-item
                label="时长(min)"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入时长" />
              </a-form-item>
              <a-form-item
                label="速度(km/h)"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入速度" />
              </a-form-item>
              <a-form-item
                label="任务模板"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-select defaultValue="无人机" style="width: 100%">
                  <a-select-option value="无人机">无人机</a-select-option>
                  <a-select-option value="人工调查">人工调查</a-select-option>
                  <a-select-option value="水质调查">水质调查</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="关联河道"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-select
                  showSearch
                  :allowClear="true"
                  placeholder="请输入河流添加"
                  optionFilterProp="children"
                  style="width: 100%"
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
              </a-form-item>
              <a-form-item
                label="人员配置"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-row style="width:100%">
                  <a-col :span="14" style="height:30px;">
                    <a-checkbox @change="peopleChoose">主飞手</a-checkbox>
                  </a-col>
                  <a-col :span="10" style="height:30px;text-align:right;">
                    <a-input-number
                      size="small"
                      :min="1"
                      :max="100000"
                      :defaultValue="1"
                      @change="peopleNum"
                      style="width: 70px;"
                    />
                  </a-col>
                  <a-col :span="14" style="height:30px;">
                    <a-checkbox @change="peopleChoose">副飞手</a-checkbox>
                  </a-col>
                  <a-col :span="10" style="height:30px;text-align:right;">
                    <a-input-number
                      size="small"
                      :min="1"
                      :max="100000"
                      :defaultValue="1"
                      @change="peopleNum"
                      style="width: 70px;"
                    />
                  </a-col>
                  <a-col :span="14" style="height:30px;">
                    <a-checkbox @change="peopleChoose">采水员</a-checkbox>
                  </a-col>
                  <a-col :span="10" style="height:30px;text-align:right;">
                    <a-input-number
                      size="small"
                      :min="1"
                      :max="100000"
                      :defaultValue="1"
                      @change="peopleNum"
                      style="width: 70px;"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item
                label="设备配置"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              ></a-form-item>
              <a-collapse size="small" style="margin-top:10px;" :bordered="false">
                <a-collapse-panel :style="customStyle">
                  <template slot="header">
                    <!-- <a-checkbox @change.stop="peopleChoose">无人机设备</a-checkbox> -->
                    无人机设备
                  </template>
                  <a-row style="width:100%">
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">无人机主机</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">无人机机翼</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">无人机电池</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                  </a-row>
                </a-collapse-panel>
                <a-collapse-panel :style="customStyle">
                  <template slot="header" @change.stop="peopleChoose">
                    <!-- <a-checkbox>采水设备</a-checkbox> -->
                    采水设备
                  </template>
                  <a-row style="width:100%">
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">容器</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">手套</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">试纸</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                  </a-row>
                </a-collapse-panel>
              </a-collapse>
              <a-form-item
                label="备注"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入备注" />
              </a-form-item>
              <a-form-item
                label="人员职责"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入人员职责" />
              </a-form-item>
            </a-form>
          </section>
        </a-tab-pane>
        <a-tab-pane tab="点任务" key="2" forceRender>
          <section class="task_face">
            <a-collapse defaultActiveKey="1" accordion style="margin-top:10px;">
              <a-collapse-panel
                v-show="!addPointShow"
                v-for="item in pointTaskList"
                :key="item.id"
                :style="customStyle"
                class="custom_list"
              >
                <template slot="header">
                  <a-row style="width:100%">
                    <a-col :span="15">{{item.name}}</a-col>
                    <a-col :span="8" style="text-align:right;" :pull="1">
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
                          @confirm="confirmPiontDelete(item.id, point.name)"
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
                <a-input placeholder="请输入任务名称" />
              </a-form-item>
              <a-form-item
                label="任务内容"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-textarea :autosize="{ minRows: 2, maxRows: 6 }" />
              </a-form-item>
              <a-form-item
                label="任务高度"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入任务高度" />
              </a-form-item>
              <a-form-item
                label="任务时长(min)"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入任务时长" />
              </a-form-item>
              <a-form-item
                label="备注"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-textarea placeholder="请输入备注信息" :autosize="{ minRows: 2, maxRows: 6 }" />
              </a-form-item>
              <a-form-item
                label="任务职责"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入任务职责" />
              </a-form-item>
              <a-form-item
                label="任务模板"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-select placeholder="请选择" style="width: 100%">
                  <a-select-option value="无人机">无人机</a-select-option>
                  <a-select-option value="人工调查">人工调查</a-select-option>
                  <a-select-option value="水质调查">水质调查</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="任务图标"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-select placeholder="请选择" style="width: 100%">
                  <a-select-option value="图标1">图标1</a-select-option>
                  <a-select-option value="图标2">图标2</a-select-option>
                  <a-select-option value="图标3">图标3</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="人员配置"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-row style="width:100%">
                  <a-col :span="14" style="height:30px;">
                    <a-checkbox @change="peopleChoose">主飞手</a-checkbox>
                  </a-col>
                  <a-col :span="10" style="height:30px;text-align:right;">
                    <a-input-number
                      size="small"
                      :min="1"
                      :max="100000"
                      :defaultValue="1"
                      @change="peopleNum"
                      style="width: 70px;"
                    />
                  </a-col>
                  <a-col :span="14" style="height:30px;">
                    <a-checkbox @change="peopleChoose">副飞手</a-checkbox>
                  </a-col>
                  <a-col :span="10" style="height:30px;text-align:right;">
                    <a-input-number
                      size="small"
                      :min="1"
                      :max="100000"
                      :defaultValue="1"
                      @change="peopleNum"
                      style="width: 70px;"
                    />
                  </a-col>
                  <a-col :span="14" style="height:30px;">
                    <a-checkbox @change="peopleChoose">采水员</a-checkbox>
                  </a-col>
                  <a-col :span="10" style="height:30px;text-align:right;">
                    <a-input-number
                      size="small"
                      :min="1"
                      :max="100000"
                      :defaultValue="1"
                      @change="peopleNum"
                      style="width: 70px;"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item
                label="设备配置"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              ></a-form-item>
              <a-collapse size="small" style="margin-top:10px;" :bordered="false">
                <a-collapse-panel :style="customStyle">
                  <template slot="header">
                    <!-- <a-checkbox @change.stop="peopleChoose">无人机设备</a-checkbox> -->
                    无人机设备
                  </template>
                  <a-row style="width:100%">
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">无人机主机</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">无人机机翼</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">无人机电池</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                  </a-row>
                </a-collapse-panel>
                <a-collapse-panel :style="customStyle">
                  <template slot="header">
                    <!-- <a-checkbox @change="peopleChoose">采水设备</a-checkbox> -->
                    采水设备
                  </template>
                  <a-row style="width:100%">
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">容器</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">手套</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">试纸</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                  </a-row>
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
          <a-button type="primary" block @click="taskSave">保存</a-button>
        </a-col>
      </a-row>
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
import AddTaskPoint from './modules/AddTaskPoint.vue'
import { setUserProjection } from 'ol/proj'

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
      alertLeft: -1000,
      alertTop: -1000,
      alertShow: false,
      headers: {
        //上传
        authorization: 'authorization-text'
      },
      addRiverShow: false, // 气泡卡片
      actionTab: '1', //tab
      defaultLineTask: '无人机正射影像',
      lineTaskList: [
        {
          id: 0,
          name: '无人机正射影像',
          clicked: false,
          lineData: [
            { lat: 31.21493, lng: 121.49566 },
            { lat: 31.22344, lng: 121.47892 },
            { lat: 31.20649, lng: 121.47712 },
            { lat: 31.20469, lng: 121.47482 },
            { lat: 31.21469, lng: 121.51482 }
          ]
        },
        {
          id: 1,
          name: '无人机倾斜影像',
          clicked: false,
          lineData: [
            { lat: 31.20752, lng: 121.51531 },
            { lat: 31.20186, lng: 121.50759 },
            { lat: 31.19944, lng: 121.52106 },
            { lat: 31.19944, lng: 121.53106 }
          ]
        },
        {
          id: 2,
          name: '无人机人工拍照',
          clicked: false,
          lineData: [
            { lat: 31.21564, lng: 121.42895 },
            { lat: 31.22873, lng: 121.47788 },
            { lat: 31.26706, lng: 121.47677 }
          ]
        }
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

      customStyle: 'background: #fff;margin: 0;overflow: hidden', // 折叠面板样式

      pointTaskList: [
        //任务点
        {
          id: 0,
          name: '360',
          pointList: [
            { id: 0, name: '坐标点1', clicked: false, latlng: { lat: 31.21493, lng: 121.49566 } },
            { id: 1, name: '坐标点2', clicked: false, latlng: { lat: 31.22344, lng: 121.47892 } },
            { id: 2, name: '坐标点3', clicked: false, latlng: { lat: 31.20649, lng: 121.47712 } }
          ]
        },
        {
          id: 1,
          name: '人工调查点',
          pointList: [
            { id: 0, name: '调查点1', clicked: false, latlng: { lat: 31.20752, lng: 121.51531 } },
            { id: 1, name: '调查点2', clicked: false, latlng: { lat: 31.20186, lng: 121.50759 } },
            { id: 2, name: '调查点3', clicked: false, latlng: { lat: 31.19944, lng: 121.52106 } }
          ]
        }
      ],

      // 地图对象
      map: {},
      once: 0 // 移入次数
    }
  },
  mounted() {
    this.initMap()
  },
  watch: {
    checkedKeys(val) {
      console.log('onCheck', val)
    }
  },
  methods: {
    initMap() {
      //初始化地图控件
      let zoom = 14
      this.map = new T.Map('map')
      this.map.centerAndZoom(new T.LngLat(121.495505, 31.21098), zoom)
      this.markerTool = new T.MarkTool(this.map, { follow: true })
      this.drawAllLine()
    },
    // 上传文件
    handleUpload(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    // 添加所有的线
    drawAllLine() {
      this.map.clearOverLays()
      for (const item of this.lineTaskList) {
        if (item.clicked == true) {
          this.drawLine(item.lineData, 'red', 3, 0.5)
        } else {
          this.drawLine(item.lineData, 'blue', 3, 0.5)
        }
      }
    },
    // 线路任务
    chooseLineTask(index) {
      this.defaultLineTask = index
      for (const item of this.lineTaskList) {
        if (item.name === index) {
          item.clicked = true
          this.map.setViewport(item.lineData)
        } else {
          item.clicked = false
        }
      }
      this.drawAllLine()
    },
    // 绘制线
    drawLine(points, color, weight, opacity) {
      let line = new T.Polyline(points, {
        color: color, //线颜色
        weight: weight, //线宽
        opacity: opacity //透明度
      })
      //向地图上添加线
      this.map.addOverLay(line)
      line.addEventListener('click', this.taskLineClick)
      line.addEventListener('mouseover', this.taskLineMouseover)
      line.addEventListener('mousemove', this.taskLineMousemove)
      line.addEventListener('mouseout	', this.taskLineMouseout)
    },
    // 线路任务删除
    confirmLineDelete(index) {
      this.lineTaskList.splice(this.lineTaskList.findIndex(item => item.name === index), 1)
      this.drawAllLine()
      this.$message.success('删除成功')
      this.defaultLineTask = null
    },
    cancelDelete(e) {
      // this.$message.error('Click on No')
    },
    // 线点击事件
    taskLineClick() {
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
      let arr = [],
        findIndex1 = '',
        findIndex2 = '',
        findIndex3 = '',
        findIndex4 = ''
      arr.push(index.target.Qr.Lq.lat)
      arr.push(index.target.Qr.kq.lat)
      arr.push(index.target.Qr.Lq.lng)
      arr.push(index.target.Qr.kq.lng)

      findIndex1 = this.findIndex(arr[0], 'lat', this.lineTaskList)
      findIndex2 = this.findIndex(arr[1], 'lat', this.lineTaskList)
      findIndex3 = this.findIndex(arr[2], 'lng', this.lineTaskList)
      findIndex4 = this.findIndex(arr[3], 'lng', this.lineTaskList)
      if ((findIndex1 == findIndex2) == (findIndex3 == findIndex4)) {
        for (const item of this.lineTaskList) {
          if (item.id == findIndex1) {
            item.clicked = true
            this.defaultLineTask = item.name
            this.drawAllLine()
          } else {
            item.clicked = false
          }
        }
      }
      this.once++
    },
    taskLineMousemove() {
      // let event = event || window.event //兼容写法
      // this.alertLeft = event.pageX + 10
      // this.alertTop = event.pageY - 44
      // this.alertShow = true
    },
    taskLineMouseout(){
      this.once--
      this.alertShow = false
      for (const item of this.lineTaskList) {
        item.clicked = false
      }
      this.drawAllLine()
    },
    // 查找函数 value:要查的坐标, latlng:查的是lng经度还是lat纬度, lineDataArr:被查询的数组
    findIndex(value, latlng, lineDataArr) {
      let result = '', // 查询结果
        resultArr = [], // 查询结果数组
        res = '' // 返回列表的第几个
      if (latlng == 'lat') {
        // 纬度
        for (let i = 0; i < lineDataArr.length; i++) {
          result = lineDataArr[i].lineData.findIndex(item => {
            return value == item.lat
          })
          resultArr.push(result)
        }
      } else {
        // 经度
        for (let i = 0; i < lineDataArr.length; i++) {
          result = lineDataArr[i].lineData.findIndex(item => {
            return value == item.lng
          })
          resultArr.push(result)
        }
      }
      for (const item of resultArr) {
        res = resultArr.findIndex(item => {
          return item != -1
        })
      }
      return res
    },
    // 添加所有的标注点
    allPointTask() {
      this.map.clearOverLays()
      for (const item of this.pointTaskList) {
        for (const point of item.pointList) {
          this.drawAllPoint(point.latlng)
        }
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
    // 点点击事件
    taskPointClick() {
      this.addTask()
    },
    // 任务点点击移入移出事件
    taskPointMouse(index) {
      for (const item of this.pointTaskList) {
        for (const point of item.pointList) {
          if (index.lnglat.lat === point.latlng.lat && index.lnglat.lng === point.latlng.lng) {
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
    addTaskPoint() {
      this.markerTool.open()
      this.markerTool.getMarkers()
      for (var i = 0; i < this.markerTool.length; i++) {
        this.markerTool[i].disableDragging()
      }
      this.markerTool.addEventListener('mouseup', this.addTaskPointed)
    },
    // 返回标注点的坐标
    addTaskPointed(e) {
      this.$refs.addTaskPoint.add()
      console.log(e)
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },

    // 点任务选择
    chooseTask(key) {
      console.log(key)
      this.addTaskPoint()
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
      for (const item of this.pointTaskList) {
        if (item.id === id) {
          item.pointList.splice(item.pointList.findIndex(value => value.name === index), 1)
          this.allPointTask()
        }
      }
    },
    // 添加任务点
    addTaskPointAlert() {
      this.$refs.addTaskPoint.add()
    },
    // tab切换
    callback(key) {
      console.log(key)
      this.map.clearOverLays()
      if (key == 1) {
        this.drawAllLine()
      } else {
        this.allPointTask()
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
    peopleChoose(e) {
      console.log(`checked = ${e.target.checked}`)
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
