import express from 'express'
import router from './routes/index.js'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import {} from 'dotenv/config'
import mongoose from 'mongoose'

const app = express()

global.loggedIn = false
global.userData = {}
import bodyParser from 'body-parser'

const URI = process.env.URI || "mongodb+srv://dharmeshwayne:mB5ud4buFCiKElbu@cluster0.bqcmuyb.mongodb.net/Dharmesh_assignment?retryWrites=true&w=majority"

mongoose
	.connect(URI)
	.then(() => console.log('Connected to DB'))
	.catch((e) => console.log(e))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json());
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
