const timeline = [
    {
        id: '0',
        avatar: 'https://i.pravatar.cc/150?img=1',
        userName: 'wongmjane',
        content: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
    
    (gzipped size went from 16.6 KB down to 2.7 KB!!)
    
    * Chrome 79+, Safari 14+, Firefox 68+`,
    },
    {
        id: '1',
        avatar: 'https://i.pravatar.cc/150?img=2',
        userName: 'midudev',
        content: 'Wow, devter está funcionando y vivo 🦉',
        name: 'Miguel Ángel Durán',
    },
    {
        id: '2',
        userName: 'd4nidev',
        name: 'Daniel de la Cruz',
        avatar: 'https://i.pravatar.cc/150?img=3',
        content: `Abro paraguas Paraguas
    
    Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
    },
    {
        id: '3',
        avatar: 'https://i.pravatar.cc/150?img=1',
        userName: 'wongmjane',
        content: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
    
    (gzipped size went from 16.6 KB down to 2.7 KB!!)
    
    * Chrome 79+, Safari 14+, Firefox 68+`,
    },
    {
        id: '4',
        avatar: 'https://i.pravatar.cc/150?img=2',
        userName: 'midudev',
        content: 'Wow, devter está funcionando y vivo 🦉',
        name: 'Miguel Ángel Durán',
    },
    {
        id: '5',
        userName: 'd4nidev',
        name: 'Daniel de la Cruz',
        avatar: 'https://i.pravatar.cc/150?img=3',
        content: `Abro paraguas Paraguas
    
    Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
    },
]

export default function handler(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(timeline))
}
