/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';


const SocketProvider = () => {
    const [projectViewCount, setProjectsViewCount] = useState(0);
    const [siteVisitCount, setSiteVisitCount] = useState(0);
    const [dailyVisitCount, setDailyVisitCount] = useState(0);

    useEffect(() => {
        const socket = io('https://energyprojectsdata.com', {
            path: '/api/socket.io',
            withCredentials: true,
        });

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on("viewCountUpdate", (projectViewCount) => {
            setProjectsViewCount(projectViewCount);
        });

        socket.on("siteTrafficUpdate", (siteVisitCount) => {
            setSiteVisitCount(siteVisitCount)
        });

        socket.on("dailyTrafficUpdate", (dailyVisitCount) => {
            setDailyVisitCount(dailyVisitCount)
        });


        socket.on('disconnect', async () => {
            console.log('Disconnected from socket server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);
  return (
    <div className='fixed bottom-0 left-0 h-fit p-3 flex flex-col gap-3 justify-evenly items-center bg-white font-semibold'>
        <p>Daily Visits: {dailyVisitCount}</p>
        <p>Site Visits: {siteVisitCount}</p>
    </div>
  )
}

export default SocketProvider