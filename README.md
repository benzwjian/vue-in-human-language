# Vue.js in Human Language  
目的：
1. 用 Annotated Comments Style 加上**自己的註解**來理解 Vue 1.0.26 的源碼
2. 建議從這支 [vue.js](https://benzwjian.github.io/vue-in-human-language/docs/annotated-src/instance/vue.js.html) 開始 review  

檔案結構：
1. src/ : Vue 源碼
2. annotated-src/ : 將 Vue 源碼裏的單行註解 `//` 換成多行註解 `/* */`
3. docs/ : 從 annotated-src/ 內的源碼產生的 annotated docs

指令：
1. npm start : 重新產生 annotated-src/ 和 docs/
2. npm test : 重新產生 docs/

有興趣一起完善這份註解文件, 請直接發PR給我：
1. clone 副本
2. 加註解到 annotated-src/*.js (請使用單行註解)
3. 執行 npm test 產生 docs/*.html，然後用瀏覽器預覽
4. 你的貢獻值得分享就發PR給我