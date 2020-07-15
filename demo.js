



// 伪代码


// const tasks = ['任务1','任务2','任务3'] // diff任务 有很多节点

// // task.forEach(t=> 执行任务(t))

// function workLoop(deadline){
//   // 如果当前帧又空闲时间，并且还有任务没做完，那就执行继续计算
//   // deadline是requesgIdleCallback传递的 

//   while(tasks.length>0 && deadline.timeRemaing()>1){
//     const t = task.pop() // 弹出一个任务 
//     执行任务(t) // 执行弹出的任务 
//     // 当前帧可能还没结束
//   }
//   // 执行到这里，
//   if(任务空了， asks.length===0){
//     // diff结束，准备提交修改
//     return
//   }
  
//   task还有，但是当前帧没时间了，把控制全交回去 等待下一次的空闲时间
//   window.requesgIdleCallback(workLoop)
  

// }
// // requesgIdleCallback是又兼容性问题的，react团队自己写了一个，就是用messageChannel ,requestAnimationFrame,setTimeouot等，一起模拟的
// window.requesgIdleCallback(workLoop)



// 时间切片，time-sliceing


最后一次任务执行时间太长怎么办
  这种架构下，js占用浏览器主线程时间过长，浏览器仕没办法的

  主动返还孔之前，如果不还了 浏览器也没办法，所以我们切片了，一定要切的颗粒度够细就i可以了





fiber数据结构，让真个虚拟dom的diff过程可中断，之前的diff就是一个同步任务，这个任务根据业务dom节点的多少影响，
fiber相当于把diff拆成了以单个虚拟dom节点的任务队列

通过空闲时间的调度逻辑，控制任务的执行

结果就是，diff计算量没有减少 ，但是用户感觉很流畅，不卡顿



