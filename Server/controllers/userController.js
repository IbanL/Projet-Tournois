import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ users });
      } catch (error) {
        next(error);
      }
}

const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error("addresse mail déjà utilisée");
        }
        const userNameExists = await User.findOne({ name });
        if (userNameExists) {
            throw new Error("pseudo deja utilisé");
        }

        const user = await User.create({ name, email, password });
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
        throw new Error("utilisateur introvable");
    }
    res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
  //recuperation des parametres a mettre a jour
  const { name, email, password } = req.body;
    try {

        //verification si l'utilisateur existe
        const userExists = await User.findById(req.params.id);
        if (!userExists) {
            throw new Error("utilisateur introvable");
        }

        //verification si l'utilisateur essayant de modifier est bien le même
        const isSameUser = userExists._id.toString() === req.user._id.toString();
        if (!isSameUser) {
            throw new Error("accès non autorisé");
        }
        //mise a jour de l'utilisateur
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, password }, {
          new: true,
        });
        res.status(200).json({ user });

      } catch (error) {
        next(error);
      }
}

//DEBUT LOGIN

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      throw new Error("Tous les champs sont obligatoires");
    }
  
    try {
      const user = await User.findOne({ email }).select("+password");
  
      if (!user) {
        throw new Error("Mot de passe ou email incorrect");
      }
  
      const match = await bcrypt.compare(password, user.password);
  
      if (!match) {
        throw new Error("Mot de passe ou email incorrect");
      }
      const userId = user._id;
      const token = createToken(userId);
  
      res.cookie("token", token, {
        httpOnly: true,
      });
  
      res.status(200).json({ userId, token });
    } catch (error) {
      next(error);
    }
  };
  
  
  const logoutUser = (req, res, next) => {
    try {
      res.clearCookie("token");
  
      res.status(200).json({ message: "Deconnexion reussie" });
    } catch (error) {
      next(error)
    }
  };

const addUserTournament = async (user, tournament) => {
    try {
        user.Tournaments.push(tournament);
        await user.save();
    } catch (error) {
        next(error);
    }
}

export { getUsers, createUser, getUser, updateUser, loginUser, logoutUser, addUserTournament };