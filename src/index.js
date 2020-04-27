import Post from "@models/Post";
import * as $ from "jquery";
import "./styles/styles.css";
// import json from "./assets/json.json";
import logo from "./assets/cofee.jpg";
import "./styles/less.less";
import "./styles/scss.scss";
import "./babel"
// import xml from "./assets/data.xml";
// import csv from "./assets/username.csv";

const post = new Post( "Webpack post title", logo);

$("pre"). html(post.toString());


// console.log("JSON: ", json);
//
// console.log("XML: ", xml);
//
// console.log("CSV: : ", csv);