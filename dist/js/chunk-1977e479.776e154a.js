(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1977e479"],{a6b5:function(t,e,n){},eeac:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"Result"}},[n("v-Nav",{attrs:{navShow:t.navShow},on:{next:t.next,revert:t.revert}}),n("div",{staticClass:"right"},[n("div",{staticClass:"res"},[n("div",{staticClass:"r-evaluate"},[n("p",[t._v("检修任务名称："+t._s(t.name))]),n("p",[t._v("修任务疲劳积累评价："),n("span",[t._v(t._s(t.weary))])]),n("p",[t._v("检修任务强度评价："),n("span",[t._v(t._s(t.intensity))])]),n("h3",[t._v("检修任务设定友好型评价："),n("p",{staticClass:"yin"},[t._v(t._s(this.friendly[0]?this.friendly[0]:"")),n("span",[t._v(t._s(this.friendly[1]?this.friendly[1]:""))])])]),n("div",{staticClass:"stamp"},[t._v("打印")])]),t._m(0)])])],1)},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"r-modify"},[n("div",{staticClass:"question"},[n("h3",[t._v("问题")]),n("p",[t._v("一线检修人员认为他们长期承受着源于工作引起的生理不适与 心理压力，检修工作枯燥烦闷、强度高，且责任压力大、维修 环境差，是造成他们在生理、心理方面的疲劳与损伤，产生情 绪波动，影响工作效益，增多误操作等问题的主要原因（案例）")])]),n("div",{staticClass:"optimize"},[n("h3",[t._v("设计优化建议")]),n("p",[t._v("通过设计提升检修人员在列车检修人-机-环境系统中与其他因 素的匹配程度，有效地将以人为中心的理念整合到检修的设计 中，使检修人员能够在处于较为自然体态或舒适状态下进行检 修任务操作，达到提高作业者工作绩效的目的。（案例） 加强检修任务过程中各环节的交互性，尤其是加强包括环境、 机械、工具等相关因素与")])])])}],i=(n("b0c0"),n("216c")),r={name:"Result",components:{"v-Nav":i["a"]},data:function(){return{friendly:"",intensity:"",weary:"",name:"",navShow:1}},computed:{},watch:{},created:function(){},mounted:function(){var t=this;this.navShow=parseInt(this.$route.query.navShow),this.$http.taskDetail({token:localStorage.getItem("token"),id:this.$route.query.taskId}).then((function(e){if(200===e.data.ret){t.name=e.data.data.name;var n=JSON.parse(e.data.data.content);t.weary=n.weary,t.intensity=n.intensity,t.friendly=n.friendly}})).catch((function(t){console.log(t)}))},methods:{next:function(){console.log("下一步")},revert:function(){this.$router.go(-1)}}},o=r,c=(n("f309"),n("2877")),v=Object(c["a"])(o,a,s,!1,null,"786ab780",null);e["default"]=v.exports},f309:function(t,e,n){"use strict";var a=n("a6b5"),s=n.n(a);s.a}}]);