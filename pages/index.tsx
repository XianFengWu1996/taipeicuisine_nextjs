import type { NextPage } from 'next'
import { CustomerTestimony } from '../components/home/customer_testimony'
import { HomePage } from '../components/home/home'
import { StoreDetails } from '../components/home/store_details'

const Home: NextPage = () => {
  return (
    <div>
      <HomePage />
      <StoreDetails />
      <CustomerTestimony />
    </div>
  )
}

export default Home
