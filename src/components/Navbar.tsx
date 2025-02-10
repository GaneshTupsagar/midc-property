'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react';
import { 
  Bars3Icon, 
  XMarkIcon,
  UserCircleIcon,
  HomeIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  InformationCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  MapIcon,
  BuildingLibraryIcon,
  NewspaperIcon,
  DocumentTextIcon,
  StarIcon,
  HeartIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavItems = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { 
      name: 'Properties', 
      href: '#', 
      icon: BuildingOfficeIcon,
      submenu: [
        { name: 'All Properties', href: '/properties', icon: BuildingLibraryIcon },
        { name: 'Industrial', href: '/properties?type=Industrial', icon: BuildingOfficeIcon },
        { name: 'Commercial', href: '/properties?type=Commercial', icon: BuildingLibraryIcon },
        { name: 'Land', href: '/properties?type=Land', icon: MapIcon },
      ]
    },
    { 
      name: 'Resources', 
      href: '#', 
      icon: DocumentTextIcon,
      submenu: [
        { name: 'Market Insights', href: '/insights', icon: NewspaperIcon },
        { name: 'MIDC Guidelines', href: '/guidelines', icon: DocumentTextIcon },
        { name: 'Success Stories', href: '/success-stories', icon: StarIcon },
      ]
    },
    { name: 'About', href: '/about', icon: InformationCircleIcon },
    { name: 'Contact', href: '/contact', icon: PhoneIcon },
  ];

  const userMenuItems = [
    { name: 'Admin Dashboard', href: '/admin', icon: Cog6ToothIcon, adminOnly: true },
    { name: 'My Properties', href: '/user/properties', icon: BuildingOfficeIcon },
    { name: 'Saved Properties', href: '/user/saved', icon: HeartIcon },
    { name: 'Profile Settings', href: '/user/settings', icon: UserCircleIcon },
    { name: 'Sign Out', onClick: () => signOut(), icon: ArrowRightOnRectangleIcon },
  ];

  return (
    <nav 
      className={`fixed w-full z-20 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg transform -rotate-6"></div>
                  <div className="absolute inset-0 bg-white rounded-lg"></div>
                  <div className="absolute inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">MP</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    MIDC Property
                  </span>
                  <span className="text-xs text-gray-600">Your Industrial Real Estate Partner</span>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {mainNavItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <button
                    className="group relative px-3 py-2"
                    onClick={() => setMegaMenuOpen(megaMenuOpen === item.name ? '' : item.name)}
                    onMouseEnter={() => setMegaMenuOpen(item.name)}
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </motion.div>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="group relative px-3 py-2"
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </motion.div>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  </Link>
                )}

                {/* Submenu */}
                {item.submenu && megaMenuOpen === item.name && (
                  <div 
                    className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg py-2 mt-1 z-50"
                    onMouseEnter={() => setMegaMenuOpen(item.name)}
                    onMouseLeave={() => setMegaMenuOpen('')}
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                        onClick={() => setMegaMenuOpen('')}
                      >
                        <subItem.icon className="h-4 w-4" />
                        <span>{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {status === 'authenticated' ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white"
                >
                  <UserCircleIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {session?.user?.name || 'Account'}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                    >
                      {userMenuItems.map((item) => (
                        item.adminOnly && session?.user?.role !== 'admin' ? null : (
                          <div key={item.name}>
                            {item.onClick ? (
                              <button
                                onClick={item.onClick}
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                              >
                                <item.icon className="h-4 w-4" />
                                <span>{item.name}</span>
                              </button>
                            ) : (
                              <Link
                                href={item.href}
                                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                              >
                                <item.icon className="h-4 w-4" />
                                <span>{item.name}</span>
                              </Link>
                            )}
                          </div>
                        )
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signIn()}
                  className="px-4 py-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-200"
                >
                  Sign In
                </motion.button>
                <Link href="/auth/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary rounded-full hover:opacity-90 transition-opacity duration-200"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200">
                {status === 'authenticated' ? (
                  <>
                    {userMenuItems.map((item) => (
                      (!item.adminOnly || (session?.user as any)?.role === 'admin') && (
                        <div key={item.name}>
                          {item.href ? (
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                              <item.icon className="h-5 w-5 mr-2" />
                              {item.name}
                            </Link>
                          ) : (
                            <button
                              onClick={() => {
                                item.onClick?.();
                                setIsOpen(false);
                              }}
                              className="flex w-full items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                              <item.icon className="h-5 w-5 mr-2" />
                              {item.name}
                            </button>
                          )}
                        </div>
                      )
                    ))}
                  </>
                ) : (
                  <button
                    onClick={() => signIn()}
                    className="flex w-full items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
