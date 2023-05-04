import Avatar from '@components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'
import useDateTimeFormat from 'hooks/useDateTimeFormat'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Meowter({
    avatar,
    userName,
    content,
    img,
    id,
    userId,
    createdAt,
}) {
    const timeAgo = useTimeAgo(createdAt)
    const createdAtFormated = useDateTimeFormat(createdAt)
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push(`/status/${id}`)
    }
    return (
        <>
            <article key={id} onClick={handleClick}>
                <div>
                    <Avatar alt={userName} src={avatar} />
                </div>
                <section>
                    <header>
                        <strong>{userName}</strong>
                        <span> - </span>
                        <Link href={`status/${id}`}>
                            <time title={createdAtFormated}>{timeAgo}</time>
                        </Link>
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
                    border-bottom: 0.5px solid #eee;
                    padding: 10px 15px;
                }
                article:hover {
                    background: rgba(0, 0, 0, 0.05);
                    cursor: pointer;
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
                header > :global(a) {
                    text-decoration: none;
                }
                header > :global(a):hover {
                    text-decoration: underline;
                    color: #555;
                }
            `}</style>
        </>
    )
}
