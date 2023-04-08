import { initializeApp } from '@firebase/app'
import {
    getFirestore,
    Timestamp,
    collection,
    addDoc,
    getDocs,
} from '@firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyCofEdYjfB2L4y48kVQlu5PZOZdmH1s-yw',
    authDomain: 'meowter-8aff1.firebaseapp.com',
    projectId: 'meowter-8aff1',
    storageBucket: 'meowter-8aff1.appspot.com',
    messagingSenderId: '338641514189',
    appId: '1:338641514189:web:86b9f78b8c9ea4287bc384',
    measurementId: 'G-EP4NZJLX2D',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore(app)

const mapUserFromFirebaseAuthToUser = (user) => {
    if (!user) return null
    const { displayName, email, photoURL, uid } = user
    return {
        avatar: photoURL,
        userName: displayName,
        email,
        uid,
    }
}

export const onAuthStateChanged = (onChange) => {
    return auth.onAuthStateChanged((user) => {
        const normalizedUser = mapUserFromFirebaseAuthToUser(user)
        onChange(normalizedUser)
    })
}

export const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
}

export const addMeow = ({ avatar, content, userId, userName }) => {
    return addDoc(collection(db, 'meows'), {
        avatar,
        content,
        userId,
        userName,
        createAt: Timestamp.fromDate(new Date()),
        likesCount: 0,
        sharedCount: 0,
    })
}

export const fetchLatestMeows = () => {
    return getDocs(collection(db, 'meows')).then((snapshot) => {
        return snapshot.docs.map((doc) => {
            const data = doc.data()
            const id = doc.id
            const { createAt } = data
            const date = new Date(createAt.seconds * 1000)
            const normalizedCreateAt = new Intl.DateTimeFormat('es-Es').format(
                date
            )
            console.log(data, id)
            return {
                ...data,
                id,
                createAt: normalizedCreateAt,
            }
        })
    })
}
