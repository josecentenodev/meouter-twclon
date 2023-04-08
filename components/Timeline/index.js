import Link from 'next/link'

export default function Timeline() {
    return (
        <>
            <h1>This is the timeline</h1>
            <Link href="/">Go Home</Link>
            <style jsx>{`
                h1 {
                    font-size: 36px;
                    color: tomato;
                }
            `}</style>
        </>
    )
}
