import Image from 'next/image'
import styles from './styles.module.css'

export default function Avatar({ src, alt, text }) {
    return (
        <>
            <Image
                src={src}
                alt={alt}
                width={49}
                height={49}
                className={styles.avatar}
            ></Image>
            {text && <strong className={styles.strong}>{text}</strong>}
        </>
    )
}
