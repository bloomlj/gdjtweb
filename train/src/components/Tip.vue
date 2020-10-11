<!--  -->
<template>
  <div id='Tip'>
    <!-- 视域/人体尺寸大小 -->
    <div class="title" v-if="tipState" @click="show_set">视域/人体尺寸</div>
    <!-- 视域人体设置 -->
    <div class="set" v-if="setState">
      <div class="s-top">
        <h4>视域</h4>
        <p :class="ken?'active':''" @click="loop_ken">查看视域</p>
      </div>
      <div class="s-size">
        <h4>人体大小</h4>
        <p :class="peoSel===1?'active':''" @click="sel_size(1)">50%</p>
        <p :class="peoSel===2?'active':''" @click="sel_size(2)">75%</p>
      </div>
      <div class="return" @click="hide_set">
        <img src="../assets/img/you.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Tip',
  props: ['ken', 'peoSel'],
  components: {},
  data () {
    return {
      // 视觉人体状态
      setState: false,
      // 视域/人体尺寸大小 de 显示状态
      tipState: true
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  // 方法集合
  methods: {
    // 选择人体大小
    sel_size (s) {
      // console.log(s)
      this.$emit('versionSize', s)
    },
    // 打开视域
    loop_ken () {
      // console.log(this.ken)
      this.$emit('loopKen')
    },
    // 点击视域/人体大小 显示设置界面
    show_set () {
      this.setState = true
      this.tipState = false
    },
    // 隐藏设置界面
    hide_set () {
      this.setState = false
      this.tipState = true
    }
  }
}
</script>
<style lang='scss' scoped>
#Tip{
  .title{
    width: 40px;
    height: 126px;
    writing-mode:vertical-rl;
    text-align: center;
    line-height: 40px;
    background: white;
    position: fixed;
    right: 0;
    bottom: 159px;
    font-size: 15px;
    cursor:default;
    border-radius:6px 0px 0px 6px;
  }
  .set{
    width: 111px;
    height: 183px;
    background: white;
    position: fixed;
    right: 32px;
    bottom: 73px;
    border-radius:6px;
    box-shadow:0px 3px 9px 2px rgba(12,25,55,0.08);
    padding: 18px;
    h4{
      font-size: 15px;
      margin-bottom: 18px;
    }
    P{
      width: 100%;
      height: 28px;
      line-height: 28px;
      background: #C5D6ED;
      color: white;
      border-radius:3px;
      cursor: default;
    }
    .s-top{
      margin-bottom: 12px;
    }
    .s-size{
      p:last-child{
        margin-top: 13px;
      }
    }
    .active{
      background: #162a58;
    }
    .return{
      width: 37px;
      height: 37px;
      line-height: 45px;
      position: absolute;
      top: 0;
      right: -34px;
      background: white;
      img{
        width: 8px;
        height: 14px;
      }
    }
  }
}
</style>
