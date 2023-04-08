import AppLayout from '@components/AppLayout'
import Meowter from '@components/Meowter'
import useUser from 'hooks/useUser'
import { useState, useEffect } from 'react'
import { fetchLatestMeows } from '@firebase/client'

export default function HomePage() {
    const [timeline, setTimeline] = useState([])
    const user = useUser()
    useEffect(() => {
        user && fetchLatestMeows().then(setTimeline)
    }, [user])

    return (
        <>
            <AppLayout>
                <header>
                    <h2>Inicio</h2>
                </header>
                <section>
                    {timeline.map((meowter) => (
                        <Meowter
                            key={meowter.id}
                            userName={meowter.userName}
                            createAt={meowter.createAt}
                            content={meowter.content}
                            avatar={meowter.avatar}
                            userId={meowter.userId}
                        />
                    ))}
                </section>
                <nav></nav>
            </AppLayout>
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
                    padding-top: 10px;
                }

                nav {
                    background: #fff;
                    bottom: 0;
                    position: sticky;
                    height: 49px;
                    width: 100%;
                    border-top: 1px solid #eee;
                }
            `}</style>
        </>
    )
}
