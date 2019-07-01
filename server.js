const middleware = require('express-opentracing').default

const tracer = require('./tracing')('item-service')

const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Item = require('./api/models/ItemModel'), //created model loading here
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:MongoDB2019!@localhost:27017/Catalogdb?authSource=admin', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB ...'))
    .catch(err => console.error('Could not connect to MongoDB:‌', err));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(middleware(tracer))
app.tracer = tracer.tracer

require('./api/routes/ItemRoutes')(app)

app.listen(port);

console.log('server started on port:' + port);