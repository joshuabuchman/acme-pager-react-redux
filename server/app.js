const path = require('path');
const express = require('express');
const app = express();
// Do not touch this file
const { Employee } = require('./db/index.js');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const paginate = (pageNum, pageSize) => {
  return { limit: pageSize, offset: pageNum * pageSize };
};

app.get('/api/employees/:page?', (req, res, next) => {
  const resultsPerPage = 50;
  // pageNum is zero indexed
  let pageNum = req.params.page;
  if (pageNum === undefined) {
    pageNum = 0;
  } else if (isNaN(pageNum)) {
    return res.status(400).send({ error: 'Invalid page number' });
}

app.get('/api/employees/:id', async (req, res, next)=> 
{
  Employee.findAll()
  .then( employees => res.send(employees))
  .catch(next)
})

app.put('/api/employees/:id', async (req, res, next)=> 
{
  Employee.findByPk(req.params.id)
  .then(employee => employee.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    title: req.body.title
  }))
  .then(employee => res.send(employee))
  .catch(next)
})

app.delete('/api/employees/:id', async (req, res, next)=> 
{
  try{
    const employee = await Employee.findByPk(req.params.id)
    await employee.destroy()
    res.sendStatus(204)
  }
  catch(err)
  {
    next(err)
  }
})

  const { limit, offset } = paginate(pageNum, resultsPerPage);
  Employee.findAndCountAll({
    limit,
    offset,
    order: [
      ['firstName', 'asc'],
      ['lastName', 'asc'],
    ],
  }).then(results => {
    res.status(200).send(results);
  });
});

module.exports = { app };
