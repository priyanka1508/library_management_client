import React, { Fragment, useState } from "react";
import axios from "axios";
import { getWelcome } from "../../api";
const Welcome = () => {
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const getWelcomeMessage = async() => {
        const res = await getWelcome();
        setWelcomeMessage(res.data)
        console.log("res",res)
    }
    return (
        <Fragment>
            <button onClick={getWelcomeMessage}>
                Click me!
            </button>
            <div>{welcomeMessage}</div>
        </Fragment>

    )
}

export default Welcome;