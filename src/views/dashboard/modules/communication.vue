<template>
     <a-modal :visible="visible" :footer="null" @cancel="cmtHandle" :width="400" class="cmModal">
        <template slot="title">
            <span style="background-color:#EBF5FF;border:1px solid #e8e8e8;border-radius: 50%;padding:8px 10px;">张</span>
        </template>
        <div class="player">
            <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :options="playerOptions" :playsinline="true"></video-player>
        </div>
    </a-modal>
</template>
<script>
export default {
    name:'',
    data(){
        return{
            visible:false,
            playerOptions: {
                height: '360',
                autoplay:false,
                muted: true,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: "video/mp4",
                    // mp4
                    src: "http://vjs.zencdn.net/v/oceans.mp4",
                    // webm
                    // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                }],
                poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
            }
        }
    },
     mounted(){
        setTimeout(() => {
            console.log('dynamic change options', this.player)
            this.player.muted(false)
        },5000)
    },
    computed:{
        player(){
            return this.$refs.videoPlayer.player
        }
    },
    methods:{
        show(){
            this.visible = true;
        },
        cmtHandle(){
            this.visible = false;
        }
    }
}
</script>
<style lang="less" scoped>
     .cmModal .ant-modal-body{
        padding: 10px;
    }
    .player{
      width: 100%;
      height: 100%;  
    }
    .video-player{
        width: 100%;
    }  
</style>
