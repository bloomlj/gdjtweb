<!--  -->
<template>
  <div id='Orange'>
    <!-- 导航 -->
    <v-Nav :navShow='1' @next='next' @revert='revert'></v-Nav>
    <!-- 右边界面 -->
    <div class="right">
      <div class='ora'>
        <!-- 厂房 -->
        <div class='Workshop'>
          <div class="node">
            <img class="img" src="../assets/img/workshop.png" alt="">
            <template v-for="(item, index) in overhaul">
              <span class="dian2" v-if="overhaulIndex === index" :key="index" :style="{left: item.x_position + 'px', top: item.y_position + 'px'}">{{item.id}}</span>
            </template>
          </div>
          <div class="bottom">
            <h3>{{overhaul[overhaulIndex]?overhaul[overhaulIndex].title:''}}</h3>
            <div class="btn">
              <p @click="change_dot('cut')"><img src="../assets/img/left.png" alt=""></p>
              <p @click="change_dot('add')"><img src="../assets/img/right.png" alt=""></p>
            </div>
          </div>
        </div>
        <!-- 选择 -->
        <div class="estimate">
          <div class="estimate-header">检修任务及其友好度评估</div>
          <div class="estimate-content">
            <div class="estimate-left">
              <h4>{{place[placeIndex]?place[placeIndex].name:''}}</h4>
              <div>
                <a @click="reduce_place()">
                  <img src="../assets/img/o-left.png" alt="">
                </a>
                <img class="estimate-left-img" :src="place[placeIndex]?place[placeIndex].picture:''" alt="">
                <a @click="add_place()">
                  <img src="../assets/img/o-right.png" alt="">
                </a>
              </div>
            </div>
            <div class="estimate-right">
              <h4>待检部位</h4>
              <div>
                <template v-for="(item, index) in place">
                  <p :class="placeIndex === index?'active':''" @click="jump_place(index)" :key="index">{{item.name}}</p>
                </template>
                <!-- <p>减震器</p>
                <p>转向架盖板</p>
                <p>轮毂</p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'Orange',
  components: {
    'v-Nav': Nav
  },
  data () {
    return {
      // 检修
      overhaulIndex: 0,
      overhaul: [],
      // 待检部位
      placeIndex: 0,
      place: []
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
    // 获取机器列表
    this.$http.machineList({
      cate: this.$route.query.cateId
    }).then(res => {
      console.log(res)
      if (res.data.ret === 200) {
        this.overhaul = res.data.data
        for (var i in this.overhaul) {
          if (this.overhaul[i].id === parseInt(this.$route.query.id)) {
            this.overhaulIndex = parseInt(i)
            // console.log(this.overhaulIndex)
          }
        }
      }
    }).catch(err => {
      console.log(err)
    })
    // 获取机器详情
    this.req_machine(this.$route.query.id)
  },
  // 方法集合
  methods: {
    // 请求机器的详情
    req_machine (id) {
      this.$http.machineDetail({
        machine_id: id
      }).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.place = res.data.data.parts
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 切换机器
    change_dot (txt) {
      switch (txt) {
        case 'cut':
          this.overhaulIndex--
          if (this.overhaulIndex === -1) {
            this.overhaulIndex = this.overhaul.length - 1
          }
          break
        case 'add':
          this.overhaulIndex++
          if (this.overhaulIndex >= this.overhaul.length) {
            this.overhaulIndex = 0
          }
          break
      }
      this.req_machine(this.overhaul[this.overhaulIndex].id)
    },
    // 向左翻页
    reduce_place () {
      this.placeIndex--
      if (this.placeIndex === -1) {
        this.placeIndex = this.place.length - 1
      }
    },
    // 向右翻页
    add_place () {
      this.placeIndex++
      if (this.placeIndex >= this.place.length) {
        this.placeIndex = 0
      }
    },
    // 待检部位的选择
    jump_place (index) {
      this.placeIndex = index
    },
    // 下一步
    next () {
      // console.log()
      const id = this.place[this.placeIndex].id
      this.$router.push({ path: `/operate?partId=${id}` })
    },
    // 返回
    revert () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='scss' scoped>
#Orange{
  height: 100vh;
  min-width: 1200px;
  min-height: 675px;
  .right {
    float: right;
    width: calc(100% - 113px);
    height: 100%;
    background: #F2F1F8;
    position: relative;
    .ora{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .Workshop{
        width: 975px;
        height: 313px;
        background: white;
        margin: 0 auto;
        padding-top: 17px;
        .node{
          width: 924px;
          height: 243px;
          margin: 0 auto;
          position: relative;
          .img{
            width: 100%;
            height: 100%;
          }
          span{
            // background: url('../assets/img/position1.png') no-repeat;
            // background-size: 100% 100%;
            display: inline-block;
            width: 31px;
            height: 39px;
            font-size: 15px;
            color: white;
            line-height: 30px;
            position: absolute;
          }
          .dian1{
            background: url('../assets/img/position1.png') no-repeat;
            background-size: 100% 100%;
          }
          .dian2{
            background: url('../assets/img/position2.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        .bottom{
          width: 924px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 14px auto 0;
          h3{
            color: #173655;
            font-size: 15px;
            font-family:Microsoft YaHei;
            font-weight:400;
          }
          .btn{
            display: flex;
            p{
              background: #234186;
              width: 66px;
              height: 25px;
              border-radius:3px;
              margin-right: 16px;
              img{
                height: 100%;
                width: auto;
              }
            }
          }
        }
      }
      .estimate{
        width: 975px;
        height: 238px;
        box-shadow:0px 3px 9px 2px rgba(255,193, 60,0.35);
        border-radius:6px;
        background: rgba(254,254,254,1);
        .estimate-header{
          height: 40px;
          background:rgba(255,193,60,1);
          border-radius:6px 6px 0px 0px;
          margin-top: 23px;
          text-align: left;
          line-height: 40px;
          padding: 0 25px;
          color: white;
          font-size: 12px;
          position: relative;
          z-index: 9;
        }
        .estimate-content{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .estimate-left{
            width: 491px;
            margin:23px 0 0 29px;
            h4{
              font-size:15px;
              font-weight:400;
              text-align: left;
            }
            div{
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 154px;
              position: relative;
              z-index: 8;

              a{
                display: inline-block;
                background:rgba(35,65,134,1);
                width: 40px;
                height: 25px;
                line-height: 30px;
                border-radius:3px;
                img{
                  width: 8px;
                  height: 14px;
                }
              }
              .estimate-left-img{
                width: 357px;
                // height: 127px;
                height: auto;
                padding-bottom: 20px;
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
              }
            }
          }
          .estimate-right{
            width: 331px;
            height: 160px;
            background: #F2F1F8;
            margin-right: 24px;
            h4{
              height: 34px;
              line-height: 34px;
              text-align: left;
              background: #CFCED4;
              border-radius:6px 6px 0px 0px;
              font-size:15px;
              color: black;
              font-weight: 400;
              padding: 0 19px;
            }
            div{
              padding: 18px;
              height: 90px;
              overflow: auto;
              text-align: left;
              p{
                height: 21px;
                padding: 0 8px;
                cursor: default;
              }
              .active{
                background:#FFC13C;
                color: wheat;
              }
            }
          }
        }
      }
    }
  }
}
</style>
