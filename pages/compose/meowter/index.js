import Button from '@components/Button'
import useUser from 'hooks/useUser'
import { useState, useEffect } from 'react'
import { addMeow, uploadImage, getURL } from '@firebase/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Avatar from '@components/Avatar'
import Link from 'next/link'
import Home from '@components/Icons/Home'
import NavBar from '@components/Nav'

const COMPOSE_STATES = {
    USER_NOT_KNOWN: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: -1,
}

const DRAG_IMAGE_STATE = {
    ERROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3,
}

export default function ComposeMeowter() {
    const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
    const [content, setContent] = useState('')
    const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
    const [task, setTask] = useState(null)
    const [imgURL, setImgURL] = useState(null)
    const user = useUser()
    const router = useRouter()

    useEffect(() => {
        if (task) {
            task.on(
                'state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break
                        case 'running':
                            console.log('Upload is running')
                            break
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break
                        case 'storage/canceled':
                            // User canceled the upload
                            break

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    // getDownloadURL(task.snapshot.ref).then(
                    //     (downloadURL) => {
                    //         console.log('File available at', downloadURL)
                    //     }
                    // )
                    getURL(task.snapshot.ref).then(setImgURL)
                }
            )
        }
    }, [task])

    const handleChange = (e) => {
        const { value } = e.target
        setContent(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus(COMPOSE_STATES.LOADING)
        addMeow({
            avatar: user.avatar,
            content: content,
            img: imgURL,
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
    const handleDragEnter = (e) => {
        //console.log(e, DRAG_IMAGE_STATE.DRAG_OVER)
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATE.DRAG_OVER)
    }
    const handleDragLeave = (e) => {
        //console.log(e)
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATE.NONE)
    }
    const handleDrop = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATE.NONE)
        //console.log(e)
        //console.log(e.dataTransfer.files[0])
        const file = e.dataTransfer.files[0]
        const task = uploadImage(file)

        setTask(task)
    }

    const isButtonDisabled =
        !content.length || status === COMPOSE_STATES.LOADING
    return (
        <>
            <Head>
                <title>Escribe un Meow! | Meowter</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <>
                <section className="composeSection">
                    {user && <Avatar alt={user.userName} src={user.avatar} />}
                    <form onSubmit={handleSubmit}>
                        <textarea
                            onChange={handleChange}
                            placeholder="Que esta pasando?"
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        ></textarea>
                        {imgURL && (
                            <section className="imageSection">
                                <button onClick={() => setImgURL(null)}>
                                    X
                                </button>
                                <Image
                                    width={125}
                                    height={125}
                                    src={imgURL}
                                    alt={content}
                                />
                            </section>
                        )}
                        <div>
                            <Button disabled={isButtonDisabled}>Meow!</Button>
                        </div>
                    </form>
                </section>
                <NavBar />
            </>
            <style jsx>{`
                form {
                    flex: 1;
                }
                .composeSection {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    padding: 10px;
                }
                .imageSection > :global(img) {
                    border-radius: 10px;
                    margin: 10px;
                }
                textarea {
                    width: 100%;
                    border: ${drag === DRAG_IMAGE_STATE.DRAG_OVER
                        ? `2px dashed #e1e1e1`
                        : `2px solid transparent`};
                    border-radius: 10px;
                    font-size: 21px;
                    padding: 10px;
                    resize: none;
                    outline: 0;
                    min-height: 200px;
                }
                .imageSection {
                    position: relative;
                }
                button {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    background: rgba(0, 0, 0, 0.9);
                    border: 0;
                    border-radius: 9999px;
                    color: white;
                    width: 23px;
                    height: 23px;
                }
                button:hover {
                    cursor: pointer;
                }
                div {
                    padding: 10px;
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
                span {
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                }
            `}</style>
        </>
    )
}
