import "./Tournament.css";
import axios from "axios";

import { useParams } from "react-router-dom";

const Tournament = () => {

    const id = useParams().id;

    return (
        <>
        <div>Tournament id : {id}</div>
        </>
    )
}

export default Tournament