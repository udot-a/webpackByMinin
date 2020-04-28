import Post from "@models/Post";
import * as $ from "jquery";
import "./styles/styles.css";
// import json from "./assets/json.json";
import logo from "./assets/cofee.jpg";
import less from "./styles/less.less";
import scss from "./styles/scss.scss";
import css from "./styles/styles.css";
import "./babel";
import React from "react";
import {render} from "react-dom";
// import xml from "./assets/data.xml";
// import csv from "./assets/username.csv";

const post = new Post( "Webpack post title", logo);

$("pre"). html(post.toString());

const App = () => {
    return (
        <div className={css.container}>
            <h1>
                {"Webpack Course!!!"}
            </h1>

            <hr />

            <div className={css.logo}></div>

            <hr />

            <pre />

            <hr />

            <div className={less.box}>
                <h2>LESS</h2>
            </div>

            <hr />

            <div className={scss.card}>
                <h2>SCSS</h2>
            </div>
        </div>
    );
}

render(
    <App/>,
    document.getElementById("app")
);

