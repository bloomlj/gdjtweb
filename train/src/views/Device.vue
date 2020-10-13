<!--  -->
<template>
  <div id='Device'>
    <!-- 导航 -->
    <v-Nav :navShow='1' @next='next' @revert='revert'></v-Nav>
    <!-- 右边界面 -->
    <div class="right">
      <div class="dev">
      <div style="text-align:left; margin-bottom:5px;">
        <el-button @click="revert" type="primary" plain>返回</el-button>
      </div>
        <div class="top">
            <div class="image">
              <img :src="deviceData?deviceData.picture:''" alt="">
                <!-- <template v-for="(item, index) in img">
                    <img :key="index" :src="item.src" :style="item.style" alt="">
                </template> -->
            </div>
            <div class="t-bottom">
                <p @click="change_model('cut')"><img src="../assets/img/left.png" alt=""></p>
                <p @click="change_model('add')"><img src="../assets/img/right.png" alt=""></p>
            </div>
        </div>
        <div class="text">
            <h2>{{deviceData?deviceData.title:''}}</h2>
            <p>{{deviceData?deviceData.origin:''}}</p>
        </div>
        <div class="btn">
            <button @click="show_videoState">动画播放</button>
            <button @click="show_mask">数字模型下载</button>
        </div>
      </div>
    </div>
    <!-- 视频播放 -->
    <div class="videoBox" v-if="videoState" @click.self="close_videoState">
      <video-player  class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'Device',
  components: {
    'v-Nav': Nav
  },
  data () {
    return {
      // 模型下标
      deIndex: 0,
      // 模型列表
      deviceAll: '',
      // device数据
      deviceData: '',
      // 视频备注数据
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: '', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: '' // url地址
        }],
        poster: '', // 你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
      videoState: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // console.log(this.$route.query.cateId)
    // 请求初始数据
    this.$http.modelDetail({
      model_id: this.$route.query.id
    }).then(res => {
      // console.log(res)
      if (res.data.ret === 200) {
        this.playerOptions.sources[0].src = res.data.data.video
        this.deviceData = res.data.data
      }
    }).catch(err => {
      console.log(err)
    })
    // 请求数据列表 并初始化下标
    this.$http.modelList({
      cate: this.$route.query.cateId
    }).then(res => {
      // console.log(res)
      if (res.data.ret === 200) {
        this.deviceAll = res.data.data
        for (const item in res.data.data) {
          // console.log(item)
          if (res.data.data[item].id === this.$route.query.id) {
            this.deIndex = item
          }
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 方法集合
  methods: {
    // 切换模型
    change_model (txt) {
      switch (txt) {
        case 'cut':
          this.deIndex--
          if (this.deIndex === -1) {
            this.deIndex = this.deviceAll.length - 1
          }
          break
        case 'add':
          this.deIndex++
          if (this.deIndex === this.deviceAll.length) {
            this.deIndex = 0
          }
          break
      }
      this.deviceData = this.deviceAll[this.deIndex]
      console.log(this.deviceData)
      this.playerOptions.sources[0].src = this.deviceData.video
    },
    next () {
      console.log('下一步')
    },
    revert () {
      this.$router.go(-1)
    },
    // 显示视频状态
    show_videoState () {
      this.videoState = true
    },
    // 关闭视频状态
    close_videoState () {
      this.videoState = false
    },
    // 遮罩显示
    show_mask () {
      this.$confirm('', '', {
        confirmButtonText: '继续下载',
        cancelButtonText: '返回',
        closeOnClickModal: false
      }).then(() => {
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
        window.location.href = this.deviceData.zips
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    }
  }
}
</script>
<style lang='scss'>
#Device{
  height: 100vh;
  min-width: 1200px;
  min-height: 675px;
  position: relative;
  .right {
    float: right;
    width: calc(100% - 113px);
    height: 100%;
    background: #F2F1F8;
    position: relative;
    .dev{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .top{
          width: 975px;
          height: 384px;
          background: white;
          position: relative;
          .image{
            text-align: center;
            padding-top: 20px;
            img{
              width: 924px;
              height: 283px;
            }
          }
          .t-bottom{
              position: absolute;
              left: 0;
              bottom: 16px;
              width: calc(100% - 62px);
              height: 25px;
              text-align: right;
              padding: 0 31px;
              p{
                  display: inline-block;
                  text-align: center;
                  width: 66px;
                  height: 100%;
                  background: #234186;
                  border-radius:3px;
                  margin-right: 11px;
                  img{
                      height: 100%;
                      width: auto;
                  }
              }
          }
      }
      .text{
          margin: 23px 0;
          height: 132px;
          text-align: left;
          h2{
              font-size: 19px;
              color: #0C1937;
              font-weight:400;
          }
          p{
              margin-top: 15px;
              font-size: 12px;
          }
      }
      .btn{
          height: 38px;
          button{
              width: 100px;
              height: 100%;
              border: none;
              outline: none;
              background: #FFC13C;
              color: white;
              border-radius:3px;
          }
          button:last-child{
              background: #68B999;
              margin-left: 35px;
          }
      }
    }
  }
  .videoBox{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    .video-player{
      // width: 50%;
      // height: 50%;
      width: 805px;
      height: 453px;
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      // border-radius: 20px;
      .video-js{
        width: 100%;
        height: 100%;
      }
    }
  }
}
.el-message-box__wrapper{
  .el-message-box{
      padding: 39px 0;
      .el-message-box__header{
          display: none;
      }
      .el-message-box__content{
          display: none;
      }
      .el-message-box__btns{
          text-align: center;
          .el-button--small{
              background: #D9D9D9;
              color: #999;
              font-size: 12px;
              padding: 10px 24px;
          }
          .el-button--primary{
              margin-left: 52px;
              background: #234186;
              color: white;
          }
      }
  }
}
</style>
