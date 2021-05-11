import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { EventProvider } from "./event/EventProvider.js"
import { EventList } from "./event/EventList.js"
import { GameForm } from "./game/GameForm.js"
import { EventForm } from "./event/EventForm.js"
import { Profile } from "./auth/ProfileList.js"
import { ProfileProvider } from "./auth/ProfileProvider.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
          <GameProvider>
                <Route exact path={["/", "/games"]}>
                    <GameList />
                </Route>

                <Route exact path="/games/new">
                <GameForm />
                </Route>

                <Route exact path="/games/edit/:gameId(\d+)">
                <GameForm />
                </Route>

                <EventProvider>
                    <Route exact path="/events">
                        <EventList />
                    </Route>

                    <Route path="/events/new">
                        <EventForm/>
                    </Route>

                    <ProfileProvider>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                </ProfileProvider>
                </EventProvider>
            </GameProvider>
        </main>
    </>
}
