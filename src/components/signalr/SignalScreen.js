import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const signalUrl = process.env.SIGNALR_URL;

const SignalScreen = () => {
    const [number, setNumber] = useState(0);
    const connection = new HubConnectionBuilder()
        .withUrl(signalUrl)
        .build();

    connection.on("viewCountUpdate", value => {
        setNumber(value);
    });

    const notify = () => {
        connection.send("notifyWatching");
    }

    const startSuccess = () => {
        console.log("Connected.")
        notify();
    }

    const startFail = () => {
        console.log("Connection failed.")
    }

    useEffect(() => {
        connection.start().then(startSuccess, startFail);
    }, [])
    return (
        <div>
            <h1>Contador</h1>
            <p>{number}</p>
        </div>
    );
}

export default SignalScreen;