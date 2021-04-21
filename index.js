const cors = require('cors')
const express = require('express')
const connection = require('./config')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.get('/', (req, res) => {
  connection.query('SELECT * from cards', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})
app.post('/', (req, res) => {
  connection.query('INSERT INTO cards SET ?', req.body, err => {
    if (err) {
      res.status(500).send('Error saving a card')
    } else {
      res.status(200).send('Successfully saved')
    }
  })
})
app.delete('/:id', (req, res) => {
  connection.query('DELETE FROM cards WHERE id = ?', req.params.id, err => {
    if (err) {
      res.status(500).send('Error deleting a card')
    } else {
      res.status(200).send('Successfully deleted')
    }
  })
})
app.listen(4242, () => console.log('Express server is running'))
