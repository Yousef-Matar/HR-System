const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())
// API Routes
const employees = require('./routes/api/employees')
app.use('/api/employees', employees)
// Port
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`))
