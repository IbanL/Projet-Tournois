import "./userProfile.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const UserProfile = () => {
  let id = useParams().id;
  id = JSON.parse(id)

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([])

  const fetchUser = async () => {

    setLoading(true);

    try {
      const response = await axios.get(process.env.VITE_API_URL + 'users/' + id)

      if (!response) {
        throw new Error("No response from server");
      }

      setUser(response.data.user)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();

  }, []);


  return (
    <>
      {loading ? <p>loading...</p> :

        <div>
          <h1 className="userProfileTitle">{user.name}</h1>
          <section className="userProfileSection">
            <div className="joinedTournamentDiv">
              <h2 className="joinedTournamentTitle">Participations</h2>
              {user.joinedTournaments.map((tournament) => (
                <Link to={`/tournament/${tournament._id}`} key={tournament._id} className='tournamentsLinkProfile'>
                  <div className='tournamentsCardProfile'><h3 className='tournamentsName'>{tournament.name}</h3>
                    <p className='tournamentsDateProfile'>{tournament.date.slice(0, 10)}</p>
                    <p className='tournamentsLocationProfile'>{tournament.location}</p>
                    <p className='tournamentsPlayersProfile'>{tournament.nbInscrits}/{tournament.nbParticipants}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="createdTournamentDiv">
              <h2 className="createdTournamentTitle">Créations</h2>
              {user.createdTournaments.map((tournament) => (
                <Link to={`/tournament/${tournament._id}`} key={tournament._id} className='tournamentsLinkProfile'>
                  <div className='tournamentsCardProfile'><h3 className='tournamentsName'>{tournament.name}</h3>
                    <p className='tournamentsDateProfile'>{tournament.date.slice(0, 10)}</p>
                    <p className='tournamentsLocationProfile'>{tournament.location}</p>
                    <p className='tournamentsPlayersProfile'>{tournament.nbInscrits}/{tournament.nbParticipants}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>





      }
    </>
  )
}

export default UserProfile
