<template>
  <div style="width:100%;height:calc(100vh - 64px);">
    <split-pane :min-percent="25" :default-percent="81.5" split="vertical">
      <template slot="paneL">
        <div class="left-info">
          <!-- <img src="../../assets/map.jpg" style="width:100%;height: calc(100vh - 66px);"> -->
          <div id="map" class="map" ></div>
          <div class="leftShow" v-if="noTitleKey === 'addPlan' || nosuperKey === 'taskCard'">
            <div class="left-date">
              <a-date-picker @change="selectData" />
            </div>
            <!-- 天气 -->
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
            <!-- 新建计划时展示 -->
            <div class="left-patrol" v-if="noTitleKey === 'addPlan' || nosuperKey === 'taskCard'">
              <p class="left-patrol-title">推荐巡河方案</p>
              <div class="patrol-plan">
                <!-- <a-tree defaultExpandAll v-model="checkedPlan" @select="selectPatrol" :treeData="patrolPlanInfo"/> -->
                <a-collapse v-model="activeKey">
                  <a-collapse-panel header="黄浦江" key="1" style="text-align: left">
                    <p style="margin:0;">{{text}}</p>
                  </a-collapse-panel>
                  <a-collapse-panel header="鸭绿江" key="2" :disabled="false" style="text-align: left">
                    <p style="margin:0;">{{text}}</p>
                  </a-collapse-panel>
                </a-collapse>
              </div>
            </div>
          </div>
          <!-- 今日计划监管页轨迹 -->
          <div v-if="nosuperKey === 'personCard'">
            <div class="super_weather">
              <!-- <img src="../../assets/weather.jpg" alt /> -->
            </div>
            <div class="left_riverInfo">
              <a-tabs defaultActiveKey="1" @change="changeInfo">
                <a-tab-pane tab="水质数据" key="1">
                  <a-row class="rInfo_row">
                    <a-col :span="12">
                      <span class="rInfo_title">水体名称&nbsp;:</span>
                      <span class="rInfo_info">黄浦江</span>
                    </a-col>
                    <a-col :span="10" :offset="2">
                      <span class="rInfo_info">2019-8-22 13:00</span>
                    </a-col>
                  </a-row>
                  <a-row class="rInfo_row">
                    <a-col :span="12">
                      <span class="rInfo_title">断面名称&nbsp;:</span>
                      <span class="rInfo_info">黄浦江</span>
                    </a-col>
                  </a-row>
                </a-tab-pane>
                <a-tab-pane tab="河长信息" key="2"></a-tab-pane>
              </a-tabs>
            </div>
          </div>
          <div class="map_operate">
            <ul>
              <li>
                <img src="../../assets/compass.png" alt="指北针" />
              </li>
              <li>
                <img src="../../assets/restoration.png" alt="复位" />
              </li>
              <li>
                <img src="../../assets/max.png" alt="放大" />
              </li>
              <li>
                <img src="../../assets/min.png" alt="缩小" />
              </li>
              <li>
                <a-popover title="图像" placement="leftBottom" trigger="click">
                  <template slot="content">
                    <a-row style="width: 100%;">
                      <a-col :span="24">
                        <a-radio-group @change="onMapChange" v-model="mapType">
                          <a-radio-button value="a">2D影像图</a-radio-button>
                          <a-radio-button value="b">卫星影像图</a-radio-button>
                        </a-radio-group>
                      </a-col>
                    </a-row>
                  </template>
                  <img src="../../assets/map.png" alt="图像" />
                </a-popover>
              </li>
              <li class="popMore">
                <a-popover title="更多" placement="leftBottom" arrowPointAtCenter trigger="click">
                  <template slot="content">
                    <a-list type="small">
                      <a-popover placement="leftBottom" arrowPointAtCenter trigger="click">
                        <template slot="content">
                          <a-list size="small">
                            <a-list-item>
                              <a-row
                                type="flex"
                                justify="space-around"
                                align="middle"
                                style="width:100%;"
                              >
                                <a-col :span="18">
                                  <span>风险地图</span>
                                </a-col>
                                <a-col :span="6">
                                  <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                                </a-col>
                              </a-row>
                            </a-list-item>
                            <a-list-item>
                              <a-row
                                type="flex"
                                justify="space-around"
                                align="middle"
                                style="width:100%;"
                              >
                                <a-col :span="18">
                                  <span>水质</span>
                                </a-col>
                                <a-col :span="6">
                                  <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                                </a-col>
                              </a-row>
                            </a-list-item>
                            <a-list-item>
                              <a-row
                                type="flex"
                                justify="space-around"
                                align="middle"
                                style="width:100%;"
                              >
                                <a-col :span="18">
                                  <span>水面漂浮物</span>
                                </a-col>
                                <a-col :span="6">
                                  <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                                </a-col>
                              </a-row>
                            </a-list-item>
                            <a-list-item>
                              <a-row
                                type="flex"
                                justify="space-around"
                                align="middle"
                                style="width:100%;"
                              >
                                <a-col :span="18">
                                  <span>河岸风险源</span>
                                </a-col>
                                <a-col :span="6">
                                  <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                                </a-col>
                              </a-row>
                            </a-list-item>
                            <a-list-item>
                              <a-row
                                type="flex"
                                justify="space-around"
                                align="middle"
                                style="width:100%;"
                              >
                                <a-col :span="18">
                                  <span>水土流失</span>
                                </a-col>
                                <a-col :span="6">
                                  <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                                </a-col>
                              </a-row>
                            </a-list-item>
                            <a-list-item>
                              <a-row
                                type="flex"
                                justify="space-around"
                                align="middle"
                                style="width:100%;"
                              >
                                <a-col :span="18">
                                  <span>水面率</span>
                                </a-col>
                                <a-col :span="6">
                                  <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                                </a-col>
                              </a-row>
                            </a-list-item>
                            <a-list-item>
                              <a-row
                                type="flex"
                                justify="space-around"
                                align="middle"
                                style="width:100%;"
                              >
                                <a-col :span="18">
                                  <span>底泥</span>
                                </a-col>
                                <a-col :span="6">
                                  <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                                </a-col>
                              </a-row>
                            </a-list-item>
                          </a-list>
                        </template>
                        <template slot="title">
                          <span>风险管理</span>
                        </template>
                        <a-list-item>
                          <a-row type="flex" justify="space-between" style="width:100%;">
                            <a-col :span="18">
                              <span>风险管理</span>
                            </a-col>
                            <a-col :span="6">
                              <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                            </a-col>
                          </a-row>
                        </a-list-item>
                      </a-popover>
                      <a-popover placement="leftBottom" arrowPointAtCenter trigger="click">
                        <template slot="content">
                          <a-list size="small">
                            <a-list-item>
                              <a-row
                                type="flex"
                                justify="space-around"
                                align="middle"
                                style="width:100%;"
                              >
                                <a-col :span="18">
                                  <span>Ⅰ-红色</span>
                                </a-col>
                                <a-col :span="6">
                                  <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                                </a-col>
                              </a-row>
                            </a-list-item>
                            <a-list-item>
                              <a-row
                                type="flex"
                                justify="space-around"
                                align="middle"
                                style="width:100%;"
                              >
                                <a-col :span="18">
                                  <span>Ⅱ-橙色</span>
                                </a-col>
                                <a-col :span="6">
                                  <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                                </a-col>
                              </a-row>
                            </a-list-item>
                            <a-list-item>
                              <a-row
                                type="flex"
                                justify="space-around"
                                align="middle"
                                style="width:100%;"
                              >
                                <a-col :span="18">
                                  <span>Ⅲ-黄色</span>
                                </a-col>
                                <a-col :span="6">
                                  <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                                </a-col>
                              </a-row>
                            </a-list-item>
                            <a-list-item>
                              <a-row
                                type="flex"
                                justify="space-around"
                                align="middle"
                                style="width:100%;"
                              >
                                <a-col :span="18">
                                  <span>Ⅳ-蓝色</span>
                                </a-col>
                                <a-col :span="6">
                                  <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                                </a-col>
                              </a-row>
                            </a-list-item>
                          </a-list>
                        </template>
                        <template slot="title">
                          <span>风险等级</span>
                        </template>
                        <a-list-item>
                          <a-row type="flex" justify="space-between" style="width:100%;">
                            <a-col :span="18">
                              <span>风险等级</span>
                            </a-col>
                            <a-col :span="6">
                              <a-switch size="small" v-model="checked" @click="onChangeSwitch" />
                            </a-col>
                          </a-row>
                        </a-list-item>
                      </a-popover>
                    </a-list>
                  </template>
                  <img src="../../assets/more.png" alt="更多" />
                </a-popover>
              </li>
            </ul>
          </div>
          <search-river ref="selectPatrol" class="riverSearchModal"></search-river>
          <add-survey ref="addSurvey" class="riverSearchModal" ></add-survey>
        </div>
      </template>
      <template slot="paneR">
        <div class="right-info">
          <div class="right-body">
            <!-- 首页内容展示 -->
            <a-card
              :tabList="planList"
              :activeTabKey="noTitleKey"
              @tabChange="key => onTabChange(key,'noTitleKey')"
              v-if="firstShow"
            >
              <!-- 新建计划 -->
              <div v-if="noTitleKey === 'addPlan'">
                <!-- 判断显示内容 -->
                <div v-if="ishidden == 1">
                  <a-row
                    type="flex"
                    justify="center"
                    style="margin-bottom:15px;margin-top:15px;text-align:center;"
                  >
                    <a-col :span="12">
                      <a-button style="padding:0 22px;color:#1890ff;" @click="addRiverBtn">添加河道</a-button>
                    </a-col>
                    <a-col :span="12">
                      <a-button @click="addSurveyPoint" class="commBtn">添加调查点</a-button>
                    </a-col>
                  </a-row>
                  <div class="riverInfo">
                    <div class="river_info">
                      <a-row type="flex" justify="space-between" align="middle">
                        <a-col :span="8" @click="searchMap">黄浦江</a-col>
                        <a-col :span="10">
                          <a-select defaultValue @change="handleChange" style="width:100%;">
                            <a-select-option value="jack">Jack</a-select-option>
                            <a-select-option value="lucy">Lucy</a-select-option>
                            <a-select-option value="disabled" disabled>Disabled</a-select-option>
                          </a-select>
                        </a-col>
                        <a-col :span="3">
                          <a-button shape="circle" icon="close" style="font-size:8px;"></a-button>
                        </a-col>
                      </a-row>
                    </div>
                    <a-tree
                      checkable
                      defaultExpandAll
                      v-model="checkedKeys"
                      @select="onSelect"
                      :selectedKeys="selectedKeys"
                      :treeData="treeData"
                    ></a-tree>
                    <a-button
                      class="addTask_btn commBtn"
                      icon="plus"
                      @click="addTaskBtn"
                      v-show="cBtn"
                    >追加任务</a-button>
                    <add-task ref="addTask" @chooseLocation="addLineTool" @cancleBtn="cancelAddTask"></add-task>
                  </div>
                  <div class="riverInfo">
                    <div class="river_info">
                      <a-row type="flex" justify="space-between" align="middle">
                        <a-col :span="10" @click="searchMap">专向调查点</a-col>
                        <a-col :span="3">
                          <a-button shape="circle" icon="close" style="font-size:8px;"></a-button>
                        </a-col>
                      </a-row>
                    </div>
                    <a-tree
                      checkable
                      v-model="checkedKeys"
                      @select="onSelect"
                      :selectedKeys="selectedKeys"
                      :treeData="treeData"
                    ></a-tree>
                    <a-button
                      class="addTask_btn commBtn"
                      icon="plus"
                      @click="addTaskBtn"
                      v-show="cBtn"
                    >追加任务</a-button>
                  </div>
                </div>
                <div v-if="ishidden == 2">
                  <creat-group ref="creatGroup"></creat-group>
                </div>
                <div v-if="ishidden == 3">
                  <plan-list ref="planList"></plan-list>
                </div>
              </div>
              <!-- 今日计划 -->
              <div v-if="noTitleKey === 'nowPlan'">
                <a-collapse v-model="activePlanKey" class="active_plan">
                  <a-collapse-panel key="1" class="collapse_header">
                    <template slot="header">
                      <a-row type="flex" justify="space-between" align="middle">
                        <a-col :span="8">
                          <span>计划一</span>
                        </a-col>
                        <a-col :span="16">
                          <a-progress :percent="70" />
                        </a-col>
                      </a-row>
                    </template>
                    <div class="planGroup">
                      <a-collapse v-model="activeGroupKey">
                        <a-collapse-panel key="11" class="collapse_group">
                          <template slot="header">
                            <a-row type="flex" justify="space-between" align="middle">
                              <a-col :span="8">
                                <span>组一</span>
                              </a-col>
                              <a-col :span="16">
                                <a-progress :percent="70" />
                              </a-col>
                            </a-row>
                          </template>
                          <div class="river_group">
                            <a-collapse
                              v-model="activeRiverKey"
                              style="border-bottom:1px solid d9d9d9;"
                            >
                              <a-collapse-panel key="111" class="collapse_river">
                                <template slot="header">
                                  <div @click="searchMap">黄浦江</div>
                                </template>
                                <div style="padding:10px 10px;">
                                  <div>
                                    <div class="riverGroup_info">未完成</div>
                                    <a-tree
                                      v-model="checkedKeys"
                                      @select="onSelect"
                                      :selectedKeys="selectedKeys"
                                      :treeData="treeData"
                                    ></a-tree>
                                  </div>
                                  <div class>
                                    <div class="riverGroup_success">已完成</div>
                                    <a-tree v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys"
                                      :treeData="treeData" class="tree_succ">
                                      <template slot="custom" slot-scope="item">
                                        <span>{{ item.title }}</span>
                                        <!-- <a-button
                                          class="but_type"
                                          v-if="childNode"
                                          @click="()=> searchItme(item)"
                                        >查看</a-button> -->
                                      </template>
                                    </a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_warning">异常</div>
                                    <a-tree
                                      v-model="checkedKeys"
                                      @select="onSelect"
                                      :selectedKeys="selectedKeys"
                                      :treeData="treeData"
                                    ></a-tree>
                                  </div>
                                </div>
                                <div class="addTaskBtn">
                                  <a-button class="addTask_btn" icon="plus" @click="addNewTask">追加任务</a-button>
                                </div>
                              </a-collapse-panel>
                            </a-collapse>
                          </div>
                        </a-collapse-panel>
                      </a-collapse>
                      <a-collapse v-model="activeTwo">
                        <a-collapse-panel key="11" class="collapse_group">
                          <template slot="header">
                            <a-row type="flex" justify="space-between" align="middle">
                              <a-col :span="8">
                                <span>组二</span>
                              </a-col>
                              <a-col :span="16">
                                <a-progress :percent="70" />
                              </a-col>
                            </a-row>
                          </template>
                          <div class="river_group">
                            <a-collapse
                              v-model="activeTwo"
                              style="background-color:#FFFFFF;border-bottom:1px solid d9d9d9;"
                            >
                              <a-collapse-panel header="黄浦江" key="111" class="collapse_river">
                                <div style="padding:10px 10px;">
                                  <div>
                                    <div class="riverGroup_info">未完成</div>
                                    <a-tree
                                      v-model="checkedKeys"
                                      @select="onSelect"
                                      :selectedKeys="selectedKeys"
                                      :treeData="treeData"
                                    ></a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_success">已完成</div>
                                    <a-tree
                                      v-model="checkedKeys"
                                      @select="onSelect"
                                      :selectedKeys="selectedKeys"
                                      :treeData="treeData"
                                    ></a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_warning">异常</div>
                                    <a-tree
                                      v-model="checkedKeys"
                                      @select="onSelect"
                                      :selectedKeys="selectedKeys"
                                      :treeData="treeData"
                                    ></a-tree>
                                  </div>
                                </div>
                                <div class="addTaskBtn">
                                  <a-button class="addTask_btn" icon="plus" @click="addNewTask">追加任务</a-button>
                                </div>
                              </a-collapse-panel>
                            </a-collapse>
                          </div>
                        </a-collapse-panel>
                      </a-collapse>
                    </div>
                    <div class="btn_group">
                      <a-row type="flex" justify="space-around">
                        <a-col :span="10">
                          <a-button class="groupBtn" @click="detailPlan">详情</a-button>
                        </a-col>
                        <a-col :span="10">
                          <a-button class="groupBtn" @click="supervision_btn" v-if="!undone">监管</a-button>
                          <a-button class="groupBtn" @click="updateTime" v-if="undone">修改时间</a-button>
                        </a-col>
                      </a-row>
                    </div>
                  </a-collapse-panel>
                </a-collapse>
              </div>
            </a-card>
            <a-card
              :tabList="superCard"
              :activeTabKey="nosuperKey"
              @tabChange="key => onsuperChange(key,'nosuperKey')"
              v-if="!firstShow"
            >
              <div v-if="nosuperKey === 'taskCard'">
                <a-collapse v-model="activePlanKey" class="active_plan">
                  <a-collapse-panel key="1" class="collapse_header">
                    <template slot="header">
                      <a-row type="flex" justify="space-between" align="middle">
                        <a-col :span="8">
                          <span>计划一</span>
                        </a-col>
                        <a-col :span="16">
                          <a-progress :percent="70" />
                        </a-col>
                      </a-row>
                    </template>
                    <div class="planGroup">
                      <a-collapse v-model="activeGroupKey">
                        <a-collapse-panel key="11" class="collapse_group">
                          <template slot="header">
                            <a-row type="flex" justify="space-between" align="middle">
                              <a-col :span="8">
                                <span>组一</span>
                              </a-col>
                              <a-col :span="16">
                                <a-progress :percent="70" />
                              </a-col>
                            </a-row>
                          </template>
                          <div class="river_group">
                            <a-collapse
                              v-model="activeRiverKey"
                              style="border-bottom:1px solid d9d9d9;"
                            >
                              <a-collapse-panel key="111" class="collapse_river">
                                <template slot="header">
                                  <div @click="searchMap">黄浦江</div>
                                </template>
                                <div style="padding:10px 10px;">
                                  <div>
                                    <div class="riverGroup_info">未完成</div>
                                    <a-tree
                                      v-model="checkedKeys"
                                      @select="onSelect"
                                      :selectedKeys="selectedKeys"
                                      :treeData="treeData"
                                    ></a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_success">已完成</div>
                                    <a-tree
                                      v-model="checkedKeys"
                                      @select="onSelect"
                                      :selectedKeys="selectedKeys"
                                      :treeData="treeData"
                                    ></a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_warning">异常</div>
                                    <a-tree
                                      v-model="checkedKeys"
                                      @select="onSelect"
                                      :selectedKeys="selectedKeys"
                                      :treeData="treeData"
                                    ></a-tree>
                                  </div>
                                </div>
                                <div class="addTaskBtn">
                                  <a-button class="addTask_btn" icon="plus" @click="addNewTask">追加任务</a-button>
                                </div>
                              </a-collapse-panel>
                            </a-collapse>
                          </div>
                        </a-collapse-panel>
                      </a-collapse>
                      <a-collapse v-model="activeTwo">
                        <a-collapse-panel key="11" class="collapse_group">
                          <template slot="header">
                            <a-row type="flex" justify="space-between" align="middle">
                              <a-col :span="8">
                                <span>组二</span>
                              </a-col>
                              <a-col :span="16">
                                <a-progress :percent="70" />
                              </a-col>
                            </a-row>
                          </template>
                          <div class="river_group">
                            <a-collapse
                              v-model="activeTwo"
                              style="background-color:#FFFFFF;border-bottom:1px solid d9d9d9;"
                            >
                              <a-collapse-panel header="黄浦江" key="111" class="collapse_river">
                                <div style="padding:10px 10px;">
                                  <div>
                                    <div class="riverGroup_info">未完成</div>
                                    <a-tree
                                      v-model="checkedKeys"
                                      @select="onSelect"
                                      :selectedKeys="selectedKeys"
                                      :treeData="treeData"
                                    ></a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_success">已完成</div>
                                    <a-tree
                                      v-model="checkedKeys"
                                      @select="onSelect"
                                      :selectedKeys="selectedKeys"
                                      :treeData="treeData"
                                    ></a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_warning">异常</div>
                                    <a-tree
                                      v-model="checkedKeys"
                                      @select="onSelect"
                                      :selectedKeys="selectedKeys"
                                      :treeData="treeData"
                                    ></a-tree>
                                  </div>
                                </div>
                                <div class="addTaskBtn">
                                  <a-button class="addTask_btn" icon="plus" @click="addNewTask">追加任务</a-button>
                                </div>
                              </a-collapse-panel>
                            </a-collapse>
                          </div>
                        </a-collapse-panel>
                      </a-collapse>
                    </div>
                    <div class="btn_group">
                      <a-button class="addTask_btn" @click="detailPlan">详情</a-button>
                    </div>
                  </a-collapse-panel>
                </a-collapse>
              </div>
              <div v-if="nosuperKey === 'personCard'">
                <a-collapse v-model="activePlanKey" class="active_plan">
                  <a-collapse-panel key="1" class="collapse_header">
                    <template slot="header">
                      <a-row type="flex" justify="space-between" align="middle">
                        <a-col :span="8">
                          <span>计划一</span>
                        </a-col>
                        <a-col :span="16">
                          <a-progress :percent="70" />
                        </a-col>
                      </a-row>
                    </template>
                    <div class="planGroup">
                      <a-collapse v-model="activeGroupKey">
                        <a-collapse-panel key="11">
                          <template slot="header">
                            <a-row type="flex" justify="space-between" align="middle">
                              <a-col :span="8">
                                <span>组一</span>
                              </a-col>
                              <a-col :span="16">
                                <a-progress :percent="70" />
                              </a-col>
                            </a-row>
                          </template>
                          <div class="plan_personInfo">
                            <a-checkbox-group @change="onChange">
                              <a-row>
                                <a-col class="person_check" :span="24" v-for="(item,index) in personInfo" :key="index">
                                  <a-row type="flex" justify="space-around" align="middle">
                                    <a-col :span="20">
                                      <a-checkbox class="checkboxClass" :value="item.id" >{{item.name}}&nbsp;({{item.position}})</a-checkbox>
                                    </a-col>
                                    <a-col :span="4" style="line-height:30px;">
                                      <div style="line-height:30px;width:10px;height:10px;border-radius:50%;background-color:green;"></div>
                                    </a-col>
                                  </a-row> 
                                </a-col>
                              </a-row>
                            </a-checkbox-group>
                            <!-- <a-list bordered :dataSource="personInfo">
                              <a-list-item slot="renderItem" slot-scope="item">
                                <a
                                  slot="actions"
                                  syle="width:10px;height:10px;border-radius:50%;background-color:green;"
                                ></a>
                                {{item.name}}&nbsp;({{item.position}})
                              </a-list-item>
                            </a-list> -->
                          </div>
                        </a-collapse-panel>
                      </a-collapse>
                    </div>
                  </a-collapse-panel>
                </a-collapse>
              </div>
            </a-card>
          </div>
          <!-- 底部 -->
          <div class="addPlan_foot" v-show="noTitleKey === 'addPlan'">
            <div v-if="ishidden == 1">
              <a-row type="flex" justify="space-around">
                <a-col :span="10">
                  <a-button class="groupBtn" @click="newPlan_btn">生成计划</a-button>
                </a-col>
                <a-col :span="10">
                  <a-popover title="加入计划" placement="topLeft" trigger="click" :width="100">
                    <template slot="content">
                      <a-list size="small">
                        <a-list-item>
                          <a-row
                            type="flex"
                            justify="space-around"
                            align="middle"
                            style="width:100%;"
                          >
                            <a-col :span="18">
                              <span>计划一</span>
                            </a-col>
                            <a-col :span="6">
                              <a-icon type="plus" @click="addToPlan" class="addToPlan" />
                            </a-col>
                          </a-row>
                        </a-list-item>
                        <a-list-item>
                          <a-row
                            type="flex"
                            justify="space-around"
                            align="middle"
                            style="width:100%;"
                          >
                            <a-col :span="18">
                              <span>计划二</span>
                            </a-col>
                            <a-col :span="6">
                              <a-icon type="plus" @click="addToPlan" class="addToPlan" />
                            </a-col>
                          </a-row>
                        </a-list-item>
                        <a-list-item>
                          <a-row
                            type="flex"
                            justify="space-around"
                            align="middle"
                            style="width:100%;"
                          >
                            <a-col :span="18">
                              <span>计划三</span>
                            </a-col>
                            <a-col :span="6">
                              <a-icon type="plus" @click="addToPlan" class="addToPlan" />
                            </a-col>
                          </a-row>
                        </a-list-item>
                      </a-list>
                    </template>
                    <a-button class="groupBtn">加入已有计划</a-button>
                  </a-popover>
                </a-col>
              </a-row>
            </div>
            <div v-if="ishidden == 2">
              <a-row type="flex" justify="space-around">
                <a-col :span="10">
                  <a-button class="groupBtn" @click="canclePlanBtn">取消</a-button>
                </a-col>
                <a-col :span="10">
                  <a-button class="groupBtn" @click="showPlanBtn">下一步</a-button>
                </a-col>
              </a-row>
            </div>
            <div v-if="ishidden == 3">
              <a-row type="flex" justify="space-around">
                <a-col :span="10">
                  <a-button class="groupBtn" @click="previousBtn">上一步</a-button>
                </a-col>
                <a-col :span="10">
                  <a-button class="groupBtn" @click="reHome">返回首页</a-button>
                </a-col>
              </a-row>
            </div>
          </div>
          <div class="addPlan_foot" v-if="!firstShow">
            <div v-if="ishidden == 4">
              <a-button style="width:90%;color:#1890ff;" @click="returnPre" >返回上一级</a-button>
            </div>
          </div>
        </div>
      </template>
    </split-pane>
    <!-- 弹框 -->
    <add-new-task ref="addNewTask"></add-new-task>
    <plan-detail ref="planDetail"></plan-detail>
    <sitution-info ref="situtionInfo"></sitution-info>
    <update-time ref="updateTime"></update-time>
    <communication ref="communication"></communication>
    <!-- 河道信息弹框 -->
    <a-modal :visible="infoVisible" :closable="false" :mask="false" :width="400" class="cmModal">
        <template slot="title">
            <span>河道信息</span>
        </template>
        <div>
          <p>河道总长：320km</p>
        </div>
        <template slot="footer">
          <a-button key="" @click="showCancel">取消</a-button>
          <a-button key="submit" type="primary" @click="showOk">添加</a-button>
        </template>
    </a-modal>
  </div>
</template>

<script>
import '../../assets/css/monitor.less'
import 'ol/ol.css'
// import Map from "ol/Map"
import View from 'ol/View'
// import TileLayer from 'ol/layer/Tile'
import LayerGroup from 'ol/layer/Group'
import XYZ from 'ol/source/XYZ'
import Draw from 'ol/interaction/Draw';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM,Vector as VectorSource} from 'ol/source';


import searchRiver from '../modals/searchRiver'
import addTask from '../modals/addTask'
import creatGroup from '../modals/creatGroup'
import planList from '../modals/planList'
import addSurvey from '../modals/addSurvey'
import addNewTask from '../modals/addNewTask'
import planDetail from '../modals/planDetail'
import situtionInfo from './modules/situtionInfo'
import updateTime from './modules/updateTime'
import communication from './modules/communication'

const sutreeData = [
  {
    title: '0-0',
    key: '0-0',
    scopedSlots: { title: 'custom' },
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        scopedSlots: { title: 'custom' },
        children: [
          { title: '0-0-0-0', key: '0-0-0-0', scopedSlots: { title: 'custom' } },
          { title: '0-0-0-1', key: '0-0-0-1', scopedSlots: { title: 'custom' } },
          { title: '0-0-0-2', key: '0-0-0-2', scopedSlots: { title: 'custom' } }
        ]
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        scopedSlots: { title: 'custom' },
        children: [
          { title: '0-0-1-0', key: '0-0-1-0', scopedSlots: { title: 'custom' } },
          { title: '0-0-1-1', key: '0-0-1-1', scopedSlots: { title: 'custom' } },
          { title: '0-0-1-2', key: '0-0-1-2', scopedSlots: { title: 'custom' } }
        ]
      },
      {
        title: '0-0-2',
        key: '0-0-2',
        scopedSlots: { title: 'custom' }
      }
    ]
  },
  {
    title: '0-1',
    key: '0-1',
    scopedSlots: { title: 'custom' },
    children: [
      { title: '0-1-0-0', key: '0-1-0-0', scopedSlots: { title: 'custom' } },
      { title: '0-1-0-1', key: '0-1-0-1', scopedSlots: { title: 'custom' } },
      { title: '0-1-0-2', key: '0-1-0-2', scopedSlots: { title: 'custom' } }
    ]
  },
  {
    title: '0-2',
    key: '0-2',
    scopedSlots: { title: 'custom' }
  }
]

const treeData = [
  { 
    title: '人工调查点',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: '调查点1',
        value: '0-1-0',
        key: '0-1-0',
        riverData: [
          {
            lat: 31.24539,
            lng: 121.48686
          }
        ]
      },
      {
        title: '调查点2',
        value: '0-1-1',
        key: '0-1-1',
        riverData: [
          {
            lat: 31.21882,
            lng: 121.50364
          }
        ]
      },
      {
        title: '调查点3',
        value: '0-1-2',
        key: '0-1-2',
        riverData: [
          {
            lat: 31.25153,
            lng: 121.52409
          }
        ]
      }
    ]
  }
]

const personInfo = [
  {
    id: 1,
    name: '张三',
    position: '飞手',
    point:{lat:31.21098,lng:121.495505}
  },
  {
    id: 2,
    name: '李四',
    position: '调查员',
    point:{lat:31.21038,lng:121.485505}
  },
  {
    id: 3,
    name: '王五',
    position: '司机',
    point:{lat:31.21098,lng:121.475505}
  }
]

const riverData = [
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

const LineData = [
  {
    lat: 31.21842,
    lng: 121.50458
  },
  {
    lat: 31.21265,
    lng: 121.50427
  },
  {
    lat: 31.20583,
    lng: 121.49903
  }
]

const cardData = [
  {
    lat:31.21098,
    lng:121.495505
  },
  {
    lat:31.21038,
    lng:121.485505
  },
  {
    lat:31.21098,
    lng:121.475505
  }
]
export default {
  name: 'Analysis',
  components: {
    searchRiver,
    addTask,
    creatGroup,
    planList,
    addSurvey,
    addNewTask,
    planDetail,
    situtionInfo,
    updateTime,
    communication
  },
  data() {
    return {
      planList: [
        {
          key: 'addPlan',
          tab: '新建计划'
        },
        {
          key: 'nowPlan',
          tab: '今日计划'
        }
      ],
      superCard: [
        {
          key: 'taskCard',
          tab: '任务'
        },
        {
          key: 'personCard',
          tab: '轨迹'
        }
      ],
      noTitleKey: 'addPlan',
      nosuperKey: 'taskCard',
      checkedKeys: [],
      selectedKeys: [],
      treeData,
      sutreeData,
      LineData,  //模拟河道内任务点数据
      cardData, //车辆轴迹位置信息
      ishidden: 1,
      checkedPlan: [],
      cBtn: true,
      activePlanKey: ['1'],
      activeGroupKey: ['11'],
      activeRiverKey: ['111'],
      activeKey: ['1'],
      activeTwo: [],
      personInfo,
      mapType: 'a',
      text: '当前河道方位内出现红色风险源',
      // 地图对象
      map: {},
      layer:[],
      // 地图节点对象（里面含节点对象、区域对象、任务弹窗对象）
      mapPoint: new Map(),
      lineTool: '', //工具-线
      lng:'', //坐标点
      lat:'',
      riverData,
      polygon: '', // 多边形对象
      markerInfo:'',//任务弹出框
      infoVisible:false,
      firstShow: true,
      childNode: false,
      checked: false,
      undone: false,
      mapMarkers: new Map(),
      patrolPlanInfo: [
        {
          title: '黄浦江',
          key: '1',
          children: [{ title: '当前河道方位内出现红色风险源,推荐加入巡查计划', key: '1' }]
        },
        {
          title: '鸭绿江',
          key: '2',
          children: [
            {
              title: '当前河道预设任务完成度滞后！其中360未完成3个、正射影像线路：A1+B2+C3未执行，推荐加入调查计划',
              key: '2'
            }
          ]
        }
      ]
    }
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  watch: {
    //选中树节点
    checkedKeys(val) {
      console.log('onCheck', val)
    }
  },
  mounted() {
    this.initCruisePlan()
  },
  methods: {
    getTdLayer(lyr){
      var url = "http://t{0-7}.tianditu.com/DataServer?T=" + lyr + "&x={x}&y={y}&l={z}&tk=b4840c07acad9f2144370bb8abaf80fc"
      this.layer = new TileLayer({
        source: new XYZ({
          url: url
        })
      });
      return this.layer;
    },
    initCruisePlan() {
      const that = this
      //初始化地图控件
      let zoom = 14
      that.map = new T.Map('map')
      that.map.centerAndZoom(new T.LngLat(121.495505, 31.21098), zoom)
      //openlayers引入天地图进行地图初始化渲染
      // var vec_c = this.getTdLayer("vec_w");
      // var cva_c = this.getTdLayer("cva_w");
      // var layerGroup = new LayerGroup({
      //   layers:[vec_c,cva_c]
      // });
      // this.map = new Map({
      //   target:'map',
      //   layers:[layerGroup],
      //   view:new View({
      //     projection: "EPSG:4326",
      //     center: [121.495505, 31.21098],
      //     zoom: 14
      //   })
      // });
      
      //*************************暂费***************************** */
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
    //选中添加河道或今日计划面板
    onTabChange(key, type) {
      this[type] = key
      if(key == 'addPlan'){
        this.ishidden = 1
      }
      if (key == 'nowPlan') {
        let sutree = this.sutreeData
        this.diguiTree(sutree)

        // var btm = document.getElementsByClassName('.right-body .ant-card-body');
        // btm.style.bottom = '0'
      }
      this.clearMap();
    },
    diguiTree(item) {
      for (let i in item) {
        if (item[i].children == null) {
          this.childNode = true
          return
        } else {
          this.diguiTree(item[i].children)
        }
      }
    },
    onsuperChange(key, type) {
      this[type] = key
      this.clearMap()
      if(key == 'taskCard'){
        this.loadPoint()
      }
      if(key == 'personCard'){
        this.cardTrack()
        // console.log(this.personInfo.length)
        for(var i = 0;i< this.personInfo.length;i++){
          console.log(this.personInfo[i].point)
          // this.addTaskPoint(this.personInfo[i].point)
        }
        //默认全部选中  当页面渲染完成时执行
        setTimeout(function(){
          var cbArr = document.getElementsByClassName("checkboxClass")
          console.log("长度啊啊啊啊啊", cbArr.length)
          for(var i = 0; i< cbArr.length; i++){
            console.log(cbArr[i])
            cbArr[i].click()
          }
        },500)
        
        // this.addTaskPoint(this.cardData)
      }
    },
    //日期选择
    selectData(date, dateString) {
      console.log(data, dateString)
    },
    //选中巡河方案
    selectPatrol() {},
    addTaskBtn() {
      this.$refs.addTask.show()
      this.cBtn = false
      // this.$refs.addTask.chooseLocation()
    },
    //右侧模块选择框修改
    handleChange() {},
    //选中树节点内容
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    //生成计划
    newPlan_btn() {
      this.ishidden = 2
    },
    //图像显示修改
    onMapChange() {},
    //底部取消按钮
    canclePlanBtn() {
      this.ishidden = 1
    },
    //底部下一步按钮
    showPlanBtn() {
      this.ishidden = 3
    },
    //底部上一步按钮
    previousBtn() {
      this.ishidden = 2
    },
    //返回首页
    reHome() {
      this.ishidden = 1
    },
    //底部返回上一级按钮
    returnPre(){
      this.clearMap()
      this.firstShow = true 
      this.nosuperKey = 'taskCard' 
    },
    //今日计划中组点击
    selectGroup() {},
    //当日计划模块追加任务
    addNewTask() {
      this.$refs.addNewTask.showtask()
    },
    //当日计划模块详情按钮
    detailPlan() {
      this.$refs.planDetail.show()
      // this.$refs.communication.show()
    },
    //今日计划模块监管按钮
    supervision_btn() {
      console.log('今日计划')
      console.log(this.firstShow)
      this.firstShow = !this.firstShow 
      console.log(this.firstShow);
      // if(this.firstShow == true){
      //   this.ishidden == 1
      // }
      if(this.firstShow == false){
        this.ishidden = 4
        this.loadPoint();
      }  
    },
    changeInfo(key) {
      console.log(key)
    },
    searchItme() {
      this.$refs.situtionInfo.show()
      // console.log('选中查看按钮' + val)
    },
    //今日计划模块修改时间
    updateTime() {
      this.$refs.updateTime.show()
    },
    //加入已有计划
    addToPlan() {
      this.$message.success('加入成功')
      this.noTitleKey = 'nowPlan'
    },
    showOk(){
      this.infoVisible = true;
    }, 
    showCancel(){
      this.infoVisible = false;
    },
    onChange(checkedValues){
      console.log('checked = ', checkedValues)
      this.checkPoint(checkedValues)
    },
    checkPoint(vals){            
      for(var i = 0;i<this.personInfo.length;i++){
        var item = this.personInfo[i];
        if(this.isExistInArr(vals, item.id)){//当前节点被选中
          //判断当前节点是否已经存在于地图上
          if(!this.mapMarkers.has(item.id)){
            //new一个marker，并以键值形式存储，以备后续操作
            var lnglat = new T.LngLat(item.point.lng,item.point.lat)
            var marker = new T.Marker(lnglat)
            this.map.addOverLay(marker)
            //存放当前marker
            this.mapMarkers.set(item.id, marker)
          }

        }else{//当前节点被取消勾选
          if(this.mapMarkers.has(item.id)){
            //从地图删除
            this.map.removeOverLay(this.mapMarkers.get(item.id))
            //同时从暂存的mapMarkers中删除
            this.mapMarkers.delete(item.id)
          }
        }
      }
      console.log("当前markers=================：", this.mapMarkers.keys())
      console.log("当前markers000000000000000000：", this.mapMarkers.values())
      // for(var i = 0;i<this.personInfo.length;i++){
      //   if(checkedValues[i] == i){
      //       // console.log("checked:" + i);
      //       this.addTaskPoint(this.personInfo[i].point)
      //   }else{
      //     var lng = this.personInfo[i].point.lng
      //     var lat = this.personInfo[i].point.lat
      //     console.log(lng + ":::" + lat)
      //     var lnglat = new T.LngLat(lng,lat)
      //     var marker = new T.Marker(lnglat)
      //     this.map.removeOverLay(marker)
      //   }
      // }
    },
    isExistInArr(arr, item){
      for(var i = 0; i< arr.length; i++){
        if(arr[i] == item){
          return true;
        }
      }
      return false;
    },
    isExistInMarkers(){

    },
    //********************************地图操作事件***************************************** */
    //任务模块任务点
    loadPoint(){
      //随机标注点
      var bounds = this.map.getBounds()
      var ref = this.$refs
      var sw = bounds.getSouthWest()
      var ne = bounds.getNorthEast()
      var lngSpan = Math.abs(sw.lng - ne.lng)
      var latSpan = Math.abs(ne.lat - sw.lat)
      for(var i = 0; i < 25;i++){
        var point = new T.LngLat(sw.lng + lngSpan * (Math.random() * 0.7),ne.lat - latSpan * (Math.random() * 0.7))
        var marker = new T.Marker(point)
        this.map.addOverLay(marker)
        marker.addEventListener("click",function(){
          ref.communication.show()
        })
      }
    },
    //车辆轴迹
    cardTrack(){
      var lineconfig={ 
          color: "#2C64A7",            //线的颜色
          weight: 5,               //线的宽度
          opacity: 0.9,             //线的透明度
          lineStyle:"solid"        //线的样式
      };
      var line = new T.Polyline(this.cardData,lineconfig)  //创建线条的对象
      //向地图上添加线
      this.map.addOverLay(line)
      this.addIcon()
    },
    //添加车辆起点图标
    addIcon(){
      var startIcon = "http://lbs.tianditu.gov.cn/images/bus/start.png";	//起点图标
      var icon = new T.Icon({
        iconUrl:startIcon,
        iconSize:new T.Point(44, 34),
        iconAnchor: new T.Point(12, 31)
      })
      var marker = new T.Marker(new T.LngLat(121.495505, 31.21098),{icon: icon});
      this.map.addOverLay(marker);
    },
    //点击滑动关闭按钮
    onChangeSwitch() {},
    //添加河道按钮事件
    addRiverBtn() {
      this.$refs.selectPatrol.show()
      this.$refs.addSurvey.close()
      this.clearMap()
      console.log(this.riverData)
      //描绘河道
      this.searchMap()
      // this.showOk()
      // this.addTaskPoint();
    },
    //添加任务点
    addTaskPoint(riverData){
      // console.log(riverData.length)
      if(riverData.length != undefined){
        for(var i=0;i < riverData.length;i++){
          var lnglat = new T.LngLat(riverData[i].lng,riverData[i].lat)
          var marker = new T.Marker(lnglat)
          this.map.addOverLay(marker)
          this.showPosition(marker)
        }
      }else{
        var lnglat = new T.LngLat(riverData.lng,riverData.lat)
        var marker = new T.Marker(lnglat)
        this.map.addOverLay(marker)
        this.showPosition(marker)
      } 
    },
    //地图上信息弹框
    showPosition(marker){
       marker.addEventListener("click",function(){
          var html = "<div style='margin:0px;'>"+
          "<div style='line-height:30px;font-size:18px;margin-bottom:5px'>"+
          "采集水样标本</div>"+
          "<div style='line-height:25px;'>"+
          "<div><span style='color:;'>任务名称</span>：水样调查"+"</div>"+
          "<div>任务内容：现场测定：ph、溶解氧、浊度（3次）、电导率、透明度"+"</div>"+
          "<div>位置信息：上海市徐汇区龙川北路422-5"+"</div>"+
          "<div>备注："+
            "<div>当月计划执行次数：5"+"</div>"+
            "<div>当月待执行次数：2"+"</div>"+
          "</div>"+
          "</div>"+"</div>";
          var infoWin = new T.InfoWindow(html)
          marker.openInfoWindow(infoWin)
        });      
    },
    //河道计划点击事件
    onSelect(selectedKeys, info) {
      this.clearMap()
      this.selectedKeys = selectedKeys
      var info = info.node.dataRef
      if(info.children){
        for(var i = 0; i< info.children.length;i++){
           if(info.children[i].riverData.length > 1){
            console.log(info.children[i].riverData)
            this.map.setZoom("12")
            // this.positionArea(info.children[i].riverData)
            this.addPolyLine(info.children[i].riverData)
          }
          if(info.children[i].riverData.length == 1){
            this.map.setZoom("12")
            this.addTaskPoint(info.children[i].riverData)
          } 
        }
      }else{
        if(info.riverData.length > 1){
          // this.positionArea(info.riverData)
          this.addPolyLine(info.children[i].riverData)
        }
        if(info.riverData.length == 1){  
          this.map.setViewport(info.riverData) 
          this.map.setZoom("13")       
          this.addTaskPoint(info.riverData) 
        }        
      }
    }, 
    //追加任务画线
    addLineTool(){
      console.log("我是父组件，调用了子组件的方法")
      this.lineTool = new T.PolylineTool(this.map)
      this.lineTool.open()
      this.lineTool.setTips(`<p style="padding:0px;">单击确认起点, 双击结束绘制</p>`)
    },
    //取消追加任务
    cancelAddTask(){
      this.clearMap()
      this.$refs.addTask.cancle()
      this.cBtn = true
    },
    //添加调查点
    addSurveyPoint(){
      this.removeMapClick();
      this.clearMap()
      this.map.addEventListener("click", this.MapClick);
      this.$refs.selectPatrol.close()
      this.$refs.addSurvey.show();
    },
    // 添加调查点事件
    MapClick(e) {
      const postion = [];
      const that = this;
      let icon = new T.Icon({
        iconUrl: "http://api.tianditu.gov.cn/img/map/markerA.png",
        iconSize: new T.Point(19, 27),
        iconAnchor: new T.Point(10, 25)
      });
      //向地图上添加中心标注
      this.lng = e.lnglat.lng;
      this.lat = e.lnglat.lat;
      console.log("坐标:" + this.lng , this.lat);
      let marker = new T.Marker(new T.LngLat(e.lnglat.lng, e.lnglat.lat), {icon: icon});
      console.log("marker:" +marker);
      this.map.addOverLay(marker);

      var infoWin = new T.InfoWindow();
      var sContent = "<div style='width:100px;height:100%;text-align:center;line-height:25px;'><div style='border-bottom:1px solid green;width:100%;height:100%;'>360</div>"+
                      "<div @click='addPoint'>人工调查点</div><div>水质监测点</div></div>";
      infoWin.setContent(sContent);
      marker.addEventListener("click",function(){
        marker.openInfoWindow(infoWin);
      })
      //向地图上添加圆
      let circle = new T.Circle(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 1000, {
        color: "blue",
        weight: 2,
        opacity: 0.5,
        fillColor: "#FFFFFF",
        fillOpacity: 0.4,
        lineStyle: "solid"
      });
      // this.map.addOverLay(marker);
      // 向地图注册标注点击事件
      this.map.addOverLay(circle)
      this.addMorePoint();
      //禁用线编辑
      circle.disableEdit(); 
      //移除标注的点击事件，防止多次注册
      this.removeMapClick()
    },
    // 地图删除指定事件
    removeMapClick() {
      this.map.removeEventListener("click", this.MapClick);
    },
    addPoint(){
      this.map.removeEventListener("click", this.MapClick);
    },
    //清空地图
    clearMap(){
       this.map.clearOverLays();
    },
    //显示地图上调查点内任务点
    addMorePoint(){
      var dLng = this.lng;
      var dLat = this.lat;
      var marker1;
      var content;
      var data_info = [];
      for(var i = 0;i <2; i++){
         dLng = dLng+(0.0001 * (Math.floor(Math.random() * 10 + 1)));
         dLat = dLat+(0.0001 * (Math.floor(Math.random() * 10 + 1)));
         data_info[i] = [dLng,dLat,"地址:地址"+i];     
      }
      for(var i=0;i<data_info.length;i++){
        marker1 = new T.Marker(new T.LngLat(data_info[i][0],data_info[i][1]));
        content = data_info[i][2];
        this.map.addOverLay(marker1);

        marker1.addEventListener("click",function(e){
          var point = e.lnglat;
          marker1 = new T.Marker(point);
          var markerInfoWin = new T.InfoWindow(content,{offset:new T.Point(0,-30)});
          marker1.openInfoWindow(markerInfoWin,point);
        })
        // this.addClickHandler(content,marker1);
      }
    },
    addClickHandler(content,marker){
      marker.addEventListener("click",function(e){
          this.openInfo(content,e);
        })
    },
    //添加信息弹框
    openInfo(){
      var point = e.lnglat
      marker1 = new T.Marker(point)
      var markerInfoWin = new T.InfoWindow(content)
      marker1.openInfoWindow(markerInfoWin,point)
    },
    //高亮河道
    searchMap(){
      this.removeMapClick()
      this.clearMap()
      var infoVisible = this.infoVisible
     // 绘制多边形
      this.polygon = new T.Polygon(this.riverData,{
        color:'blue',
        weight:3,
        opacity:0.5,
        fillColor:'#FFFFFF',
        fillOpacity:0
      });
      this.map.addOverLay(this.polygon)
      this.map.setViewport(this.riverData)
      this.polygon.addEventListener('click',this.showOk)
      //显示河道标注点及信息
      this.addTaskPoint(this.LineData)
    },
    //添加标注点及信息框
    addRiverPoint(){  
      var markers = new T.Marker(new T.LngLat(121.50162,31.20880))
      this.map.addOverLay(markers)
      this.markerInfo = 
        "<div style='margin:0px;'>"+
          "<div style='line-height:30px;font-size:18px;margin-bottom:5px'>"+
          "采集水样标本</div>"+
          "<div style='line-height:25px;'>"+
          "<div><span style='color:;'>任务名称</span>：水样调查"+"</div>"+
          "<div>任务内容：现场测定：ph、溶解氧、浊度（3次）、电导率、透明度"+"</div>"+
          "<div>位置信息：上海市徐汇区龙川北路422-5"+"</div>"+
          "<div>备注："+
            "<div>当月计划执行次数：5"+"</div>"+
            "<div>当月待执行次数：2"+"</div>"+
          "</div>"+
          "</div>"+"</div>"
      var content = this.markerInfo
      var markerInfoWin = new T.InfoWindow()
      markerInfoWin.setContent(content)
      markers.addEventListener("click", function () {
          markers.openInfoWindow(markerInfoWin)
      });
    },
    //描绘多边形
    setPolygonLine(layerData,color,weighe,fillOpacity){
      this.polygon = new T.Polygon(layerData,{
        color: color,
        weight: weighe,
        opacity:0.5,
        fillColor:'#FFFFFF',
        fillOpacity:fillOpacity
      });
      this.map.addOverLay(this.polygon)
    },
    //定位到选中地
    positionArea(val){
      // this.clearMap();
      this.map.setViewport(val)
      this.setPolygonLine(val, 'red', 3, 0)
      // val.addEventListener('click', this.polygonClick) 
    },
    //多边形点击事件
    polygonClick(index){
      
    },
    //描绘线  
    addPolyLine(lineData){
      var lines = new T.PolyLine(lineData)
      this.map.addOverLay(lines)
    } 
  }
}
</script>

<style lang="less" scoped>
.splitter-pane splitter-paneL vertical {
  width: 72%;
}
.splitter-pane-resizer vertical {
  left: 72%;
}
.splitter-pane splitter-paneR vertical {
  width: 28%;
}
.weather {
  position: absolute;
  left: 10px;
  top: 85px;
  width: 360px;
  height: 60px;
  background-color: rgba(255, 255, 255, 1);
  opacity: 0.9;
  overflow: hidden;
  z-index: 999;
  border-radius: 4px;
  border: 1px solid rgb(204, 204, 204);
  display: flex;
  display: -webkit-flex;
  img {
    width: 60px;
    height: 60px;
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
  .tdt-infowindow-content{
    margin: 0;
  }
}
</style>
