import Avatar from '@components/Avatar'

export default function Meowter({
    avatar,
    userName,
    content,
    id,
    userId,
    createAt,
}) {
    console.log(createAt)
    return (
        <>
            <article key={id}>
                <div>
                    <Avatar alt={userName} src={avatar} />
                </div>
                <section>
                    <header>
                        <strong>{userName}</strong>
                        <span> - </span>
                        <time>{createAt}</time>
                    </header>
                    <p>{content}</p>
                </section>
            </article>
            <style jsx>{`
                article {
                    display: flex;
                    margin-bottom: 10px;
                    border-bottom: 0.5px solid #eee;
                    padding: 0 15px;
                }
                div {
                    padding: 0 15px;
                }
                p {
                    margin: 5px;
                }
                time,
                span {
                    color: #555;
                    font-size: 12px;
                    font-weight: 600;
                }
            `}</style>
        </>
    )
}
