const {MongoClient, ObjectId} = require('mongodb');
const express = require('express');

const conectionURI = "mongodb://localhost:27017/";
const databaseName = "task-manager";

const app = express();
const PORT = 3030;

app.use(express.json())

app.get("api/students", async (req,res) => {
  const client = new MongoClient(conectionURI)

  try {
    await client.connect()
    const db = client.db(databaseName)
    students = await db.collection('students').find().toArray()
    res.status(200).send(students)

  } catch (error) {
    console.log(error)
    res.status(404)

  } finally {
    await client.close()
  }
})

app.get("api/users/:id", async(req,res) => {
  const id = req.params.id;
  let student = {}
  const client = new MongoClient(conectionURI)

  try {
    await client.connect()
    const db = client.db(databaseName);
    student = await db.collection('users').findOne({_id: new ObjectId(id)});
    res.status(200).send(student);

  } catch (error) {
    console.log(error)
    res.status(404)

  } finally {
    await client.close()
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})