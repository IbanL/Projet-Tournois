import Tournament from "../models/Tournament.js";
import User from "../models/User.js";
import { addUserTournament } from "./userController.js";


const getTournaments = async (req, res, next) => {
    try {
        const tournaments = await Tournament.find();
        res.status(200).json({ tournaments });
    } catch (error) {
        next(error);
    }
}

const getTournament = async (req, res, next) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            throw new Error("Le tournoi n'existe pas");
        }
        await tournament.populate("players", ["_id", "name"]);
        
        res.status(200).json({ tournament });
    } catch (error) {
        next(error);
    }
}

const createTournament = async (req, res, next) => {
    const { name, date, location, nbParticipants, bracketType } = req.body;
    const creator = req.user;

    try {
        const tournamentExists = await Tournament.findOne({ name });
        if (tournamentExists) {
            throw new Error("Le tournoi existe deja");
        }
        const tournament = await Tournament.create({ name, date, creator, location, nbParticipants, bracketType });
        res.status(201).json({ tournament });
    } catch (error) {
        next(error);
    }
}

const userRegisterTournament = async (req, res, next) => {
    const user = req.user;
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            throw new Error("Le tournoi n'existe pas");
        }
        tournament.players.push(user);
        await tournament.save();
        await addUserTournament(user, tournament);
        res.status(200).json({ message: "Inscription au tournoi reussie" });
    } catch (error) {
        next(error);
    }
}

const updateTournament = async (req, res, next) => {
    const { name, date, location} = req.body;
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            throw new Error("Le tournoi n'existe pas");
        }
        const isCreator = tournament.creator.toString() === req.user._id.toString();
        if(!isCreator) {
            throw new Error("Acces non autorise");
        }
        tournament = await Tournament.findOneAndUpdate({ _id: req.params.id }, { name, date, location });
        res.status(200).json({ tournament });
    } catch (error) {
        next(error);
    }
}

const removePlayer = async (req, res, next) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        const user = await User.findById(req.body.userId);
        if (!tournament) {
            throw new Error("Le tournoi n'existe pas");
        }
        const isCreator = tournament.creator.toString() === req.user._id.toString() || user._id.toString() === req.user._id.toString();
        if(!isCreator) {
            throw new Error("Acces non autorise");
        }
        tournament.players.pull(user);
        await tournament.save();
        user.Tournaments.pull(tournament);
        await user.save();
        res.status(200).json({ tournament });
    } catch (error) {
        next(error);
    }
}

const deleteTournament = async (req, res, next) => {
    try {
        const tournament = await Tournament.findById(req.params.id).populate("players");
        if (!tournament) {
            throw new Error("Le tournoi n'existe pas");
        }
        const isCreator = tournament.creator.toString() === req.user._id.toString();
        if(!isCreator) {
            throw new Error("Acces non autorise");
        }
        tournament.players.forEach(async (player) => {
            player.Tournaments.pull(tournament);
            await player.save();
        })
        await Tournament.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Tournoi supprime" });
    } catch (error) {
        next(error);
    }
}

export { getTournaments, getTournament, createTournament, userRegisterTournament, updateTournament,removePlayer , deleteTournament };