const express = require('express');
const mongoose = require('mongoose')
const Article = require("./models/article")
const articleRouter = require("./routes/articles")
const methodOverriden = require('method-override')
const app = express()

const uri = 'mongodb+srv://dbUser:passw0rd@cluster0.iklsa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverriden('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('index', { articles: articles })
})

app.use('', articleRouter)

app.listen(process.env.PORT || 5001)