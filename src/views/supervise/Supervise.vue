<template>
  <div class="supervise">
    <div id="map" ref="worldMap" v-show="showView">
      <div class="time_quantum" v-show="!canDownload">{{timeQuantum}}</div>
      <div class="compass_pointer" @click="compass" title="指北针">
        <img class="pointer" src="../../assets/img/compassPointer.png" alt="指北针" />
      </div>
    </div>
    <div class="time_line">
      <ul class="time_ul">
        <li v-for="item in timeData" :key="item.id">
          <h6 style="font-size:12px;text-align:center;margin:0;">{{item.title}}</h6>
          <a-tooltip
            placement="right"
            class="time_item"
            trigger="hover"
            v-for="day in item.month"
            :key="day.id"
            @click="timeLineItem(item.title, day.title)"
            :class="{'time_item_clicked':day.clicked == true}"
          >
            <template slot="title">
              <span>{{item.title}}.{{day.title}}</span>
            </template>
            <div class="line_style">
              <div
                class="line"
                :class="{'time_bg_red':day.level == 0,'time_bg_blue':day.level == 1,'time_bg_gray':day.level == 2}"
              ></div>
            </div>
            <p>
              <span
                :class="{'time_bg_red':day.level == 0,'time_bg_blue':day.level == 1,'time_bg_gray':day.level == 2}"
              >{{day.title}}</span>
            </p>
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
    <div class="weather">
      <img src="../../assets/sun.png" alt="天气" />
      <h3>29</h3>
      <div class="text">
        <div class="top">
          <span class="degree_logo">℃</span>
          <span class="weather_detail">晴(实时)</span>
          <span class="date">9月16日 星期一</span>
        </div>
        <p class="degree">晴转多云 24～29℃</p>
      </div>
      <div class="weather_right">
        <a-icon
          class="right_icon"
          :class="{'right_icon_active':weatherShow == true}"
          @click="weatherFun"
          type="caret-left"
        />
      </div>
    </div>
    <div
      class="accordion_alert"
      v-show="phonePhoto || riskMap || waterQuality || riverRisk || outlet"
    >
      <a-collapse accordion class="custom_collapse">
        <a-collapse-panel
          header="手机照片"
          :style="customStyle"
          v-show="phonePhoto"
          class="custom_list"
        >
          <a-upload name="file" :multiple="true" action :headers="headers" @change="phoneUpload">
            <a-button style="width:178px;" block>
              <a-icon type="upload" />上传照片
            </a-button>
          </a-upload>
        </a-collapse-panel>
        <a-collapse-panel
          header="河岸风险源"
          :style="customStyle"
          v-show="riverRisk"
          class="custom_list"
        >
          <a-select
            showSearch
            mode="tags"
            :allowClear="true"
            placeholder="请选择河岸风险源等级"
            optionFilterProp="children"
            style="width: 100%"
            @change="riverRiskChange"
            :filterOption="riverRiskFilterOption"
          >
            <a-select-option value="1">Ⅰ级</a-select-option>
            <a-select-option value="2">Ⅱ级</a-select-option>
            <a-select-option value="3">Ⅲ级</a-select-option>
            <a-select-option value="4">Ⅳ级</a-select-option>
          </a-select>
        </a-collapse-panel>
        <a-collapse-panel header="风险地图" :style="customStyle" v-show="riskMap" class="custom_list">
          <a-card size="small" class="custom_card" style="width: 180px">
            <a-row style="width:100%">
              <a-col :span="12">边框颜色</a-col>
              <a-col :span="12" @click="chooseColor(1)">
                <p
                  style="height:20px;margin:0;border: 2px solid rgba(198, 198, 198, 0.8); background-clip: padding-box;"
                  :style="{background: borderColor}"
                ></p>
              </a-col>
            </a-row>
            <a-row style="width:100%">
              <a-col :span="12">填充颜色</a-col>
              <a-col :span="12" @click="chooseColor(2)">
                <p
                  style="height:20px;margin:0;border: 2px solid rgba(198, 198, 198, 0.8); background-clip: padding-box;"
                  :style="{background: fullColor}"
                ></p>
              </a-col>
            </a-row>
            <a-row style="width:100%">
              <a-col :span="24">边框透明度</a-col>
              <a-col :span="24">
                <a-slider
                  v-model="borderOpacity"
                  :tipFormatter="formatter"
                  :step="10"
                  :min="0"
                  :max="100"
                />
              </a-col>
            </a-row>
            <a-row style="width:100%">
              <a-col :span="24">填充不透明度</a-col>
              <a-col :span="24">
                <a-slider
                  v-model="fullOpacity"
                  :tipFormatter="formatter"
                  :step="10"
                  :min="0"
                  :max="100"
                />
              </a-col>
            </a-row>
            <a-button block @click="drawRiskMap">
              <a-icon type="edit" />绘制风险地图
            </a-button>
            <a-row
              v-show="isRiskSaveShow"
              style="width:100%; margin-top:10px;"
              type="flex"
              justify="space-between"
            >
              <a-col :span="10">
                <a-button @click="riskCradCancel" block>取消</a-button>
              </a-col>
              <a-col :span="10">
                <a-button @click="riskCradSave" block>保存</a-button>
              </a-col>
            </a-row>
          </a-card>
          <div class="color_wrap" v-show="colorAlertShow">
            <chrome-picker class v-model="riskMapColor" @input="changeColor(riskMapColor)"></chrome-picker>
          </div>
        </a-collapse-panel>
        <a-collapse-panel
          header="水质数据"
          :style="customStyle"
          v-show="waterQuality"
          class="custom_list"
        >
          <a-select
            showSearch
            mode="tags"
            :allowClear="true"
            placeholder="请选择水质数据等级"
            optionFilterProp="children"
            style="width: 100%"
            @change="waterQualityChange"
            :filterOption="waterQualityFilterOption"
          >
            <a-select-option value="1">Ⅰ-蓝色</a-select-option>
            <a-select-option value="2">Ⅱ-蓝色</a-select-option>
            <a-select-option value="3">Ⅲ-蓝色</a-select-option>
            <a-select-option value="4">Ⅳ-黄色</a-select-option>
            <a-select-option value="5">Ⅴ-橙色</a-select-option>
            <a-select-option value="6">Ⅵ-红色</a-select-option>
            <a-select-option value="7">Ⅶ-红色</a-select-option>
            <a-select-option value="8">Ⅷ-红色</a-select-option>
          </a-select>
        </a-collapse-panel>
        <a-collapse-panel header="排口" :style="customStyle" v-show="outlet" class="custom_list">
          <a-select
            showSearch
            mode="tags"
            :allowClear="true"
            placeholder="请选择排口等级"
            optionFilterProp="children"
            style="width: 100%"
            @change="waterQualityChange"
            :filterOption="waterQualityFilterOption"
          >
            <a-select-option value="1">Ⅰ级</a-select-option>
            <a-select-option value="2">Ⅱ级</a-select-option>
            <a-select-option value="3">Ⅲ级</a-select-option>
            <a-select-option value="4">Ⅳ级</a-select-option>
          </a-select>
        </a-collapse-panel>
      </a-collapse>
    </div>
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

    <ul class="menu">
      <li @click="setCenter">
        <img src="../../assets/img/restoration.png" alt="复位" title="复位" />
      </li>
      <li @click="toolsShowFun">
        <img src="../../assets/img/draw.png" alt="工具" title="工具" />
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
          <img src="../../assets/img/map.png" alt="图像" title="图像" />
        </a-popover>
      </li>
      <li>
        <img
          src="../../assets/img/screenshot.png"
          id="export-png"
          @click="printImage"
          alt="截图"
          title="截图"
        />
      </li>
      <li @click="mapZoomIn">
        <img src="../../assets/img/max.png" alt="放大" title="放大" />
      </li>
      <li @click="mapZoomOut">
        <img src="../../assets/img/min.png" alt="缩小" title="缩小" />
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
              <a-list-item>
                <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                  <a-col :span="18">
                    <p style="margin:0;">河道显示</p>
                  </a-col>
                  <a-col :span="6">
                    <a-switch size="small" v-model="riverShow" />
                  </a-col>
                </a-row>
              </a-list-item>
              <a-list-item>
                <a-row style="width:160px" type="flex" justify="space-between" align="middle">
                  <a-col :span="18">
                    <p style="margin:0;">街道显示</p>
                  </a-col>
                  <a-col :span="6">
                    <a-switch size="small" v-model="riverShow" />
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
                          <a-switch size="small" v-model="panorama" />
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
                    <a-popover placement="left" trigger="click">
                      <template slot="content">
                        <a-list
                          size="small"
                          style="max-height: calc(100vh - 260px); overflow: auto;"
                        >
                          <a-list-item v-for="item in 5" :key="item">
                            <a-row
                              style="width:160px"
                              type="flex"
                              justify="space-between"
                              align="middle"
                            >
                              <a-col :span="18">
                                <p style="margin:0;">风险源{{item}}</p>
                              </a-col>
                              <a-col :span="6">
                                <a-switch size="small" v-model="riskMap" @click="onRiskMap" />
                              </a-col>
                            </a-row>
                          </a-list-item>
                        </a-list>
                      </template>
                      <template slot="title">
                        <span>河岸风险源</span>
                      </template>
                      <a-list-item>
                        <a-row
                          style="width:160px"
                          type="flex"
                          justify="space-between"
                          align="middle"
                        >
                          <a-col :span="18">
                            <p style="margin:0;">河岸风险源</p>
                          </a-col>
                          <a-col :span="6">
                            <a-switch size="small" v-model="riverRisk" @click="onRiverRisk" />
                          </a-col>
                        </a-row>
                      </a-list-item>
                    </a-popover>
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
                          <p style="margin:0;">水质数据</p>
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
                          <p style="margin:0;">排口</p>
                        </a-col>
                        <a-col :span="6">
                          <a-switch size="small" v-model="outlet" @click="onOutlet" />
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
          <img src="../../assets/img/more.png" alt="更多" title="更多" />
        </a-popover>
      </li>
    </ul>
    <!-- 天气弹窗 -->
    <div class="weather_alert" v-show="weatherShow"></div>
    <!-- 颜色选择框 -->
    <a-card
      size="small"
      title="地图绘制工具"
      v-show="toolCard"
      :style="{top: toolTop + 'px', left: toolLeft + 'px'}"
      class="custom_card tool_card"
      style="width: 180px"
    >
      <div v-show="toolIndex == 2 || toolIndex == 3">
        <a-row style="width:100%">
          <a-col :span="12">边框颜色</a-col>
          <a-col :span="12" @click="chooseColor(1)">
            <p
              style="height:20px;margin:0;border: 2px solid rgba(198, 198, 198, 0.8); background-clip: padding-box;"
              :style="{background: borderColor}"
            ></p>
          </a-col>
        </a-row>
        <a-row v-show="toolIndex == 3" style="width:100%">
          <a-col :span="12">填充颜色</a-col>
          <a-col :span="12" @click="chooseColor(2)">
            <p
              style="height:20px;margin:0;border: 2px solid rgba(198, 198, 198, 0.8); background-clip: padding-box;"
              :style="{background: fullColor}"
            ></p>
          </a-col>
        </a-row>
        <a-row style="width:100%">
          <a-col :span="24">边框透明度</a-col>
          <a-col :span="24">
            <a-slider
              v-model="borderOpacity"
              :tipFormatter="formatter"
              :step="10"
              :min="0"
              :max="100"
            />
          </a-col>
        </a-row>
        <a-row v-show="toolIndex == 3" style="width:100%">
          <a-col :span="24">填充不透明度</a-col>
          <a-col :span="24">
            <a-slider
              v-model="fullOpacity"
              :tipFormatter="formatter"
              :step="10"
              :min="0"
              :max="100"
            />
          </a-col>
        </a-row>
      </div>
      <a-row style="width:100%">
        <a-col :span="24">绘制类型</a-col>
        <a-col :span="24">
          <a-select default-value="1" style="width:100%;">
            <a-select-option value="1">风险源</a-select-option>
            <a-select-option value="2">水面漂浮物</a-select-option>
            <a-select-option value="3">排口</a-select-option>
            <a-select-option value="4">其他</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row style="width:100%; margin-top:10px;" type="flex" justify="space-between">
        <a-col :span="10">
          <a-button @click="toolCradCancel" block>取消</a-button>
        </a-col>
        <a-col :span="10">
          <a-button @click="toolCradSave" block>保存</a-button>
        </a-col>
      </a-row>
      <div class="color_wrap" v-show="colorAlertShow">
        <chrome-picker class v-model="riskMapColor" @input="changeColor(riskMapColor)"></chrome-picker>
      </div>
    </a-card>
    <a-card size="small" v-show="toolsCard" class="custom_card tools_card">
      <a-button
        @click="toolsShowFun"
        shape="circle"
        size="small"
        icon="close"
        class="tools_card_close"
      />
      <a-radio-group>
        <a-radio-button value="0" @click="toolIndexFun(1)">点</a-radio-button>
        <a-radio-button value="1" @click="toolIndexFun(2)">线</a-radio-button>
        <a-radio-button value="2" @click="toolIndexFun(3)">面</a-radio-button>
        <a-radio-button value="3" @click="toolIndexFun(4)">测面</a-radio-button>
        <a-radio-button value="4" @click="toolIndexFun(5)">测距</a-radio-button>
      </a-radio-group>
    </a-card>
    <!-- 风险源信息 -->
    <risk-source-info ref="riskInfo"></risk-source-info>
    <!-- 添加风险源 -->
    <add-risk-source ref="addRisk"></add-risk-source>
    <!-- 照片编辑 -->
    <photo-edit ref="photoEdit"></photo-edit>
    <!-- 排口 -->
    <add-outlet ref="addOutlet"></add-outlet>
    <!-- 360全景图 -->
    <look-panorama ref="panorama"></look-panorama>
  </div>
</template>

<script>
// import WorldMap from "../../components/map/WorldMap.vue";
import RiskSourceInfo from './modules/RiskSourceInfo'
import AddRiskSource from './modules/AddRiskSource'
import PhotoEdit from './modules/PhotoEdit'
import AddOutlet from './modules/AddOutlet'
import LookPanorama from './modules/LookPanorama'

import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import LayerGroup from 'ol/layer/Group'
import XYZ from 'ol/source/XYZ'

import OSM from 'ol/source/OSM'

// 拖拽缩放
// import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction'

// 截图
import htmlToImage from 'html-to-image'
// 颜色拾取器
import { Chrome } from 'vue-color'

// import { debounce } from '../../utils/utilsTool'

// 防抖函数
function debounce(func, wait = 500) {
  //可以放入项目中的公共方法中进行调用
  let timeout
  return function(event) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.call(this, event)
    }, wait)
  }
}

export default {
  name: 'Supervise',
  components: {
    // 'world-map': WorldMap
    'risk-source-info': RiskSourceInfo,
    'add-risk-source': AddRiskSource,
    'photo-edit': PhotoEdit,
    'add-outlet': AddOutlet,
    'look-panorama': LookPanorama,
    'chrome-picker': Chrome
  },
  data() {
    return {
      headers: {
        // 文件上传
        authorization: 'authorization-text'
      },
      timeData: [
        {
          id: 0,
          title: '2019.09',
          month: [
            { id: '30', title: '30', level: 0, clicked: false },
            { id: '29', title: '29', level: 1, clicked: false },
            { id: '28', title: '28', level: 2, clicked: false },
            { id: '27', title: '27', level: 2, clicked: false },
            { id: '26', title: '26', level: 1, clicked: false },
            { id: '25', title: '25', level: 1, clicked: false },
            { id: '24', title: '24', level: 1, clicked: false },
            { id: '23', title: '23', level: 0, clicked: false },
            { id: '22', title: '22', level: 0, clicked: false },
            { id: '21', title: '21', level: 2, clicked: false },
            { id: '20', title: '20', level: 2, clicked: false },
            { id: '19', title: '19', level: 1, clicked: false },
            { id: '18', title: '18', level: 0, clicked: false },
            { id: '17', title: '17', level: 2, clicked: false },
            { id: '16', title: '16', level: 2, clicked: false },
            { id: '15', title: '15', level: 0, clicked: false },
            { id: '14', title: '14', level: 1, clicked: false },
            { id: '13', title: '13', level: 0, clicked: false },
            { id: '12', title: '12', level: 1, clicked: false },
            { id: '11', title: '11', level: 1, clicked: false },
            { id: '10', title: '10', level: 0, clicked: false },
            { id: '09', title: '09', level: 1, clicked: false },
            { id: '08', title: '08', level: 0, clicked: false },
            { id: '07', title: '07', level: 2, clicked: false },
            { id: '06', title: '06', level: 0, clicked: false },
            { id: '05', title: '05', level: 2, clicked: false },
            { id: '04', title: '04', level: 2, clicked: false },
            { id: '03', title: '03', level: 0, clicked: false },
            { id: '02', title: '02', level: 1, clicked: false },
            { id: '01', title: '01', level: 1, clicked: false }
          ]
        },
        {
          id: 1,
          title: '2019.08',
          month: [
            { id: '31', title: '31', level: 0, clicked: false },
            { id: '30', title: '30', level: 0, clicked: false },
            { id: '29', title: '29', level: 1, clicked: false },
            { id: '28', title: '28', level: 2, clicked: false },
            { id: '27', title: '27', level: 2, clicked: false },
            { id: '26', title: '26', level: 1, clicked: false },
            { id: '25', title: '25', level: 1, clicked: false },
            { id: '24', title: '24', level: 1, clicked: false },
            { id: '23', title: '23', level: 0, clicked: false },
            { id: '22', title: '22', level: 0, clicked: false },
            { id: '21', title: '21', level: 2, clicked: false },
            { id: '20', title: '20', level: 2, clicked: false },
            { id: '19', title: '19', level: 1, clicked: false },
            { id: '18', title: '18', level: 0, clicked: false },
            { id: '17', title: '17', level: 2, clicked: false },
            { id: '16', title: '16', level: 2, clicked: false },
            { id: '15', title: '15', level: 0, clicked: false },
            { id: '14', title: '14', level: 1, clicked: false },
            { id: '13', title: '13', level: 0, clicked: false },
            { id: '12', title: '12', level: 1, clicked: false },
            { id: '11', title: '11', level: 1, clicked: false },
            { id: '10', title: '10', level: 0, clicked: false },
            { id: '09', title: '09', level: 1, clicked: false },
            { id: '08', title: '08', level: 0, clicked: false },
            { id: '07', title: '07', level: 2, clicked: false },
            { id: '06', title: '06', level: 0, clicked: false },
            { id: '05', title: '05', level: 2, clicked: false },
            { id: '04', title: '04', level: 2, clicked: false },
            { id: '03', title: '03', level: 0, clicked: false },
            { id: '02', title: '02', level: 1, clicked: false },
            { id: '01', title: '01', level: 1, clicked: false }
          ]
        }
      ],
      timeQuantum: '', // 时间段
      weatherShow: false, //天气弹窗
      mapType: 'a',
      checked: false,
      sharedChecked: false,
      swipeChecked: false,
      showView: true,
      customStyle: 'background: #fff;margin: 0;overflow: hidden', // 折叠面板样式
      canDownload: true, // 是否可以图片截图下载
      riskMapColor: {
        // 默认颜色
        hex: '#F32C11'
      },
      colorAlertShow: false, // 拾色器显隐
      colorIndex: 1, // 选哪个
      borderColor: '#F32C11', // 边框颜色
      fullColor: '#F32C11', // 填充颜色
      borderOpacity: 80, // 边框透明度
      fullOpacity: 50, //填充透明度

      riskPolygonData: [], // 工具面数据
      riskIndexId: null, // 当前绘制id
      isRiskEdit: false, // 是否是编辑状态
      isRiskSaveShow: false, // 是否显示保存取消
      editIndex: '', //编辑的是哪个riskmap / tool

      // 地图对象
      map: null,

      toolsCard: false, //工具卡片
      toolCard: false, //选中工具卡片
      toolTop: '', // 选中工具卡位置
      toolLeft: '', // 选中工具卡位置
      markerTool: '', // 工具-点
      lineTool: '', //工具-线
      polyline: '', // 线
      // polygon: '', // 面
      polygonTool: '', //工具-面
      lineToolNum: '', //工具-测距
      toolIndex: '', // 哪个工具
      toolIndexPointData: [], // 工具点数据
      toolIndexLineData: [], // 工具线数据
      toolIndexPolygonData: [], // 工具面数据
      toolIndexId: null, // 当前绘制id
      isToolEdit: false, // 是否是编辑状态

      mapLayer: '', // 地图图层

      historyData: false, // 历史数据
      riverShow: false, // 河道显示
      phonePhoto: false, // 手机照片
      photoAlert: false, // 照片弹窗
      phonePhotoTool: '', // 手机照片工具
      UAVPhoto: false, // 无人机照片
      UAVPhotoTool: '', // 无人机照片工具
      panorama: false, // 360照片
      panoramaPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.21493, lng: 121.49566 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.22344, lng: 121.47892 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.20649, lng: 121.47712 } }
      ],
      historyPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.21493, lng: 121.49566 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.22344, lng: 121.47892 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.20649, lng: 121.47712 } }
      ],
      riverShowPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.219, lng: 121.499 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.204, lng: 121.479 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.206, lng: 121.471 } }
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
        },
        {
          id: 3,
          name: '监测点4',
          clicked: false,
          imgUrl: require('../../assets/loginBg.jpg'),
          latlng: { lat: 31.19482, lng: 121.46819 }
        },
        {
          id: 4,
          name: '监测点5',
          clicked: false,
          imgUrl: require('../../assets/loginBg.jpg'),
          latlng: { lat: 31.19649, lng: 121.45995 }
        }
      ],
      UAVPhotoPoints: [
        { id: 0, name: '监测点1', clicked: false, latlng: { lat: 31.24493, lng: 121.52566 } },
        { id: 1, name: '监测点2', clicked: false, latlng: { lat: 31.25344, lng: 121.50892 } },
        { id: 2, name: '监测点3', clicked: false, latlng: { lat: 31.23649, lng: 121.50712 } }
      ],

      riskMap: false, // 风险地图
      riskMapRiver: [
        {
          id: 0,
          name: '黄浦江',
          clicked: true,
          lineData: [
            { lat: 31.21882, lng: 121.50364 },
            { lat: 31.21265, lng: 121.50227 },
            { lat: 31.20583, lng: 121.49703 },
            { lat: 31.19915, lng: 121.49197 },
            { lat: 31.19702, lng: 121.49591 },
            { lat: 31.2164, lng: 121.50757 },
            { lat: 31.21948, lng: 121.50758 }
          ]
        },
        {
          id: 1,
          name: '大治河',
          clicked: false,
          lineData: [
            { lat: 31.25153, lng: 121.52409 },
            { lat: 31.25355, lng: 121.53085 },
            { lat: 31.25858, lng: 121.53934 },
            { lat: 31.25535, lng: 121.54334 },
            { lat: 31.2499, lng: 121.53353 },
            { lat: 31.24786, lng: 121.52737 },
            { lat: 31.24682, lng: 121.51709 },
            { lat: 31.25111, lng: 121.51711 }
          ]
        },
        {
          id: 2,
          name: '川杨河',
          clicked: false,
          lineData: [
            { lat: 31.24539, lng: 121.48686 },
            { lat: 31.24616, lng: 121.48411 },
            { lat: 31.2466, lng: 121.4824 },
            { lat: 31.24612, lng: 121.48051 },
            { lat: 31.24484, lng: 121.47901 },
            { lat: 31.24462, lng: 121.47939 },
            { lat: 31.24543, lng: 121.48089 },
            { lat: 31.2459, lng: 121.48261 },
            { lat: 31.2448, lng: 121.4857 },
            { lat: 31.2444, lng: 121.4872 }
          ]
        },
        {
          id: 3,
          name: '蕰藻浜',
          clicked: false,
          lineData: [
            { lat: 31.21717, lng: 121.51336 },
            { lat: 31.21691, lng: 121.51454 },
            { lat: 31.21768, lng: 121.51566 },
            { lat: 31.21768, lng: 121.51763 },
            { lat: 31.21733, lng: 121.51748 },
            { lat: 31.21739, lng: 121.51568 },
            { lat: 31.21664, lng: 121.51456 },
            { lat: 31.21669, lng: 121.51387 },
            { lat: 31.21699, lng: 121.51323 }
          ]
        },
        {
          id: 4,
          name: '龙华港',
          clicked: false,
          lineData: [
            { lat: 31.21493, lng: 121.49566 },
            { lat: 31.22344, lng: 121.47892 },
            { lat: 31.20649, lng: 121.47712 },
            { lat: 31.20469, lng: 121.47482 },
            { lat: 31.21469, lng: 121.51482 }
          ]
        }
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
      outlet: false, // 排口
      outletPoints: [
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
    // 河道显示
    riverShow() {
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
    // 360全景图
    panorama() {
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
    // 排口
    outlet() {
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
    let that = this
    this.initMap()
    // this.watchAllSwitch()
    // this.photoAlert = true
  },
  methods: {
    // 时间轴
    timeLineItem(mouth, index) {
      for (const item of this.timeData) {
        if (mouth == item.title) {
          for (const value of item.month) {
            if (value.level != 2) {
              if (value.title == index) {
                value.clicked = true
              } else {
                value.clicked = false
              }
            }
          }
        }
      }
    },
    // 天气
    weatherFun() {
      this.weatherShow = !this.weatherShow
    },
    initMap() {
      // 初始化地图控件
      let zoom = 14
      this.map = new T.Map('map')
      this.map.centerAndZoom(new T.LngLat(121.495505, 31.21098), zoom)
      //添加比例尺控件
      this.map.addControl(new T.Control.Scale())
      this.map.setMinZoom(4)
      this.map.setMaxZoom(18)

      // this.markerToolInit()
      // this.lineToolInit()
      // this.polygonToolInit()
      // this.lineToolNumInit()
      // this.map = new Map({
      //   target: 'map',
      //   view: new View({
      //     center: [121.4955, 31.21098],
      //     zoom: 14
      //   }),
      //   layers: [
      //     new TileLayer({
      //       source: new XYZ({
      //         url: 'https://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=a659a60049b130a5d1fececfd5a6b822'
      //       }),
      //       isGroup: true,
      //       name: '天地图路网'
      //     }),
      //     new TileLayer({
      //       source: new XYZ({
      //         url: 'https://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=a659a60049b130a5d1fececfd5a6b822'
      //       }),
      //       isGroup: true,
      //       name: '天地图文字标注'
      //     })
      //   ]
      //   // interactions: defaultInteractions().extend([new DragRotateAndZoom()])
      // })
    },
    // 河岸风险源
    riverRiskChange(value) {
      console.log(value)
    },
    // 河岸风险源过滤
    riverRiskFilterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    // 水质监测点
    waterQualityChange(value) {
      console.log(value)
    },
    // 水质监测点过滤
    waterQualityFilterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
    // 工具
    toolsShowFun() {
      this.toolsCard = !this.toolsCard
    },
    // 工具
    toolIndexFun(index) {
      this.toolIndex = index
      this.editIndex = 'tool'
      if (index === 1) {
        // 工具-点
        this.markerTool = new T.MarkTool(this.map, { follow: true })
        this.markerTool.open()
        this.markerTool.addEventListener('mouseup', this.toolDrawn)
      } else if (index === 2) {
        // 工具-线
        this.lineTool = new T.PolylineTool(this.map)
        this.lineTool.open()
        this.lineTool.setTips(`<p style="padding:0px;">单击确认起点, 双击结束绘制</p>`)
        this.lineTool.addEventListener('draw', this.toolDrawn)
      } else if (index === 3) {
        // 工具-面
        this.polygonTool = new T.PolygonTool(this.map)
        this.polygonTool.open()
        this.polygonTool.addEventListener('draw', this.toolDrawn)
      } else if (index === 4) {
        // 工具-测面
        this.polygonToolNum = new T.PolygonTool(this.map, { showLabel: true })
        this.polygonToolNum.open()
      } else if (index === 5) {
        // 工具-测距
        this.lineToolNum = new T.PolylineTool(this.map, { showLabel: true })
        this.lineToolNum.open()
        this.lineToolNum.setTips(`<p style="padding:0px;">单击确认起点, 双击结束绘制</p>`)
      }
    },
    // 绘制保存
    toolCradSave() {
      this.toolCard = false
      console.log(this.isToolEdit)
      if (this.toolIndex === 1) {
      } else if (this.toolIndex === 2) {
        // 工具-线
        this.lineTool.clear()
        let result = this.toolIndexLineData.findIndex(item => {
          return this.toolIndexId == item.id
        })
        this.toolIndexLineData[result].borderColor = this.borderColor
        this.toolIndexLineData[result].borderOpacity = this.borderOpacity / 100
        console.log(result)
        console.log(this.toolIndexLineData)
        if (this.isToolEdit) {
          this.watchAllSwitch()
          return
        }
        this.polyline = new T.Polyline(this.toolIndexLineData[result].lineData, {
          id: this.toolIndexId
        })
        this.map.addOverLay(this.polyline)
        this.polyline.setColor(this.borderColor)
        this.polyline.setOpacity(this.borderOpacity / 100)
        this.polyline.addEventListener('click', this.lineClick)
      } else if (this.toolIndex === 3) {
        // 工具-面
        this.polygonTool.clear()
        let result = this.toolIndexPolygonData.findIndex(item => {
          return this.toolIndexId == item.id
        })
        console.log(result)
        console.log(this.toolIndexPolygonData)
        this.toolIndexPolygonData[result].borderColor = this.borderColor
        this.toolIndexPolygonData[result].fullColor = this.fullColor
        this.toolIndexPolygonData[result].borderOpacity = this.borderOpacity / 100
        this.toolIndexPolygonData[result].fullOpacity = this.fullOpacity / 100
        if (this.isToolEdit) {
          this.watchAllSwitch()
          return
        }
        this.polygon = new T.Polygon(this.toolIndexPolygonData[result].lineData, {
          id: this.toolIndexId
        })
        this.map.addOverLay(this.polygon)
        this.polygon.setColor(this.borderColor)
        this.polygon.setFillColor(this.fullColor)
        this.polygon.setOpacity(this.borderOpacity / 100)
        this.polygon.setFillOpacity(this.fullOpacity / 100)
        this.polygon.addEventListener('click', this.polygonClick)
      }
    },
    // 绘制取消
    toolCradCancel() {
      this.toolCard = false
      if (this.isToolEdit) {
        return
      }
      if (this.toolIndex === 1) {
        // 工具-点
        this.markerTool.clear()
        this.toolIndexPointData.splice(this.toolIndexPointData.findIndex(item => item.id === this.toolIndexId), 1)
      } else if (this.toolIndex === 2) {
        // 工具-线
        this.lineTool.clear()
        this.toolIndexLineData.splice(this.toolIndexLineData.findIndex(item => item.id === this.toolIndexId), 1)
      } else if (this.toolIndex === 3) {
        // 工具-面
        this.polygonTool.clear()
        this.toolIndexPolygonData.splice(this.toolIndexPolygonData.findIndex(item => item.id === this.toolIndexId), 1)
      } else if (this.toolIndex === 4) {
        // 工具-面积
        this.polygonTool.clear()
      } else if (this.toolIndex === 5) {
        // 工具-测距
        this.lineToolNum.clear()
      }
    },
    // 绘制结束
    toolDrawn(e) {
      this.isToolEdit = false
      this.colorAlertShow = false
      let id = new Date().valueOf()
      this.toolIndexId = id
      if (this.toolIndex === 1) {
        this.toolCard = true
        this.markerTool.close()
        this.toolIndexPointData.push({
          id: id,
          latlng: e.currentLnglat
        })
        console.log(e)
        // this.$refs.addRisk.add()
        // this.$refs.addOutlet.add()
      } else if (this.toolIndex === 2) {
        // 工具-线
        console.log(e)
        this.toolCard = true
        this.lineTool.close()
        this.toolIndexLineData.push({
          id: id,
          lineData: e.currentLnglats
        })
      } else if (this.toolIndex === 3) {
        // 工具-面
        this.toolCard = true
        this.polygonTool.close()
        this.toolIndexPolygonData.push({
          id: id,
          lineData: e.currentLnglats
        })
      } else if (this.toolIndex === 4) {
        // 工具-面积
        this.polygonTool.close()
      } else if (this.toolIndex === 5) {
        // 工具-测距
        this.lineToolNum.close()
      }
    },
    // 点击编辑工具线
    lineClick(e) {
      console.log(e)
      this.toolCard = true
      this.colorAlertShow = false
      this.toolIndex = 2
      this.toolIndexId = e.target.options.id
      this.isToolEdit = true
    },
    // 点击编辑工具面
    polygonClick(e) {
      console.log(e)
      this.toolCard = true
      this.colorAlertShow = false
      this.toolIndex = 3
      this.toolIndexId = e.target.options.id
      this.isToolEdit = true
    },
    // 绘制工具画的点
    toolDrawPoint() {
      this.allPointTask(this.toolIndexPointData)
    },
    // 绘制工具画的线
    toolDrawLine() {
      if (this.toolIndexLineData.length !== 0) {
        for (const item of this.toolIndexLineData) {
          this.drawLine(item.lineData, item.borderColor, 3, item.borderOpacity, item.id, '')
        }
      }
    },
    // 绘制工具画的面
    toolDrawPolygon() {
      if (this.toolIndexPolygonData.length !== 0) {
        for (const item of this.toolIndexPolygonData) {
          this.setPolylineFn(
            item.lineData,
            item.borderColor,
            3,
            item.borderOpacity,
            item.fullColor,
            item.fullOpacity,
            '',
            item.id
          )
        }
      }
    },
    // 设置时间段
    setTime(date, dateString) {
      console.log(date, dateString)
      this.timeQuantum = `${dateString[0]} — ${dateString[1]}`
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
        'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=a659a60049b130a5d1fececfd5a6b822'
      let wordLabel = 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=a659a60049b130a5d1fececfd5a6b822'
      let satelliteURL =
        'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=a659a60049b130a5d1fececfd5a6b822'
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
      let that = this
      if (!this.canDownload) {
        return
      }
      this.canDownload = false
      this.$notification.open({
        message: '提示',
        description: '正在截取地图, 请稍等...'
      })
      var node = document.getElementById('map')
      var mapWidth = document.getElementById('map').offsetWidth
      var mapHeight = document.getElementById('map').offsetHeight
      htmlToImage
        .toPng(node, { width: mapWidth, height: mapHeight })
        .then(dataUrl => {
          var link = document.createElement('a')
          link.download = 'map' + this.getNowTime() + '.png'
          link.href = dataUrl
          link.click()
          link.remove()
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
    // 河道显示
    onRiverShow() {
      if (this.riverShow) {
        this.allPointTask(this.riverShowPoints)
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
    // 360全景图
    onPanorama() {
      if (this.panorama) {
        let markerTool
        for (const item of this.panoramaPoints) {
          markerTool = new T.Marker(item.latlng, { title: item.name, id: item.id })
          this.map.addOverLay(markerTool)
          markerTool.addEventListener('click', this.panoramaPointClick)
        }
      }
    },
    // 360点点击事件
    panoramaPointClick(e) {
      this.$router.push({
        path: '/supervise/Vtour',
        query: {
          id: e.target.options.id
        }
      })
    },
    // 风险地图
    onRiskMap() {
      if (this.riskMap) {
        for (const item of this.riskMapRiver) {
          let polygon = new T.Polygon(item.lineData, {
            color: 'blue', //线颜色
            weight: 3, //线宽
            opacity: 0.5, //透明度
            fillColor: '#FFFFFF', //填充颜色
            fillOpacity: 0, // 填充透明度
            title: item.name, // 名字
            id: item.id // id
          })
          //向地图上添加面
          this.map.addOverLay(polygon)
        }
        // 风险地图绘制的面
        if (this.riskPolygonData.length != 0) {
          for (const item of this.riskPolygonData) {
            this.setRiskPolyline(
              item.lineData,
              item.borderColor,
              3,
              item.borderOpacity,
              item.fullColor,
              item.fullOpacity,
              '',
              item.id
            )
          }
        }
      }
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
      line.addEventListener('click', this.lineClick)
    },
    // 设置绘制的多边形
    setPolylineFn(lineData, color, weight, opacity, fillColor, fillOpacity, title, id) {
      let polygon = new T.Polygon(lineData, {
        color: color, //线颜色
        weight: weight, //线宽
        opacity: opacity, //透明度
        fillColor: fillColor, //填充颜色
        fillOpacity: fillOpacity, // 填充透明度
        title: title, // 名字
        id: id // id
      })
      //向地图上添加面
      this.map.addOverLay(polygon)
      polygon.addEventListener('click', this.polygonClick)
    },
    // 设置绘制的多边形
    setRiskPolyline(lineData, color, weight, opacity, fillColor, fillOpacity, title, id) {
      let polygon = new T.Polygon(lineData, {
        color: color, //线颜色
        weight: weight, //线宽
        opacity: opacity, //透明度
        fillColor: fillColor, //填充颜色
        fillOpacity: fillOpacity, // 填充透明度
        title: title, // 名字
        id: id // id
      })
      //向地图上添加面
      this.map.addOverLay(polygon)
      polygon.addEventListener('click', this.riskPolygonClick)
    },
    // 绘制风险地图
    drawRiskMap() {
      this.colorAlertShow = false
      //创建标注工具对象
      this.polygonTool = new T.PolygonTool(this.map, {
        // showLabel: true,
        color: this.borderColor,
        weight: 3,
        opacity: this.borderOpacity / 100,
        fillColor: this.fullColor,
        fillOpacity: this.fullOpacity / 100
      })
      this.polygonTool.open()
      this.polygonTool.setTips(`<p style="padding:0px 4px;">单击确认起点, 双击结束绘制</p>`)
      this.polygonTool.addEventListener('draw', this.drawRiskMapEnd)
      // this.polylineHandler.addEventListener('addpoint', this.addDrawRivering)
    },
    // 绘制结束
    drawRiskMapEnd(e) {
      console.log(e.currentLnglats)
      this.isRiskEdit = false
      this.colorAlertShow = false
      let id = new Date().valueOf()
      this.riskIndexId = id
      this.polygonTool.close()
      this.riskPolygonData.push({
        id: id,
        lineData: e.currentLnglats
      })
      this.isRiskSaveShow = true
    },
    // 风险地图绘制保存
    riskCradSave() {
      this.isRiskSaveShow = false
      this.colorAlertShow = false
      console.log(this.isRiskEdit)
      this.polygonTool.clear()
      let result = this.riskPolygonData.findIndex(item => {
        return this.riskIndexId == item.id
      })
      console.log(result)
      console.log(this.riskPolygonData)
      this.riskPolygonData[result].borderColor = this.borderColor
      this.riskPolygonData[result].fullColor = this.fullColor
      this.riskPolygonData[result].borderOpacity = this.borderOpacity / 100
      this.riskPolygonData[result].fullOpacity = this.fullOpacity / 100
      if (this.isRiskEdit) {
        this.watchAllSwitch()
        return
      }
      this.polygon = new T.Polygon(this.riskPolygonData[result].lineData, {
        id: this.riskIndexId
      })
      this.map.addOverLay(this.polygon)
      this.polygon.setColor(this.borderColor)
      this.polygon.setFillColor(this.fullColor)
      this.polygon.setOpacity(this.borderOpacity / 100)
      this.polygon.setFillOpacity(this.fullOpacity / 100)
      this.polygon.addEventListener('click', this.riskPolygonClick)
    },
    // 风险地图绘制取消
    riskCradCancel() {
      this.isRiskSaveShow = false
      this.colorAlertShow = false
      if (this.isRiskEdit) {
        return
      }
      this.polygonTool.clear()
      this.riskPolygonData.splice(this.riskPolygonData.findIndex(item => item.id === this.riskIndexId), 1)
    },
    // 风险地图编辑颜色
    riskPolygonClick(e) {
      this.riskIndexId = e.target.options.id
      this.isRiskEdit = true
      this.isRiskSaveShow = true
    },
    // 点击选择颜色
    chooseColor(index) {
      this.colorAlertShow = true
      if (index == 1) {
        this.colorIndex = 1
      } else {
        this.colorIndex = 2
      }
    },
    formatter(value) {
      return `${value}%`
    },
    // 选择颜色
    changeColor: debounce(function(index) {
      if (this.colorIndex == 1) {
        this.borderColor = index.hex
      } else if (this.colorIndex == 2) {
        this.fullColor = index.hex
      }
    }, 300),
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
    // 排口
    onOutlet() {
      if (this.outlet) {
        this.allPointTask(this.outletPoints)
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
      // 绘制工具画的点
      this.toolDrawPoint()
      // 绘制工具画的线
      this.toolDrawLine()
      // 绘制工具画的面
      this.toolDrawPolygon()
      // 历史数据
      this.onHistoryData()
      // 河道显示
      this.onRiverShow()
      // 手机照片
      this.onPhonePhoto()
      // 无人机照片
      this.onUAVPhoto()
      // 360全景图
      this.onPanorama()
      // 风险地图
      this.onRiskMap()
      // 水质
      this.onWaterQuality()
      // 水质漂浮物
      this.onWaterFlotage()
      // 排口
      this.onOutlet()
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
      console.log(pointLists)
      for (const item of pointLists) {
        this.drawAllPoint(item.latlng, item.name, item.id)
      }
    },
    // 添加标注
    drawAllPoint(latlng, index, id) {
      let markerTool = new T.Marker(latlng, { title: index, id: id })
      this.map.addOverLay(markerTool)
      markerTool.addEventListener('click', this.taskPointClick)
    },
    // 任务点点击事件
    taskPointClick(index) {
      console.log(index)
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
      // for (const item of pointLists) {
      //   // arr.push(item.latlng)
      //   this.drawAllImage(item.latlng, item.imgUrl, item.name)
      // }
      this.drawAllImage(pointLists)
      // this.map.setViewport(arr)
    },
    // 添加手机照片
    drawAllImage(pointLists) {
      let arrayObj = new Array()
      let styles = new Array()
      for (const item of pointLists) {
        let icon = new T.Icon({
          iconUrl: item.imgUrl,
          iconSize: new T.Point(70, 45),
          iconAnchor: new T.Point(35, 45)
        })
        styles = [
          {
            url: item.imgUrl,
            size: [70, 45], //图片大小
            offset: new T.Point(35, 45), //显示图片的偏移量
            textColor: '#000000', //显示数字的颜色
            textSize: 8, //显示文字的大小
            range: [0, 50]
          }
        ]
        let marker = new T.Marker(item.latlng, { icon: icon, id: item.id, name: item.name })
        arrayObj.push(marker)
        marker.addEventListener('click', this.taskImageClick)
      }
      var markers = new T.MarkerClusterer(this.map, { markers: arrayObj, styles: styles })
      // document.getElementsByClassName("tdt-cluster0")[0].addEventListener(click, this.taskImageClick)
      setTimeout(() => {
        $('.tdt-cluster0').click(function(params) {
          console.log(123)
        })
      }, 1000)
      // markers.addEventListener('click', this.taskImageClick)
    },
    // 任务照片点击
    taskImageClick(index) {
      console.log(index)
      // this.photoAlert = true
      this.$refs.photoEdit.showVisible()
      // for (const item of this.historyPoints) {
      //   if (index.lnglat.lat === item.latlng.lat && index.lnglat.lng === item.latlng.lng) {
      //     console.log(index.lnglat.lat, index.lnglat.lng)
      //     this.$refs.riskInfo.riskInfo()
      //   }
      // }
    },
    // 上传手机照片
    phoneUpload(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    getTdLayer(lyr) {
      var url =
        'http://t{0-7}.tianditu.com/DataServer?T=' + lyr + '&x={x}&y={y}&l={z}&tk=a659a60049b130a5d1fececfd5a6b822'
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
  width: 400px;
  height: 65px;
  z-index: 888;
  background-color: rgba(255, 255, 255, 1);
  opacity: 0.9;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid rgb(204, 204, 204);
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
  padding: 13px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  justify-items: center;
  -webkit-justify-items: center;
  img {
    width: 40px;
    height: 40px;
  }
  h3 {
    font-size: 45px;
    line-height: 45px;
    margin: 0;
  }
  .text {
    width: 225px;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    div {
      font-size: 15px;
      line-height: 17px;
      font-weight: 600;
      color: rgba(45, 45, 45, 1);
      margin: 0;
      .weather_detail {
        margin-left: 14px;
      }
      .date {
        margin-left: 16px;
        color: rgba(140, 159, 173, 1);
      }
    }
    p {
      font-weight: 600;
      color: rgba(45, 45, 45, 1);
      line-height: 17px;
      font-size: 15px;
      margin: 0;
    }
  }
  .weather_right {
    width: 46px;
    height: 100%;
    border-left: 1px solid rgba(216, 216, 216, 0.26);
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    padding-left: 10px;
    .right_icon {
      font-size: 18px;
      padding: 10px;
      transition: 0.5s;
      -moz-transition: 0.5s; /* Firefox 4 */
      -webkit-transition: 0.5s; /* Safari and Chrome */
    }
    .right_icon_active {
      color: #1890ff;
      transform: rotate(180deg);
      -ms-transform: rotate(180deg); /* IE 9 */
      -moz-transform: rotate(180deg); /* Firefox */
      -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
    }
  }
}
.weather_alert {
  position: absolute;
  left: 490px;
  top: 10px;
  z-index: 888;
  width: 320px;
  height: 320px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 10px;
}
.time_line {
  position: absolute;
  left: 0;
  top: 0;
  width: 68px;
  height: 100%;
  height: calc(100% - 40px);
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
      font-size: 0;
      text-align: center;
      .time_item {
        position: relative;
        display: block;
        width: 100%;
        cursor: pointer;
        text-align: center;
        padding: 5px 0;
        .line_style {
          display: block;
          text-align: center;
          width: 20px;
          margin: auto;
          .line {
            width: 20px;
            height: 2px;
          }
          .time_bg_red {
            background-color: rgb(249, 56, 56);
          }
          .time_bg_blue {
            background-color: rgb(116, 196, 73);
          }
          .time_bg_gray {
            background-color: rgb(204, 204, 204);
            width: 4px;
          }
        }
        p {
          display: none;
          margin: 0;
          width: 100%;
          font-size: 12px;
          text-align: center;
          span {
            display: inline-block;
            width: 20px;
            height: 20px;
            color: white;
          }
        }
        .time_bg_red {
          background-color: rgb(249, 56, 56);
        }
        .time_bg_blue {
          background-color: rgb(116, 196, 73);
        }
        .time_bg_gray {
          background-color: rgb(204, 204, 204);
        }
      }
      .time_item:hover {
        p {
          display: block;
        }
        .line_style {
          display: none;
        }
      }
      .time_item_clicked {
        p {
          display: block;
        }
        .line_style {
          display: none;
        }
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
.accordion_alert {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 200px;
  background-color: white;
  z-index: 889;
  border-radius: 4px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.5);
}
.tools_card {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  margin: auto;
  text-align: center;
  width: 278px;
  background-color: white;
  z-index: 889;
  border-radius: 4px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.5);
  .tools_card_close {
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 890;
  }
}
.tool_card {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 180px;
  background-color: white;
  z-index: 889;
  border-radius: 4px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.5);
}

.color_wrap {
  position: absolute;
  right: 190px;
  top: 2px;
}
.time_quantum {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 666;
  color: #333;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.9);
}
.compass_pointer {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 56px;
  height: 56px;
  z-index: 888;
  border-radius: 50%;
  padding: 13px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  background: white url('../../assets/img/leftRightArrows.png') no-repeat center center / 80%;
  text-align: center;
  .pointer {
    width: 30px;
    height: 30px;
    transform: rotate(0deg);
  }
}
.menu {
  position: fixed;
  right: 20px;
  bottom: 10px;
  width: 36px;
  z-index: 888;
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    width: 100%;
    background: white;
    border-radius: 50%;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
    margin-top: 10px;
    img {
      width: 100%;
      height: 36px;
      padding: 10px;
    }
  }
}

.ant-col-6 {
  text-align: right;
}
</style>
