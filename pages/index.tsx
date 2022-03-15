import type { NextPage } from 'next'
import { AdditionalInfo } from '../components/home/additional_info'
import { CustomerTestimony } from '../components/home/customer_testimony'
import { Footer } from '../components/home/footer'
import { HomePage } from '../components/home/home'
import { StoreDetails } from '../components/home/store_details'

const Home: NextPage = () => {
  return (
    <>
      <HomePage />
      <StoreDetails />
      <CustomerTestimony />
      <AdditionalInfo />
      <Footer />
    </>
  )
}

export default Home
