export default function () {
    let urlString = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    //match()返回值是数组
    let arr = urlString.match(reg);
    if (arr) {
        arr.forEach((item) => {
            //substring()返回值是字符串，从index开始，包括index向后截取字符串
            let tempArr = item.substring(1).split("=");
            let key = decodeURIComponent(tempArr[0]);
            let value = decodeURIComponent(tempArr[1]);
            obj[key] = value;
        });
    }
    return obj;
}