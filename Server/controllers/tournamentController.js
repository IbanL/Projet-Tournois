import Tournament from "../models/Tournament.js";
import User from "../models/User.js";
import { addUserTournament } from "./userController.js";
import { createMatch, assessMatch } from "./matchController.js";
import Match from "../models/Match.js";

const getTournaments = async (req, res, next) => {
    try {
        const tournaments = await Tournament.find().select("-players -rounds");
        res.status(200).json({ tournaments });
    } catch (error) {
        next(error);
    }
}

const getTournaments10 = async (req, res, next) => {
    try {
        const tournaments = await Tournament.find().sort({createdAt: -1}).limit(10).select("-players -rounds");
        res.status(200).json({ tournaments });
    } catch (error) {
        next(error);
    }
}

const getTournament = async (req, res, next) => {
    try {
        let tournament = await Tournament.findById(req.params.id).populate("players", ["_id", "name"]).populate("rounds.matches");
        tournament = await tournament.populate("rounds.matches.player1", ["_id", "name"]);
        tournament = await tournament.populate("rounds.matches.player2", ["_id", "name"]);
        tournament = await tournament.populate("rounds.matches.winner", ["_id", "name"]);
        tournament = await tournament.populate("creator", ["_id", "name"]);
        if (!tournament) {
            throw new Error("Le tournoi n'existe pas");
        }

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
        const nbRounds = Math.log2(nbParticipants);
        const tournament = await Tournament.create({ name, date, creator, location, nbParticipants, bracketType, nbRounds });
        creator.createdTournaments.push(tournament);
        await creator.save();
        await createRounds(tournament, next);
        res.status(201).json({"id": tournament._id, "message": "Le tournoi a bien ete cree" });
    } catch (error) {
        next(error);
    }
}

const createRounds = async (tournament, next) => {
    try {
        //pour chaque round
        for (let i = 0; i < tournament.nbRounds; i++) {
            //compter le numero du round actuel
            const roundNb = i + 1;
            //compter le nombre de match du round actuel
            const nbMatchesToCreate = Math.pow(2, tournament.nbRounds - roundNb);
            const round = [];
            //creation des matchs
            for (let i2 = 0; i2 < nbMatchesToCreate; i2++) {
                const matchNb = i2 + 1;
                const currentMatch = await createMatch(tournament, matchNb, roundNb, next);
                round.push(currentMatch);
            }
            tournament.rounds.push({ matches: round, roundNb });
        }
        tournament.save();
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
        if (tournament.players.includes(user._id)) {

            throw new Error("Vous etes deja inscrit au tournoi");
            
        }
        if (tournament.nbInscrits >= tournament.nbParticipants) {
            throw new Error("Le tournoi est plein");
        }
        
        tournament.players.push(user);
        tournament.nbInscrits++;
        await tournament.save();
        await addUserTournament(user, tournament);
        res.status(200).json({ message: "Inscription au tournoi reussie" });
    } catch (error) {
        next(error);
    }
}

const updateTournament = async (req, res, next) => {
    const { name, date, location } = req.body;
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            throw new Error("Le tournoi n'existe pas");
        }
        const isCreator = tournament.creator.toString() === req.user._id.toString();
        if (!isCreator) {
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
        const user = await User.findById(req.user._id);
        if (!tournament) {
            throw new Error("Le tournoi n'existe pas");
        }
        tournament.players.pull(user);
        tournament.nbInscrits--;
        await tournament.save();
        user.joinedTournaments.pull(tournament);
        await user.save();
        res.status(200).json({ message : "Vous avez ete retirer du tournoi" });
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
        if (!isCreator) {
            throw new Error("Acces non autorise");
        }
        tournament.players.forEach(async (player) => {
            player.Tournaments.pull(tournament);
            await player.save();
        })
        await Match.deleteMany({ tournament: req.params.id });
        await Tournament.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Tournoi supprime" });
    } catch (error) {
        next(error);
    }
}

const shufflePlayers = (players) => {

    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i];
        players[i] = players[j];
        players[j] = temp;
    }
    return players;
}

    const startTournament = async (req, res, next) => {
        try {
            const tournament = await Tournament.findById(req.params.id);
            if (!tournament) {
                throw new Error("Le tournoi n'existe pas");
            }
            const isCreator = tournament.creator.toString() === req.user._id.toString();
            if (!isCreator) {
                throw new Error("Acces non autorise");
            }
            if (tournament.nbParticipants !== tournament.players.length) {
                throw new Error("Le tournoi n'a pas assez de joueurs");
            }
            if (tournament.isStarted) {
                throw new Error("Le tournoi est deja demarrer");      
            }
            const players = shufflePlayers(tournament.players);
            for (let i = 0; i < players.length/2; i++) {
                const match =  tournament.rounds[0].matches[i];
                const player1 = players[i];
                const player2 = players[players.length - i - 1];

                await assessMatch(match, player1, player2, next);
            }
            tournament.isStarted = true;
            await tournament.save();
            res.status(200).json({ message : "tournoi démarrer" });
        } catch (error) {
            next(error);
        }
    }
            export { getTournaments, getTournaments10, getTournament, createTournament, userRegisterTournament, updateTournament, removePlayer, deleteTournament, startTournament };