export default function throttle(callback, delay) {
    let flag = true;
    return function () {
        if (flag) {
        flag = false;
        setTimeout(() => {
            callback.bind(this)();
            flag = true;
        }, delay);
        }
    };
}   