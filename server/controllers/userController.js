const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  // récupérer les données de l'utilisateur à partir de la demande (req)
  const { email } = req.body;
  const userData = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(409)
      .json({ message: "L'adresse e-mail est déjà utilisée" });
  }

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
