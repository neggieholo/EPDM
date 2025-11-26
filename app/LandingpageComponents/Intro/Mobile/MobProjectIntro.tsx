'use client'

import React from 'react'
import OilGasProjectsScroller from '../OilGasProjectsScroller'
import LogoScroller from '../ScrollingIcons'
import MobInfoSection from './MobInfoSection'

const MobProjectIntro = () => {
  return (
    <>
      <MobInfoSection title="What we offer">
        <div className='w-full flex flex-col h-fit p-2 gap-3'>
            <div className=' bg-primary h-fit shadow-right flex flex-col p-1'>
              <h2 className="font-extrabold mb-1 text-white leading-tight p-2" style={{ fontSize: '1.5em' }}>
                TOOLS FOR SUCCESS
              </h2>
              <h3 className="font-semibold px-2 text-base-300 rounded-sm w-fit" style={{ fontSize: '1.2em' }}>
                A Real-Time Digital Platform
              </h3>
              <p className="text-white p-3" style={{ fontSize: '1em' }}>
                EPDM tracks thousands of energy projects and provides real-time, accurate, and reliable resources for companies seeking new business opportunities, analytics and up-to-date industry insights. EPDM delivers the latest information on planned, ongoing, and future energy projects to empower your success.
              </p>
            </div>
            <div className='bg-primary h-fit text-white shadow-right shadow-md p-1'>
              <h5 className="font-extrabold mb-4 border-b border-base-300 pb-2" style={{ fontSize: '1.5em' }}>
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
            <div className="flex-1 w-full h-full mt-8 flex flex-col items-center justify-center">
                {/* Overall heading */}
                <h1 className="font-bold text-primary bg-white mb-6 rounded-md text-2xl text-center p-2">
                OIL AND GAS PROJECTS BY SECTOR
                </h1>
                <div className='flex h-[30vh] justify-center w-full'>
                <OilGasProjectsScroller />
                </div>
            </div>
        </div>
      </MobInfoSection>
      <LogoScroller />
    </>
  )
}

export default MobProjectIntro