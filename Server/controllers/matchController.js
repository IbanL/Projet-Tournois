import Match from "../models/Match.js"
import Tournament from "../models/Tournament.js";


const getMatches = async (req, res, next) => {
    try {
        const matches = await Match.find();
        res.status(200).json({ matches });
    } catch (error) {
        next(error);
    }
}

const getMatch = async (req, res, next) => {
    try {
        const match = await Match.findById(req.params.id);
        res.status(200).json({ match });
    } catch (error) {
        next(error);
    }
}

const createMatch = async (tournament, number, round, next) => {
    try {
        const match = await Match.create({ tournament, number, round });
        return match;
    } catch (error) {
        next(error);
    }
}

const setWinnerMatch = async (req, res, next) => {
    try {
        let match = await Match.findById(req.params.id);
        if (!match) {
            throw new Error("Le match n'existe pas");
        }
        if (!match.player1 || !match.player2) {
            throw new Error("Le match n'a pas deux joueurs");
        }
        if (match.winner) {
            throw new Error("Le match a deja un vainqueur");
        }
        const isFromMatch = match.player1.toString() === req.body.winner.toString() || match.player2.toString() === req.body.winner.toString();
        if (!isFromMatch) {
            throw new Error("Le vainqueur n'appartient pas au match");
        }
        match.winner = req.body.winner;
        await match.save();
        const tournament = await Tournament.findById(match.tournament).select("-rounds");
        if (match.round === tournament.nbRounds) {
            return res.status(200).json({ match });
        } else {
            const nextMatchNb = parseInt((match.number + 1) / 2);
            const nextMatchRound = match.round + 1;

            const nextMatch = await Match.findOne({ tournament: match.tournament, number: nextMatchNb, round: nextMatchRound });
            if (!nextMatch) {
                throw new Error("Le match suivant n'existe pas");
            }
            if (!nextMatch.player1) {
                nextMatch.player1 = req.body.winner;
            } else if (!nextMatch.player2) {
                nextMatch.player2 = req.body.winner;
            } else {
                throw new Error("Le match suivant a deja deux joueurs");
            }
            nextMatch.save();
            res.status(200).json({ match });
        }

    } catch (error) {
        next(error)
    }
}

const assessMatch = async (match, player1, player2, next) => {
    try {
        const currentMatch = await Match.findById(match);

        currentMatch.player1 = player1;
        currentMatch.player2 = player2;
        await currentMatch.save();


    } catch (error) {
        next(error)
    }
}


export { getMatches, getMatch, createMatch, setWinnerMatch, assessMatch };