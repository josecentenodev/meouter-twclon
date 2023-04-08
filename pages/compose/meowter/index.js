import AppLayout from '@components/AppLayout'
import Button from '@components/Button'
import useUser from 'hooks/useUser'
import { useState } from 'react'
import { addMeow } from '@firebase/client'
import { useRouter } from 'next/router'

const COMPOSE_STATES = {
    USER_NOT_KNOWN: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: -1,
}

export default function ComposeMeowter() {
    const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
    const [content, setMessage] = useState('')
    const user = useUser()
    const router = useRouter()
    const handleChange = (e) => {
        const { value } = e.target
        setMessage(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus(COMPOSE_STATES.LOADING)
        addMeow({
            avatar: user.avatar,
            content: content,
            userId: user.uid,
            userName: user.userName,
        })
            .then(() => {
                router.push('/home')
            })
            .catch((err) => {
                console.error(err)
                setStatus(COMPOSE_STATES.ERROR)
            })
    }
    const isButtonDisabled =
        !content.length || status === COMPOSE_STATES.LOADING
    return (
        <>
            <AppLayout>
                <form onSubmit={handleSubmit}>
                    <textarea
                        onChange={handleChange}
                        placeholder="Que esta pasando?"
                    ></textarea>
                    <div>
                        <Button disabled={isButtonDisabled}>Meow!</Button>
                    </div>
                </form>
            </AppLayout>
            <style jsx>{`
                textarea {
                    width: 100%;
                    border: 0;
                    font-size: 21px;
                    padding: 15px;
                    resize: none;
                    outline: 0;
                    min-height: 200px;
                }
                div {
                    padding: 15px;
                }
            `}</style>
        </>
    )
}
