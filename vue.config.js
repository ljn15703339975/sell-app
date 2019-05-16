const express = require("express");

var app = express();
//拿到json数据
var sellData = require("./data/data.json");
var seller = sellData.seller
var goods = sellData.goods
var ratings = sellData.ratings
module.exports = { //vue-cli30.以上版本官网
    devServer: { //webpack-dev-server官网
        host: "localhost",
        port: "8080",
        before(app) { //暴露数据api
            app.get("/api/seller", (req, res) => {
                res.json({
                    errno: 0,
                    seller: seller
                })
            })
            app.get("/api/goods", (req, res) => {
                res.json({
                    errno: 0,
                    goods: goods
                })
            })
            app.get("/api/ratings", (req, res) => {
                res.json({
                    errno: 0,
                    ratings: ratings
                })
            })
        }
    }
}