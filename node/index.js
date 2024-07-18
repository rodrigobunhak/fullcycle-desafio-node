const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const mysql = require('mysql')

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config)

  const insertQuery = `INSERT INTO people (name) VALUES ('Rodrigo Augusto Bunhak Zwierzikowski')`
  connection.query(insertQuery, (insertErr) => {
    if (insertErr) {
      console.error(insertErr)
      res.status(500).send('Erro ao inserir no banco de dados')
      connection.end()
      return
    }
  })
  
  const selectQuery = `SELECT name from people`
  connection.query(selectQuery, (selectErr, results) => {
    if (selectErr) {
      console.error(selectErr)
      res.status(500).send('Erro ao selecionar do banco de dados')
      connection.end()
      return
    }
    const namesList = results.map(person => `<li>${person.name}</li>`).join('')
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>${namesList}</ul>
    `)
    connection.end()
  })
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})