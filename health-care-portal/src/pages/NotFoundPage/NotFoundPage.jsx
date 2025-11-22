import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

const NotFoundPage = () => (
  <div className={styles.container}>
    <h1 className={styles.code}>404</h1>
    <p className={styles.message}>Page not found.</p>
    <Link to="/" className={styles.home}>Go back home</Link>
  </div>
)

export default NotFoundPage