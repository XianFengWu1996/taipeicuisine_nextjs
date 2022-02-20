import CustomerBg from '../../assets/images/customer-background.jpeg'
import { SectionTitle } from './section_title'

export const CustomerTestimony = () => {
    return <section 
        style={{
            backgroundImage: `linear-gradient(rgba(46, 43, 43, 0.6),rgba(46, 43, 43, 0.6)), url(${CustomerBg.src})`,
            backgroundRepeat: 'no-repeat',  
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '100vh',
            width: '100vw',
        }}
    >
        <SectionTitle 
            title='Here is what customers are saying'
            color='#fff'
        />
    
    </section>
}