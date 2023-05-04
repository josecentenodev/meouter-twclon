import Head from 'next/head'
import Image from 'next/image'
import { loginWithGoogle } from '@firebase/client'
import GoogleIcon from '@components/Icons/GoogleIcon'
import Button from '@components/Button'
import { colors } from 'styles/theme'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser, { USER_STATES } from 'hooks/useUser'

export default function Home() {
    const user = useUser()
    const router = useRouter()

    useEffect(() => {
        user && router.replace('/home')
    }, [user, router])

    const handleClick = () => {
        loginWithGoogle()
    }
    return (
        <>
            <Head>
                <title>Meowter by josecentenodev</title>
                <meta
                    name="description"
                    content="A Twitter Clon for educational purposes only"
                />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <section>
                <Image
                    src="/meowter.png"
                    alt="user avatar"
                    width={300}
                    height={300}
                />
                <h2>Talk about Cats & Code</h2>
                {user === USER_STATES.NOT_LOGGED && (
                    <Button onClick={handleClick}>
                        <GoogleIcon />
                        Login with Google
                    </Button>
                )}
                {user === USER_STATES.NOT_KNOWN && <span>Loading...</span>}
            </section>
            <style jsx>{`
                section {
                    display: grid;
                    place-content: center;
                    place-items: center;
                    height: 100%;
                }

                h2 {
                    text-align: center;
                    margin-top: 0;
                    color: ${colors.primary};
                }
                div {
                    display: flex;
                    align-items: center;
                    border-radius: 9999px;
                    padding: 10px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </>
    )
}
