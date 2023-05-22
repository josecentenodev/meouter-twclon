import Meowter from '@components/Meowter'
import useUser from 'hooks/useUser'
import { useState, useEffect } from 'react'
import { listenLatestDevits, fetchLatestMeows } from '@firebase/client'
import Link from 'next/link'
import Create from '@components/Icons/Create'
import Home from '@components/Icons/Home'
import Search from '@components/Icons/Search'
import Head from 'next/head'

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
            <nav>
                <span>
                    <Link href="/home">
                        <Home width={32} height={32} stroke="#212121" />
                    </Link>
                </span>
                {/* <span>
                    <Link href="/search">
                        <Search width={32} height={32} stroke="#212121" />
                    </Link>
                </span> */}
                <span>
                    <Link href="/compose/meowter">
                        <Create width={32} height={32} stroke="#212121" />
                    </Link>
                </span>
            </nav>
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
                    backdrop-filter: blur(5px);
                }
                h2 {
                    font-size: 21px;
                    margin: 0;
                }
                section {
                    flex: 1;
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
                @media (max-width: 500px) {
                    /* … */
                    nav {
                        position: absolute;
                        bottom: 0;
                        z-index: 100;
                    }
                    section {
                        overflow: scroll;
                        scroll: ;
                    }
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
