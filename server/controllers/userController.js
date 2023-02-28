const User = require("../models/userModel");

exports.createUser = (req, res) => {
  // récupérer les données de l'utilisateur à partir de la demande (req)
  const userData = req.body;
  console.log(userData);

  // créer une nouvelle instance de l'utilisateur à partir du modèle
  const newUser = new User(userData);

  // enregistrer l'utilisateur dans la base de données
  newUser.save((err, savedUser) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Erreur lors de la création de l'utilisateur." });
    } else {
      res.status(201).json(savedUser);
    }
  });
};
