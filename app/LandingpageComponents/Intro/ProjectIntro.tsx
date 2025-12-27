'use client'

import React from 'react'
import OilGasProjectsScroller from './OilGasProjectsScroller'
import LogoScroller from './ScrollingIcons'

const ProjectIntro = () => {
  return (
    <>
      <section className="w-full bg-white h-fit flex flex-col overflow-y-hidden">
            <div className="w-[70%] mx-auto bg-accent/20 flex flex-col justify-center p-5">
                <h2 className="text-2xl font-bold text-primary mb-4 border-b border-accent pb-2">
                    What we offer
                </h2>
                <div className="text-gray-700 flex-1 w-full flex">
                  <div className='w-[40%] flex p-2'>
                    <div className='w-full h-fit bg-none text-start relative flex flex-col gap-2'>
                      <div className=' bg-primary h-fit shadow-right flex flex-col p-1'>
                        <h2 className="font-extrabold mb-1 text-white leading-tight p-2" style={{ fontSize: '1.5em' }}>
                          TOOLS FOR SUCCESS
                        </h2>
                        <h3 className="font-semibold px-2 text-base-300 rounded-sm w-fit" style={{ fontSize: '1.2em' }}>
                          A Real-Time Digital Platform
                        </h3>
                        <p className="text-white p-3" style={{ fontSize: '1.4em' }}>
                          EPDM tracks thousands of energy projects and provides real-time, accurate, and reliable resources for companies seeking new business opportunities, analytics, intelligence, and up-to-date industry insights. EPDM delivers the latest information on planned, ongoing, and future energy projects to empower your success.
                        </p>
                      </div>
                      <div className='bg-primary h-fit text-white shadow-right shadow-md p-1'>
                        <h5 className="font-extrabold mb-4 border-b border-base-300 pb-2" style={{ fontSize: '1.4em' }}>
                          OIL AND GAS PROJECTS
                        </h5>
                        <ul className="space-y-3 list-disc list-inside">
                          {[
                            "NLNG Train 7 Project",
                            "AKK Gas Pipeline Project",
                            "Shell Southern Swamp AGS 3B Project",
                            "Preowei Deepwater Dev. Project",
                          ].map((project, i) => (
                            <li
                              key={i}
                              className="text-base-accent hover:text-primary transition-colors 
                                            duration-200 border-b border-base-200 pb-1 last:border-0"
                              style={{ fontSize: '1em' }}
                            >
                              {project}
                            </li>
                          ))}
                        </ul>
                        <div className='flex w-full justify-end'><span>...and more</span></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-[60%] h-full flex flex-col items-center justify-center self-center">
                    {/* Overall heading */}
                    <h1 className="font-bold text-primary bg-white mb-6 rounded-md text-2xl text-center p-2">
                      OIL AND GAS PROJECTS BY SECTOR
                    </h1>
                    <div className='flex h-fit justify-center w-full'>
                      <OilGasProjectsScroller />
                    </div>
                  </div>
                </div>
            </div>
            <LogoScroller />
        </section>        
    </>
  )
}

export default ProjectIntro