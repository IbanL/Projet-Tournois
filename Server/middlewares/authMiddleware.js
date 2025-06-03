import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
        
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Accès non autorisé - vous n'êtes pas connecté" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Accès non autorisé - Utilisateur introuvable" });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default protect;