<!--  -->
<template>
  <div id='Operate'>
    <!-- 导航 -->
    <v-Nav :navShow='1' @next='next' @revert='revert'></v-Nav>
    <!-- 右边界面 -->
    <div class="right">
      <div class='ope'>
        <!-- 时间框 -->
        <div class="operate-time">
          <!-- 时间轴 -->
          <div class="time-axis">
            <h3>时间选择</h3>
            <!-- <input type="text" value="时间选择" readonly> -->
            <div class="time-bg">
              <template v-for="item of page">
                <div :key="item" @click="sel_time(item)"></div>
              </template>
              <!-- <span class="start">0</span>
              <span class="end">25</span> -->
            </div>
            <p>
              <span>0 - </span>
              <input type="text" v-model="maxTime" @blur='blur_input'>
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
            <div class="item2" ref="time2">
              <p>姿态</p>
              <template v-for="(item, index) in frontData">
                <div :key="index" :style="{width:item.wid + 'px'}" :ref="`tri1${index}`" @click="sel_span(index, 1)">
                  {{item.id}}
                  <span v-if="item.activeState" class="close" @click.stop="del_data(index, 1)">x</span>
                  <span v-if="item.activeState" class="right" :ref="`tri_end1${index}`" @mousedown="delta_down($event, `tri_end1${index}`, `tri1${index}`, 'time2', 1, index)"></span>
                </div>
              </template>
            </div>
            <div class="item3" ref="time3">
              <p>手臂</p>
              <template v-for="(item, index) in armData">
                <div :key="index" :style="{width:item.wid + 'px'}" :ref="`tri2${index}`" @click="sel_span(index, 2)">
                  {{item.id}}
                  <span v-if="item.activeState" class="close" @click.stop="del_data(index, 2)">x</span>
                  <span v-if="item.activeState" class="right" :ref="`tri_end2${index}`" @mousedown="delta_down($event, `tri_end2${index}`, `tri2${index}`, 'time3', 2, index)"></span>
                </div>
              </template>
            </div>
            <div class="item4" ref="time4">
              <p>手腕</p>
              <template v-for="(item, index) in wristData">
                <div :key="index" :style="{width:item.wid + 'px'}" :ref="`tri3${index}`" @click="sel_span(index, 3)">
                  {{item.id}}
                  <span v-if="item.activeState" class="close" @click.stop="del_data(index, 3)">x</span>
                  <span v-if="item.activeState" class="right" :ref="`tri_end3${index}`" @mousedown="delta_down($event, `tri_end3${index}`, `tri3${index}`, 'time4', 3, index)"></span>
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
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="姿态" name="front">
                <div class="list" @scroll.passive="getScroll($event, 'front')" ref="list">
                  <template v-for="(item, index) in front">
                    <p :key="index" @mousedown="onmousedown($event, `front${item.id}`, item.id, 1, item.grade)" :ref="'front'+item.id">{{item.text}}</p>
                  </template>
                </div>
              </el-tab-pane>
              <el-tab-pane label="手臂" name="arm">
                <div class="list" @scroll.passive="getScroll($event, 'arm')" ref="list">
                  <!-- <p>手臂</p> -->
                  <template v-for="(item, index) in arm">
                    <p :key="index" @mousedown="onmousedown($event, `arm${item.id}`, item.id, 2, item.grade)" :ref="'arm'+item.id">{{item.text}}</p>
                  </template>
                </div>
              </el-tab-pane>
              <el-tab-pane label="手腕" name="wrist">
                <div class="list" @scroll.passive="getScroll($event, 'wrist')" ref="list">
                  <!-- <p>手腕</p> -->
                  <template v-for="(item, index) in wrist">
                    <p :key="index" @mousedown="onmousedown($event, `wrist${item.id}`, item.id, 3, item.grade)" :ref="'wrist'+item.id">{{item.text}}</p>
                  </template>
                </div>
              </el-tab-pane>
            </el-tabs>
            <p class="copy-dom" ref="set">{{copyTxt}}</p>
          </div>
          <div class="act-r">
            <div class="act-r-img" ref="peopleBox">
              <img class="img1" :style="{bottom:machine/10.2 + 'px'}" :src="picture?picture:'../assets/img/overhaul2.png'" alt="">
              <img @mousedown="people_down($event)" ref="people" class="img2" :style="{ height:img2Hei + 'px', left: ken?(550 - reqSpos)+'px':(reqPos?(550 - reqPos) + 'px':'550px')}" :src="ken?reqSimg:reqImg" alt="">
              <!-- <img class="img3" v-if="ken" src="../assets/img/sight.png" alt=""> -->
            </div>
            <div class="act-r-height">
              <p>设备抬升高度<input type="text" v-model="machine">mm</p>
              <!-- <p>人员检修台面<input type="text" v-model="staff">mm</p> -->
            </div>
          </div>
        </div>
        <!-- <div class="horizon">
        </div> -->
      </div>
    </div>
    <!-- 标签 -->
    <v-Tip @loopKen='loop_ken' :ken='ken' @versionSize='sel_size' :peoSel='peoSel'></v-Tip>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Tip from '@/components/Tip.vue'
import Drag from '../utils/drag.js'
import Move from '../utils/move.js'
import People from '../utils/people.js'
import { mapState } from 'vuex'

export default {
  name: 'Operate',
  components: {
    'v-Nav': Nav,
    'v-Tip': Tip
  },
  data () {
    return {
      // 评分标准
      kind1: '',
      kind2: '',
      // 滚动的距离
      srcollTop: 0,
      srcollTop1: 0,
      srcollTop2: 0,
      srcollTop3: 0,
      // 机器src
      picture: '',
      // 友好评价
      friendly: null,
      // 强度评价
      intensity: '',
      // 疲劳积累评价
      weary: '',
      // 总分数
      score: 0,
      // 最大的计算时间
      maxHour: 0,
      // 需要传到后台的数据
      reqData: {},
      // 请求回来的图片 和 定位
      reqImg: '',
      reqPos: '',
      // 用来请求动作图片的数据
      allGrade: 2.5,
      frontReq: { id: 1, grade: 1.5 },
      armReq: { id: 1, grade: 0 },
      wristReq: { id: 1, grade: 1 },
      // 时间轴的时间选择
      borderLeft: 0,
      // img2的宽度和高度
      img2Hei: 165+40,
      // 人体大小的选择
      peoSel: 1,
      // 视线的开关
      ken: false,
      // 机器的抬升高度
      machine: 0,
      // 当前时间段
      timeSlot: 1,
      activeName: 'front',
      page: 3,
      maxTime: 90,
      // 复制文字
      copyTxt: '',
      // 姿态动作数据
      front: [
        { id: 1, text: '直立', grade: 1.5 },
        { id: 2, text: '轻微前倾', grade: 2.5 },
        { id: 3, text: '深度前倾', grade: 3.5 },
        { id: 4, text: '半蹲', grade: 5 },
        { id: 5, text: '坐下', grade: 0.5 },
        { id: 6, text: '跨步', grade: 4 },
        { id: 7, text: '单膝跪下', grade: 2.5 },
        { id: 8, text: '蹲下', grade: 2.5 },
        { id: 9, text: '平蹲', grade: 2 }
      ],
      // 手臂动作数据
      arm: [
        { id: 1, text: '不作业姿态(正常下垂)', grade: 0 },
        { id: 2, text: '齐腰', grade: 1 },
        { id: 3, text: '介于腰和胸间', grade: 1.5 },
        { id: 4, text: '齐胸', grade: 1.5 },
        { id: 5, text: '齐胸，双手有高差', grade: 2 },
        { id: 6, text: '齐肩', grade: 3 },
        { id: 7, text: '过项（单手操作）', grade: 3.5 },
        { id: 8, text: '过项（双手操作）', grade: 4 }
      ],
      // 手腕
      wrist: [
        { id: 1, text: '掌面向上', grade: 1 },
        { id: 2, text: '掌面向内', grade: 0 },
        { id: 3, text: '掌面向下', grade: 0.5 }
      ]
    }
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapState(['frontData', 'armData', 'wristData'])
  },
  // 监控data中的数据变化
  watch: {
    // 最大时间的输入限制
    maxTime (val) {
      this.maxTime = val.replace(/\D/g, '')
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // this.page = this.maxTime / 30
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // 给总数据添加数组
    this.$store.state.frontAll = []
    this.$store.state.armAll = []
    this.$store.state.wristAll = []
    for (let i = 0; i < this.page; i++) {
      // console.log(i)
      this.$store.state.frontAll.push([])
      this.$store.state.armAll.push([])
      this.$store.state.wristAll.push([])
    }
    // 获取部位图片
    this.$http.machinePartsDetail({
      part_id: this.$route.query.partId
    }).then(res => {
      // console.log(res)
      if (res.data.ret === 200) {
        this.picture = res.data.data.picture
      }
    }).catch(err => {
      console.log(err)
    })
    // 获取评分标准
    this.$http.getStandard({
    }).then(res => {
      console.log(res)
      if (res.data.ret === 200) {
        this.kind1 = res.data.data.kind1
        this.kind2 = res.data.data.kind2
      }
    }).catch(err => {
      console.log(err)
    })
    this.req_picture('111')
  },
  // 方法集合
  methods: {
    // 用来获取滚动的距离
    getScroll (event, txt) {
      this.srcollTop = event.target.scrollTop
      switch (txt) {
        case 'front':
          this.srcollTop1 = this.srcollTop
          break
        case 'arm':
          this.srcollTop2 = this.srcollTop
          break
        case 'wrist':
          this.srcollTop3 = this.srcollTop
          break
      }
    },
    // 用来获取动作方法
    req_picture (str) {
      this.$http.getPeoplePicture({
        ad_point: str
      }).then(res => {
        // console.log(res)
        if (res.data.ret === 200) {
          this.reqImg = res.data.data.ad_picture
          this.reqPos = res.data.data.ad_position
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 用来删除数据的方法
    del_data (i, num) {
      switch (num) {
        case 1:
          console.log(this.$store.state.frontData)
          this.$store.state.frontData.splice(i, 1)
          console.log(this.$store.state.frontData)
          break
        case 2:
          console.log(this.$store.state.armData)
          this.$store.state.armData.splice(i, 1)
          console.log(this.$store.state.armData)
          break
        case 3:
          console.log(this.$store.state.wristData)
          this.$store.state.wristData.splice(i, 1)
          console.log(this.$store.state.wristData)
          break
      }
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
      // console.log(this.frontReq, this.armReq, this.wristReq)
      const point = this.frontReq.id + '' + this.armReq.id + '' + this.wristReq.id + ''
      // console.log(point)
      this.req_picture(point)
    },
    // 选择人体大小
    sel_size (s) {
      this.peoSel = s
      if (s === 1) {
        this.img2Hei = 165+40
      } else {
        this.img2Hei = 174+50
      }
    },
    // 打开视线的开关
    loop_ken () {
      if (!this.ken) {
        this.ken = true
      } else {
        this.ken = false
      }
    },
    // 选择时间的按钮
    sel_time (i) {
      // 用来记录值
      this.$store.state.frontAll[this.timeSlot - 1] = this.$store.state.frontData
      this.$store.state.armAll[this.timeSlot - 1] = this.$store.state.armData
      this.$store.state.wristAll[this.timeSlot - 1] = this.$store.state.wristData
      this.timeSlot = i
      // 用来取消选中
      for (var item1 of this.frontData) {
        item1.activeState = false
      }
      for (var item2 of this.armData) {
        item2.activeState = false
      }
      for (var item3 of this.wristData) {
        item3.activeState = false
      }
      // 用来初始化时间
      this.borderLeft = 0
      // 用来取值
      // console.log(this.$store.state.frontAll[i - 1])
      if (this.$store.state.frontAll[i - 1].length === 0) {
        this.$store.state.frontData = []
      } else {
        this.$store.state.frontData = this.$store.state.frontAll[i - 1]
      }

      if (this.$store.state.armAll[i - 1].length === 0) {
        this.$store.state.armData = []
      } else {
        this.$store.state.armData = this.$store.state.armAll[i - 1]
      }

      if (this.$store.state.wristAll[i - 1].length === 0) {
        this.$store.state.wristData = []
      } else {
        this.$store.state.wristData = this.$store.state.wristAll[i - 1]
      }
      // console.log(this.$store.state.frontData, this.$store.state.frontAll)
      // console.log(this.$store.state.armData, this.$store.state.armAll)
      // console.log(this.$store.state.wristData, this.$store.state.wristAll)
    },
    // 人物的移动
    people_down (e) {
      // console.log(this.$refs.people), 'people', 'peopleBox'
      People.people(e, this.$refs.people, this.$refs.peopleBox)
    },
    // 选择动作后，按下右边的三角形
    delta_down (e, refName, fatherName, boxName, boxId, i) {
      Move.move(e, this.$refs[refName][0], this.$refs[fatherName][0], this.$refs[boxName], boxId, i)
    },
    // 选择点击的span状态
    sel_span (i, num) {
      for (var item1 of this.frontData) {
        item1.activeState = false
      }
      for (var item2 of this.armData) {
        item2.activeState = false
      }
      for (var item3 of this.wristData) {
        item3.activeState = false
      }
      if (num === 1) {
        this.frontData[i].activeState = true
      } else if (num === 2) {
        this.armData[i].activeState = true
      } else {
        this.wristData[i].activeState = true
      }
    },
    // 动作按下移动
    onmousedown (e, i, id, sel, grade) {
      Drag.drag(e, this.$refs.set, this.$refs[i][0], this.$refs.time2, this.$refs.time3, this.$refs.time4, id, sel, grade, this.srcollTop)
    },
    // 时间输入框失去焦点
    blur_input () {
      // console.log('123', this.$store.state)
      this.$store.state.frontAll = []
      this.$store.state.armAll = []
      this.$store.state.wristAll = []
      this.page = Math.floor(this.maxTime / 30)
      // console.log(this.page)
      for (let i = 0; i < this.page; i++) {
        // console.log(i)
        this.$store.state.frontAll.push([])
        this.$store.state.armAll.push([])
        this.$store.state.wristAll.push([])
      }
      // console.log(this.$store.state.frontAll)
    },
    // 导航
    handleClick (tab, event) {
      // console.log(tab, event)
      switch (tab.name) {
        case 'front':
          this.srcollTop = this.srcollTop1
          break
        case 'arm':
          this.srcollTop = this.srcollTop2
          break
        case 'wrist':
          this.srcollTop = this.srcollTop3
          break
      }
    },
    // 下一步
    next () {
      // console.log('下一步')
      // 赋值
      this.$store.state.frontAll[this.timeSlot - 1] = this.$store.state.frontData
      this.$store.state.armAll[this.timeSlot - 1] = this.$store.state.armData
      this.$store.state.wristAll[this.timeSlot - 1] = this.$store.state.wristData
      // console.log(this.$store.state.frontAll, this.$store.state.armAll, this.$store.state.wristAll)
      // 判断是否有数据
      let frontTem = false; let armTem = false; let wristTem = false
      // 计算评分
      let frontGrade = 0; let armGrade = 0; let wristGrade = 0
      // 最大时间
      let frontTime = 0; let armTime = 0; let wristTime = 0
      // console.log(this.$store.state.frontAll)
      // 用来添加没有数据的但需要添加的数据
      for (const item in this.$store.state.frontAll) {
        // console.log(item)
        let frontWid = 0; let armWid = 0; let wristWid = 0
        for (const i of this.$store.state.frontAll[item]) {
          console.log(i)
          frontWid = frontWid + i.wid
        }
        for (const i of this.$store.state.armAll[item]) {
          console.log(i)
          armWid = armWid + i.wid
        }
        for (const i of this.$store.state.wristAll[item]) {
          console.log(i)
          wristWid = wristWid + i.wid
        }
        if (frontWid > armWid && frontWid > wristWid) {
          this.$store.state.armAll[item].push({ id: 1, activeState: false, wid: frontWid - armWid, grade: 0 })
          this.$store.state.wristAll[item].push({ id: 1, activeState: false, wid: frontWid - wristWid, grade: 1 })
        } else if (armWid > frontWid && armWid > wristWid) {
          this.$store.state.frontAll[item].push({ id: 1, activeState: false, wid: armWid - frontWid, grade: 1.5 })
          this.$store.state.wristAll[item].push({ id: 1, activeState: false, wid: armWid - wristWid, grade: 1 })
        } else if (wristWid > frontWid && wristWid > armWid) {
          this.$store.state.frontAll[item].push({ id: 1, activeState: false, wid: wristWid - frontWid, grade: 1.5 })
          this.$store.state.armAll[item].push({ id: 1, activeState: false, wid: wristWid - armWid, grade: 0 })
        }
      }
      // 计算评分和最大时间
      for (const item of this.$store.state.frontAll) {
        if (item.length !== 0) {
          frontTem = true
          // 计算评分
          for (const i of item) {
            // console.log(i)
            frontGrade = frontGrade + (Math.round(i.wid / 25.67) * i.grade)
            frontTime = frontTime + Math.round(i.wid / 25.67)
          }
        }
      }
      for (const item of this.$store.state.armAll) {
        if (item.length !== 0) {
          armTem = true
          // 计算评分
          for (const i of item) {
            armGrade = armGrade + (Math.round(i.wid / 25.67) * i.grade)
            armTime = armTime + Math.round(i.wid / 25.67)
          }
        }
      }
      for (const item of this.$store.state.wristAll) {
        if (item.length !== 0) {
          wristTem = true
          // 计算评分
          for (const i of item) {
            wristGrade = wristGrade + (Math.round(i.wid / 25.67) * i.grade)
            wristTime = wristTime + Math.round(i.wid / 25.67)
          }
        }
      }
      this.score = frontGrade + armGrade + wristGrade
      if (frontTime >= armTime && frontTime >= wristTime) {
        this.maxHour = frontTime
      } else if (armTime >= frontTime && armTime >= wristTime) {
        this.maxHour = armTime
      } else if (wristTime >= frontTime && wristTime >= armTime) {
        this.maxHour = wristTime
      }
      // 疲劳积累评价
      if (this.score >= parseInt(this.kind1[0].up) && this.score < parseInt(this.kind1[0].down)) {
        this.weary = 'A'
      } else if (this.score >= parseInt(this.kind1[1].up) && this.score < parseInt(this.kind1[1].down)) {
        this.weary = 'B'
      } else if (this.score >= parseInt(this.kind1[2].up) && this.score < parseInt(this.kind1[2].down)) {
        this.weary = 'C'
      } else if (this.score >= parseInt(this.kind1[3].up) && this.score < parseInt(this.kind1[3].down)) {
        this.weary = 'D'
      }
      // 任务强度评价
      const int = Math.round(this.score / this.maxHour * 10) / 10
      // console.log(int)
      if (int >= parseInt(this.kind2[0].up) && int < parseInt(this.kind2[0].down)) {
        this.intensity = 'A'
      } else if (int >= parseInt(this.kind2[1].up) && int < parseInt(this.kind2[1].down)) {
        this.intensity = 'B'
      } else if (int >= parseInt(this.kind2[2].up) && int < parseInt(this.kind2[2].down)) {
        this.intensity = 'C'
      } else if (int >= parseInt(this.kind2[3].up) && int < parseInt(this.kind2[3].down)) {
        this.intensity = 'D'
      }
      // 友好评价
      let friendlyStr = ''
      if (this.weary === 'A' && this.intensity === 'A') {
        friendlyStr = 'A'
      } else if (this.weary === 'B' && this.intensity === 'A') {
        friendlyStr = 'B+'
      } else if (this.weary === 'A' && this.intensity === 'B') {
        friendlyStr = 'B'
      } else if (this.weary === 'B' && this.intensity === 'B') {
        friendlyStr = 'B-'
      } else if (this.weary === 'A' && this.intensity === 'C') {
        friendlyStr = 'B-'
      } else if (this.weary === 'B' && this.intensity === 'C') {
        friendlyStr = 'C+'
      } else if (this.weary === 'A' && this.intensity === 'D') {
        friendlyStr = 'D'
      } else if (this.weary === 'B' && this.intensity === 'D') {
        friendlyStr = 'D'
      } else if (this.weary === 'C' && this.intensity === 'A') {
        friendlyStr = 'B-'
      } else if (this.weary === 'D' && this.intensity === 'A') {
        friendlyStr = 'D'
      } else if (this.weary === 'C' && this.intensity === 'B') {
        friendlyStr = 'C'
      } else if (this.weary === 'D' && this.intensity === 'B') {
        friendlyStr = 'D'
      } else if (this.weary === 'C' && this.intensity === 'C') {
        friendlyStr = 'C-'
      } else if (this.weary === 'D' && this.intensity === 'C') {
        friendlyStr = 'D'
      } else if (this.weary === 'C' && this.intensity === 'D') {
        friendlyStr = 'D'
      } else if (this.weary === 'D' && this.intensity === 'D') {
        friendlyStr = 'D'
      }
      this.friendly = friendlyStr.split('')
      // console.log(this.weary, this.intensity, this.friendly)
      // 需要传到后台的数据
      this.reqData = {
        front: this.$store.state.frontAll,
        arm: this.$store.state.armAll,
        wrist: this.$store.state.wristAll,
        weary: this.weary,
        intensity: this.intensity,
        friendly: this.friendly,
        maxHour: this.maxHour,
        machine: this.machine,
        maxTime: this.maxTime,
        picture: this.picture
      }
      if (frontTem || armTem || wristTem) {
        this.$confirm('', '', {
          confirmButtonText: '完成检修任务设定',
          cancelButtonText: '返回，继续设定',
          closeOnClickModal: false
        }).then(() => {
          this.set_name()
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        })
      } else {
        // console.log('123')
        this.$message('请完成操作后再执行此步骤')
      }
    },
    // 设置名称
    set_name () {
      this.$prompt('检修任务名称', '', {
        confirmButtonText: '确定',
        showCancelButton: false,
        customClass: 'nameMeg',
        inputPattern: /\S/,
        inputErrorMessage: '请输入名称'
      }).then(({ value }) => {
        // console.log(value)
        this.add_task(value)
      })
    },
    // 添加任务
    add_task (name) {
      this.$http.addTask({
        token: localStorage.getItem('token'),
        name: name,
        content: JSON.stringify(this.reqData)
      }).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.$store.state.frontData = []
          this.$store.state.armData = []
          this.$store.state.wristData = []
          this.$router.push({ path: `/result?navShow=1&taskId=${res.data.data.id}` })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 返回
    revert () {
      // console.log('返回')
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='scss'>
#Operate{
  height: 100vh;
  min-width: 1200px;
  min-height: 675px;
  .right {
    float: right;
    width: calc(100% - 113px);
    height: 100%;
    background: #F2F1F8;
    position: relative;
    .ope{
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
              .close{
                display: inline-block;
                font-size: 14px;
                color: white;
                position: absolute;
                top: 2px;
                right: 4px;
                line-height: 12px;
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
          position: relative;
          .el-tabs__header{
            margin: 0;
          }
          .el-tabs__nav{
            width: 100%;
            background: #C5D6ED;
            border-radius:6px 6px 0px 0px;
            .el-tabs__item{
              width: 33.33%;
              font-size: 15px;
            }
            .el-tabs__item:first-child{
              border-radius:6px 0px 0px 0px;
            }
            .el-tabs__item:last-child{
              border-radius:0 6px 0px 0px;
            }
            .is-active{
              background: #0C1937;
              color: white;
            }
          }
          .el-tabs__content{
            height: 241px;
            padding: 13px 15px;
            background: white;
            .list{
              height: 241px;
              overflow: auto;
              p{
                // width: calc(100% - 30px);
                width: 100%;
                height: 28px;
                line-height: 28px;
                border-radius:3px;
                background: #C5D6ED;
                margin-bottom: 8px;
                // position: absolute;
                // z-index: 99;
                cursor: default;
              }
            }
            /*滚动条样式*/
            .list::-webkit-scrollbar {/*滚动条整体样式*/
              width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
              height: 4px;
            }
            .list::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
              border-radius: 5px;
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              background: rgba(0,0,0,0.2);
            }
            .list::-webkit-scrollbar-track {/*滚动条里面轨道*/
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              border-radius: 0;
              background: rgba(0,0,0,0.1);
            }
          }
          .copy-dom{
            display: none;
            width: 204px;
            height: 28px;
            line-height: 28px;
            border-radius:3px;
            background: #C5D6ED;
            margin-bottom: 8px;
            position: absolute;
            z-index: 99;
          }
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
              /*height: 108px;*/
              position: absolute;
              bottom: 0;
              left: 30px;
            }
            .img2{
              /*width: 46px;*/
              height: 226px;
              width: auto;
              position: absolute;
              bottom: 0;
              // right: 160px;
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
          .act-r-height{
            display: flex;
            justify-content: space-around;
            align-items: center;
            p{
              input{
                width: 50px;
                border: none;
                background: transparent;
                outline: none;
                border-bottom:1px solid black;
                text-align: center;
              }
            }
          }
        }
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
  .nameMeg{
    .el-message-box__content{
      display: block;
    }
    .el-message-box__btns{
      .el-button{
        margin: 0;
      }
    }
  }
}
</style>
