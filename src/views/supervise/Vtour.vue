<template>
  <div id="wrapper">
    <div id="pano"></div>
  </div>
</template>
<script>
import './js/tour.js'

export default {
  name: 'vtour',
  data() {
    return {
      show: false,
      krpano: ''
    }
  },
  mounted() {
    // 加载动态JS文件
    var _doc = document.getElementsByTagName('head')[0]
    console.log(_doc)
    var js = document.createElement('script')
    js.setAttribute('type', 'text/javascript')
    js.setAttribute('src', './src/views/supervise/js/tour.js') // jsUrl是JS文件的路径
    _doc.appendChild(js)

    setTimeout(() => {
      embedpano({
        swf: './js/tour.swf', // krpano全景圖的swf文件路徑
        xml: './js/tour.xml', // krpano全景圖的xml文件路徑
        target: 'pano',
        html5: 'auto',
        mobilescale: 1.0,
        flash: 'auto',
        passQueryParameters: true
      })
      this.krpano = document.getElementById('krpanoSWFObject') // 保存全景圖對象
    }, 2000);

    // this.embedpano({
    //   swf: './js/tour.swf',
    //   xml: './js/tour.xml',
    //   target: 'pano',
    //   html5: 'auto',
    //   mobilescale: 1.0,
    //   passQueryParameters: false
    // })
  },
  methods: {
    getorder(msg) {
      console.log(msg)
      this.show = msg
    }
  }
}
</script>
<style scoped>
#wrapper {
  position: relative;
  height: calc(100vh - 64px);
  width: 100vw;
}
#pano {
  height: 100%;
  width: 100%;
}
</style>

