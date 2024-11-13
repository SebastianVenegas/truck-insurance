'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Truck, Shield, FileText, Users, Phone, MessageSquare, Mail, X, CheckCircle, ChevronDown, ChevronUp, DollarSign, Clipboard, Award, Menu, Home, Info, Star, Send, Flag, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { toast } from 'sonner'

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

const TAWK_PROPERTY_ID = '673439302480f5b4f59d1644'
const TAWK_WIDGET_ID = '1ici23lkl'

function TawkToWidget() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      }
    }
  }, []);

  return <div id='tawk_673439302480f5b4f59d1644'></div>;
}

interface ExpandableSectionProps {
  title: string;
  description: string;
  content: React.ReactNode;
  image: string;
  actionButtonText: string;
}

const ExpandableSection = ({ title, description, content, image, actionButtonText }: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative group mb-12"
    >
      <motion.div 
        className="relative h-80 sm:h-96 overflow-hidden rounded-2xl shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm sm:text-base text-gray-200 mb-4">{description}</p>
          <Button 
            variant="outline" 
            className="w-fit bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700 transition-all duration-300"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Learn More"} 
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              className="ml-2"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-white rounded-b-2xl p-6 mt-[-20px] shadow-lg"
          >
            {content}
            <AnimatedButton className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
              {actionButtonText}
            </AnimatedButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface MobileNavProps {
  isOpen: boolean;
  toggleNav: () => void;
}

const MobileNav = ({ isOpen, toggleNav }: MobileNavProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 right-0 w-64 bg-gray-900 z-50 shadow-lg"
        >
          <div className="p-4 flex flex-col h-full">
            <Button variant="ghost" size="icon" onClick={toggleNav} className="self-end mb-8 text-white">
              <X className="h-6 w-6" />
            </Button>
            <nav className="flex flex-col space-y-4">
              <NavLink href="#services" onClick={toggleNav}>
                <Truck className="mr-2 h-5 w-5" />
                Services
              </NavLink>
              <NavLink href="#about" onClick={toggleNav}>
                <Info className="mr-2 h-5 w-5" />
                About
              </NavLink>
              <NavLink href="#testimonials" onClick={toggleNav}>
                <Star className="mr-2 h-5 w-5" />
                Testimonials
              </NavLink>
              <NavLink href="#contact" onClick={toggleNav}>
                <Send className="mr-2 h-5 w-5" />
                Contact
              </NavLink>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface AnimatedLogoProps {
  scrollYProgress: any;
  toggleNav: () => void;
}

const AnimatedLogo = ({ scrollYProgress, toggleNav }: AnimatedLogoProps) => {
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-lg py-4 px-4 sm:px-6"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.h1 
          className="text-xl sm:text-2xl font-bold text-white flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Flag className="w-6 h-6 mr-2 text-red-500" />
          Raquel Martinez
          <span className="block text-sm sm:text-base text-gray-300 ml-2">American Trucking Insurance</span>
        </motion.h1>
        <nav className="hidden md:flex space-x-6">
          <NavLink href="#services" onClick={() => {}}>Services</NavLink>
          <NavLink href="#about" onClick={() => {}}>About</NavLink>
          <NavLink href="#testimonials" onClick={() => {}}>Testimonials</NavLink>
          <NavLink href="#contact" onClick={() => {}}>Contact</NavLink>
        </nav>
        <Button className="md:hidden" variant="ghost" size="icon" onClick={toggleNav}>
          <Menu className="h-6 w-6 text-white" />
        </Button>
      </div>
    </motion.div>
  )
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}

const NavLink = ({ href, children, onClick }: NavLinkProps) => (
  <Link 
    href={href} 
    className="text-white hover:text-red-400 transition-colors flex items-center"
    onClick={onClick}
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.div>
  </Link>
)

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const AnimatedButton = ({ children, className, ...props }: AnimatedButtonProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
  >
    <Button
      className={`${className} transition-all duration-300`}
      {...props}
    >
      {children}
    </Button>
  </motion.div>
)

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  coverageType: string;
}

export function RaquelMartinezInsuranceComponent() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverageType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen)

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isNavOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting form with data:', formData);

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      toast.success('Quote request sent successfully! We\'ll be in touch soon.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        coverageType: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <AnimatedLogo scrollYProgress={scrollYProgress} toggleNav={toggleNav} />
      <MobileNav isOpen={isNavOpen} toggleNav={toggleNav} />

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen overflow-hidden pt-20">
        <motion.div 
          style={{ opacity, scale }}
          className="absolute inset-0"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_VJWXuckm_1731344877635_raw.jpg-4FGFxrtKfnbUqS9CnZUgVMzH4ejuA8.jpeg"
            alt="American truck on open highway"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/95" />
        </motion.div>
        
        <div className="relative h-full flex flex-col justify-center items-center text-white px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-5xl"
          >
            <motion.h2 
              className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              American Trucking Insurance You Can Trust
            </motion.h2>
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-300 font-light max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              Protecting America's Truckers with Unbeatable Coverage and Rates
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <AnimatedButton 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white text-lg px-10 py-6 rounded-[32px] shadow-lg"
              >
                Get a Free Quote
              </AnimatedButton>
              <AnimatedButton 
                size="lg" 
                variant="outline" 
                className="border-2 border-red-600 text-white bg-white/10 backdrop-blur-sm hover:bg-red-700 hover:border-red-700 text-lg px-10 py-6 rounded-[32px]"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.Tawk_API) {
                    window.Tawk_API.toggle();
                  }
                }}
              >
                Chat with Raquel
              </AnimatedButton>
            </div>
            <motion.p 
              className="mt-10 text-lg sm:text-xl text-gray-400 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Serving American truckers with pride since 2000
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-gray-100">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-center mb-6 text-gray-900"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Comprehensive American Trucking Solutions
          </motion.h2>
          <motion.p 
            className="text-xl sm:text-2xl text-center text-gray-600 mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Raquel Martinez brings over 20 years of experience in helping American truckers stay protected and compliant on the open road.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <ExpandableSection
              title="All-American Insurance"
              description="Tailored coverage for every American trucker and fleet"
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_Vb5yVSAk_1731344877455_raw.jpg-eyfiAlMFih0j0lsHrKen79SXkUgUIS.jpeg"
              actionButtonText="Learn More About Coverage"
              content={
                <div className="space-y-4 text-gray-700">
                  <h4 className="text-xl font-semibold text-gray-900">Protect Your American Dream on the Road</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                      <span><strong>Primary Auto Liability:</strong> Affordable rates for essential coverage.</span>
                    </li>
                    <li className="flex items-start">
                      <Truck className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                      <span><strong>Physical Damage Coverage:</strong> Protect your rig with flexible options.</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                      <span><strong>Cargo Insurance:</strong> Secure your loads with competitive rates!</span>
                    </li>
                  </ul>
                </div>
              }
            />
            <ExpandableSection
              title="Coast-to-Coast Compliance"
              description="Navigate regulations across all 50 states with confidence"
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_vWJBE_EO_1731344877580_raw.jpg-y81CO8VwPHeT1aUTaiDZ3hFIZEEyOj.jpeg"
              actionButtonText="Explore Compliance Solutions"
              content={
                <div className="space-y-4 text-gray-700">
                  <h4 className="text-xl font-semibold text-gray-900">Keep Your Business Rolling from Sea to Shining Sea</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Clipboard className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                      <span><strong>USDOT Number:</strong> Quick and easy registration process.</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                      <span><strong>MC Authority:</strong> Hassle-free operating authority setup.</span>
                    </li>
                    <li className="flex items-start">
                      <DollarSign className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                      <span><strong>IRP & IFTA:</strong> Simplified multi-state compliance.</span>
                    </li>
                  </ul>
                </div>
              }
            />
            <ExpandableSection
              title="American Trucker Growth"
              description="Fuel your business expansion with cost-effective solutions"
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_ubf4h2G-_1731344878089_raw.jpg-XLkuMPwPkdw22fCcmC7MYAf5WvpvQy.jpeg"
              actionButtonText="Start Growing Your Fleet"
              content={
                <div className="space-y-4 text-gray-700">
                  <h4 className="text-xl font-semibold text-gray-900">Grow Your Fleet, Expand Your Horizons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <DollarSign className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                      <span><strong>Zero Down Options:</strong> Get on the road without upfront costs.</span>
                    </li>
                    <li className="flex items-start">
                      <Clipboard className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                      <span><strong>Flexible Payments:</strong> Tailor your plan to your cash flow.</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                      <span><strong>Fleet Discounts:</strong> Save more as you grow bigger.</span>
                    </li>
                  </ul>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Why Choose Raquel Section */}
      <section id="about" className="py-24 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2 
                className="text-4xl sm:text-5xl font-bold mb-8 text-amber-500"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                How Raquel Keeps America's Truckers Rolling
              </motion.h2>
              <div className="space-y-6">
                {[
                  "20+ years serving American trucking industry",
                  "Same-Day Quotes – Get back on the road fast",
                  "Flexible Payment Options – Designed for truckers' cash flow",
                  "Multi-State Coverage – One-stop shop for nationwide operations",
                  "24/7 American-based support – We're always here for you"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 text-gray-300 text-lg"
                  >
                    <CheckCircle className="h-6 w-6 text-amber-500 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <AnimatedButton 
                  size="lg" 
                  className="mt-10 bg-amber-500 hover:bg-amber-600 text-gray-900 text-lg px-10 py-6 rounded-full"
                >
                  Discover the Raquel Advantage
                </AnimatedButton>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden mt-8 md:mt-0 shadow-xl"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_Vb5yVSAk_1731344877455_raw.jpg-eyfiAlMFih0j0lsHrKen79SXkUgUIS.jpeg"
                alt="American trucker on the open road"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section id="testimonials" className="py-20 px-4 bg-gray-100">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Real American Truckers, Real Savings
          </motion.h2>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex flex-nowrap"
              animate={{ x: [0, -100 * 5, 0] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              {[
                {
                  text: "Raquel got me insured and compliant in all 48 states I drive through. Couldn't ask for better service!",
                  author: "John D., Owner-Operator from Texas"
                },
                {
                  text: "Best rates I've found in 15 years of trucking. Raquel truly understands what we need out here.",
                  author: "Sarah M., Fleet Manager from Ohio"
                },
                {
                  text: "The zero down payment option was a game-changer for my small fleet. Thanks, Raquel!",
                  author: "Mike R., Small Fleet Owner from California"
                },
                {
                  text: "Raquel's team was there for me 24/7 when I needed help with a claim. That's real American service.",
                  author: "Lisa K., Long-haul Driver from Montana"
                },
                {
                  text: "I saved 30% on my premiums and got better coverage. Raquel knows how to take care of us truckers.",
                  author: "Carlos G., Independent Trucker from Florida"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="w-[280px] sm:w-[300px] flex-shrink-0 mx-2 sm:mx-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white border-gray-200 h-full shadow-lg">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <p className="text-gray-700 mb-4 text-sm sm:text-base italic">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                            {testimonial.author[0]}
                          </div>
                        </div>
                        <p className="text-red-600 font-semibold text-sm">— {testimonial.author}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto max-w-5xl">
          <Card className="bg-white shadow-xl border-0">
            <CardContent className="p-8">
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Get Your Free American Trucker Quote!
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="text-gray-700 mb-6 text-lg">
                    Ready to hit the road with peace of mind? 
                    Let Raquel protect your American dream on wheels!
                  </p>
                  <div className="space-y-4 text-gray-600">
                    <motion.div 
                      className="flex items-center space-x-3"
                      whileHover={{ scale: 1.05, color: "#ef4444" }}
                    >
                      <Phone className="h-5 w-5 text-red-600" />
                      <span>(555) 123-4567</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-3"
                      whileHover={{ scale: 1.05, color: "#ef4444" }}
                    >
                      <Mail className="h-5 w-5 text-red-600" />
                      <span>raquel@americantrucking.com</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-3 cursor-pointer"
                      whileHover={{ scale: 1.05, color: "#ef4444" }}
                      onClick={() => {
                        if (typeof window !== 'undefined' && window.Tawk_API) {
                          window.Tawk_API.toggle();
                        }
                      }}
                    >
                      <MessageSquare className="h-5 w-5 text-red-600" />
                      <span>24/7 American Support</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-3"
                      whileHover={{ scale: 1.05, color: "#ef4444" }}
                    >
                      <MapPin className="h-5 w-5 text-red-600" />
                      <span>123 Trucker Lane, Anywhere, USA 12345</span>
                    </motion.div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input 
                    type="text" 
                    placeholder="Full Name" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                  <Input 
                    type="email" 
                    placeholder="Email Address" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input 
                    type="tel" 
                    placeholder="Phone Number" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <select 
                    value={formData.coverageType}
                    onChange={(e) => setFormData({ ...formData, coverageType: e.target.value })}
                    required
                    className="w-full rounded-md p-2"
                  >
                    <option value="">Type of Coverage Needed</option>
                    <option value="liability">Auto Liability</option>
                    <option value="physical">Physical Damage</option>
                    <option value="cargo">Cargo</option>
                    <option value="all">All of the Above</option>
                  </select>
                  <AnimatedButton 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold rounded-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Get Your American Trucker Quote'}
                  </AnimatedButton>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tawk.to Widget */}
      <TawkToWidget />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center">
                <Flag className="w-6 h-6 mr-2 text-red-500" />
                Raquel Martinez American Trucking Insurance
              </h3>
              <p className="mb-4 text-gray-400">Protecting America's truckers from coast to coast. Get the coverage you deserve at rates you can afford!</p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <AnimatedButton 
                  variant="outline" 
                  size="sm" 
                  className="text-white border-red-600 hover:bg-red-700 hover:border-red-700 bg-white/10 backdrop-blur-sm"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  (555) 123-4567
                </AnimatedButton>
              </div>
            </div>
            <div>
              <p className="text-gray-400">© 2023 Raquel Martinez American Trucking Insurance. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}