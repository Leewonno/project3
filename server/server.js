const express = require('express');
const cors = require("cors");
const app = express();
const PORT = 8000;
const db = require("./models/index");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//CORS오류방지
app.use(cors());

//router 분리
const router = require("./router");
app.use("/", router);

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});

