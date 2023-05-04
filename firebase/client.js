import { initializeApp } from '@firebase/app'
import {
    getFirestore,
    Timestamp,
    collection,
    addDoc,
    getDocs,
    orderBy,
    onSnapshot,
    query,
} from '@firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage'

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

const storage = getStorage(app)

const mapMeowFromFirebaseToMeowObject = (doc) => {
    const data = doc.data()
    const id = doc.id
    const { createdAt } = data

    return {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
    }
}

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

export const addMeow = ({ avatar, content, img, userId, userName }) => {
    return addDoc(collection(db, 'meows'), {
        avatar,
        content,
        img,
        userId,
        userName,
        createdAt: Timestamp.fromDate(new Date()),
        likesCount: 0,
        sharedCount: 0,
    })
}

export const fetchLatestMeows = () => {
    return getDocs(collection(db, 'meows'), orderBy('createdAt')).then(
        (snapshot) => {
            return snapshot.docs.map(mapMeowFromFirebaseToMeowObject)
        }
    )
}

export const listenLatestDevits = (callback) => {
    return (
        onSnapshot(
            query(collection(db, 'meows'), orderBy('createdAt', 'desc')),
            (snapshot) => {
                const newMeows = snapshot.docs.map(
                    mapMeowFromFirebaseToMeowObject
                )
                callback(newMeows)
            }
        ),
        (error) => {
            console.log('client.js linea 106: ', error)
        }
    )
}

export const uploadImage = (file) => {
    const fileName = file.name
    const fileRef = ref(storage, 'images/' + fileName)
    const uploadTask = uploadBytesResumable(fileRef, file)
    return uploadTask
}

export const getURL = (ref) => {
    return getDownloadURL(ref)
}
