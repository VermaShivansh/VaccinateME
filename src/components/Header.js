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
          <div className="heading display-1 mb-5">Door-To-Door Vaccination</div>
          <div className="tagline mt-md-4 row position-relative">
            <div className="container taglineContent p-0 m-3">
              <h3>Easy Vaccination in just 3 steps : -</h3>
              <li>1. Register with your Mobile Number.</li>
              <li>2. Track your Vaccination Status through CustomerID.</li>
              <li>3. Verify your Vaccination and download Certificate.</li>
              <li>Happy Vaccination!!</li>
            </div>
            <div className="col-6 position-absolute imageContainer">
              <img src="https://i.ibb.co/rykDD3G/Pngtree-vaccine-doctor-inject-vaccines-png-6319646.png" alt="Pngtree-vaccine-doctor-inject-vaccines-png-6319646" border="0" width="600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
