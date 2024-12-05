'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Truck, Shield, FileText, Users, Phone, MessageSquare, Mail, X, CheckCircle, ChevronDown, ChevronUp, DollarSign, Clipboard, Award, Menu, Home, Info, Star, Send, Flag, MapPin, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { toast } from 'sonner'
import { SpeedInsights } from "@vercel/speed-insights/next"

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
            <AnimatedButton 
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300" 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                  });
                }
              }}
            >
              Get Your Free Quote
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
  language: 'en' | 'es';
  toggleLanguage: () => void;
}

const MobileNav = ({ isOpen, toggleNav, language, toggleLanguage }: MobileNavProps) => {
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
            <div className="flex justify-between items-center mb-8">
              <motion.button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-white hover:text-red-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="h-5 w-5" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={language}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium"
                  >
                    {language === 'en' ? 'ES' : 'EN'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
              <Button variant="ghost" size="icon" onClick={toggleNav} className="text-white">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4">
              <NavLink href="#services" onClick={toggleNav}>
                <Truck className="mr-2 h-5 w-5" />
                {language === 'en' ? 'Services' : 'Servicios'}
              </NavLink>
              <NavLink href="#about" onClick={toggleNav}>
                <Info className="mr-2 h-5 w-5" />
                {language === 'en' ? 'About' : 'Sobre Nosotros'}
              </NavLink>
              <NavLink href="#testimonials" onClick={toggleNav}>
                <Star className="mr-2 h-5 w-5" />
                {language === 'en' ? 'Testimonials' : 'Testimonios'}
              </NavLink>
              <NavLink href="#contact" onClick={toggleNav}>
                <Send className="mr-2 h-5 w-5" />
                {language === 'en' ? 'Contact' : 'Contacto'}
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
  language: 'en' | 'es';
  toggleLanguage: () => void;
}

const AnimatedLogo = ({ scrollYProgress, toggleNav, language, toggleLanguage }: AnimatedLogoProps) => {
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800"
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/">
          <div className="flex items-center gap-3 transition-transform duration-300 ease-in-out hover:opacity-80">
            <Flag className="w-6 h-6 text-red-500" />
            <div className="flex flex-col">
              <span className="text-2xl font-semibold tracking-tight text-white">
                Raquel Martinez
              </span>
              <span className="text-base text-gray-400 tracking-wide">
                {language === 'en' ? 'Insurance & Trucking Solutions' : 'Soluciones de Seguros y Transporte'}
              </span>
            </div>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <motion.button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-white hover:text-red-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="h-5 w-5" />
            <AnimatePresence mode="wait">
              <motion.span
                key={language}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium"
              >
                {language === 'en' ? 'ES' : 'EN'}
              </motion.span>
            </AnimatePresence>
          </motion.button>
          {[
            { href: 'services', label: language === 'en' ? 'Services' : 'Servicios' },
            { href: 'about', label: language === 'en' ? 'About' : 'Sobre Nosotros' },
            { href: 'testimonials', label: language === 'en' ? 'Testimonials' : 'Testimonios' }
          ].map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollToSection(href)}
              className="text-white hover:text-red-400 transition-colors duration-300 ease-in-out text-lg"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full text-white transition-all duration-300 ease-in-out"
          >
            {language === 'en' ? 'Contact' : 'Contacto'}
          </button>
        </nav>
        
        <Button 
          className="md:hidden" 
          variant="ghost" 
          size="icon" 
          onClick={toggleNav}
        >
          <Menu className="h-5 w-5 text-white" />
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

const NavLink = ({ href, children, onClick }: NavLinkProps) => {
  const scrollToSection = (e: React.MouseEvent) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    if (onClick) onClick();
  };

  return (
    <button 
      onClick={scrollToSection}
      className="text-white hover:text-red-400 transition-colors duration-300 ease-in-out flex items-center"
    >
      {children}
    </button>
  );
};

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

// Create a reusable phone button component
const PhoneButton = () => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="inline-block"
  >
    <Button 
      className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-6 py-3 rounded-full shadow-lg"
      asChild
    >
      <a href="tel:7609986123">
        <Phone className="h-5 w-5" />
        (760) 998-6123
      </a>
    </Button>
  </motion.div>
);

const translations = {
  en: {
    header: {
      title: "Insurance & Trucking Solutions",
      services: "Services",
      about: "About",
      testimonials: "Testimonials",
      contact: "Contact"
    },
    hero: {
      title: "Get the Best Coverage and Save Big with Raquel Martinez!",
      subtitle: "Protecting Truckers with Unbeatable Coverage and Rates",
      quoteButton: "Get Your Free Quote",
      chatButton: "Chat with Raquel",
      serving: "Serving truckers with pride since 2000"
    },
    services: {
      title: "Comprehensive Trucking Solutions",
      subtitle: "Raquel Martinez brings over 20 years of experience helping truckers stay protected and compliant on the open road.",
      insurance: {
        title: "Complete Insurance Coverage",
        description: "Tailored coverage for every trucker and fleet",
        content: {
          title: "Protect Your Business on the Road",
          items: [
            "Primary Auto Liability: Affordable rates for essential coverage.",
            "Physical Damage Coverage: Protect your rig with flexible options.",
            "Cargo Insurance: Secure your loads with competitive rates!"
          ]
        }
      },
      compliance: {
        title: "Nationwide Compliance",
        description: "Navigate regulations across all states with confidence",
        content: {
          title: "Keep Your Business Rolling Coast to Coast",
          items: [
            "USDOT Number: Quick and easy registration process.",
            "MC Authority: Hassle-free operating authority setup.",
            "IRP & IFTA: Simplified multi-state compliance."
          ]
        }
      },
      growth: {
        title: "Business Growth Solutions",
        description: "Fuel your business expansion with cost-effective solutions",
        content: {
          title: "Grow Your Fleet, Expand Your Horizons",
          items: [
            "Zero Down Options: Get on the road without upfront costs.",
            "Flexible Payments: Tailor your plan to your cash flow.",
            "Fleet Discounts: Save more as you grow bigger."
          ]
        }
      }
    },
    about: {
      title: "How Raquel Keeps Truckers Rolling",
      items: [
        "20+ years serving the trucking industry",
        "Same-Day Quotes – Get back on the road fast",
        "Flexible Payment Options – Designed for truckers' cash flow",
        "Multi-State Coverage – One-stop shop for nationwide operations",
        "24/7 support – We're always here for you"
      ],
      cta: "Discover the Raquel Advantage"
    },
    testimonials: {
      title: "Real Truckers, Real Savings",
      items: [
        {
          text: "Raquel got me insured and compliant in all states I drive through. Couldn't ask for better service!",
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
          text: "Raquel's team was there for me 24/7 when I needed help with a claim. That's real service.",
          author: "Lisa K., Long-haul Driver from Montana"
        },
        {
          text: "I saved 30% on my premiums and got better coverage. Raquel knows how to take care of us truckers.",
          author: "Carlos G., Independent Trucker from Florida"
        }
      ]
    },
    contact: {
      title: "Get Your Free Trucker Quote!",
      subtitle: "Ready to hit the road with peace of mind? Let Raquel protect your business on wheels!",
      form: {
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        coverage: "Type of Coverage Needed",
        submit: "Get Your Trucker Quote"
      }
    },
    footer: {
      title: "Raquel Martinez Trucking Insurance",
      subtitle: "Protecting truckers coast to coast. Get the coverage you deserve at rates you can afford!",
      copyright: "© 2023 Raquel Martinez Trucking Insurance. All rights reserved."
    }
  },
  es: {
    header: {
      title: "Soluciones de Seguros y Transporte",
      services: "Servicios",
      about: "Acerca de",
      testimonials: "Testimonios",
      contact: "Contacto"
    },
    hero: {
      title: "¡Obtén la mejor cobertura y ahorra en grande con Raquel Martinez!",
      subtitle: "Protegiendo a los transportistas con coberturas y tarifas inigualables",
      quoteButton: "Solicita tu Cotización Gratis",
      chatButton: "Chatea con Raquel",
      serving: "Sirviendo con orgullo a transportistas desde el año 2000"
    },
    services: {
      title: "Soluciones Integrales para el Transporte",
      subtitle: "Raquel Martinez aporta más de 20 años de experiencia ayudando a transportistas a mantenerse protegidos y en cumplimiento en la carretera.",
      insurance: {
        title: "Cobertura de Seguro Completa",
        description: "Cobertura personalizada para cada transportista y flota",
        content: {
          title: "Protege tu Negocio en la Carretera",
          items: [
            "Responsabilidad Civil Primaria: Tarifas accesibles para cobertura esencial.",
            "Cobertura de Daños Físicos: Protege tu camión con opciones flexibles.",
            "Seguro de Carga: Asegura tus mercancías con tarifas competitivas."
          ]
        }
      },
      compliance: {
        title: "Cumplimiento Normativo a Nivel Nacional",
        description: "Navega por las regulaciones de todos los estados con confianza",
        content: {
          title: "Mantén tu Negocio Operativo de Costa a Costa",
          items: [
            "Número USDOT: Proceso de registro rápido y sencillo.",
            "Autoridad MC: Configuración de autoridad operativa sin complicaciones.",
            "IRP e IFTA: Cumplimiento simplificado para múltiples estados."
          ]
        }
      },
      growth: {
        title: "Soluciones para el Crecimiento Empresarial",
        description: "Impulsa la expansión de tu negocio con soluciones rentables",
        content: {
          title: "Haz Crecer tu Flota, Expande tus Horizontes",
          items: [
            "Opciones Sin Pago Inicial: Ponte en marcha sin costos por adelantado.",
            "Pagos Flexibles: Adapta tu plan a tu flujo de efectivo.",
            "Descuentos para Flotas: Ahorra más mientras creces."
          ]
        }
      }
    },
    about: {
      title: "Cómo Raquel Mantiene a los Transportistas en Marcha",
      items: [
        "Más de 20 años sirviendo a la industria del transporte",
        "Cotizaciones el Mismo Día: Vuelve a la carretera rápidamente",
        "Opciones de Pago Flexibles: Diseñadas para el flujo de efectivo de los transportistas",
        "Cobertura Multiestatal: Todo en un solo lugar para operaciones a nivel nacional",
        "Soporte 24/7: Siempre estamos aquí para ti"
      ],
      cta: "Descubre la Ventaja de Raquel"
    },
    testimonials: {
      title: "Transportistas Reales, Ahorros Reales",
      items: [
        {
          text: "Raquel me aseguró y cumplió con las normativas de todos los estados por los que conduzco. No podría pedir mejor servicio.",
          author: "John D., Propietario-Operador de Texas"
        },
        {
          text: "Las mejores tarifas que he encontrado en 15 años de transporte. Raquel realmente entiende lo que necesitamos.",
          author: "Sarah M., Gerente de Flota de Ohio"
        },
        {
          text: "La opción sin pago inicial cambió el juego para mi pequeña flota. ¡Gracias, Raquel!",
          author: "Mike R., Propietario de Pequeña Flota de California"
        },
        {
          text: "El equipo de Raquel estuvo disponible 24/7 cuando necesité ayuda con un reclamo. Eso es servicio real.",
          author: "Lisa K., Conductora de Larga Distancia de Montana"
        },
        {
          text: "Ahorré un 30% en mis primas y obtuve una mejor cobertura. Raquel sabe cómo cuidar de nosotros, los transportistas.",
          author: "Carlos G., Transportista Independiente de Florida"
        }
      ]
    },
    contact: {
      title: "¡Obtén tu Cotización Gratis para Transportistas!",
      subtitle: "¿Listo para salir a la carretera con tranquilidad? ¡Deja que Raquel proteja tu negocio sobre ruedas!",
      form: {
        fullName: "Nombre Completo",
        email: "Correo Electrónico",
        phone: "Número de Teléfono",
        coverage: "Tipo de Cobertura Necesaria",
        submit: "Obtén tu Cotización para Transportistas"
      }
    },
    footer: {
      title: "Raquel Martinez Seguros para Transporte",
      subtitle: "Protegiendo a transportistas de costa a costa. ¡Obtén la cobertura que mereces a tarifas que puedes pagar!",
      copyright: "© 2023 Raquel Martinez Seguros para Transporte. Todos los derechos reservados."
    }
  }
};

// Add this component near your other component definitions
const AnimatedText = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    key={String(children)} // Trigger animation when content changes
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className={className}
  >
    {children}
  </motion.div>
);

export function RaquelMartinezInsuranceComponent() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverageType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen)
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'es' : 'en');

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

  const scrollToForm = () => {
    const formElement = document.getElementById('contact');
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <AnimatedLogo 
        scrollYProgress={scrollYProgress} 
        toggleNav={toggleNav} 
        language={language}
        toggleLanguage={toggleLanguage}
      />
      <MobileNav 
        isOpen={isNavOpen} 
        toggleNav={toggleNav}
        language={language}
        toggleLanguage={toggleLanguage}
      />

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
            <AnimatePresence mode="wait">
              <motion.h2 
                key={language}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500"
              >
                {translations[language].hero.title}
              </motion.h2>
            </AnimatePresence>
            
            <AnimatePresence mode="wait">
              <motion.p 
                key={language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-300 font-light max-w-3xl mx-auto"
              >
                {translations[language].hero.subtitle}
              </motion.p>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <AnimatedButton 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white text-lg px-10 py-6 rounded-[32px]"
                onClick={scrollToForm}
              >
                {translations[language].hero.quoteButton}
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
                {translations[language].hero.chatButton}
              </AnimatedButton>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={`${language}-serving`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 text-gray-400 text-lg"
              >
                {translations[language].hero.serving}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gray-100">
        <div className="container mx-auto">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={`${language}-services-title`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-bold text-center mb-6 text-gray-900"
            >
              {translations[language].services.title}
            </motion.h2>
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.p 
              key={`${language}-services-subtitle`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl text-center text-gray-600 mb-16 max-w-3xl mx-auto"
            >
              {translations[language].services.subtitle}
            </motion.p>
          </AnimatePresence>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <ExpandableSection
              title={translations[language].services.insurance.title}
              description={translations[language].services.insurance.description}
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_Vb5yVSAk_1731344877455_raw.jpg-eyfiAlMFih0j0lsHrKen79SXkUgUIS.jpeg"
              actionButtonText="Learn More About Coverage"
              content={
                <div className="space-y-4 text-gray-700">
                  <h4 className="text-xl font-semibold text-gray-900">
                    {translations[language].services.insurance.content.title}
                  </h4>
                  <ul className="space-y-2">
                    {translations[language].services.insurance.content.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Shield className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
            <ExpandableSection
              title={translations[language].services.compliance.title}
              description={translations[language].services.compliance.description}
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_vWJBE_EO_1731344877580_raw.jpg-y81CO8VwPHeT1aUTaiDZ3hFIZEEyOj.jpeg"
              actionButtonText="Explore Compliance Solutions"
              content={
                <div className="space-y-4 text-gray-700">
                  <h4 className="text-xl font-semibold text-gray-900">
                    {translations[language].services.compliance.content.title}
                  </h4>
                  <ul className="space-y-2">
                    {translations[language].services.compliance.content.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Clipboard className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
            <ExpandableSection
              title={translations[language].services.growth.title}
              description={translations[language].services.growth.description}
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openart-image_ubf4h2G-_1731344878089_raw.jpg-XLkuMPwPkdw22fCcmC7MYAf5WvpvQy.jpeg"
              actionButtonText="Start Growing Your Fleet"
              content={
                <div className="space-y-4 text-gray-700">
                  <h4 className="text-xl font-semibold text-gray-900">
                    {translations[language].services.growth.content.title}
                  </h4>
                  <ul className="space-y-2">
                    {translations[language].services.growth.content.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <DollarSign className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
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
                {translations[language].about.title}
              </motion.h2>
              <div className="space-y-6">
                {translations[language].about.items.map((item, index) => (
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
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                      });
                    }
                  }}
                >
                  {translations[language].about.cta}
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
            {translations[language].testimonials.title}
          </motion.h2>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex flex-nowrap"
              animate={{ x: [0, -100 * 5, 0] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              {translations[language].testimonials.items.map((testimonial, index) => (
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
                {translations[language].contact.title}
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="text-gray-700 mb-6 text-lg">
                    {translations[language].contact.subtitle}
                  </p>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-center space-x-3 mb-4">
                      <PhoneButton />
                    </div>
                    <motion.div 
                      className="flex items-center space-x-3 cursor-pointer"
                      whileHover={{ scale: 1.05, color: "#ef4444" }}
                    >
                      <Mail className="h-5 w-5 text-red-600" />
                      <span>raquel@alfainsurancesolutions.com</span>
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
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${language}-form`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <Input 
                        type="text" 
                        placeholder={translations[language].contact.form.fullName} 
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        className="w-full rounded-md p-4 text-lg border-2 border-gray-300 focus:border-red-500 focus:ring-red-500 placeholder-gray-500"
                      />
                      <Input 
                        type="email" 
                        placeholder={translations[language].contact.form.email} 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full rounded-md p-4 text-lg border-2 border-gray-300 focus:border-red-500 focus:ring-red-500 placeholder-gray-500"
                      />
                      <Input 
                        type="tel" 
                        placeholder={translations[language].contact.form.phone} 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="w-full rounded-md p-4 text-lg border-2 border-gray-300 focus:border-red-500 focus:ring-red-500 placeholder-gray-500"
                      />
                      <Input 
                        type="text" 
                        placeholder={translations[language].contact.form.coverage} 
                        value={formData.coverageType}
                        onChange={(e) => setFormData({ ...formData, coverageType: e.target.value })}
                        required
                        className="w-full rounded-md p-4 text-lg border-2 border-gray-300 focus:border-red-500 focus:ring-red-500 placeholder-gray-500"
                      />
                      <AnimatedButton 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-8 text-xl font-semibold rounded-full shadow-lg transition-all duration-300 whitespace-normal min-h-[60px] flex items-center justify-center"
                        style={{
                          fontSize: language === 'es' ? '1.1rem' : '1.25rem', // Slightly smaller font for Spanish
                          lineHeight: '1.2',
                        }}
                      >
                        {isSubmitting ? (
                          language === 'en' ? 'Sending...' : 'Enviando...'
                        ) : (
                          translations[language].contact.form.submit
                        )}
                      </AnimatedButton>
                    </motion.div>
                  </AnimatePresence>
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
                {translations[language].footer.title}
              </h3>
              <p className="mb-4 text-gray-400">
                {translations[language].footer.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <PhoneButton />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-gray-400">
                {translations[language].footer.copyright}
              </p>
              <p className="text-gray-400 mt-2">
                Lic # 4320792
              </p>
            </div>
          </div>
        </div>
      </footer>

      <SpeedInsights />
    </>
  )
}