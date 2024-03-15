import express from 'express'
import router from './routes/index.js'
import MongoStore from 'connect-mongo'
import session from 'express-session'

const app = express()

const URI =
	'mongodb+srv://Saurav:naruxhina@cluster0.wuw4gfs.mongodb.net/GLicense?retryWrites=true&w=majority'

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const session_store = MongoStore.create({
	mongoUrl: URI,
	dbName: 'GLicense',
	collectionName: 'GLicenseSessions',
})

app.use(
	session({
		secret: 'GLicense',
		saveUninitialized: false,
		resave: false,
		store: session_store,
	})
)

app.use('/', router)

app.listen(3000, () => {
	console.log('Listening on PORT 3000')
})

export default session
