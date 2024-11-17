import { AnimatePresence, motion } from "framer-motion"
import { Globe } from "lucide-react"

type Language = 'en' | 'es'

interface MobileNavProps {
  isOpen: boolean;
  toggleNav: () => void;
  language: Language;
  toggleLanguage: () => void;
}

const MobileNav = ({ isOpen, toggleNav, language, toggleLanguage }: MobileNavProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed inset-y-0 right-0 w-64 bg-gray-900 z-50 shadow-lg"
        >
          <div className="p-4 flex flex-col h-full">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-white mb-6 hover:text-red-400 transition-colors"
            >
              <Globe className="h-5 w-5" />
              {language === 'en' ? 'Español' : 'English'}
            </button>
            
            {/* Rest of your mobile nav content */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileNav