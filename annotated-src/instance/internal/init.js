import { mergeOptions } from '../../util/index'
// [ES6 let命令](http://es6.ruanyifeng.com/#docs/let#let命令)  
// 聲明一個塊級變量`uid`
let uid = 0

export default function (Vue) {
  /**
   * The main init sequence. This is called for every
   * instance, including ones that are created from extended
   * constructors.
   *
   * @param {Object} options - this options object should be
   *                           the result of merging class
   *                           options and the options passed
   *                           in to the constructor.
   */
  // 增加一個私有`_init()`方法到prototype
  Vue.prototype._init = function (options) {
    options = options || {}
    // [vm.$el](https://vuejs.org.cn/api/#vm-el)  
    // `vue`實例的掛載點  
    // 初始值為`null`  
    // 如果有`options.el`傳入會執行`this.$mount(options.el)`
    this.$el = null
    // [vm.$parent](https://vuejs.org.cn/api/#vm-parent)  
    // 父`Vue`實例
    this.$parent = options.parent
    // [vm.$root](https://vuejs.org.cn/api/#vm-root)  
    // 當前組件樹的根`Vue`實例   
    // 如果當前實例沒有根, 就設為自己
    this.$root = this.$parent
      ? this.$parent.$root
      : this
    // [vm.$children](https://vuejs.org.cn/api/#vm-children)  
    // 當前實例的直接子組件陣列
    this.$children = []
    // [vm.$refs](https://vuejs.org.cn/api/#vm-refs)  
    // 用`v-ref`註冊的所有子組件
    this.$refs = {}       /* child vm references */
    // [vm.$els](https://vuejs.org.cn/api/#vm-els)  
    // 用`v-el`註冊的所有DOM元素
    this.$els = {}        /* element references */
    this._watchers = []   /* all watchers as an array */
    this._directives = [] /* all directives */

    /* a uid */
    this._uid = uid++

    /* a flag to avoid this being observed */
    this._isVue = true

    /* events bookkeeping */
    this._events = {}            /* registered callbacks */
    this._eventsCount = {}       /* for $broadcast optimization */

    /* fragment instance properties */
    this._isFragment = false
    this._fragment =         /* @type {DocumentFragment} */
    this._fragmentStart =    /* @type {Text|Comment} */
    this._fragmentEnd = null /* @type {Text|Comment} */

    /* lifecycle state */
    this._isCompiled =
    this._isDestroyed =
    this._isReady =
    this._isAttached =
    this._isBeingDestroyed =
    this._vForRemoving = false
    this._unlinkFn = null

    /* context: */
    /* if this is a transcluded component, context */
    /* will be the common parent vm of this instance */
    /* and its host. */
    this._context = options._context || this.$parent

    /* scope: */
    /* if this is inside an inline v-for, the scope */
    /* will be the intermediate scope created for this */
    /* repeat fragment. this is used for linking props */
    /* and container directives. */
    this._scope = options._scope

    /* fragment: */
    /* if this instance is compiled inside a Fragment, it */
    /* needs to reigster itself as a child of that fragment */
    /* for attach/detach to work properly. */
    this._frag = options._frag
    if (this._frag) {
      this._frag.children.push(this)
    }

    /* push self into parent / transclusion host */
    if (this.$parent) {
      this.$parent.$children.push(this)
    }

    /* merge options. */
    options = this.$options = mergeOptions(
      this.constructor.options,
      options,
      this
    )

    // `_updateRef()`實作在`instance/internal/lifecycle.js`
    /* set ref */
    this._updateRef()

    /* initialize data as empty object. */
    /* it will be filled up in _initData(). */
    this._data = {}

    // `_callHook()`實作在`instance/internal/events.js`
    /* call init hook */
    this._callHook('init')

    // `_initState()`實作在`instance/internal/state.js`
    /* initialize data observation and scope inheritance. */
    this._initState()

    // `_initEvents()`實作在`instance/internal/events.js`
    /* setup event system and option events. */
    this._initEvents()

    /* call created hook */
    this._callHook('created')

    /* if `el` option is passed, start compilation. */
    if (options.el) {
      // [vm.$mount](https://vuejs.org.cn/api/#vm-mount)  
      // 手動掛載`Vue`實例至錨點
      this.$mount(options.el)
    }
  }
}
