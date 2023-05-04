import Meowter from '@components/Meowter'

export default function MeowterPage(props) {
    return (
        <>
            <Meowter {...props} />
            <style jsx>{``}</style>
        </>
    )
}

export async function getServerSideProps(context) {
    // params, req, res, query
    const { params, res } = context
    const { id } = params

    const apiResponse = await fetch(`http://localhost:3000/api/meows/${id}`)
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
