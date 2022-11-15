const {MongoClient, ObjectId} = require('mongodb');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const conectionURI = process.env.DB_HOST;
const databaseName = "student-manager-app";
const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(morgan('dev'))

app.get("/estudiantes", async (req,res) => {
  const client = new MongoClient(conectionURI)

  try {
    await client.connect()
    const db = client.db(databaseName)
    students = await db.collection('students').find().toArray()
    res.status(200).send(students)

  } catch (error) {
    console.log(error)
    res.status(500).send({msg:"Oops Something happens!"})

  } finally {
    await client.close()
  }
})

app.get("/estudiantes/:id", async(req,res) => {
  const id = req.params.id;
  let student = {}
  const client = new MongoClient(conectionURI)

  try {
    await client.connect()
    const db = client.db(databaseName);
    student = await db.collection('students').findOne({_id: new ObjectId(id)});
    res.status(200).send(student);

  } catch (error) {
    console.log(error)
    res.status(404).send({msg:"Not found"})
  } finally {
    await client.close()
  }
})

app.delete("/estudiantes/:id", async(req,res) => {
  const id = req.params.id;
  let students = []
  const client = new MongoClient(conectionURI)

  try {
    await client.connect()
    const db = client.db(databaseName);
    await db.collection('students').deleteOne({_id: new ObjectId(id)});
    students = await db.collection('students').find().toArray()
    res.status(200).send(students);

  } catch (error) {
    console.log(error)
    res.status(404).send({msg:"Not found"})
  } finally {
    await client.close()
  }
})

app.path("/estudiantes/:id", async(req,res) => {
  let studentsUpdated = req.body;
  const id = req.params.id;
  const client = new MongoClient(conectionURI)

  try {
    await client.connect()
    const db = client.db(databaseName);
    await db.collection('students').updateOne({_id: new ObjectId(id)},studentsUpdated);
    students = await db.collection('students').find().toArray()
    res.status(200).send(students);

  } catch (error) {
    console.log(error)
    res.status(404).send({msg:"Not found"})

  } finally {
    await client.close()

  }

})

app.post("/estudiantes", async (req,res) => {
  const student = req.body
  const client = new MongoClient(conectionURI)

  try {
    await client.connect()
    const db = client.db(databaseName)
    await db.collection('students').insertOne(student)
    res.status(200).send(student)
  } catch (error) {
    console.log(error)
    res.status(500).send({msg:"Something happens!"})
  } finally {
    await client.close()
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})