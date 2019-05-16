export function saveLocal(id, key, value) {
    //window.localStorage数据是字符串
    let seller = window.localStorage.__seller__;
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    window.localStorage.__seller__ = JSON.stringify(seller);
    console.log(localStorage)
}
export function loadromLocal(id, key, def) {
    let seller = window.localStorage.__seller__;
    //判断本地存储的__seller__是否存在
    if (!seller) {
        return def;
    }
    seller = JSON.parse(seller)[id];
    //判断商家是否存在
    if (!seller) {
        return def;
    }
    let det = seller[key];
    return det || def;
}