import { firestore } from '@firebase/admin'

const resFunction = (req, res) => {
    const { query } = req
    const { id } = query

    firestore
        .collection('meows')
        .doc(id)
        .get()
        .then((doc) => {
            const data = doc.data()
            const id = doc.id
            const { createdAt } = data

            res.json({
                ...data,
                id,
                createdAt: +createdAt.toDate(),
            })
        })
        .catch((e) => {
            console.log(e)
            res.status(404).end()
        })
}

export default resFunction
