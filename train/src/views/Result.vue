<!--  -->
<template>
  <div id='Result'>
    <!-- 导航 -->
    <v-Nav :navShow='navShow' @next='next' @revert='revert'></v-Nav>
    <!-- 右边界面 -->
    <div class="right">
      <div class='res'>
        <!-- 评价 -->
        <div class="r-evaluate">
          <p>检修任务名称：{{name}}</p>
          <p>修任务疲劳积累评价：<span>{{weary}}</span></p>
          <p>检修任务强度评价：<span>{{intensity}}</span></p>
          <h3>检修任务设定友好型评价：<p class="yin">{{this.friendly[0]?this.friendly[0]:''}}<span>{{this.friendly[1]?this.friendly[1]:''}}</span></p> <!-- <p class="wen">良</p> --></h3>
          <div class="stamp">打印</div>
        </div>
        <!-- 修改的地方 -->
        <div class="r-modify">
          <div class="question">
            <h3>问题</h3>
            <p>一线检修人员认为他们长期承受着源于工作引起的生理不适与 心理压力，检修工作枯燥烦闷、强度高，且责任压力大、维修 环境差，是造成他们在生理、心理方面的疲劳与损伤，产生情 绪波动，影响工作效益，增多误操作等问题的主要原因（案例）</p>
          </div>
          <div class="optimize">
            <h3>设计优化建议</h3>
            <p>通过设计提升检修人员在列车检修人-机-环境系统中与其他因 素的匹配程度，有效地将以人为中心的理念整合到检修的设计 中，使检修人员能够在处于较为自然体态或舒适状态下进行检 修任务操作，达到提高作业者工作绩效的目的。（案例） 加强检修任务过程中各环节的交互性，尤其是加强包括环境、 机械、工具等相关因素与</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'Result',
  components: {
    'v-Nav': Nav
  },
  data () {
    return {
      // 友好评价
      friendly: '',
      // 任务强度评价
      intensity: '',
      // 疲劳积累评价
      weary: '',
      // 任务名称
      name: '',
      // 判断从哪里传过来
      navShow: 1
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
    // console.log(this.$route.query)
    this.navShow = parseInt(this.$route.query.navShow)
    // this.taskId = this.$route.query.taskId
    this.$http.taskDetail({
      token: localStorage.getItem('token'),
      id: this.$route.query.taskId
    }).then(res => {
      // console.log(res)
      if (res.data.ret === 200) {
        this.name = res.data.data.name
        const content = JSON.parse(res.data.data.content)
        // console.log(content)
        this.weary = content.weary
        this.intensity = content.intensity
        this.friendly = content.friendly
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 方法集合
  methods: {
    // 下一步
    next () {
      console.log('下一步')
    },
    // 返回
    revert () {
      // console.log('返回')
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='scss' scoped>
#Result{
  height: 100vh;
  min-width: 1200px;
  min-height: 675px;
  .right {
    float: right;
    width: calc(100% - 113px);
    height: 100%;
    background: #F2F1F8;
    position: relative;
    .res{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .r-evaluate{
        width: 975px;
        // height: 231px;
        padding: 35px 50px 27px;
        background: white;
        box-shadow:0px 3px 9px 2px rgba(12,25,55,0.08);
        border-radius:6px;
        position: relative;
        p{
          text-align: left;
          font-size:15px;
          display: flex;
          align-items: center;
          span{
            font-size: 30px;
            margin-left: 40px;
          }
        }
        p:first-child{
          margin-bottom: 23px;
        }
        p:nth-child(2){
          margin-bottom: 19px;
        }
        p:nth-child(3){
          margin-bottom: 11px;
        }
        h3{
          display: flex;
          align-items: center;
          font-size: 38px;
          font-weight:400;
          .yin{
            font-size: 60px;
            font-weight: 400;
            position: relative;
            margin: 0;
            span{
              font-size: 50px;
              font-weight:400;
              position: absolute;
              right: -30px;
              top: -10px;
            }
          }
          .wen{
            font-size: 45px;
            font-weight: 400;
            margin: 0 0 0 78px;
          }
        }
        .stamp{
          width: 66px;
          height: 29px;
          line-height: 29px;
          background: #234186;
          color: white;
          border-radius:3px;
          position: absolute;
          top: 29px;
          right: 25px;
        }
      }
      .r-modify{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 31px;
        .question{
          width: 471px;
          height: 290px;
          box-shadow:0px 3px 9px 2px rgba(12,25,55,0.08);
          border-radius:6px;
          background: white;
          h3{
            height: 49px;
            line-height: 49px;
            background: #FFC13C;
            color: white;
            font-size: 19px;
            font-weight:400;
            border-radius:6px 6px 0px 0px;
            text-align: left;
            padding: 0 28px;
          }
          p{
            height: 182px;
            padding: 26px;
            text-align: left;
            font-size:15px;
            line-height:30px;
            text-indent: 2em;
          }
        }
        .optimize{
          width: 471px;
          height: 290px;
          box-shadow:0px 3px 9px 2px rgba(12,25,55,0.08);
          border-radius:6px;
          background: white;
          h3{
            height: 49px;
            line-height: 49px;
            background: #68B999;
            color: white;
            font-size: 19px;
            font-weight:400;
            border-radius:6px 6px 0px 0px;
            text-align: left;
            padding: 0 28px;
          }
          p{
            height: 182px;
            padding: 26px;
            text-align: left;
            font-size:15px;
            line-height:30px;
            text-indent: 2em;
          }
        }
      }
    }
  }
}
</style>
