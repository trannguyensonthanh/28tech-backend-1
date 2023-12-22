const express = require("express");
var bodyParser = require('body-parser')
var methodOverride = require("method-override");
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const moment = require("moment")
var path = require('path');
const http = require('http');
const { Server } = require("socket.io");

require("dotenv").config();
const port = process.env.PORT;

const route = require("../product-management/routes/client/index.route");
const routeAdmin = require("../product-management/routes/admin/index.route");

const database = require("./config/database"); // sử dụng database ở config
const systemConfig = require("./config/system");
database.connect(); // kết nối với mongodb
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride("_method"));
app.set("views", `${__dirname}/views`); // đẩy dữ liệu ra views  sử dụng thêm __dirname để sử dụng trên cả online luôn
app.set("view engine", "pug"); // sử dụng pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;
app.use(express.static(`${__dirname}/public`)); // sử dụng file static để cho code bk là file nào đc xuất ra  sử dụng thêm __dirname để sử dụng trên cả online luôn

// socket.io
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
});


//flash
app.use(cookieParser('sonthanhdepzai'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//end flash

// tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// end tiny mce

route(app); // truyền dữ liệu cho route
routeAdmin(app);

app.get("*", (req, res) => {
  res.render("client/pages/errors/404", {
    pageTitle: "404 Not Found",
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
