import { Gemini } from '@/Components/ui/svgs/gemini'
import { Replit } from '@/Components/ui/svgs/replit'
import { MagicUI } from '@/Components/ui/svgs/magic-ui'
import { VSCodium } from '@/Components/ui/svgs/vs-codium'
import { MediaWiki } from '@/Components/ui/svgs/media-wiki'
import { GooglePaLM } from '@/Components/ui/svgs/google-palm'
import { LogoIcon } from '@/Components/logo'
import { cn } from '@/lib/utils'
import { Button } from '@/Components/ui/button'
import Link from 'next/link'

export default function IntegrationsSection() {
    return (
        <section className="bg-black text-white">
            <div className="">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="group relative mx-auto flex aspect-16/10 max-w-88 items-center justify-center sm:max-w-sm">
                        <div
                            role="presentation"
                            className="bg-linear-to-b border-white/10 absolute inset-0 z-10 aspect-square animate-spin rounded-full border-t from-white/10 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100"></div>
                        <div
                            role="presentation"
                            className="bg-linear-to-b border-white/10 absolute inset-16 z-10 aspect-square scale-90 animate-spin rounded-full border-t from-white/5 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100"></div>
                        <div className="bg-linear-to-b from-white/5 absolute inset-0 flex aspect-square items-center justify-center rounded-full border-t border-white/5 to-transparent to-25%">
                            <IntegrationCard className="absolute left-[11%] top-[28%] -translate-x-1/2 -translate-y-1/2">
                                <Gemini />
                            </IntegrationCard>
                            <IntegrationCard className="absolute left-1/2 top-[9%] -translate-x-1/2 -translate-y-1/2">
                                <Replit />
                            </IntegrationCard>
                            <IntegrationCard className="absolute right-[11%] top-[28%] translate-x-1/2 -translate-y-1/2">
                                <MagicUI />
                            </IntegrationCard>
                        </div>
                        <div className="bg-linear-to-b from-white/5 absolute inset-16 flex aspect-square scale-90 items-center justify-center rounded-full border-t border-white/5 to-transparent to-25%">
                            <IntegrationCard className="absolute left-1/2 top-[10%] -translate-x-1/2 -translate-y-1/2">
                                <VSCodium />
                            </IntegrationCard>
                            <IntegrationCard className="absolute left-[18%] top-[33%] -translate-x-1/2 -translate-y-1/2">
                                <MediaWiki />
                            </IntegrationCard>
                            <IntegrationCard className="absolute right-[18%] top-[33%] translate-x-1/2 -translate-y-1/2">
                                <GooglePaLM />
                            </IntegrationCard>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 mx-auto flex w-fit justify-center gap-2">
                            <div className="relative z-20 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
                                <IntegrationCard
                                    className="size-16 border-white/15 bg-[#181818] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_12px_30px_rgba(0,0,0,0.45)]"
                                    isCenter>
                                    <LogoIcon className="text-blue-500" />
                                </IntegrationCard>
                            </div>
                        </div>
                    </div>
                    <div className="bg-linear-to-t from-black relative z-20 mx-auto mt-12 max-w-xl space-y-6 from-55% text-center">
                        <h2 className="text-balance text-[2.9rem] font-semibold leading-[1.03] tracking-[-0.04em] md:text-[3.35rem]">The tools we trust.</h2>
                        <p className="mx-auto max-w-xl text-base leading-7 text-white/60 md:text-[1.05rem] md:leading-8">Industry-standard software and platforms that power every shoot, edit, and design we deliver.</p>
{/* 
                        <Button
                            variant="outline"
                            size="sm"
                            asChild>
                            <Link href="#">Get Started</Link>
                        </Button> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ children, className, isCenter = false }) => {
    return (
        <div className={cn('relative z-30 flex size-12 rounded-full border border-white/10 bg-white/5 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_12px_24px_rgba(0,0,0,0.28)] backdrop-blur-xl', className)}>
            <div className={cn('m-auto size-fit *:size-5', isCenter && '*:size-8')}>{children}</div>
        </div>
    )
}
