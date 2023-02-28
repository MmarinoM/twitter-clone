const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ email });

    // Vérification si l'utilisateur existe et que le mot de passe est correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Adresse e-mail ou mot de passe incorrect." });
    }

    // Génération d'un token d'authentification avec la bibliothèque jsonwebtoken
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    const tokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000);
    // Envoi de la réponse avec le token d'authentification
    return res.status(200).json({
      token,
      tokenExpiration,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la connexion." });
  }
};
