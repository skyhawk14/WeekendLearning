// normal example
// const p = new Promise(function (res, rej) {
//     console.log('inside promise')
//     setTimeout(() => {
//         res('resolvedValue')
//     },0)
// })
// p.then(console.log).catch(console.log)

// promise polyfill
const myPromise = function (executor) {
    let resolvedCb, rejectedCb, resolvedVal, rejectedValue;
    let isResolved = false;
    let isRejected = false;
    const resolve = function (resVal) {
        resolvedVal = resVal
        if (resolvedCb && !isResolved) {
            resolvedCb(resolvedVal)
            isResolved = true
        }
    }
    const reject = function (rejVal) {
        rejectedValue = rejVal
        if (rejectedCb && !isRejected) {
            rejectedCb(rejectedValue)
            isRejected = true
        }
    }
    this.then = function (resCb) {
        resolvedCb = resCb
        if (!isResolved && resolvedVal) {
            resolvedCb(resolvedVal)
            isResolved = true
        }
        return this    
    }
    this.catch = function (rejCb) {
        rejectedCb = rejCb
        if (!isRejected && rejectedValue) {
            rejectedCb(rejectedValue)
            isRejected=true
        }
        return this    
    }
    executor(resolve, reject);
}


const p1 = new myPromise(function (res, rej) {
    console.log('inside promise')
    setTimeout(() => {
        rej('resolvedValue')
    },0)
})
p1.then(console.log).catch(console.log)

// Promise.resolve
myPromise.resolve = function (val) {
    return new myPromise(res => {
        res(val)
    })
}
// Promise.resolve() reuses existing Promise instances. If it's resolving a native promise, it returns the same promise instance without creating a wrapper.
const original = Promise.resolve(33);
const cast = Promise.resolve(original);
cast.then((value) => {
  console.log(`value: ${value}`);
});
console.log(`original === cast ? ${original === cast}`);

/**
 * Promise.race and Promise.any do different things:

Promise.race is settled as soon as any of the promises you feed it settle, whether they are fulfilled or rejected.

Promise.any is settled as soon as any of the promises you feed it is fulfilled or they are all rejected, in which case it's rejected with an AggregateError.

The chief differences are:

race's promise is rejected when the first promise you give it is rejected; any's promise isn't, because another promise may be fulfilled instead.

any's promise's rejection reason will be an AggregateError, but race's rejection reason will be the rejection reason from the first promise that was rejected.

So if you pass them both an array of two promises, and one of the promises is rejected, then afterward the other promise is fulfilled, the promise from Promise.race will be rejected (because the first promise to settle was rejected) and the promise from Promise.any will be fulfilled (because although the first promise was rejected, the second was fulfilled). E.g.:
 */