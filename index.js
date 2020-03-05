const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = require('express')();


// connect to Mongo daemon
mongoose
  .connect(
    'mongodb://mongo/express-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// DB schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

Item = mongoose.model('item', ItemSchema);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  console.log('Someone is listing all user.')
  Item.find((err, items) => {
    if (err) throw err;
    res.render("index", { items });
  });
})


//Create name route
app.get('/item/add/:name', (req, res) => {
  const newItem = new Item({
    name: req.params.name
  });

  newItem.save().then(item => res.redirect('/'));
});


const port = 3000;
app.listen(port, () => console.log('Server running...'));

