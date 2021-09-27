import { FunctionQueueArray } from "screeps-ai-utils";
import { Promise as MyPromise, setTimeout, startTick, endTick } from "screeps-async-shims";
//@ts-ignore
Promise = MyPromise;
let queue = new FunctionQueueArray(0);
queue.addFunc(()=>{
  console.log('in task added during init and run once');
})
queue.addFunc(()=>{
  console.log('in task added during init and run every tick');
  return true;
})



function sleep(ticks:number) {
  
  let currentTick = Game.time;
  //let endSleepTick = getTicks() + ticks;
  //console.log("sleeping for:", ticks, "from", Game.time, "to", endSleepTick);
  return (new Promise<void>((resolve) => {
      setTimeout(() => {
          console.log("timeout done!", currentTick, Game.time)
          resolve();
      }, ticks);
  }));
}


let coreLoop = () => {
  let currentTick = Game.time;
  console.log('in wrapped loop!', currentTick);
  let p = new Promise((resolve) => {
    sleep(10).then(() => {
      resolve(currentTick);
    });
  });
  p.then((startTick) => {
    console.log("Promise resolved, started", startTick, "currently", Game.time, "currentTick var", currentTick);
  });
}

let nakedLoop = function () {
  console.log("------------start tick-------")
  startTick();
  coreLoop();
  endTick();
  console.log("------------end tick-------")
}
// let wrappedLoop = wrapLoop(() => {
//     coreLoop();
// });


export let loop=nakedLoop;