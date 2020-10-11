import store from '../store'

/*
  用来移动动作到动作框中
  e为event
  a为模拟复制出的dom
  b为复制的对象

  z为姿态的dom
  x为手臂的dom
  c为手腕的dom

  grade为分数

  top为滚动条的高度
*/
// 引入vuex
// import store from '../store/index'
export default {
  drag (e, a, b, z, x, c, timeId, sel, g, top) {
    // console.log(top)
    // z
    var Zwidth = z.getBoundingClientRect().x + z.offsetWidth
    var Zheight = z.getBoundingClientRect().y + z.offsetHeight
    // x
    var Xwidth = x.getBoundingClientRect().x + x.offsetWidth
    var Xheight = x.getBoundingClientRect().y + x.offsetHeight
    // c
    var Cwidth = c.getBoundingClientRect().x + c.offsetWidth
    var Cheight = c.getBoundingClientRect().y + c.offsetHeight
    // 算出鼠标的位置
    const mounseX = e.clientX
    const mounseY = e.clientY
    // 模拟复制
    a.innerText = b.innerText
    a.style.display = 'block'
    a.style.left = b.offsetLeft + 'px'
    a.style.top = b.offsetTop + 33 - top + 'px'
    // 算出元素的位置
    const divX = a.offsetLeft
    const divY = a.offsetTop
    var downState = false
    document.onmousedown = (event) => {
      // console.log(event)
      downState = true
    }
    document.onmousemove = (e) => {
      if (downState) {
        // 用鼠标移动后的位置减去鼠标的位置，得到鼠标移动的距离
        const left = e.clientX - mounseX
        const top = e.clientY - mounseY
        // 移动当前元素
        a.style.left = divX + left + 'px'
        a.style.top = divY + top + 'px'
        // 用来判断是否移动到了目标内
        switch (sel) {
          case 1:
            // 判断移动到了姿态框内
            if (z.getBoundingClientRect().x <= e.clientX && e.clientX <= Zwidth && z.getBoundingClientRect().y <= e.clientY && e.clientY <= Zheight) {
              z.style.outline = '1px solid #00FF29'
            } else {
              z.style.outline = 'none'
            }
            break
          case 2:
            // 判断是否移动到目标内 手臂
            if (x.getBoundingClientRect().x <= e.clientX && e.clientX <= Xwidth && x.getBoundingClientRect().y <= e.clientY && e.clientY <= Xheight) {
              x.style.outline = '1px solid #00FF29'
            } else {
              x.style.outline = 'none'
            }
            break
          case 3:
            // 判断是否移动到目标内 手腕
            if (c.getBoundingClientRect().x <= e.clientX && e.clientX <= Cwidth && c.getBoundingClientRect().y <= e.clientY && e.clientY <= Cheight) {
              c.style.outline = '1px solid #00FF29'
            } else {
              c.style.outline = 'none'
            }
            break
        }
      }
    }
    document.onmouseup = (e) => {
      switch (sel) {
        case 1:
          // 判断移动到了姿态框内
          if (z.getBoundingClientRect().x <= e.clientX && e.clientX <= Zwidth && z.getBoundingClientRect().y <= e.clientY && e.clientY <= Zheight) {
            let allWid = 0
            for (var item of store.state.frontData) {
              console.log(item)
              allWid = allWid + item.wid
            }
            console.log(allWid)
            if (767 - allWid > 130) {
              store.state.frontData.push({ id: timeId, activeState: false, wid: 130, grade: g })
            } else {
              store.state.frontData.push({ id: timeId, activeState: false, wid: 767 - allWid, grade: g })
            }
          }
          break
        case 2:
          // 判断是否移动到目标内 手臂
          if (x.getBoundingClientRect().x <= e.clientX && e.clientX <= Xwidth && x.getBoundingClientRect().y <= e.clientY && e.clientY <= Xheight) {
            // store.state.armData.push({ id: timeId, activeState: false, wid: 130 })
            let allWid = 0
            for (var item1 of store.state.armData) {
              allWid = allWid + item1.wid
            }
            if (767 - allWid > 130) {
              store.state.armData.push({ id: timeId, activeState: false, wid: 130, grade: g })
            } else {
              store.state.armData.push({ id: timeId, activeState: false, wid: 767 - allWid, grade: g })
            }
          }
          break
        case 3:
          // 判断是否移动到目标内 手腕
          if (c.getBoundingClientRect().x <= e.clientX && e.clientX <= Cwidth && c.getBoundingClientRect().y <= e.clientY && e.clientY <= Cheight) {
            // store.state.wristData.push({ id: timeId, activeState: false, wid: 130 })
            let allWid = 0
            for (var item2 of store.state.wristData) {
              allWid = allWid + item2.wid
            }
            if (767 - allWid > 130) {
              store.state.wristData.push({ id: timeId, activeState: false, wid: 130, grade: g })
            } else {
              store.state.wristData.push({ id: timeId, activeState: false, wid: 767 - allWid, grade: g })
            }
          }
          break
      }
      // 抬起鼠标
      c.style.outline = 'none'
      x.style.outline = 'none'
      z.style.outline = 'none'
      a.style.display = 'none'
      a.style.left = b.offsetLeft + 'px'
      a.style.top = b.offsetTop + 33 + 'px'
      downState = false
      document.onmousedown = null
      document.onmouseup = null
    }
  }
}
