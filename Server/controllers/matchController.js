import Match from "../models/Match"



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

const createMatch = async (tournament,level, player1, player2, next) => {
    if (!player1) {
        player1 = "tbd";
    }
    if (!player2) {
        player2 = "tbd";
    }
    try {
        const match = await Match.create({ tournament, level, player1, player2 });
    } catch (error) {
        next(error);
    }
}

const updateMatch = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}



export { getMatches, getMatch, createMatch, updateMatch  };