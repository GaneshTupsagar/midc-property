'use client';

import { motion } from 'framer-motion';
import { StarIcon, UserIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

const successStories = [
  {
    title: 'Manufacturing Excellence in Pune MIDC',
    company: 'TechFab Industries',
    location: 'Pune MIDC',
    date: 'January 2025',
    description: 'How TechFab Industries transformed a 50,000 sq ft MIDC property into a state-of-the-art manufacturing facility, creating 200+ jobs and achieving 150% production efficiency.',
    achievements: [
      'Implemented smart manufacturing solutions',
      'Created 200+ local employment opportunities',
      'Achieved ISO 9001:2015 certification',
      'Reduced carbon footprint by 40%'
    ],
    testimonial: 'The strategic location and robust infrastructure of MIDC Pune helped us scale our operations efficiently.',
    author: 'Rajesh Kumar, CEO'
  },
  {
    title: 'Sustainable Growth in Aurangabad',
    company: 'GreenTech Solutions',
    location: 'Aurangabad MIDC',
    date: 'December 2024',
    description: 'GreenTech Solutions established an eco-friendly manufacturing unit in Aurangabad MIDC, focusing on renewable energy components with zero-waste operations.',
    achievements: [
      'Zero-waste manufacturing process',
      'Solar-powered facility',
      'Export to 12 countries',
      'Green Building certification'
    ],
    testimonial: 'MIDC\'s support in establishing our eco-friendly facility has been instrumental in our success.',
    author: 'Priya Sharma, Managing Director'
  },
  {
    title: 'Innovation Hub in Nashik',
    company: 'InnovateX Labs',
    location: 'Nashik MIDC',
    date: 'November 2024',
    description: 'InnovateX Labs transformed their MIDC space into a cutting-edge R&D facility, developing breakthrough technologies in automation and robotics.',
    achievements: [
      'Filed 15 patents in first year',
      'Collaboration with 3 universities',
      'Advanced testing facility',
      'Industry 4.0 implementation'
    ],
    testimonial: 'The strategic location and modern infrastructure of MIDC Nashik provided the perfect environment for our R&D center.',
    author: 'Dr. Amit Patel, Head of R&D'
  }
];

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how businesses have achieved remarkable success with MIDC properties.
            </p>
          </motion.div>
        </div>

        <div className="space-y-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {story.title}
                      </h3>
                      <StarIcon className="h-6 w-6 text-yellow-400" />
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2" />
                        {story.company}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        {story.location}
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {story.date}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {story.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Key Achievements</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {story.achievements.map((achievement) => (
                          <li key={achievement} className="flex items-center text-sm text-gray-600">
                            <StarIcon className="h-4 w-4 text-primary mr-2" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600">
                      "{story.testimonial}"
                      <footer className="mt-2 text-sm text-gray-500 non-italic">
                        - {story.author}
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
