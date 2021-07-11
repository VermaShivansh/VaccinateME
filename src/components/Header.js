import React, { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Header() {
  useEffect(() => {
    gsap.to(".headerdesign", {
      duration: 3,
      y: -window.innerHeight * 0.8,
      // clipPath: "polygon(100% 0, 100% 90%, 50% 100%, 0 90%, 0 0)",
      scrollTrigger: {
        trigger: "#root",
        start: "top top",
        pin: true,
        //pinSpacing:true,
        /*end:()=>`+=${document.querySelector('.block').offsetHeight} 30%`,*/
        end: "bottom center",
        scrub: true,
        toggleActions: "play reverse play reverse",
        markers: false,
      },
    })
    gsap.from(".maincontent", { duration: 1.2, opacity: 0, y: -150 })
  }, [])
  return (
    <div className="header">
      <div className="headerdesign">
        <div className="maincontent py-5 px-4 mx-3 mx-sm-4 my-5 p-md-5 m-md-5">
          <div className="heading display-1">Door-To-Door Vaccination</div>
          <div className="tagline"></div>
        </div>
      </div>
    </div>
  )
}

export default Header
