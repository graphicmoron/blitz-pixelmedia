// import { Replit } from '@/Components/ui/svgs/replit'
// import { MagicUI } from '@/Components/ui/svgs/magic-ui'
// import { VSCodium } from '@/Components/ui/svgs/vs-codium'
// import { MediaWiki } from '@/Components/ui/svgs/media-wiki'
// import { GooglePaLM } from '@/Components/ui/svgs/google-palm'
// import { LogoIcon } from '@/Components/logo'
// import { cn } from '@/lib/utils'
// import { Button } from '@/Components/ui/button'
// import Link from 'next/link'
// import Image from 'next/image'

// export default function IntegrationsSection() {
//     return (
//         <section className="bg-black text-white">
//             <div className="">
//                 <div className="mx-auto max-w-5xl px-6">
//                     <div className="group relative mx-auto flex aspect-16/10 max-w-88 items-center justify-center sm:max-w-sm">
//                         <div
//                             role="presentation"
//                             className="bg-linear-to-b border-white/10 absolute inset-0 z-10 aspect-square animate-spin rounded-full border-t from-white/10 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100"></div>
//                         <div
//                             role="presentation"
//                             className="bg-linear-to-b border-white/10 absolute inset-16 z-10 aspect-square scale-90 animate-spin rounded-full border-t from-white/5 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100"></div>
//                         <div className="bg-linear-to-b from-white/5 absolute inset-0 flex aspect-square items-center justify-center rounded-full border-t border-white/5 to-transparent to-25%">
//                             <IntegrationCard className="absolute left-[11%] top-[28%] -translate-x-1/2 -translate-y-1/2">
//                                 <Image
//                                     src="/logos/canva-icon.png"
//                                     width={64}
//                                     height={64}
//                                     alt="Canva logo"
//                                     className="object-contain w-[40px] h-[40px]"
//                                 />
//                             </IntegrationCard>
//                             <IntegrationCard className="absolute left-1/2 top-[9%] -translate-x-1/2 -translate-y-1/2">
//                                   <Image
//                                     src="/logos/figma-icon.png"
//                                     width={64}
//                                     height={64}
//                                     alt="Canva logo"
//                                     className="object-contain w-[40px] h-[40px]"
//                                 />
//                             </IntegrationCard>
//                             <IntegrationCard className="absolute right-[11%] top-[28%] translate-x-1/2 -translate-y-1/2">
//                                   <Image
//                                     src="/logos/adobe-after-effects-icon.png"
//                                     width={64}
//                                     height={64}
//                                     alt="Canva logo"
//                                     className="object-contain w-[40px] h-[40px]"
//                                 />
//                             </IntegrationCard>
//                         </div>
//                         <div className="bg-linear-to-b from-white/5 absolute inset-16 flex aspect-square scale-90 items-center justify-center rounded-full border-t border-white/5 to-transparent to-25%">
//                             <IntegrationCard className="absolute left-1/2 top-[10%] -translate-x-1/2 -translate-y-1/2">
//                                   <Image
//                                     src="/logos/adobe-premiere-pro-icon.png"
//                                     width={64}
//                                     height={64}
//                                     alt="Canva logo"
//                                     className="object-contain w-[40px] h-[40px]"
//                                 />
//                             </IntegrationCard>
//                             <IntegrationCard className="absolute left-[18%] top-[33%] -translate-x-1/2 -translate-y-1/2">
//                                   <Image
//                                     src="/logos/DaVinci_Resolve_Studio.png"
//                                     width={64}
//                                     height={64}
//                                     alt="Canva logo"
//                                     className="object-contain w-[40px] h-[40px]"
//                                 />
//                             </IntegrationCard>
//                             <IntegrationCard className="absolute right-[18%] top-[33%] translate-x-1/2 -translate-y-1/2">
//                                   <Image
//                                     src="/logos/adobe-illustrator-icon.png"
//                                     width={64}
//                                     height={64}
//                                     alt="Canva logo"
//                                     className="object-contain w-[40px] h-[40px]"
//                                 />
//                             </IntegrationCard>
//                         </div>
//                         <div className="absolute inset-x-0 bottom-0 mx-auto flex w-fit justify-center gap-2">
//                             <div className="relative z-20 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
//                                 <IntegrationCard
//                                     className="size-16 border-white/15 bg-[#181818] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_12px_30px_rgba(0,0,0,0.45)]"
//                                     isCenter>
//                                   <Image
//                                     src="/logos/adobe-icon.png"
//                                     width={64}
//                                     height={64}
//                                     alt="Canva logo"
//                                     className="object-contain w-[40px] h-[40px]"
//                                 />
//                                 </IntegrationCard>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="bg-linear-to-t from-black relative z-20 mx-auto mt-12 max-w-xl space-y-6 from-55% text-center">
//                         <h2 className="text-balance  font-canela text-orangish-red text-[2.9rem] font-semibold leading-[1.03] tracking-[-0.04em] md:text-[3.35rem]">The tools we trust.</h2>
//                         <p className="mx-auto max-w-xl text-base leading-7 text-white/60 md:text-[1.05rem] md:leading-8">Industry-standard software and platforms that power every shoot, edit, and design we deliver.</p>
// {/* 
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             asChild>
//                             <Link href="#">Get Started</Link>
//                         </Button> */}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// const IntegrationCard = ({ children, className, isCenter = false }) => {
//     return (
//         <div className={cn('relative z-30 flex size-12 rounded-full border border-white/10 bg-white/5 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_12px_24px_rgba(0,0,0,0.28)] backdrop-blur-xl', className)}>
//             <div className={cn('m-auto size-fit *:size-5', isCenter && '*:size-8')}>{children}</div>
//         </div>
//     )
// }


import { InfiniteSlider } from '@/Components/motion-primitives/infinite-slider'
import { ProgressiveBlur } from '@/Components/motion-primitives/progressive-blur'
import Image from 'next/image'

export default function LogoCloud() {
    return (
        <section className="bg-background overflow-hidden py-16">
            <div className="group relative m-auto max-w-7xl px-6">
                <div className="flex gap-1 justify-center">
                <h1 className="text-3xl lg:text-7xl font-light  font-canela tracking-tight">Tool's</h1>
                <h1 className="text-3xl lg:text-7xl font-light font-canela tracking-tight text-orangish-red">We Trust</h1>
                </div>
                <div className="flex flex-col items-center md:flex-row">
                    {/* <div className="md:max-w-44 md:border-r md:pr-6">
                        <p className="text-end text-sm">Powering the best teams</p>
                    </div> */}
                    <div className="**:fill-foreground relative py-6 md:w-[calc(100%-11rem)] mt-8">
                        <InfiniteSlider
                            speedOnHover={10}
                            speed={40}
                            gap={112}>
                            <Image
                                src="/logos/canva-icon.png"
                                width={64}
                                height={64}
                                alt="Canva logo"
                                className="object-contain w-[60px] h-[60px]"
                            />
                            <Image
                                src="/logos/adobe-after-effects-icon.png"
                                width={64}
                                height={64}
                                alt="Canva logo"
                                className="object-contain w-[60px] h-[60px]"
                            />
                            <Image
                                src="/logos/adobe-icon.png"
                                width={64}
                                height={64}
                                alt="Canva logo"
                                className="object-contain w-[60px] h-[60px]"
                            />

                            <Image
                                src="/logos/adobe-illustrator-icon.png"
                                width={64}
                                height={64}
                                alt="Canva logo"
                                className="object-contain w-[60px] h-[60px]"
                            />

                            <Image
                                src="/logos/adobe-premiere-pro-icon.png"
                                width={64}
                                height={64}
                                alt="Canva logo"
                                className="object-contain w-[60px] h-[60px]"
                            />
                            <Image
                                src="/logos/adobe-lightroom-icon.png"
                                width={64}
                                height={64}
                                alt="Canva logo"
                                className="object-contain w-[60px] h-[60px]"
                            />
                            <Image
                                src="/logos/adobe-photoshop-icon.png"
                                width={64}
                                height={64}
                                alt="Canva logo"
                                className="object-contain w-[60px] h-[60px]"
                            />
                            <Image
                                src="/logos/DaVinci_Resolve_Studio.png"
                                width={64}
                                height={64}
                                alt="Canva logo"
                                className="object-contain w-[60px] h-[60px]"
                            />
                            <Image
                                src="/logos/figma-icon.png"
                                width={64}
                                height={64}
                                alt="Canva logo"
                                className="object-contain w-[60px] h-[60px]"
                            />                                                                                    
                        </InfiniteSlider>

                        <div
                            aria-hidden
                            className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"
                        />
                        <div
                            aria-hidden
                            className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}