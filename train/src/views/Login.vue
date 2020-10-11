<template>
  <div id='Login'>
    <div class='box'>
      <div class='list'>
        <span>登录名:</span>
        <input type='text' v-model="phone"/>
      </div>
      <div class='list'>
        <span>密码:</span>
        <input type='text' v-model="pwd"/>
      </div>
      <div class='btn'>
        <button @click='jump_home'>登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 用户名
      phone: '',
      // 密码
      pwd: ''
    }
  },
  mounted () {},
  methods: {
    jump_home () {
      this.$http.login({
        mobile: this.phone,
        password: this.pwd
      }).then(res => {
        // console.log(res)
        if (res.data.ret === 200) {
          localStorage.setItem('name', res.data.data.mobile)
          localStorage.setItem('token', res.data.data.token)
          this.$router.push({ path: '/' })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang='scss'>
#Login {
  height: 100vh;
  min-width: 1200px;
  min-height: 675px;
  background: url('../assets/img/bg2.jpeg') no-repeat;
  background-size: 100% 100%;
  position: relative;
  .box {
    width: 442px;
    height: 222px;
    background: rgba(242, 241, 248, 0.85);
    // opacity: 0.85;
    border-radius: 6px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 34px 0 0;
    .list {
      height: 46px;
      padding-bottom: 18px;
      span {
        display: inline-block;
        width: 50px;
        text-align: right;
        margin-right: 19px;
        font-size: 15px;
        font-weight: 400;
        color: rgba(12, 25, 55, 1);
        line-height: 23px;
      }
      input {
        width: 258px;
        height: 100%;
        border: none;
        border-radius: 6px;
        background: #fefefe;
        padding: 0 10px;
      }
    }
    .btn {
      padding-top: 11px;
      button {
        width: 93px;
        height: 35px;
        background: rgba(35, 65, 134, 1);
        border-radius: 3px;
        border: none;
        color: white;
        outline: none;
      }
      button:active {
        background: rgb(43, 79, 165);
      }
    }
  }
}
</style>
