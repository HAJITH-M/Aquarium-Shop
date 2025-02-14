import React from 'react'

const HeroSection = () => {
  return (
    <>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <p className="mx-auto -mt-4 max-w-2xl text-xl sm:text-2xl tracking-tight text-slate-700 sm:mt-6">Welcome to
        </p>
    
        <h1 className="mx-auto max-w-4xl font-display text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 ">
            <span className="inline-block">Jannani 
                <span className="relative whitespace-nowrap text-blue-600">
                    <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70" preserveAspectRatio="none">
                        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                    </svg>
                    <span className="relative"> Aquarium and pets</span>
                </span>
            </span>
            <span className="inline-block">Shop</span>
        </h1>
    
        <p className="mx-auto mt-9 max-w-2xl text-base sm:text-lg tracking-tight text-slate-700 sm:mt-6">
            <span className="inline-block">Everything you need for a thriving aquarium</span>
            <span className="inline-block">and to create your underwater paradise.</span>
        </p>
    
        <div className="mt-12 flex flex-col justify-center gap-y-5 sm:mt-10 sm:flex-row sm:gap-y-0 sm:gap-x-6">
            <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900 animate-fade-in-left"
                href="#">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24"
                    aria-hidden="true" className="h-3 w-3 flex-none" height="1em" width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5 3h-19C1.673 3 1 3.673 1 4.5v15c0 .827.673 1.5 1.5 1.5h19c.827 0 1.5-.673 1.5-1.5v-15c0-.827-.673-1.5-1.5-1.5zm-19 1h19c.276 0 .5.224.5.5V8H2V4.5c0-.276.224-.5.5-.5zM2 19.5v-10h20v10c0 .276-.224.5-.5.5h-19c-.276 0-.5-.224-.5-.5zm9-8c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5zm4 0c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5zm4 0c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"></path>
                </svg>
                <span className="ml-3">Shop Aquarium</span>
            </a>
            <div className="relative flex flex-1 flex-col items-stretch sm:flex-none">
                <button className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right" id="headlessui-menu-button-:r4:" aria-haspopup="true" aria-expanded="false" type="button">
                    <span className="ml-3">Explore Fish Species</span>
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default HeroSection