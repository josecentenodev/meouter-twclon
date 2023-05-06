import Meowter from '@components/Meowter'
import Head from 'next/head'
import Link from 'next/link'
import Home from '@components/Icons/Home'
import Create from '@components/Icons/Create'

export default function MeowterPage(props) {
    return (
        <>
            <Head>
                <title>{`${props.content} | Meowter`}</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Meowter {...props} />
            <nav>
                <span>
                    <Link href="/home">
                        <Home width={32} height={32} stroke="#212121" />
                    </Link>
                </span>
                <span>
                    <Link href="/compose/meowter">
                        <Create width={32} height={32} stroke="#212121" />
                    </Link>
                </span>
            </nav>
            <style jsx>{`
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
            `}</style>
        </>
    )
}

export async function getServerSideProps(context) {
    // params, req, res, query
    const { params, res } = context
    const { id } = params

    const apiResponse = await fetch(
        `https://meowter-josecentenodev.vercel.app/api/meows/${id}`
    )
    if (apiResponse.ok) {
        const props = await apiResponse.json()
        return { props }
    }
    if (res) {
        res.writeHead(301, { Location: '/home' }).end()
    }
}

// MeowterPage.getInitialProps = (context) => {
//     const { query } = context
//     const { id } = query

//     return fetch(`http://localhost:3000/api/meows/${id}`)
//         .then((apiResponse) => {
//             if (apiResponse.ok) return apiResponse.json()
//         })
//         .catch((e) => {
//             console.log(e)
//         })
// }
