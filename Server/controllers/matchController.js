import Match from "../models/Match.js"



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

const createMatch = async (tournament, number,round , next) => {
    try {
        const match = await Match.create({ tournament, number, round });
        return match;
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