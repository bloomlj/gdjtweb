/**
 * 用来移动三角形的方法
 * e为event
 * a为移动的人形
 * c为人形移入的框
 */
// import store from '../store'

export default {
  people (e, a, c) {
    e.preventDefault()
    console.log(a.offsetWidth)
    // 算出鼠标的位置
    const mounseX = e.clientX
    // 算出元素的位置
    const divX = a.offsetLeft
    // 控制是否按下移动
    var downState = false
    // 用来控制最大的移动
    var CMin = c.getBoundingClientRect().x + e.offsetX
    var CMax = c.getBoundingClientRect().x + c.offsetWidth - (a.offsetWidth - e.offsetX)
    document.onmousedown = (event) => {
      downState = true
    }
    document.onmousemove = (e) => {
      if (downState) {
        // 用鼠标移动后的位置减去鼠标的位置，得到鼠标移动的距离
        const left = e.clientX - mounseX
        if (e.clientX < CMin) {
          return false
        }
        if (e.clientX > CMax) {
          return false
        }
        // 移动当前元素
        a.style.left = divX + left + 'px'
      }
    }
    document.onmouseup = (e) => {
      downState = false
      document.onmousedown = null
      document.onmouseup = null
    }
  }
}
