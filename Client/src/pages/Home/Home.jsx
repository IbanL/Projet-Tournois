import axios from 'axios'
import './home.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  const [loading, setLoading] = useState(true);
  const [tournaments10, setTournaments10] = useState([])

  const fetchTournaments = async () => {

    setLoading(true);

    try {
      const response = await axios.get(process.env.VITE_API_URL + 'tournaments/10')

      if (!response) {
        throw new Error("No response from server");
      }

      setTournaments10(response.data.tournaments)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchTournaments();

  }, []);

  return (
    <>
      <section className="hero">
        <h1 className='heroTitle'>Le site de gestion de tournois</h1>
      </section>

      <section className='secTournaments'>
        <h2 className='secTournamentsTitle'>Derniers tournois</h2>
        {
          tournaments10 ? (
            tournaments10.map(tournament => (
              <Link to={`/tournament/${tournament._id}`} key={tournament._id} className='tournamentLink'>
                <div className='tournamentCard'><h3 className='tournamentName'>{tournament.name}</h3>
                  <p className='tournamentDate'>{tournament.date.slice(0, 10)}</p>
                  <p className='tournamentLocation'>{tournament.location}</p>
                  <p className='tournamentPlayers'>{tournament.nbInscrits}/{tournament.nbParticipants}</p>
                </div>
              </Link>
            ))) : (
            <p>Chargement...</p>
          )
        }
      </section>
    </>
  )
}

export default Home