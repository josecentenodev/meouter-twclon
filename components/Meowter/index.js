import Avatar from '@components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'
import Image from 'next/image'

export default function Meowter({
    avatar,
    userName,
    content,
    img,
    id,
    userId,
    createAt,
}) {
    const timeAgo = useTimeAgo(createAt)
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
                        <time>{timeAgo}</time>
                    </header>
                    <p>{content}</p>
                    {img && (
                        <Image
                            alt={content}
                            width={150}
                            height={150}
                            src={img}
                            style={{
                                minWidth: '100%',
                                height: 'auto',
                            }}
                        />
                    )}
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
