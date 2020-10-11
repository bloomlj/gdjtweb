<!--  -->
<template>
  <div id='Check'>
    <!-- 导航 -->
    <v-Nav :navShow='2' @next='next' @revert='revert'></v-Nav>
    <!-- 右边界面 -->
    <div class="right">
      <div class='che'>
        <!-- 时间框 -->
        <div class="operate-time">
          <!-- 时间轴 -->
          <div class="time-axis">
            <h3>时间选择</h3>
            <div class="time-bg">
              <template v-for="item of page">
                <div :key="item" @click="sel_time(item)"></div>
              </template>
              <!-- <span class="start">0</span>
              <span class="end">25</span> -->
            </div>
            <p>
              <span>0 - </span>
              <input type="text" v-model="maxTime" readonly>
            </p>
          </div>
          <!-- 分别时间 -->
          <div class="times">
            <div class="item1">
              <p>时间</p>
              <div>
                <span>{{(timeSlot - 1) * 30}}</span>
                <span>{{(timeSlot - 1) * 30 + 5}}</span>
                <span>{{(timeSlot - 1) * 30 + 10}}</span>
                <span>{{(timeSlot - 1) * 30 + 15}}</span>
                <span>{{(timeSlot - 1) * 30 + 20}}</span>
                <span>{{(timeSlot - 1) * 30 + 25}}</span>
                <span>{{timeSlot * 30}}</span>
                <div class="border" @click.self="click_time($event)">
                  <span :style="{left: borderLeft}"></span>
                </div>
              </div>
            </div>
            <div class="item2">
              <p>姿态</p>
              <template v-for="(item, index) in frontData">
                <div :key="index" :style="{width:item.wid + 'px'}">
                  {{item.id}}
                  <!-- <span v-if="item.activeState" class="left" @click="sel_start(index, 1)"></span> -->
                  <!-- <span v-if="item.activeState" class="right" :ref="`tri_end1${index}`" @mousedown="delta_down($event, `tri_end1${index}`, `tri1${index}`, 'time2', 1, index)"></span> -->
                </div>
              </template>
            </div>
            <div class="item3">
              <p>手臂</p>
              <template v-for="(item, index) in armData">
                <div :key="index" :style="{width:item.wid + 'px'}">
                  {{item.id}}
                  <!-- <span v-if="item.activeState" class="left" @click="sel_start(index, 2)"></span> -->
                  <!-- <span v-if="item.activeState" class="right" :ref="`tri_end2${index}`" @mousedown="delta_down($event, `tri_end2${index}`, `tri2${index}`, 'time3', 2, index)"></span> -->
                </div>
              </template>
            </div>
            <div class="item4">
              <p>手腕</p>
              <template v-for="(item, index) in wristData">
                <div :key="index" :style="{width:item.wid + 'px'}">
                  {{item.id}}
                  <!-- <span v-if="item.activeState" class="left" @click="sel_start(index, 3)"></span> -->
                  <!-- <span v-if="item.activeState" class="right" :ref="`tri_end3${index}`" @mousedown="delta_down($event, `tri_end3${index}`, `tri3${index}`, 'time4', 3, index)"></span> -->
                </div>
              </template>
            </div>
          </div>
          <!-- 当前的级别 -->
          <div class="level" v-if="allGrade >= 1 && allGrade <= 2" style="background: #A9D08E;"></div>
          <div class="level" v-else-if="allGrade >= 2.5 && allGrade <= 5" style="background: #9BC2E6;"></div>
          <div class="level" v-else-if="allGrade >= 5.5 && allGrade <= 7" style="background: #FFF2CC;"></div>
          <div class="level" v-else style="background: #FF0000;"></div>
        </div>
        <!-- 动作框 -->
        <div class="operate-act">
          <div class="act-left">
            <p>检修任务用时：{{maxHour}}s</p>
            <p>设备抬升高度<span>{{machine}}</span>mm</p>
            <!-- <p>人员检修台面<span>0</span>mm</p> -->
          </div>
          <div class="act-r">
            <div class="act-r-img" ref="peopleBox">
              <img class="img1" :style="{bottom:machine/10.2 + 'px'}" src="../assets/img/overhaul2.png" alt="">
              <img @mousedown="people_down($event)" ref="people" class="img2" :style="{ height:img2Hei + 'px', left: ken?(550 - reqSpos)+'px':(reqPos?(550 - reqPos) + 'px':'550px')}" :src="ken?reqSimg:reqImg" alt="">
              <!-- <img class="img3" v-if="ken" src="../assets/img/sight.png" alt=""> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-Tip @loopKen='loop_ken' :ken='ken' @versionSize='sel_size' :peoSel='peoSel'></v-Tip>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Tip from '@/components/Tip.vue'
import People from '../utils/people.js'

export default {
  name: 'Check',
  components: {
    'v-Nav': Nav,
    'v-Tip': Tip
  },
  data () {
    return {
      // 最大时间
      maxTime: 0,
      // 请求回来的图片 和 定位 和有视线的图片
      reqImg: '',
      reqPos: '',
      reqSimg: '',
      reqSpos: '',
      // 设备抬升高度
      machine: '',
      // 检修任务用时
      maxHour: '',
      // 用来请求动作图片的数据
      allGrade: 2.5,
      frontReq: { id: 1, grade: 1.5 },
      armReq: { id: 1, grade: 0 },
      wristReq: { id: 1, grade: 1 },
      // 时间轴的时间选择
      borderLeft: 0,
      // img2的宽度和高度
      img2Hei: 165,
      // 人体大小的选择
      peoSel: 1,
      // 视线的开关
      ken: false,
      // 当前时间段
      timeSlot: 1,
      // 页面
      page: 3,
      // 当前数据
      frontData: [],
      armData: [],
      wristData: [],
      // 姿态全部数据
      frontAll: [],
      // 手臂全部数据
      armAll: [],
      // 手腕全部数据
      wristAll: []
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
    this.$http.taskDetail({
      token: localStorage.getItem('token'),
      id: this.$route.query.taskId
    }).then(res => {
      console.log(res)
      if (res.data.ret === 200) {
        const content = JSON.parse(res.data.data.content)
        this.frontAll = content.front
        this.armAll = content.arm
        this.wristAll = content.wrist
        this.maxHour = content.maxHour
        this.machine = content.machine
        this.maxTime = content.maxTime
        this.page = this.maxTime / 30
        this.frontData = this.frontAll[0]
        this.armData = this.armAll[0]
        this.wristData = this.wristAll[0]
      }
    }).catch(err => {
      console.log(err)
    })
    this.req_picture('111')
  },
  // 方法集合
  methods: {
    // 用来获取动作方法
    req_picture (str) {
      this.$http.getPeoplePicture({
        ad_point: str
      }).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.reqImg = res.data.data.ad_picture
          this.reqPos = res.data.data.ad_position

          this.reqSimg = res.data.data.ad_s_picture
          this.reqSpos = res.data.data.ad_s_position
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 人物的移动
    people_down (e) {
      // console.log(this.$refs.people), 'people', 'peopleBox'
      People.people(e, this.$refs.people, this.$refs.peopleBox)
    },
    // 用来选中某个时间后，需要返回的动作分数
    return_mark (arr, num) {
      let frontLeft = 0
      for (let i = 0; i < arr.length; i++) {
        frontLeft = frontLeft + arr[i].wid
        if (frontLeft > num) {
          // console.log(arr[i])
          return arr[i]
        }
      }
    },
    // 选中某个时间
    click_time (e) {
      // console.log(e)
      this.borderLeft = e.offsetX + 'px'
      // this.return_mark(this.frontData, e.offsetX)
      this.frontReq = this.return_mark(this.frontData, e.offsetX) || { id: 1, grade: 1.5 }
      this.armReq = this.return_mark(this.armData, e.offsetX) || { id: 1, grade: 0 }
      this.wristReq = this.return_mark(this.wristData, e.offsetX) || { id: 1, grade: 1 }
      this.allGrade = this.frontReq.grade + this.armReq.grade + this.wristReq.grade
      // console.log(this.allGrade)
      const point = this.frontReq.id + '' + this.armReq.id + '' + this.wristReq.id + ''
      this.req_picture(point)
    },
    // 打开视线的开关
    loop_ken () {
      if (!this.ken) {
        this.ken = true
        // this.reqImg =
      } else {
        this.ken = false
      }
    },
    // 选择人体大小
    sel_size (s) {
      this.peoSel = s
      if (s === 1) {
        this.img2Hei = 165
      } else {
        this.img2Hei = 174
      }
    },
    // 选择时间的按钮
    sel_time (i) {
      this.timeSlot = i
      this.frontData = this.frontAll[i - 1]
      this.armData = this.armAll[i - 1]
      this.wristData = this.wristAll[i - 1]
      this.borderLeft = 0
    },
    // 下一步
    next () {
      // console.log('下一步')
      this.$router.push({ path: `/result?navShow=2&taskId=${this.$route.query.taskId}` })
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
#Check{
  height: 100vh;
  min-width: 1200px;
  min-height: 675px;
  .right {
    float: right;
    width: calc(100% - 113px);
    height: 100%;
    background: #F2F1F8;
    position: relative;
    .che{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .operate-time{
        width: 975px;
        height: 279px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 9px 2px rgba(12,25,55,0.08);
        border-radius:6px;
        padding: 23px 34px;
        .time-axis{
          display: flex;
          justify-content: space-between;
          align-items: center;
          h3{
            font-size: 19px;
          }
          p{
            span{
              font-size: 19px;
              line-height: 31px;
            }
          }
          input{
            width: 88px;
            height: 31px;
            line-height: 31px;
            background: #696969;
            border-radius:3px;
            border: none;
            font-size: 19px;
            color: white;
            padding: 0 15px;
          }
          .time-bg{
            width: 620px;
            height: 31px;
            background: #535353;
            border-radius:3px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            div{
              // width: 216px;
              width: 100%;
              height: 100%;
              background: #696969;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-right: 5px;
              // span{
              //   font-size: 19px;
              //   color: white;
              //   position: relative;
              // }
              // .start{
              //   margin-left: 27px;
              // }
              // .end{
              //   margin-right: 27px;
              // }
              // .end::before{
              //   content: '';
              //   width: 0;
              //   height: 0;
              //   border-width: 6px 0 6px 6px;
              //   border-style: solid;
              //   border-color: transparent transparent transparent white;
              //   position: absolute;
              //   right: -16px;
              //   top: 50%;
              //   transform: translateY(-50%);
              // }
              // .start::before{
              //   content: '';
              //   width: 0;
              //   height: 0;
              //   border-width: 6px 6px 6px 0;
              //   border-style: solid;
              //   border-color: transparent white transparent transparent;
              //   position: absolute;
              //   left: -16px;
              //   top: 50%;
              //   transform: translateY(-50%);
              // }
            }
            div:last-child{
              margin: 0;
            }
          }
        }
        .times{
          // width: 914px;
          height: 183px;
          margin-top: 14px;
          div{
            display: flex;
            p{
              width: 205px;
              height: 45px;
              font-size: 15px;
              line-height: 45px;
              flex-shrink: 0;
            }
          }
          .item1{
            border-radius:6px 6px 0px 0px;
            margin-bottom: 3px;
            background: #535353;
            color: white;
            p{
              border-radius:6px 0px 0px 0px;
              background: #3988D1;
            }
            div{
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              position: relative;
              .border{
                width: 100%;
                height: 100%;
                // background: white;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 9;
                span{
                  display: inline-block;
                  width: 4px;
                  height: 45px;
                  background: white;
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 10;
                  margin: 0;
                }
              }
            }
            span{
              height: 45px;
              line-height: 45px;
              font-size: 19px;
              margin-left: 10px;
            }
          }
          .item2,.item4{
            background: #C5D6ED;
            color: #0C1937;
          }
          .item3{
            background: #E4EBF6;
          }
          .item2, .item3, .item4{
            p{
              border-right: 3px solid white;
            }
            div{
              display: inline-block;
              height: 45px;
              background: #0C1937;
              color: white;
              font-size: 24px;
              line-height: 45px;
              position: relative;
              cursor: default;
              .left{
                display: inline-block;
                width: 0;
                height: 0;
                border-right:10px solid transparent;
                border-left:10px solid transparent;
                border-bottom:10px solid red;
                position: absolute;
                left: -10px;
                bottom: -10px;
                z-index: 99;
              }
              .right{
                display: inline-block;
                width: 0;
                height: 0;
                border-right:10px solid transparent;
                border-left:10px solid transparent;
                border-bottom:10px solid red;
                background: none;
                position: absolute;
                right: -10px;
                bottom: -10px;
                z-index: 99;
              }
            }
          }
          .item3{
            div{
              background: #3988D1;
            }
          }
          .item4{
            div{
              background: rgb(105, 199, 183);
            }
          }
        }
        .level{
          width: 40px;
          height: 10px;
          float: right;
          margin-top: 10px;
        }
      }
      .operate-act{
        display: flex;
        margin-top: 25px;
        .act-left{
          width: 233px;
          height: 307px;
          p{
            margin:0 0 22px 31px;
            text-align: left;
            font-size:15px;
            font-weight:400;
          }
          // .el-tabs__header{
          //   margin: 0;
          // }
          // .el-tabs__nav{
          //   width: 100%;
          //   background: #C5D6ED;
          //   border-radius:6px 6px 0px 0px;
          //   .el-tabs__item{
          //     width: 33.33%;
          //     font-size: 15px;
          //   }
          //   .el-tabs__item:first-child{
          //     border-radius:6px 0px 0px 0px;
          //   }
          //   .el-tabs__item:last-child{
          //     border-radius:0 6px 0px 0px;
          //   }
          //   .is-active{
          //     background: #0C1937;
          //     color: white;
          //   }
          // }
          // .el-tabs__content{
          //   height: 241px;
          //   padding: 13px 15px;
          //   background: white;
          //   .list{
          //     height: 100%;
          //     overflow: auto;
          //     p{
          //       height: 28px;
          //       line-height: 28px;
          //       border-radius:3px;
          //       background: #C5D6ED;
          //       margin-bottom: 8px;
          //     }
          //   }
          // }
        }
        .act-r{
          width: 719px;
          height: 311px;
          margin-left: 38px;
          .act-r-img{
            height: 279px;
            position: relative;
            border-bottom: 1px solid #535353;
            margin-bottom: 13px;
            overflow: hidden;
            .img1{
              width: 338px;
              height: 108px;
              position: absolute;
              bottom: 0;
              left: 30px;
            }
            .img2{
              width: auto;
              // height: 226px;
              position: absolute;
              bottom: 0;
              right: 160px;
            }
            .img3{
              width: 236px;
              height: 162px;
              position: absolute;
              bottom: 47px;
              right: 190px;
              z-index: 9;
            }
          }
          // .act-r-height{
          //   display: flex;
          //   justify-content: space-around;
          //   align-items: center;
          //   p{
          //     input{
          //       width: 50px;
          //       border: none;
          //       background: transparent;
          //       outline: none;
          //       border-bottom:1px solid black;
          //       text-align: center;
          //     }
          //   }
          // }
        }
      }
    }
  }
}
</style>
