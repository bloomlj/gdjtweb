<!--  -->
<template>
<div id='Nav'>
  <!-- 导航部分 -->
    <div class="user">
      <img src="../assets/img/head.png" alt=""/>
      <p>{{name}}</p>
    </div>
    <!-- nav -->
    <div class="nav">
      <div class="nav-x" :class="navShow === 1 ? 'active' : ''">
        <a @click="jump_nav('/', 1)">
          <div>
            <img :src="navShow === 1?require('../assets/img/home.png'):require('../assets/img/home2.png')" alt=""/>
            <p>检修首页</p>
          </div>
        </a>
      </div>
      <div class="nav-x" :class="navShow === 2 ? 'active' : ''">
        <a @click="jump_nav('/task', 2)">
          <div>
            <img :src="navShow === 2?require('../assets/img/task2.png'):require('../assets/img/task.png')" alt=""/>
            <p>任务查询</p>
          </div>
        </a>
      </div>
    </div>
    <!-- btn -->
    <div class="btn">
      <div @click="back_view">
        <span>返回</span>
        <img src="../assets/img/back.png" alt=""/>
      </div>
      <div @click="next_view">
        <span>下一步</span>
        <img src="../assets/img/next.png" alt=""/>
      </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'Nav',
  components: {},
  props: ['navShow'],
  data () {
    return {
      name: 'Chievo'
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
    this.name = localStorage.getItem('name')
  },
  // 方法集合
  methods: {
    // 下一步
    next_view () {
      // console.log('下一步')
      this.$emit('next')
    },
    // 返回
    back_view () {
      // console.log('返回')
      this.$emit('revert')
    },
    // 跳转路由
    jump_nav (url, num) {
      if (this.navShow === num) {
        return false
      }
      this.$router.push({ path: url })
    }
  }
}
</script>
<style lang='scss' scoped>
#Nav{
  width: 113px;
  height: 100%;
  float: left;
  background: #0c1937;
  position: relative;
  z-index: 9;
  .user {
    padding: 34px 31px 21px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    p {
      color: white;
      margin-top: 18px;
    }
  }
  .nav {
    .nav-x {
      width: 100%;
      height: 91px;
      position: relative;
      a {
        display: block;
        width: 100%;
        height: 100%;
        div {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          img {
            width: 24px;
            height: 22px;
          }
          p {
            font-size: 12px;
            color: white;
            margin-top: 18px;
            opacity: 0.5;
            cursor: default;
          }
        }
      }
    }
    .active {
      width: 119px;
      background: #162a58;
      div {
        p {
          opacity: 1;
        }
      }
    }
  }
  .btn {
    width: 100%;
    position: absolute;
    bottom: 54px;
    div {
      margin: 29px auto 0;
      width: 81px;
      height: 29px;
      line-height: 29px;
      border: 1px solid #fff;
      border-radius: 3px;
      cursor: default;
      // padding: 0 14px;
      span {
        display: inline-block;
        width: 40px;
        color: white;
      }
      img {
        width: 13px;
        height: 13px;
        vertical-align: middle;
      }
    }
  }
}
</style>
