/**
 * 用来移动三角形的方法
 * e为event
 * a为移动的三角形
 * b为移动三角形的父元素
 * c为姿态、手臂、手腕的框
 * boxId为框的ID
 * i为框数据的下标
 */
import store from '../store'

export default {
  move (e, a, b, c, boxId, i) {
    // console.log('123', b.offsetLeft, b.offsetWidth)
    // 算出鼠标的位置
    const mounseX = e.clientX
    // const mounseY = e.clientY
    // 算出元素的位置
    const divX = a.offsetLeft
    // 用来需要移动的dom的宽度
    const fatherW = b.offsetWidth
    // 控制是否按下移动
    var downState = false
    // 用来控制最大的移动
    var Cwidth = c.getBoundingClientRect().x + c.offsetWidth
    // console.log(Cwidth)
    document.onmousedown = (event) => {
      // console.log(event)
      downState = true
    }
    document.onmousemove = (e) => {
      // console.log(e.clientX)
      if (downState) {
        // 用鼠标移动后的位置减去鼠标的位置，得到鼠标移动的距离
        const left = e.clientX - mounseX
        if (left < 0) {
          if (b.offsetWidth < 26) {
            return false
          }
        } else {
          if (e.clientX >= Cwidth) {
            return false
          }
          // 用来检测是否移动满了
          switch (boxId) {
            case 1:
              var frontWid = 0
              for (var item1 of store.state.frontData) {
                frontWid = frontWid + item1.wid
              }
              if (frontWid >= 767) {
                return false
              }
              break
            case 2:
              var armWid = 0
              for (var item2 of store.state.armData) {
                armWid = armWid + item2.wid
              }
              if (armWid >= 767) {
                return false
              }
              break
            case 3:
              var wristWid = 0
              for (var item3 of store.state.wristData) {
                wristWid = wristWid + item3.wid
              }
              if (wristWid >= 767) {
                return false
              }
              break
          }
        }
        // 用来改变
        switch (boxId) {
          case 1:
            store.state.frontData[i].wid = fatherW + left
            break
          case 2:
            store.state.armData[i].wid = fatherW + left
            break
          case 3:
            store.state.wristData[i].wid = fatherW + left
            break
        }
        // 移动当前元素
        a.style.left = divX + left + 'px'
        b.style.width = fatherW + left + 'px'
      }
    }
    document.onmouseup = (e) => {
      // 用鼠标移动后的位置减去鼠标的位置，得到鼠标移动的距离
      // const left = e.clientX - mounseX
      // switch (boxId) {
      //   case 1:
      //     store.state.frontData[i].wid = fatherW + left
      //     break
      //   case 2:
      //     store.state.armData[i].wid = fatherW + left
      //     break
      //   case 3:
      //     store.state.wristData[i].wid = fatherW + left
      //     break
      // }
      downState = false
      document.onmousedown = null
      document.onmouseup = null
    }
  }
}
