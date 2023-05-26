import Link from 'next/link'
import Create from '@components/Icons/Create'
import Home from '@components/Icons/Home'
import Search from '@components/Icons/Search'
import { colors } from 'styles/theme'

function NavBar() {
    return (
        <>
            <nav>
                <span>
                    <Link href="/compose/meowter">
                        <Create width={32} height={32} stroke="#fff" />
                    </Link>
                </span>
                <span>
                    <Link href="/home">
                        <Home width={32} height={32} stroke="#fff" />
                    </Link>
                </span>
                {/* <span>
                    <Link href="/search">
                        <Search width={32} height={32} stroke="#212121" />
                    </Link>
                </span> */}
            </nav>
            <style jsx>
                {`
                    nav {
                        position: absolute;
                        bottom: 30px;
                        display: flex;
                        flex-direction: column;
                        overflow-x: hidden;
                        justify-content: center;
                        right: 3rem;
                    }

                    span {
                        align-items: center;
                        background: ${colors.black};
                        border-radius: 9999px;
                        border: 0;
                        color: ${colors.white};
                        cursor: pointer;
                        display: flex;
                        font-size: 16px;
                        margin-top: 10px;
                        font-weight: 800;
                        padding: 10px;
                        transition: opacity 0.3s ease;
                        user-select: none;
                    }
                    span:hover {
                        background-color: #75e6da;
                        cursor: pointer;
                    }

                    span:first-child {
                        background-color: #189ab4;
                    }
                    span:first-child:hover {
                        background-color: #75e6da;
                    }
                `}
            </style>
        </>
    )
}

export default NavBar
