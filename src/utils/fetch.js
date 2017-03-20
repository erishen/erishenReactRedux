var promiseResolve = function (str) {
  return new Promise(function (resolve, reject) {
    resolve(str);
  });
};

/*
var promiseReject = function (str) {
  return new Promise(function (resolve, reject) {
    reject(str);
  });
};
*/

export default function (name, obj = { }) {
  console.log('name: ', name);
  return promiseResolve('successfully');
};
