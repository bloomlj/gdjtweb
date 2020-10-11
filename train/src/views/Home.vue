<template>
  <div id="Home">
    <!-- 导航 -->
    <v-Nav :navShow='1' @next='next' @revert='revert'></v-Nav>
    <!-- 右边界面 -->
    <div class="right">
      <div class="select">
        <!-- 厂房 -->
        <div class='Workshop'>
          <div class="node" v-if="selData===1">
            <img class="img" :src="factory?factory[fyIndex].picture:'../assets/img/workshop.png'" alt="">
            <template v-for="(item, index) in model">
              <span class="dian1" :key="index" :style="{left: item.x_position + 'px', top: item.y_position + 'px'}" @click="jump_device(item.id)">{{item.id}}</span>
            </template>
          </div>
          <div class="node" v-else-if="selData===2">
            <img class="img" :src="factory?factory[fyIndex].picture:'../assets/img/workshop.png'" alt="">
            <template v-for="(item, index) in overhaul">
              <span class="dian2" :key="index" :style="{left: item.x_position + 'px', top: item.y_position + 'px'}" @click="jump_orange(item.id)">{{item.id}}</span>
            </template>
          </div>
          <div class="node" v-else>
            <img class="img" :src="factory?factory[fyIndex].picture:'../assets/img/workshop.png'" alt="">
          </div>
          <div class="bottom">
            <h3>{{factory?factory[fyIndex].name:''}}</h3>
            <div class="btn">
              <p @click="flip_page('cut')"><img src="../assets/img/left.png" alt=""></p>
              <p @click="flip_page('add')"><img src="../assets/img/right.png" alt=""></p>
            </div>
          </div>
        </div>
        <!-- 选择 -->
        <div class="sel">
          <div class="s-left" @click="sel_show(1)">
            <h3>检修设备库展示及其数字模型下载</h3>
            <div>
              <img class="img1" src="../assets/img/equipment1.png" alt="">
              <img class="img2" src="../assets/img/equipment2.png" alt="">
            </div>
          </div>
          <div class="s-right" @click="sel_show(2)">
            <h3>检修任务及其友好度评估</h3>
            <div>
              <img src="../assets/img/overhaul.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'

export default {
  name: 'Home',
  components: {
    'v-Nav': Nav
  },
  data () {
    return {
      // 厂房数据的下标
      fyIndex: 0,
      // 厂房数据
      factory: '',
      // 模型
      model: [],
      // 检修
      overhaul: [
        { id: 1, left: '226px', top: '181px', text: '1' },
        { id: 2, left: '595px', top: '164px', text: '2' },
        { id: 3, left: '193px', top: '37px', text: '3' },
        { id: 4, left: '394px', top: '37px', text: '4' },
        { id: 5, left: '601px', top: '37px', text: '5' }
      ],
      // 选中某个 0无 1为模型 2 检修
      selData: 0
    }
  },
  mounted () {
    // 获取厂房列表
    this.$http.getFactory({
    }).then(res => {
      console.log(res)
      if (res.data.ret === 200) {
        this.factory = res.data.data
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // 跳转模型页面
    jump_device (id) {
      this.$router.push({ path: `/device?id=${id}&cateId=${this.factory[this.fyIndex].id}` })
    },
    // 请求机器列表的方法
    machine_fun (cate) {
      this.$http.machineList({
        cate: cate
      }).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.overhaul = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 请求模型列表的方法
    model_fun (cate) {
      this.$http.modelList({
        cate: cate
      }).then(res => {
        // console.log(res)
        if (res.data.ret === 200) {
          this.model = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 厂房翻页
    flip_page (txt) {
      switch (txt) {
        case 'add':
          this.selData = 0
          this.fyIndex++
          if (this.fyIndex === this.factory.length) {
            this.fyIndex = 0
          }
          break
        case 'cut':
          this.selData = 0
          this.fyIndex--
          if (this.fyIndex === -1) {
            this.fyIndex = this.factory.length - 1
          }
          break
      }
    },
    // 点击下一步
    next () {
      this.$message({
        message: '请选择厂房中气泡'
      })
      // console.log('确认点击了')
      // if (this.selData === 1) {
      //   this.$router.push({ path: '/device' })
      // } else if (this.selData === 2) {
      //   this.$router.push({ path: `/orange?id=${this.overhaul[0].id}` })
      // } else {

      // }
    },
    // 点击跳转橙色页面
    jump_orange (id) {
      this.$router.push({ path: `/orange?id=${id}&cateId=${this.factory[this.fyIndex].id}` })
    },
    // 返回
    revert () {
      console.log('返回')
    },
    // 选择模型与检修
    sel_show (sel) {
      this.selData = sel
      switch (sel) {
        case 1:
          this.model_fun(this.factory[this.fyIndex].id)
          break
        case 2:
          // console.log('请求机器列表')
          this.machine_fun(this.factory[this.fyIndex].id)
          break
      }
    }
  }
}
</script>

<style lang="scss">
#Home{
  height: 100vh;
  min-width: 1200px;
  min-height: 675px;
  .right {
    float: right;
    width: calc(100% - 113px);
    height: 100%;
    background: #F2F1F8;
    position: relative;
    .select{
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
            cursor: default;
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
      .sel{
        width: 975px;
        height: 238px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 23px auto 0;
        .s-left,.s-right{
          width: 475px;
          height: 100%;
          background:rgba(254,254,254,1);
          box-shadow:0px 3px 9px 2px rgba(12,25,55,0.08);
          border-radius:6px;
          h3{
            background:rgba(104,185,153,1);
            border-radius:6px 6px 0px 0px;
            font-size: 12px;
            font-weight:400;
            height: 40px;
            line-height: 40px;
            padding:0 26px;
            text-align: left;
            color: white;
            position: relative;
            z-index: 9;
          }
        }
        .s-right{
          h3{
            background:#FFC13C
          }
        }
        .s-left{
          div{
            position: relative;
            width: 100%;
            height: calc(100% - 40px);
            img{
              width: 288px;
              height: 214px;
            }
            .img1{
              position: absolute;
              top: 30px;
              left: -38px;
            }
            .img2{
              position: absolute;
              top: 0;
              right: -41px;
            }
          }
        }
        .s-right{
          div{
            position: relative;
            width: 100%;
            height: calc(100% - 40px);
            img{
              width: 357px;
              height: 207px;
              position: absolute;
              left: 59px;
              bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
