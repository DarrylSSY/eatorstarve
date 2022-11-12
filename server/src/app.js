const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const routes = require("../routes");
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
const history = require('connect-history-api-fallback');

const mongodb_conn_module = require('./mongodbConnModule');
const path = require("path");
mongodb_conn_module.connect();
app.use('/api/', routes);
const staticFileMiddleware = express.static(path.join(__dirname, "../../dist"));
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);


app.listen(process.env.PORT || 8081)
