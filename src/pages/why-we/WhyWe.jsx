import React from 'react'
import Layout from '../../components/layout/Layout'

function WhyWe() {
  return (
    <Layout>
      <article className="pt-[80px] lg:pt-[150px] h-screen">
 


    <h2 className="text-center text-2xl">Why Choose Us?</h2>
    <div className="pt-5 text-center">
        <p className='pb-10 text-lg '><strong className='text-lg text-accent'>Personalized Matching:</strong> Our algorithm finds the best mentor or mentee for you, ensuring a meaningful and productive relationship.</p>
        <p className='pb-10 text-lg '><strong className='text-lg text-accent'>Expert Mentors:</strong> Our mentors are leaders in their fields, ready to share their wisdom and help you achieve your goals.</p>
        <p className='pb-10 text-lg '><strong className='text-lg text-accent'>Flexible & Convenient:</strong> Your schedule, your choice. Connect whenever it suits you.</p>
        <p className='pb-10 text-lg '><strong className='text-lg text-accent'>Vibrant Community:</strong> Join a network of motivated individuals eager to learn and grow together.</p>
        <p className='pb-10 text-lg '><strong className='text-lg text-accent'>Comprehensive Support:</strong> Access a wealth of resources to complement your mentorship experience.</p>
          </div>
      
      </article>
    </Layout>
  );
}

export default WhyWe