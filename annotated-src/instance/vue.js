// 一些internal methods/properties
import initMixin from './internal/init'
import stateMixin from './internal/state'
import eventsMixin from './internal/events'
import lifecycleMixin from './internal/lifecycle'
import miscMixin from './internal/misc'
// 一些public API
import dataAPI from './api/data'
import domAPI from './api/dom'
import eventsAPI from './api/events'
import lifecycleAPI from './api/lifecycle'

/**
 * The exposed Vue constructor.
 *
 * API conventions:
 * - public API methods/properties are prefixed with `$`
 * - internal methods/properties are prefixed with `_`
 * - non-prefixed properties are assumed to be proxied user
 *   data.
 *
 * @constructor
 * @param {Object} [options]
 * @public
 */
// `Vue`的constructor  
// 每New一個`Vue`的物件之前都會先呼叫`_init()`  
// `_init()`實作在`instance/internal/init.js`
function Vue (options) {
  this._init(options)
}

/* install internals */
// mixin一些internal methods/properties到`Vue`   
// 補充：[Mixins的優劣](http://www.ithome.com.tw/voice/107354)
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
miscMixin(Vue)

/* install instance APIs */
// 安裝一些public API到`Vue`
dataAPI(Vue)
domAPI(Vue)
eventsAPI(Vue)
lifecycleAPI(Vue)
// [ES6 Module語法](http://es6.ruanyifeng.com/#docs/module)
export default Vue
