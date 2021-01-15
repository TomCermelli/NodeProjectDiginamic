let db = require('../models/db')
const Student = db.students;
const Lesson = db.lessons;

let StudentC = require('../models/student');

//importer le service
const studentsService = require('../services/students.services')
exports.create = async (req, res) => {
   if (req.body.first_name && req.body.last_name && req.body.birthdate && req.body.bio && req.body.class_name) {
      try {
         let rep = await Student.create(req.body)
         res.json(rep);
      } catch (e) {
         res.status(500)
         res.json({ "error": e });
      }
     } else {
      res.status(400)
      res.json({ 'message': 'bad request' });
   }
}

exports.getById = async (req, resp) => {
   try {
      let result = await Student.findByPk(req.params.id)
      let age = studentsService.getYears(result.dataValues.birthdate)
      
      console.log(result);
              //importer le service
              let newRes = new StudentC(result.dataValues.id,  result.dataValues.first_name,result.dataValues.last_name,result.dataValues.birthdate, result.dataValues.bio, result.dataValues.class_name, age)
              console.log(age)
         resp.json(newRes);
   } catch (e) {
      resp.status(500);
      resp.json({ error: e });
   }

  
}


exports.addLesson = async (req, resp) => {
   try {
      let student = await Student.findByPk(req.params.id2)
      let lesson = await Lesson.findByPk(req.params.id1)
      await lesson.setStudents(student);
      let lessons = await student.getLessons();
      resp.json(lessons);
     
   } catch (e) {
      console.log(e);
      resp.status(500);
      resp.json({ error: e });
   }

  
}

exports.getAll = async (req, res) => {
    try {
       let resp = await Student.findAll();
       
       console.log(resp);

       let newResult = resp.map((result) => {
          let age = studentsService.getYears(result.dataValues.birthdate)
          console.log(age);
          console.log(result);
          //importer le service
          return new StudentC(result.dataValues.id, result.dataValues.first_name, result.dataValues.last_name, result.dataValues.birthdate, result.dataValues.bio, result.dataValues.class_name, age)
       }); 

        res.json(newResult);
   } catch (e) {
      res.json(500);
      res.json({ error: e });
   }
    
}

exports.update = async (req, res) => {
   try {
       await Student.update(req.body, {
         where: {
            id: req.params.id
         }
      });
        res.json({id:req.params.id,...req.body});
   } catch (e) {
      resp.json(500);
      resp.json({ error: e });
   }
 


}

exports.remove = async (req, resp) =>{
try {
       await Student.destroy({
         where: {
            id: req.params.id
         }
       });
   res.status(200);
        res.json({"message":"element removed"});
   } catch (e) {
      resp.json(500);
      resp.json({ error: e });
   }
}
