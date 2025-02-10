'use client';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const upcomingProjects = [
  {
    id: 1,
    title: 'Tech Innovation Hub',
    location: 'Pune MIDC',
    area: '50,000 sq.ft.',
    completion: 'Dec 2025',
    description: 'State-of-the-art IT park with modern amenities',
    image: '/images/projects/tech-hub.jpg',
    features: ['24/7 Power Backup', 'High-speed Internet', 'Food Court', 'Parking']
  },
  {
    id: 2,
    title: 'Green Industrial Park',
    location: 'Nashik MIDC',
    area: '100,000 sq.ft.',
    completion: 'Mar 2026',
    description: 'Eco-friendly industrial spaces with solar power',
    image: '/images/projects/green-park.jpg',
    features: ['Solar Powered', 'Waste Treatment', 'Green Spaces', 'EV Charging']
  },
  {
    id: 3,
    title: 'Logistics Center',
    location: 'Aurangabad MIDC',
    area: '75,000 sq.ft.',
    completion: 'Jun 2026',
    description: 'Modern warehousing and distribution center',
    image: '/images/projects/logistics.jpg',
    features: ['Loading Bays', 'Cold Storage', 'Security', 'Transport Hub']
  },
  {
    id: 4,
    title: 'Biotech Complex',
    location: 'Nagpur MIDC',
    area: '40,000 sq.ft.',
    completion: 'Sep 2026',
    description: 'Advanced facilities for biotech research',
    image: '/images/projects/biotech.jpg',
    features: ['Lab Spaces', 'Clean Rooms', 'Research Center', 'Safety Systems']
  }
];

export default function UpcomingProjects() {
  return (
    <div className="py-20 bg-gradient-to-b from-gray-900 to-blue-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Upcoming Projects
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover our upcoming industrial developments across Maharashtra's prime MIDC locations
          </p>
        </motion.div>

        {/* Slideshow */}
        <div className="relative group">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
            className="w-full py-10"
          >
            {upcomingProjects.map((project) => (
              <SwiperSlide key={project.id} className="w-[300px] sm:w-[400px] md:w-[500px]">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="relative h-[250px]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-200">{project.location}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Area</p>
                        <p className="font-semibold">{project.area}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Completion</p>
                        <p className="font-semibold">{project.completion}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowLeftIcon className="h-6 w-6 text-blue-600" />
          </button>
          <button className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRightIcon className="h-6 w-6 text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
