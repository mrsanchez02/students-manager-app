const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')
const {engine} = require('express-handlebars')
const StudentsRoute = require('../routes/Estudiantes');
const MainRoute = require('../routes/index.routes');
require('dotenv').config();


const PORT = process.env.PORT;
const app = express();
const viewsPath = path.join(__dirname,'../views');
app.use(express.static(path.join(__dirname, '../public')));


app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.engine('hbs', 
  engine({
    layoutsDir: path.join(app.get('views'),'layouts'),
    defaultLayout: 'main',
    extname: '.hbs',
  })
)

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/estudiantes',StudentsRoute)
app.use('/',MainRoute)

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})