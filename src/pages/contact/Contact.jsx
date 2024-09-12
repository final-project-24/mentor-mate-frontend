import Layout from "../../components/layout/Layout";
import "./Contact.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Logo from '../../assets/images/mentormateLogo.svg'

const ContactForm = () => {
  return (
    <Layout>
         
    <div className="max-w-screen-lg mx-auto p-5 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-12 border">
        <div className="bg-green-500 md:col-span-4 p-10 text-white">
        
          <p className="mt-4 text-sm leading-7 font-regular uppercase">Contact</p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
            Get In <span className="text-gray-800 ">Touch</span>
          </h3>
          
          <p className="mt-4 leading-7 text-white">
          Got a question? <br/>We’re here to help! Fill out the form below, 
          and we’ll get back to you as soon as possible.
          </p>

          <div className="flex items-center mt-10">
          <FontAwesomeIcon icon={faLocationDot} className="h-5 mr-2 text-gray-800" />
            <span className="text-sm"> Street 742, Evergreen Terrace, Berlin, Germany.</span>
          </div>
          <div className="flex items-center mt-5">
          <FontAwesomeIcon icon={faPhone} className="h-5 mr-2 text-gray-800" />
            
            <span className="text-sm">+93 749 99 65 50</span>
          </div>
          <div className="flex items-center mt-5">
          <FontAwesomeIcon icon={faPhone} className="h-5 mr-2 text-gray-800" />
            <span className="text-sm">24/7</span>
          </div>
          <img src={Logo} alt="Logo" className="footer-logo mx-auto mt-8 " />
        </div>
        

        <form action="https://fabform.io/f/{form-id}" method="post" className="md:col-span-8 p-10">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name" type="text" placeholder="Jane"
              />
            
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name" type="text" placeholder="Doe"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                Email Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email" type="email" placeholder="********@*****.**"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-message">
                Your Message
              </label>
              <textarea
                id="grid-message" rows="10"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              ></textarea>
            </div>
            <div className="flex justify-between w-full px-3">
              <div className="md:flex md:items-center">
                <label className="block text-gray-500 font-bold">
                  <input className="mr-2 leading-tight" type="checkbox" />
                  <span className="text-sm">Send me your newsletter!</span>
                </label>
              </div>
              <button
                className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                type="submit"
              >
                Send Message
              </button>
            </div>
            {/* <a href="https://veilmail.io/e/FkKh7o" className="font-medium text-blue-600 hover:underline">
              Or click here to reveal our protected email address
            </a> */}
          </div>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default ContactForm;
