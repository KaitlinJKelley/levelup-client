import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { EventContext } from "./EventProvider.js"

export const EventList = (props) => {
    const { events, getEvents } = useContext(EventContext)

    let history = useHistory()

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
                <button onClick={() => {history.push(`/events/new`)}} className="btn btn-2 btn-sep icon-create"
            >Create a New Event</button>
            </header>
            {
                events.map(event => {
                    return <section key={event.id} className="registration">
                        <div className="registration__game">{event.game.name}</div>
                        <div>{event.description}</div>
                        <div>
                            {
                                new Date(event.event_date).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }
                            @ {event.time}
                        </div>
                    </section>
                })
            }
        </article >
    )
}