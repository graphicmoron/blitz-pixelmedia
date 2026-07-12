'use client'

import React from 'react'
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const BookMeet = () => {

    // useEffect(() => {
    //     (async function () {
    //         const cal = await getCalApi({ "namespace": "30min" });
    //         cal("ui", { "theme": "light", "hideEventTypeDetails": false, "layout": "month_view" });
    //     })();
    // }, [])

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "15min" });
            cal("ui", { "theme": "light", "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, [])

    return (
        <section
            id='bookACall'
            className='relative min-h-screen w-full flex pt-40'
        >
            <div className='absolute bottom-0 z-10 h-1/4 bg-gradient-to-t from-black w-full'></div>
            <div
                className="absolute inset-0 z-0 opacity-100"
                style={{
                    backgroundImage: `
                repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
                repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
                repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
                repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
              `,
                }}
            />



            <div className='container mx-auto w-full flex flex-col  items-center z-20 pointer-events-auto'>
                <h1 className='text-4xl md:text-7xl font-canela font-bold text-accent max-w-[70%] text-center'>
                    Book a <span className='text-orangish-red font-canela'> 15-min call </span>
                </h1>

                <div className='text-center px-2 text-md md:text-xl flex flex-col gap-2 mt-6'>
                    <p>Please select the time that fits you or just</p>
                    <p>Email us at &nbsp;
                        <a href="mailto:info.graphicmoron@gmail.com" className='underline font-semibold text-orangish-red hover:text-neutral-600 '>info.graphicmoron@gmail.com</a>
                    </p>
                </div>

                <div className='mt-20 w-full'>
                    {/* <Cal namespace="30min"
                        calLink="graphicmoron/30min"
                        style={{ width: "100%", height: "100%", overflow: "scroll", borderRadius: "1.2rem" }}
                        config={{ "layout": "month_view", "theme": "light" }}
                    /> */}
                    <Cal namespace="15min"
                        calLink="graphicmoron/15min"
                        style={{ width: "100%", height: "100%", overflow: "scroll", borderRadius: "1.2rem" }}
                        config={{ "layout": "month_view","theme": "light" , "useSlotsViewOnSmallScreen": "true" }}
                    />
                </div>


            </div>
        </section>
    )
};


export default BookMeet