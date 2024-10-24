import React, { useEffect, useRef, useState } from 'react'
import openai from '../utils/openapi';
import ReactMarkDown from "react-markdown"
import { useGSAP } from '@gsap/react';
import gsap from "gsap"
import { motion } from 'framer-motion'
import { div } from 'framer-motion/client';
import TypingEffect from "./TypingEffect";
import TypingEffectMarkDown from './TypingEffectMarkDown';

import './AIsearch.css'


export const AIsearch = () => {

    const searchText = useRef();
    const [error, setError] = useState(null);
    const [searchresult, setSearchresult] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSearchSubmitted, setIsSearchSubmitted] = useState(true);


    const handleAISearch = async () => {
        setIsSearchSubmitted(false);
        const prompt = `Act as a AI recommendation system and give me relevant output based on ${searchText.current.value}`;
        setLoading(true);
        console.log(searchText.current.value);
        try {
            const gptresult = await openai.generateContent(prompt);
            const response = gptresult.response;

            const text = response.text();
            if (!text) {
                setLoading(true);
            }

            setSearchresult(text);

        }
        catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

    }

            
    function breakthetext(){
        var h1=document.querySelector(".head")
        var h1txt=h1.textContent

        var splittedtxt=h1txt.split("")
        var halfval=splittedtxt.length/2
        var neww = ""
          
        splittedtxt.forEach((elem,indx)=>{
                  if(indx<halfval)
                  {
                    neww+=`<span class="a" >${elem}</span>`
                  }
                  else
                  {
                     neww+=`<span class="b" >${elem}</span>`
                  }
        })
        h1.innerHTML=neww
        console.log(h1)
    }
    
   
    


    useGSAP(() => {
        
        breakthetext()

        const spans = document.querySelectorAll(".a, .b");
        spans.forEach(span => {
            span.style.display = "inline-block";  // Ensure the y animation works
        });

        gsap.from(".a", {
            y: -50,
            duration: 0.8,
            opacity:0,
            stagger:-0.15
            
        })


        gsap.from(".b", {
            y: -50,
            duration: 0.8,
            opacity:0,
            stagger:0.15
        })
    })


    

   






    return (
        
        <div className=' row container-fluid py-5  col-sm-10 offset-sm-1 col-md-10 offset-md-1 col-lg-8  offset-lg-2  '>
            
            <h1 className='text-center head ' >Sense AI</h1>
            <div className='d-flex ' >
                <motion.input  type="text" placeholder='Search here' className=' w-20 form-control bg-dark text-white m-2 ' ref={searchText}
                 whileHover={{
                    scale:1.04,
                    transition: { duration: 0.2 } 
                 }}
              
                 />
                <motion.button className=' btn  btn-info m-2 ' 
                 whileHover={{scale:1.07}}
                 whileTap={{scale:0.9}}
                onClick={handleAISearch}>Search</motion.button>
            
            </div>
            {
               isSearchSubmitted  && <div className="flex flex-row justify-center text-center m-2" >
                <TypingEffect  className="font-bold"
                 texts={["Welcome to SenseAI!", "What can I help with?"]}
                 speed={100} 
                 pauseDuration={1000} 
               />
               </div>
            }
            {loading ?
                <div className='flex flex-row justify-center text-center'>
                    {window.innerWidth < 576 ? <img height={"100px"} src="./spin.svg" /> : window.innerWidth < 768 ? <img height={"130px"} src="./spin.svg" /> : window.innerWidth < 992 ?  <img height={"170px"} src="./spin.svg" /> : <img height={"180px"} src="./spin.svg" />
                      } 
                </div>
                : (
                    searchresult && (
                        <div> 
                        <ReactMarkDown className="m-3 " >
                       {searchresult} 
                        </ReactMarkDown>
                        </div>
                        ))
            }
        </div>
    )
}
