const router = require('express').Router();
const {GetAllStudents, GetOneStudent, DeleteStudent, AddStudent, EditStudent} = require('../controllers/EstudiantesController');

router.get("/", GetAllStudents);
router.get("/:id", GetOneStudent);
router.delete("/:id", DeleteStudent);
router.post("/",AddStudent);
router.put("/:id",EditStudent);

module.exports = router;