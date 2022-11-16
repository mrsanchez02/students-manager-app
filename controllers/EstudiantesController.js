require('dotenv').config();
const {MongoClient, ObjectId} = require('mongodb')

const conectionURI = process.env.DB_HOST
const databaseName = "student-manager-app"

const GetAllStudents = async (req,res) => {
    const client = new MongoClient(conectionURI)
  
    try {
      await client.connect()
      const db = client.db(databaseName)
      students = await db.collection('students').find().toArray()
      return res.status(200).send(students)
  
    } catch (error) {
      console.log(error)
      return res.status(500).send({msg:"Oops Something happens!"})
  
    } finally {
      await client.close()

    }
}

const GetOneStudent =  async (req,res)=> {
  const id = req.params.id;
  let student = {}
  const client = new MongoClient(conectionURI)

  try {
    await client.connect()
    const db = client.db(databaseName);
    student = await db.collection('students').findOne({_id: new ObjectId(id)});
    return res.status(200).send(student);

  } catch (error) {
    console.log(error)
    return res.status(404).send({msg:"Not found"})
  } finally {
    await client.close()
  }
}

const DeleteStudent = async (req,res) => {
  const id = req.params.id;
  let students = []
  const client = new MongoClient(conectionURI)

  try {
    await client.connect()
    const db = client.db(databaseName);
    await db.collection('students').deleteOne({_id: new ObjectId(id)});
    students = await db.collection('students').find().toArray()
    return res.status(200).send(students);

  } catch (error) {
    console.log(error)
    return res.status(404).send({msg:"Not found"})
  } finally {
    await client.close()
  }
}

const EditStudent = async (req,res) => {
  const newStudent = req.body;
  const id = req.params.id;
  let students = []
  const client = new MongoClient(conectionURI)

  try {
    await client.connect()
    const db = client.db(databaseName);
    await db.collection('students').replaceOne({_id: new ObjectId(id)},newStudent);
    students = await db.collection('students').find().toArray()
    return res.status(200).send(students);

  } catch (error) {
    console.log(error)
    return res.status(404).send({msg:"Not found"})
  } finally {
    await client.close()
  }
}

const AddStudent = async (req,res) => {
  const student = req.body
  const client = new MongoClient(conectionURI)

  try {
    await client.connect()
    const db = client.db(databaseName)
    await db.collection('students').insertOne(student)
    return res.status(200).send(student)
    
  } catch (error) {
    console.log(error)
    return res.status(500).send({msg:"Something happens!"})
  } finally {
    await client.close()
  }
}

module.exports = {
  GetAllStudents,
  GetOneStudent,
  DeleteStudent,
  AddStudent,
  EditStudent
}