import React from 'react'
import {Footer} from '../components/Footer'

export const Layout = ({children}) => {
    return (
      <div>
          <div className="w-[100vw] h-[100vh]">
                  {children}
          </div>
          <Footer/>
          
      </div>
  
    )
  }
  
