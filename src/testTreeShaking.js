


console.log('我是treeShaking',);

const v = '我是变量v'
function other(){
  console.log('我是other')
}
function other2(){
  console.log('我是other2')
}

const add2 = function () {
  console.log('我是add')
  // other2();
}
const squ = () => {
  console.log('我是squ')
  other2();
}
export {
  add2,
  squ
}
// module.exports = {
//   add2, squ
// }