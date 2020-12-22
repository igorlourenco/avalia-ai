import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useAuth} from '../libraries/auth'

export default function Home() {

    const auth = useAuth()

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Avalia aí!
                </h1>

                {
                    !auth.user &&
                    <button onClick={(e) => auth.signInWithGithub()}>entrar com github</button>
                }

                {
                    auth.user &&
                    <div>
                        <h6>{auth.user.email}</h6>

                        <button onClick={(e) => auth.signOut()}>SAIR</button>
                    </div>
                }
            </main>
        </div>
    )
}
