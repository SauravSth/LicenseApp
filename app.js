import express from 'express'
import router from './routes/index.js'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import {} from 'dotenv/config'

const app = express()

global.loggedIn = false
global.userData = {}

const URI = process.env.URI
// 'mongodb+srv://Saurav:naruxhina@cluster0.wuw4gfs.mongodb.net/GLicense?retryWrites=true&w=majority'

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

app.use('*', (req, res, next) => {
	loggedIn = req.session.loggedIn
	userData = req.session.userData
	next()
})
app.use('/', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Listening on PORT ${PORT}`)
})

export default session
