const router = require('express').Router();

router.get("/", (req,res) => {
  res.render('index');
})

router.get("/listado-estudiantes", (req,res) => {
  res.render('listado-estudiantes');
})

router.get("/registro-estudiante", (req,res) => {
  res.render('registro-estudiante');
})

module.exports = router;