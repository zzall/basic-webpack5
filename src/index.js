
import './index.css'
// import './index.less'
// import './data.json'
import Jpg from './img1.jpg'
import './testTreeShaking'
// import { add2 } from './testTreeShaking'

// const { add2 } = require('./testTreeShaking')

// console.log('testTreeShaking-main', add2)

const promiseIns = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('我成功了')
  }, 1000);
})

promiseIns.then(res => {
  console.log('res', res);
}).catch(err => {
  console.error('err', err);
});

function add(x, y) {
  return x + y;
}

const element = document.createElement('div');
element.innerHTML = '你好世界',
  element.classList.add('hello')
document.body.appendChild(element)

console.log('add', add(1, 2))