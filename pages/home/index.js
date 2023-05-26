import Meowter from '@components/Meowter'
import useUser from 'hooks/useUser'
import { useState, useEffect } from 'react'
import { listenLatestDevits, fetchLatestMeows } from '@firebase/client'

import Head from 'next/head'
import NavBar from '@components/Nav'

export default function HomePage() {
    const [timeline, setTimeline] = useState([])
    const user = useUser()
    useEffect(() => {
        // user && fetchLatestMeows().then(setTimeline)
        let unsuscribe
        if (user) {
            unsuscribe = listenLatestDevits(setTimeline)
        }
        return () => unsuscribe && unsuscribe()
    }, [user])

    return (
        <>
            <Head>
                <title>Home | Meowter</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <header>
                <h2>Inicio</h2>
            </header>
            <section>
                {timeline.map((meowter) => (
                    <Meowter
                        key={meowter.id}
                        id={meowter.id}
                        userName={meowter.userName}
                        createdAt={meowter.createdAt}
                        content={meowter.content}
                        img={meowter.img}
                        avatar={meowter.avatar}
                        userId={meowter.userId}
                    />
                ))}
            </section>
            <NavBar />
            <style jsx>{`
                header {
                    top: 0;
                    position: sticky;
                    display: flex;
                    align-items: center;
                    height: 49px;
                    width: 100%;
                    border-bottom: 1px solid #eee;
                    padding: 0 15px;
                    background: #ffffffaa;
                }
                h2 {
                    font-size: 21px;
                    margin: 0;
                }
                section {
                    flex: 1;
                    overflow-y: scroll;
                    overflow-x: unset;
                    height: 100vh;
                    padding-bottom: 200px;
                }

                nav {
                    background: #fff;
                    bottom: 0;
                    position: sticky;
                    height: 49px;
                    width: 100%;
                    border-top: 1px solid #eee;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                }

                span {
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                }
                nav span:hover {
                    background: radial-gradient(#21212111 15%, transparent 16%);
                    background-size: 180px 180px;
                    background-position: center;
                }
            `}</style>
        </>
    )
}
