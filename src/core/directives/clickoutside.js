import Vue from 'vue'
/**
 * 
 * 点击其他部分消失
 * <div v-clickoutside="handleCloseTfC2Menu" v-show="isShowTfC2Menu" >
 * 
 */
const clickoutside = Vue.directive('clickoutside', {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  inserted: function (el, binding, vnode) {
    // 初始化指令
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
})

export default clickoutside
