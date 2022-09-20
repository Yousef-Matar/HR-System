const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
// Middleware
app.use(bodyParser.json())
app.use(cors())
// Port
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000
// MongoDB Connection
const dbURL = 'mongodb+srv://admin:admin@hr-system.1wfvawk.mongodb.net/HR-System?retryWrites=true&w=majority'
mongoose
	.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		// Start the server
		app.listen(port, () => console.log(`Server is running on port ${port}`))
	})
	.catch((err) => console.error(err))
// API Routes
const employees = require('./routes/api/employees')
app.use('/api/employees', employees)