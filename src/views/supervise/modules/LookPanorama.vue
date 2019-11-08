<template>
  <a-modal
    title="360全景图"
    class="panorama"
    width="90vw"
    style="top: 20px;"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :mask="true"
    :maskClosable="false"
    :centered="true"
    :footer="null"
  >
    <a-spin :spinning="confirmLoading">
      <a-card class="content">
        <div id="krpanoDIV" style="width:100%;height:100%;">
          <noscript>
            <table style="width:100%;height:100%;">
              <tr style="vertical-align:middle;">
                <td>
                  <div style="text-align:center;">
                    ERROR:
                    <br />
                    <br />Javascript not activated
                    <br />
                    <br />
                  </div>
                </td>
              </tr>
            </table>
          </noscript>
        </div>
      </a-card>
      <a-divider orientation="left"></a-divider>
      <a-row style="width:100%;" type="flex" justify="space-around">
        <a-col :span="3">
          <a-button block @click="handleCancel">取消</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block>保存</a-button>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>
// import '../js/krpano'
// let krpano = null
// function krpano_onready_callback(krpano_interface) {
//   krpano = krpano_interface
// }
export default {
  data() {
    return {
      visible: false,
      confirmLoading: false
    }
  },
  computed: {},
  mounted: function() {
    // embedpano({
    //   xml: '../js/test.xml',
    //   target: 'krpanoDIV',
    //   html5: 'only',
    //   consolelog: true,
    //   passQueryParameters: true,
    //   onready: krpano_onready_callback //回调函数，获取Krpano 对象 })
    // })
  },
  methods: {
    add() {
      this.visible = true
    },
    handleSubmit() {},
    handleCancel() {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
.panorama {
  top: 50px;
  .content {
    height: 60vh;
  }
}
</style>
