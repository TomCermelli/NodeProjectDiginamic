const { Student } = require('../models/db');
const { getAge } = require('../services/students.services');
const erreurCall = require('../services/call.service');


exports.getAll = async (req, res) => {
   try {
      let listeEtudiants = await Student.findAll();
      if (!listeEtudiants.length) {
         const message = "La liste des étudiants est vide";
         return res.json(message);
      }
      // Mise à jour de la liste Etudiant avec l'age
      listeEtudiants = listeEtudiants.map(etudiant => {
         etudiant.age = getAge(etudiant.birthdate);
         return etudiant;
      });
      const message = `La liste a été récupérée. Il y'a en en tout ${listeEtudiants.length} étudiants`;
      res.json({ message, listeEtudiants });

      res.json(resp);
   } catch (error) {
      erreurCall(error, res);
   }
}

exports.getById = async (req, res) => {
   try {
      let etudiant = await Student.findByPk(req.params.id)
      if (etudiant === null) {
         const message = "L'étudiant demandé n'existe pas, tant pis pour toi frérot";
         res.status(400).json(message);
      }
      // Mise à jour de la liste Etudiant avec l'age
      etudiant.age = getAge(etudiant.birthdate);
      const message = "Un etudiant a bien été trouvé";
      res.json({ message, etudiant });
   }
   catch (error) {
      erreurCall(error, res);
   }
}

//importer le service
exports.create = async (req, res) => {
   
      try {
         const etudiant = await Student.create(req.body);
         return etudiant;
      } catch (error) {
         erreurCall(error, res)
      }
}


/*
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
}*/



/*
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
*/

/*
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
*/
