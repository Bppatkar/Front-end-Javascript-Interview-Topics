/** Code refer: @link https://medium.com/@manojsingh047/polyfill-for-javascript-promise-81053b284e37 */

function CustomPromise(executor) {
  let onResolve;
  let onReject;
  let isCalled = false;
  let isResolved = false;
  let isRejected = false;
  let value;
  let error;

  function resolve(val) {
    isResolved = true;
    value = val;
    if (typeof onResolve === "function" && !isCalled) {
      onResolve(val);
      isCalled = true;
    }
  }
  function reject(err) {
    isRejected = true;
    error = err;
    if (typeof onReject === "function" && !isCalled) {
      onReject(err);
      isCalled = true;
    }
  }

  this.then = function (thenHandler) {
    onResolve = thenHandler;
    if (isResolved && !isCalled) {
      onResolve(value);
      isCalled = true;
    }
    return this;
  };
  this.catch = function (catchHandler) {
    onReject = catchHandler;
    if (!isCalled && isRejected) {
      onReject(error);
      isCalled = true;
    }
    return this;
  };

  executor(resolve, reject);
}

new CustomPromise((res, rej) => {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((d) => d.json())
    .then((result) => rej(result));
})
  .then((d) => {
    // console.log(d);
  })
  .catch((err) => console.log(err));

CustomPromise.all = function (promises) {
  return new CustomPromise(function executor(resolve, reject) {
    let count = 0;
    let res = [];

    if (promises.length === 0) {
      resolve(promises);
      return;
    }

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((val) => {
          done(val, i);
        })
        .catch((err) => reject(err));
    }

    function done(val, i) {
      res[i] = val;
      ++count;
      if (promises.length === count) resolve(res);
    }
  });
};

//---- Independent promise.all() polyfill
function PromiseAll(promises) {
  return new Promise((resolve, reject) => {
    let result = [];

    if (promises.length === 0) resolve(result);

    let pendingPromises = promises.length;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((value) => {
        result[index] = value;
        pendingPromises--;

        if (pendingPromises === 0) resolve(result);
      }, reject);
    });
  });
}

/** Promise all example using the above polyfill */
const samplePromise1 = new Promise((res, rej) => {
  setTimeout(() => {
    res(true);
  }, 2000);
});
const samplePromise2 = new Promise((res, rej) => {
  setTimeout(() => {
    res(true);
  }, 5000);
});

PromiseAll([samplePromise1, samplePromise2]).then((d) => {
  console.log(d);
});
