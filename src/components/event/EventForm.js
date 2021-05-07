import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider"
import { EventContext } from "./EventProvider"

export const EventForm = () => {
    const history = useHistory()

    const [currentEvent, setEvent] = useState({
        eventDate: "2001-01-01",
        time: "12:00",
        gameId: 0,
        description: ""
    })

    const {createEvent} = useContext(EventContext)
    const {getGames, games} = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = (event) => {
        let newEvent = {...currentEvent}

        newEvent[event.target.name] = event.target.value
        setEvent(newEvent)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <label htmlFor="eventDate">Event Date:</label>
                <input type="date" name="eventDate" value={`${currentEvent.eventDate}`} onChange={changeEventState}></input>
            </fieldset>
            <fieldset>
                <label htmlFor="time">Start Time:</label>
                <input type="time" name="time" value={`${currentEvent.time}`} onChange={changeEventState}></input>
            </fieldset>
            <fieldset>
                <textarea name="description" value={`${currentEvent.description}`} placeholder="Description" onChange={changeEventState}></textarea>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={`${game.id}`} value={`${game.id}`}>{`${game.name}`}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // Create the event
                    createEvent(currentEvent)

                    // Once event is created, redirect user to event list
                    history.push("/events")
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}