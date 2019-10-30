<template>
  <a-modal
    title="图片展示"
    :width="980"
    :visible="visible"
    @cancel="handleCancel"
    :confirmLoading="confirmLoading"
    :mask="true"
    :centered="true"
    :footer="null"
  >
    <a-spin :spinning="confirmLoading">
      <div class="content">
        <!-- <canvas width="3728" height="1800" id="canvasId"></canvas> -->
        <!-- <img id="image" src="../../../assets/loginBg.jpg" alt /> -->
        <!-- <div class="img-container">
          <img src="../../../assets/loginBg.jpg" alt="Picture" />
        </div>-->
        <div class="htmleaf-container">
          <!-- Content -->
          <div style="text-align:center;clear:both">
            <!--<script src="/gg_bd_ad_720x90.js" type="text/javascript"></script>-->
            <!-- <script src="/follow.js" type="text/javascript"></script> -->
          </div>
          <div class="container">
            <div class="img-container" v-show="!clipedShow">
              <img id="image" src="../../../assets/loginBg.jpg" alt="Picture" />
            </div>
            <img :src="clipedImage" v-show="clipedShow" alt />
          </div>
        </div>
      </div>
      <a-divider orientation="left"></a-divider>
      <a-row style="width:100%; margin-top:10px;" type="flex" justify="space-around">
        <a-col :span="3">
          <a-button block>画笔</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block>文字</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block @click="clipImage">裁剪</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block @click="lastStep">上一步</a-button>
        </a-col>
        <a-col :span="3">
          <a-button block>保存</a-button>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>
import '../js/cropper.js'
// import '../js/main.js'
export default {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      clipedShow: false, // 是否显示裁剪后的照片
      clipedImage: '' //裁剪后的照片链接
    }
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        this.init()
        $('#image').cropper({
          aspectRatio: 2 / 1,
          viewMode: 1,
          autoCrop: false, //关闭自动显示裁剪框
          ready: function() {
            $(this).cropper('crop')
          },
          crop: function(e) {
            console.log(e)
          }
        })
      })
    }, 1000)
  },
  methods: {
    // 裁剪
    clipImage() {
      console.log($('#image').cropper('getCroppedCanvas'))
      var cas = $('#image').cropper('getCroppedCanvas')
      var base64url = cas.toDataURL('image/jpeg')
      cas.toBlob(function(e) {
        console.log(e) //生成Blob的图片格式
      })
      console.log(base64url) //生成base64图片的格式
      this.clipedShow = true
      this.clipedImage = base64url
      // $('#image').attr('src', base64url) //在body显示出canvas元素
    },
    // 上一步
    lastStep() {
      $('#image').cropper('clear')
      $('#image').cropper('reset')
      $('#image').cropper('crop')
      this.clipedShow = false
      this.clipedImage = ''
    },
    init() {
      // var canvas = document.getElementById('canvasId')
      // var context = canvas.getContext('2d')
      // //加载图片
      // var image = new Image()
      // image.src = require('../../../assets/loginBg.jpg')
      // image.onload = function() {
      //   context.beginPath()
      //   //画裁剪区域，此处以圆为例
      //   // context.arc(50, 50, 50, 0, 2 * Math.PI)
      //   // context.clip() //次方法下面的部分为待剪切区域，上面的部分为剪切区域
      //   context.drawImage(image, 0, 0, canvas.width, canvas.height)
      // }
      // let image = document.getElementById('image')
      // var cropper = new Cropper(image, {
      //   aspectRatio: 16 / 9,
      //   viewMode: 1,
      //   crop: function(e) {
      //     console.log(e.detail.x)
      //     console.log(e.detail.y)
      //     console.log(e.detail.width)
      //     console.log(e.detail.height)
      //     console.log(e.detail.rotate)
      //     console.log(e.detail.scaleX)
      //     console.log(e.detail.scaleY)
      //   }
      // })
    },
    // 显示弹窗
    showVisible() {
      this.visible = true
    },
    // 关闭弹窗
    handleCancel() {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
@import '../css/cropper.css';
@import '../css/main.css';
// @import '../css/cropper.min.css';
.content {
  width: 100%;
  height: 450px;
  position: relative;
  #canvasId {
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
