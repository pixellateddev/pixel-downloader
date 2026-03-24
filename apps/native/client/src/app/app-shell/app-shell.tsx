import styles from './app-shell.module.css'

export function AppShell() {
  return (
    <main className={styles.shell}>
      <section className={styles.greetingCard} aria-label="Greeter">
        <span className={styles.greetingEyebrow}>Pixel Downloader</span>
        <h1 className={styles.greetingTitle}>Hello there.</h1>
        <p className={styles.greetingCopy}>The app shell is ready. Feature UI comes next.</p>
      </section>
    </main>
  )
}
