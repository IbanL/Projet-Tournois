import "./Tournament.css";
import axios from "axios";
import { useEffect, useState, useReducer } from "react";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";

const Tournament = ({ isLoggedIn }) => {

    const id = useParams().id;

    const [loading, setLoading] = useState(true);
    const [tournament, setTournament] = useState([])
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [playerState, setPlayerState] = useState("notLoggedIn");
    const [isCreator, setIsCreator] = useState(false);


    const handleInscription = async () => {
        try {
            const res = await axios.post(process.env.VITE_API_URL + 'tournaments/' + id + "/register/", null, {
                headers: {
                    'Authorization': Cookies.get('token')
                }
            });
            alert(res.data.message);
            forceUpdate();
        }
        catch (error) {
            alert(error.response.data.message);
        }
    }

    const handleDesinscription = async () => {
        try {
            const res = await axios.delete(process.env.VITE_API_URL + 'tournaments/' + id + "/player/", {
                headers: {
                    'Authorization': Cookies.get('token')
                },
                body: {
                    userId: Cookies.get('id')
                }
            });
            alert(res.data.message);
            forceUpdate();
        }
        catch (error) {
            alert(error.response.data.message);
        }
    }
    const fetchTournament = async () => {

        setLoading(true);

        try {
            const response = await axios.get(process.env.VITE_API_URL + 'tournaments/' + id)

            if (!response) {
                throw new Error("No response from server");
            }

            setTournament(response.data.tournament)

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }

    }

    const checkRegistration = () => {


        if (isLoggedIn) {
            setPlayerState("loggedIn");
        }
        if (tournament.players) {
            const currentId = Cookies.get('id');

            if (currentId) {
                for (const player of tournament.players) {

                    if (JSON.stringify(player._id) === currentId) {
                        setPlayerState("registered");
                        break;
                    }
                }
            }
        }

    }
    const renderSwitch = (playerState) => {
        if (tournament.isStarted) {
            return
        }
        switch (playerState) {
            case "loggedIn":
                return <button className="btnInscription" onClick={handleInscription} >Inscription</button>
            case "registered":
                return <button className="btnDesinscription" onClick={handleDesinscription} >Se desinscrire</button>
            case "notLoggedIn":
                return <Link to="/login"><button className="btnInscription">se connecter pour participer</button></Link>
        }
    }

    const renderStartTournament = () => {
        if (tournament.isStarted) {
            return <h2 className="startedTournament">Le tournois a deja commencé </h2>
        } else if (isCreator) {
            return <button className="btnStartTournament" onClick={handleStartTournament}> lancer le tournois </button>
        }
    }

    const checkCreator = () => {
        console.log(tournament);
        if (!tournament.creator) {
            return;
        } else if (!Cookies.get('id')) {
            return;
        }

        if (tournament.creator._id === JSON.parse(Cookies.get('id'))) {

            setIsCreator(true);

        }
    }

    const handleSetWinner = async (matchId, winner) => {
        if (!confirm(`Etes-vous sur de vouloir confirmer ${winner.name} comme vainqueur de ce match ?`)) {
            return
        }
        try {
            const res = await axios.put(process.env.VITE_API_URL + 'matches/' + matchId, {
                winner: winner._id
            }, {
                headers: {
                    'Authorization': Cookies.get('token')
                }
            });
            alert(`${winner.name} a gagner le match`);
            forceUpdate();
        }
        catch (error) {
            alert(error.response.data.message);
        }
    }

    const handleStartTournament = async () => {

        if (!confirm(`Etes-vous sur de vouloir lancer le tournois ?`)) {
            return
        }
        try {
            const res = await axios.post(process.env.VITE_API_URL + 'tournaments/' + id + "/start/", null, {
                headers: {
                    'Authorization': Cookies.get('token')
                }
            });
            alert(res.data.message);
            forceUpdate();
        }
        catch (error) {
            alert(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchTournament()
    }, [ignored]);


    useEffect(() => {
        if (tournament) {
            checkRegistration();
            checkCreator();
        }
    }, [tournament]);


    return (
        <div>
            {loading ? <p>Chargement...</p> :
                <>
                    <h1 className="tournamentName">{tournament.name}</h1>
                    <p className="tournamentCreator">Organisateur: {tournament.creator.name}</p>
                    {renderSwitch(playerState)}
                    {renderStartTournament()}

                    <div className="tournamentDiv">
                        <section className="tournamentPlayers">
                            <div className="playersTitle">
                                <h2 className="PlayersListTitle">Players</h2>
                                <p className="tournamentPlayersNumber">{tournament.nbInscrits}/{tournament.nbParticipants}</p>
                            </div>
                            <ul className="playersList" tabIndex="0" aria-label="Liste des joueurs">
                                {tournament.players.map((player, index) => (
                                    <li key={index}>{player.name}</li>
                                ))}
                            </ul>

                        </section>
                        <section className="tournamentMatches">
                            <h2 className="matchesTitle">Matches</h2>
                            <section className="secMatches">
                                {tournament.rounds.map((round, index) => (
                                    <div key={index} className="round">
                                        <h3 className="roundTitle">Round {index + 1}</h3>
                                        <ul className="roundList">
                                            {round.matches.map((match, matchIndex) => (
                                                <li key={matchIndex}>
                                                    <div className="match">

                                                        <p className="matchNumber">n°{match.number}</p>
                                                        <div className="matchData">
                                                            <p className={match.winner ? match.winner._id === match.player1._id ? "winner matchPlayer1" : "matchPlayer1 looser" : "matchPlayer1"}>{match.player1 ? match.player1.name : "TBD"}</p>
                                                            <p className={match.winner ? match.winner._id === match.player2._id ? "winner matchPlayer2" : "matchPlayer2 looser" : "matchPlayer2"} >{match.player2 ? match.player2.name : "TBD"}</p>
                                                        </div>

                                                        {
                                                            isCreator && match.player1 != null && match.player2 != null && match.winner === null ?
                                                                <div className="matchSetWinner">
                                                                    <button onClick={() => handleSetWinner(match._id, match.player1)}>gagnant</button>
                                                                    <button onClick={() => handleSetWinner(match._id, match.player2)}>gagnant</button>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </section>
                        </section>
                    </div>
                    <style jsx="true">
                        {`
                        
                            .secMatches{
                                display:grid;
                                grid-template-columns: repeat( ${tournament.rounds.length}, 200px);
                                gap: 10px;
                            }
                        `}
                    </style>
                </>
            }
        </div>
    )
}

export default Tournament