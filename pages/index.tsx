import type { NextPage } from 'next'
import { AdditionalInfo } from '../components/home/additional_info'
import { CustomerTestimony } from '../components/home/customer_testimony'
import { HomePage } from '../components/home/home'
import { StoreDetails } from '../components/home/store_details'

const Home: NextPage = () => {
  return (
    <div>
      <HomePage />
      <StoreDetails />
      <CustomerTestimony />
      <AdditionalInfo />
    </div>
  )
}

export default Home
