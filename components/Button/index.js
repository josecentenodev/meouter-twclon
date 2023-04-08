import { colors } from '../../styles/theme'

export default function Button({ children, onClick, disabled }) {
    return (
        <>
            <button disabled={disabled} onClick={onClick}>
                {children}
            </button>
            <style jsx>{`
                button {
                    align-items: center;
                    background: ${colors.black};
                    border-radius: 9999px;
                    border: 0;
                    color: ${colors.white};
                    cursor: pointer;
                    display: flex;
                    font-size: 16px;
                    font-weight: 800;
                    padding: 8px 16px;
                    transition: opacity 0.3s ease;
                    user-select: none;
                }

                button[disabled] {
                    opacity: 0.2;
                    pointer-events: none;
                }

                button > :global(svg) {
                    margin-right: 5px;
                }

                button:hover {
                    opacity: 0.7;
                }
            `}</style>
        </>
    )
}
