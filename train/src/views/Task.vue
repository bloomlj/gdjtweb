<!--  -->
<template>
  <div id='Task'>
    <!-- 导航 -->
    <v-Nav :navShow='2' @next='next' @revert='revert'></v-Nav>
    <!-- 右边界面 -->
    <div class="right">
      <div class='tas'>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="检修名称" width="205"></el-table-column>
          <el-table-column prop="weary" label="疲劳积累评价" width="155"></el-table-column>
          <el-table-column prop="intensity" label="强度评价" width="155"></el-table-column>
          <el-table-column prop="friendly" label="友好评价" width="155"></el-table-column>
          <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-size='9' :total="total" @current-change='handleCurrentChange'></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'Task',
  inject: ['reload'],
  components: {
    'v-Nav': Nav
  },
  data () {
    return {
      total: 0,
      tableData: []
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
    this.req_fun(1)
  },
  // 方法集合
  methods: {
    // 翻页
    handleCurrentChange (val) {
      this.req_fun(val)
    },
    // 请求数据的方法
    req_fun (page) {
      this.$http.taskList({
        token: localStorage.getItem('token'),
        limit: 9,
        page: page
      }).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.total = res.data.data.total
          /* this.weary = content.weary
        this.intensity = content.intensity
        this.friendly = content.friendly */
          for (const item of res.data.data.data) {
            item.weary = JSON.parse(item.content).weary
            item.intensity = JSON.parse(item.content).intensity
            item.friendly = JSON.parse(item.content).friendly
          }
          this.tableData = res.data.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击删除按钮
    handleDelete (row) {
      this.$http.delTask({
        token: localStorage.getItem('token'),
        id: row.id
      }).then(res => {
        if (res.data.ret === 200) {
          const _this = this
          this.$message({
            message: res.data.msg,
            type: 'success',
            duration: 1500,
            onClose: function () {
              _this.reload()
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 查看按钮
    handleEdit (row) {
      this.$router.push({ path: `/check?taskId=${row.id}` })
    },
    // 点击下一步
    next () {
      // console.log('确认点击了')
      // this.$router.push({ path: '/check' })
    },
    // 返回
    revert () {
      console.log('返回')
    }
  }
}
</script>
<style lang='scss'>
#Task{
  height: 100vh;
  min-width: 1200px;
  min-height: 675px;
  .right {
    float: right;
    width: calc(100% - 113px);
    height: 100%;
    background: #F2F1F8;
    position: relative;
    .tas{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 913px;
      // height: 511px;
      padding: 31px;
      background: #FFFFFF;
      box-shadow:0px 3px 9px 2px rgba(12,25,55,0.08);
      border-radius:6px;
      .el-table{
        .el-table__header-wrapper{
          .has-gutter{
            tr{
              th{
                background: #3988D1;
                height: 45px;
                text-align: center;
                color: white;
                font-size:15px;
                font-weight:400;
              }
              th:first-child{
                border-radius:6px 0px 0px 0px;
              }
              th:nth-child(5){
                border-radius:0px 6px 0px 0px;
              }
            }
          }
        }
        .el-table__body-wrapper{
          height: 478px;
          .el-table__body{
            tr{
              background: #C5D6ED;
              td{
                text-align: center;
              }
            }
            .el-table__row--striped{
              background: #E4EBF6;
            }
          }
        }
      }
      .el-table::before{
        height: 0;
      }
      .el-pagination{
        margin-top: 31px;
      }
    }
  }
}
</style>
