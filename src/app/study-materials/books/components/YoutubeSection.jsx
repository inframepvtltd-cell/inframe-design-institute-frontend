import React from 'react'

export const YoutubeSection = () => {
  return (
    <section className="py-16 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold mb-4 leading-tight">
              <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Study Material
              </span>
              <br />
              <span className="relative inline-block">
                Glimpses
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full transform scale-x-110"></span>
              </span>
            </h2>
          </div>
          
          {/* Video Container */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/FeHEakydiO8?rel=0"
              title="InFrame Study Material Success Stories"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 border-2 border-transparent hover:border-white/30 transition-colors duration-300 pointer-events-none rounded-2xl"></div>
          </div>  
        </div>
      </div>
    </section>
  )
}

export default YoutubeSection