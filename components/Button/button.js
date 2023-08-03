import styles from './button.module.css'

export const Button = ({ children }) => {
  return (
    <button className={styles.button}>
      <div className={styles.buttonContent}>{children}</div>
    </button>
  )
}