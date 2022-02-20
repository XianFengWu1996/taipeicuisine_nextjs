import type { NextPage } from 'next'
import { HomePage } from '../components/home/home'
import { StoreDetails } from '../components/home/store_details'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <HomePage />
      <StoreDetails />
    </div>
  )
}

export default Home
