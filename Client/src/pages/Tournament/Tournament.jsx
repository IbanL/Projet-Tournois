import "./Tournament.css";
import axios from "axios";
import { useEffect, useState, useReducer } from "react";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import { set } from "react-hook-form";

const Tournament = ({ isLoggedIn }) => {

    const id = useParams().id;

    const [loading, setLoading] = useState(true);
    const [tournament, setTournament] = useState([])
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [playerState, setPlayerState] = useState("notLoggedIn");

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
    const renderSwitch = (playerState) => {

        switch (playerState) {
            case "loggedIn":
                return <button className="btnInscription" onClick={handleInscription} >Inscription</button>
            case "registered":
                return <button className="btnDesinscription" onClick={handleDesinscription} >Se desinscrire</button>
            case "notLoggedIn":
                return <Link to="/login"><button className="btnInscription">se connecter pour participer</button></Link>
        }
    }

    useEffect(() => {
        fetchTournament()
    }, [ignored]);


    useEffect(() => {
        if (tournament && tournament.players && tournament.players.length > 0) {
            checkRegistration();
        }
    }, [tournament]);


    return (
        <>
            {loading ? <p>Chargement...</p> :
                <>
                    <h1 className="tournamentName">{tournament.name}</h1>
                    <p className="tournamentCreator">Organisateur: {tournament.creator.name}</p>
                    {renderSwitch(playerState)}

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
                            <section class="secMatches">
                                <ul class="round round-1">
                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top winner">Lousville <span>79</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom ">NC A&T <span>48</span></li>

                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top winner">Colo St <span>84</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom ">Missouri <span>72</span></li>

                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top ">Oklahoma St <span>55</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom winner">Oregon <span>68</span></li>

                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top winner">Saint Louis <span>64</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom ">New Mexico St <span>44</span></li>

                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top winner">Memphis <span>54</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom ">St Mary's <span>52</span></li>

                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top winner">Mich St <span>65</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom ">Valparaiso <span>54</span></li>

                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top winner">Creighton <span>67</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom ">Cincinnati <span>63</span></li>

                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top winner">Duke <span>73</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom ">Albany <span>61</span></li>

                                    <li class="spacer">&nbsp;</li>
                                </ul>
                                <ul class="round round-2">
                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top winner">Lousville <span>82</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom ">Colo St <span>56</span></li>

                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top winner">Oregon <span>74</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom ">Saint Louis <span>57</span></li>

                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top ">Memphis <span>48</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom winner">Mich St <span>70</span></li>

                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top ">Creighton <span>50</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom winner">Duke <span>66</span></li>

                                    <li class="spacer">&nbsp;</li>
                                </ul>
                                <ul class="round round-3">
                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top winner">Lousville <span>77</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom ">Oregon <span>69</span></li>

                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top ">Mich St <span>61</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom winner">Duke <span>71</span></li>

                                    <li class="spacer">&nbsp;</li>
                                </ul>
                                <ul class="round round-4">
                                    <li class="spacer">&nbsp;</li>

                                    <li class="game game-top winner">Lousville <span>85</span></li>
                                    <li class="game game-spacer">&nbsp;</li>
                                    <li class="game game-bottom ">Duke <span>63</span></li>

                                    <li class="spacer">&nbsp;</li>
                                </ul>
                            </section>
                        </section>
                    </div>
                </>
            }
        </>
    )
}

export default Tournament