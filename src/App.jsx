import { SafeIcon } from './components/SafeIcon';
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility for tailwind class merging
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Hook for form handling with Web3Forms
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e, accessKey) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsError(false)

    const formData = new FormData(e.target)
    formData.append('access_key', accessKey)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        e.target.reset()
      } else {
        setIsError(true)
        setErrorMessage(data.message || 'Something went wrong')
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
    setIsError(false)
    setErrorMessage('')
  }

  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm }
}

// Hook for scroll animations
const useScrollAnimation = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return { ref, isInView }
}

// Data
const MASTERS = [
  { id: 1, name: 'Александр', specialty: 'Бороды и стрижки', exp: '8 лет', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80' },
  { id: 2, name: 'Михаил', specialty: 'Классические стрижки', exp: '12 лет', image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80' },
  { id: 3, name: 'Дмитрий', specialty: 'Трендовые стрижки', exp: '6 лет', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80' },
  { id: 4, name: 'Иван', specialty: 'Бритьё опасной бритвой', exp: '10 лет', image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80' },
]

const SERVICES = [
  { name: 'Мужская стрижка', price: '800 Kč', duration: '45 мин', desc: 'Стрижка с мытьём головы и укладкой' },
  { name: 'Стрижка бороды', price: '500 Kč', duration: '30 мин', desc: 'Формирование и уход за бородой' },
  { name: 'Королевское бритьё', price: '700 Kč', duration: '40 мин', desc: 'Бритьё опасной бритвой с комплексным уходом' },
  { name: 'Комплекс "День барбера"', price: '1800 Kč', duration: '90 мин', desc: 'Стрижка + борода + бритьё' },
  { name: 'Укладка волос', price: '300 Kč', duration: '20 мин', desc: 'Профессиональная укладка средствами' },
  { name: 'Окрашивание седины', price: '900 Kč', duration: '60 мин', desc: 'Натуральное окрашивание тон-в-тон' },
]

const GALLERY = [
  { id: 1, image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80', title: 'Классическая стрижка' },
  { id: 2, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80', title: 'Модная стрижка' },
  { id: 3, image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80', title: 'Уход за бородой' },
  { id: 4, image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80', title: 'Бритьё опасной бритвой' },
  { id: 5, image: 'https://images.unsplash.com/photo-1593702295094-aea4cce703f6?w=600&q=80', title: 'Детская стрижка' },
  { id: 6, image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=600&q=80', title: 'Сложная стрижка' },
]

const TIPS = [
  {
    icon: 'droplets',
    title: 'Уход за бородой',
    text: 'Мойте бороду специальным шампунем 2-3 раза в неделю. Не забывайте о бородяном масле для питания кожи.'
  },
  {
    icon: 'sparkles',
    title: 'Стайлинг волос',
    text: 'Выбирайте средства по типу волос. Помада для гладких укладок, глина для текстурных, воск для коротких.'
  },
  {
    icon: 'lightbulb',
    title: 'Интервал стрижек',
    text: 'Для поддержания формы посещайте барбера каждые 2-3 недели. Бороду корректируйте каждую неделю.'
  },
]

const LOYALTY_LEVELS = [
  { visits: 0, discount: 0, name: 'Новичок', gift: 'Добро пожаловать!' },
  { visits: 3, discount: 10, name: 'Друг', gift: '10% скидка на все услуги' },
  { visits: 5, discount: 15, name: 'Брат', gift: '15% + бесплатный уход' },
  { visits: 10, discount: 20, name: 'Старший брат', gift: '20% + VIP-обслуживание' },
]

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', master: '', date: '', time: '', service: '' })
  const [currentLoyalty, setCurrentLoyalty] = useState(3) // Current visits
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler()

  const heroAnim = useScrollAnimation()
  const galleryAnim = useScrollAnimation()
  const priceAnim = useScrollAnimation()
  const tipsAnim = useScrollAnimation()
  const loyaltyAnim = useScrollAnimation()
  const contactAnim = useScrollAnimation()

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    handleSubmit(e, 'YOUR_WEB3FORMS_ACCESS_KEY')
  }

  const nextLoyalty = LOYALTY_LEVELS.find(l => l.visits > currentLoyalty) || LOYALTY_LEVELS[LOYALTY_LEVELS.length - 1]
  const currentLevel = LOYALTY_LEVELS.slice().reverse().find(l => currentLoyalty >= l.visits) || LOYALTY_LEVELS[0]
  const progress = (currentLoyalty / (nextLoyalty.visits || 10)) * 100

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 noise-bg" />

      {/* HEADER */}
      <header className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-md z-40 border-b border-amber-900/30">
        <nav className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-600 p-2 rounded-sm">
              <SafeIcon name="scissors" size={24} className="text-slate-950" />
            </div>
            <span className="text-2xl md:text-3xl font-serif font-black text-amber-500 tracking-tight">BAZA</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('gallery')} className="text-slate-300 hover:text-amber-500 transition-colors font-medium">Галерея</button>
            <button onClick={() => scrollToSection('booking')} className="text-slate-300 hover:text-amber-500 transition-colors font-medium">Запись</button>
            <button onClick={() => scrollToSection('prices')} className="text-slate-300 hover:text-amber-500 transition-colors font-medium">Прайс</button>
            <button onClick={() => scrollToSection('tips')} className="text-slate-300 hover:text-amber-500 transition-colors font-medium">Советы</button>
            <button onClick={() => scrollToSection('loyalty')} className="text-slate-300 hover:text-amber-500 transition-colors font-medium">Лояльность</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-amber-500 transition-colors font-medium">Контакты</button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-amber-900/20 p-2 rounded-lg border border-amber-900/30"
          >
            <SafeIcon name={mobileMenuOpen ? 'x' : 'menu'} size={24} className="text-amber-500" />
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-t border-amber-900/30"
            >
              <div className="flex flex-col p-4 space-y-4">
                <button onClick={() => scrollToSection('gallery')} className="text-slate-300 hover:text-amber-500 py-2 text-left">Галерея</button>
                <button onClick={() => scrollToSection('booking')} className="text-slate-300 hover:text-amber-500 py-2 text-left">Запись</button>
                <button onClick={() => scrollToSection('prices')} className="text-slate-300 hover:text-amber-500 py-2 text-left">Прайс</button>
                <button onClick={() => scrollToSection('tips')} className="text-slate-300 hover:text-amber-500 py-2 text-left">Советы</button>
                <button onClick={() => scrollToSection('loyalty')} className="text-slate-300 hover:text-amber-500 py-2 text-left">Лояльность</button>
                <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-amber-500 py-2 text-left">Контакты</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=1920&q=80"
            alt="Barbershop interior"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-amber-600 to-transparent opacity-50 hidden lg:block" />
        <div className="absolute bottom-1/4 right-10 w-px h-32 bg-gradient-to-b from-transparent via-amber-600 to-transparent opacity-50 hidden lg:block" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            ref={heroAnim.ref}
            initial={{ opacity: 0, y: 40 }}
            animate={heroAnim.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-amber-600" />
              <span className="text-amber-500 uppercase tracking-widest text-sm font-semibold">Прага • С 2018 года</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white mb-6 text-shadow-vintage leading-tight">
              МЕСТО, ГДЕ<br />
              <span className="text-amber-500">РОЖДАЕТСЯ</span><br />
              СТИЛЬ
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Винтажный барбершоп для тех, кто ценит классику и качество.
              Мастера с опытом, атмосфера лофта и внимание к деталям.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('booking')}
                className="group bg-amber-600 hover:bg-amber-500 text-slate-950 px-8 py-4 rounded-sm font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 loft-shadow"
              >
                Записаться онлайн
                <SafeIcon name="arrow-right" size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="bg-transparent hover:bg-white/5 text-white border-2 border-amber-600/50 hover:border-amber-500 px-8 py-4 rounded-sm font-bold text-lg transition-all flex items-center justify-center"
              >
                Наши работы
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg">
              <div>
                <div className="text-3xl md:text-4xl font-serif font-bold text-amber-500">6+</div>
                <div className="text-slate-400 text-sm">Лет опыта</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-serif font-bold text-amber-500">4</div>
                <div className="text-slate-400 text-sm">Мастера</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-serif font-bold text-amber-500">5000+</div>
                <div className="text-slate-400 text-sm">Клиентов</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <SafeIcon name="chevron-down" size={32} className="text-amber-500 opacity-60" />
        </motion.div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-20 md:py-32 px-4 md:px-6 bg-slate-950 relative">
        <div className="container mx-auto">
          <motion.div
            ref={galleryAnim.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={galleryAnim.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-amber-500 uppercase tracking-widest text-sm font-semibold mb-4 block">Портфолио</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Галерея работ</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Каждая стрижка — это искусство. Посмотрите примеры наших работ.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-sm vintage-border bg-slate-900"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-serif font-bold text-white">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="booking" className="py-20 md:py-32 px-4 md:px-6 bg-slate-900 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-900/5 pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-500 uppercase tracking-widest text-sm font-semibold mb-4 block">Онлайн-запись</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Запишитесь к лучшим мастерам</h2>
              <p className="text-slate-400 mb-8 text-lg">Выберите мастера, удобное время и услугу. Мы свяжемся с вами для подтверждения записи.</p>

              {/* Masters Preview */}
              <div className="grid grid-cols-2 gap-4">
                {MASTERS.map((master) => (
                  <div key={master.id} className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-sm border border-slate-700">
                    <img src={master.image} alt={master.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-white text-sm">{master.name}</div>
                      <div className="text-amber-500 text-xs">{master.exp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-sm vintage-border"
            >
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleBookingSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Ваше имя</label>
                      <input
                        type="text"
                        name="name"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-600 transition-colors"
                        placeholder="Иван Петров"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Телефон</label>
                      <input
                        type="tel"
                        name="phone"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-600 transition-colors"
                        placeholder="+420 123 456 789"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Мастер</label>
                        <select
                          name="master"
                          value={bookingForm.master}
                          onChange={(e) => setBookingForm({...bookingForm, master: e.target.value})}
                          required
                          className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-amber-600 transition-colors"
                        >
                          <option value="">Выберите</option>
                          {MASTERS.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Услуга</label>
                        <select
                          name="service"
                          value={bookingForm.service}
                          onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                          required
                          className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-amber-600 transition-colors"
                        >
                          <option value="">Выберите</option>
                          {SERVICES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Дата</label>
                        <input
                          type="date"
                          name="date"
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                          required
                          className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-amber-600 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Время</label>
                        <select
                          name="time"
                          value={bookingForm.time}
                          onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                          required
                          className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-amber-600 transition-colors"
                        >
                          <option value="">Выберите</option>
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="12:00">12:00</option>
                          <option value="13:00">13:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                          <option value="17:00">17:00</option>
                          <option value="18:00">18:00</option>
                          <option value="19:00">19:00</option>
                        </select>
                      </div>
                    </div>

                    <input type="hidden" name="form_type" value="booking" />

                    {isError && (
                      <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-sm">{errorMessage}</div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-950 px-8 py-4 rounded-sm font-bold text-lg transition-all transform hover:scale-[1.02] loft-shadow flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        <>
                          <SafeIcon name="calendar" size={20} />
                          Записаться
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <SafeIcon name="checkCircle" size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-4">Запись принята!</h3>
                    <p className="text-slate-400 mb-8">Мы свяжемся с вами для подтверждения. Спасибо за выбор BAZA!</p>
                    <button
                      onClick={() => { resetForm(); setBookingForm({ name: '', phone: '', master: '', date: '', time: '', service: '' }); }}
                      className="text-amber-500 hover:text-amber-400 font-semibold transition-colors"
                    >
                      Записать ещё
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICES SECTION */}
      <section id="prices" className="py-20 md:py-32 px-4 md:px-6 bg-slate-950">
        <div className="container mx-auto">
          <motion.div
            ref={priceAnim.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={priceAnim.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-amber-500 uppercase tracking-widest text-sm font-semibold mb-4 block">Прайс-лист</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Услуги и цены</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Прозрачное ценообразование без скрытых платежей</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-slate-900/50 border border-slate-800 hover:border-amber-600/50 p-6 rounded-sm transition-all hover:bg-slate-800/50"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-500 transition-colors">{service.name}</h3>
                  <span className="text-2xl font-bold text-amber-500">{service.price}</span>
                </div>
                <p className="text-slate-400 text-sm mb-4">{service.desc}</p>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <SafeIcon name="clock" size={16} />
                  <span>{service.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => scrollToSection('booking')}
              className="inline-flex items-center gap-2 bg-transparent border-2 border-amber-600/50 hover:border-amber-500 text-amber-500 hover:text-amber-400 px-8 py-3 rounded-sm font-semibold transition-all"
            >
              <SafeIcon name="calendar" size={18} />
              Записаться сейчас
            </button>
          </div>
        </div>
      </section>

      {/* TIPS SECTION */}
      <section id="tips" className="py-20 md:py-32 px-4 md:px-6 bg-slate-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <motion.div
            ref={tipsAnim.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={tipsAnim.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-amber-500 uppercase tracking-widest text-sm font-semibold mb-4 block">Полезное</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Советы от барберов</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Как сохранять стиль и ухаживать за волосами между визитами</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {TIPS.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-sm vintage-border"
              >
                <div className="bg-amber-600/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <SafeIcon name={tip.icon} size={28} className="text-amber-500" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">{tip.title}</h3>
                <p className="text-slate-400 leading-relaxed">{tip.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOYALTY SECTION */}
      <section id="loyalty" className="py-20 md:py-32 px-4 md:px-6 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            ref={loyaltyAnim.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={loyaltyAnim.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-amber-500 uppercase tracking-widest text-sm font-semibold mb-4 block">Программа лояльности</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Система BAZA</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Чем чаще вы приходите — тем больше преимуществ</p>
          </motion.div>

          {/* Loyalty Card Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-sm p-8 vintage-border mb-12 loft-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-600 p-3 rounded-sm">
                  <SafeIcon name="crown" size={24} className="text-slate-950" />
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-white">{currentLevel.name}</div>
                  <div className="text-amber-500 text-sm">Текущий статус</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-amber-500">{currentLoyalty}</div>
                <div className="text-slate-400 text-sm">визитов</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Прогресс</span>
                <span className="text-amber-500">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-amber-600 rounded-full"
                />
              </div>
            </div>

            <div className="text-center text-slate-400 text-sm">
              Ещё {nextLoyalty.visits - currentLoyalty} визитов до уровня "{nextLoyalty.name}" — {nextLoyalty.gift}
            </div>
          </motion.div>

          {/* Levels Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {LOYALTY_LEVELS.map((level) => (
              <div
                key={level.name}
                className={cn(
                  "p-4 rounded-sm border text-center transition-all",
                  currentLoyalty >= level.visits
                    ? "bg-amber-600/10 border-amber-600/30"
                    : "bg-slate-800/30 border-slate-700"
                )}
              >
                <div className={cn(
                  "text-lg font-serif font-bold mb-1",
                  currentLoyalty >= level.visits ? "text-amber-500" : "text-slate-500"
                )}>
                  {level.name}
                </div>
                <div className="text-slate-400 text-xs mb-2">{level.visits}+ визитов</div>
                <div className="text-slate-300 text-sm">{level.gift}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 md:py-32 px-4 md:px-6 bg-slate-900 relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              ref={contactAnim.ref}
              initial={{ opacity: 0, x: -30 }}
              animate={contactAnim.isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-amber-500 uppercase tracking-widest text-sm font-semibold mb-4 block">Контакты</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Приходите в гости</h2>
              <p className="text-slate-400 mb-8 text-lg">Мы находимся в самом сердце Праги. Удобная парковка и отличная атмосфера.</p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-600/10 p-3 rounded-sm">
                    <SafeIcon name="mapPin" size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Адрес</div>
                    <div className="text-slate-400">Vinohradská 124, Praha 2<br />120 00, Czech Republic</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-600/10 p-3 rounded-sm">
                    <SafeIcon name="phone" size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Телефон</div>
                    <div className="text-slate-400">+420 234 567 890</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-600/10 p-3 rounded-sm">
                    <SafeIcon name="clock" size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Режим работы</div>
                    <div className="text-slate-400">Пн-Пт: 10:00 — 20:00<br />Сб: 10:00 — 18:00<br />Вс: выходной</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a href="#" className="bg-slate-800 hover:bg-amber-600 p-3 rounded-sm transition-colors group">
                  <SafeIcon name="instagram" size={24} className="text-slate-400 group-hover:text-slate-950" />
                </a>
                <a href="#" className="bg-slate-800 hover:bg-amber-600 p-3 rounded-sm transition-colors group">
                  <SafeIcon name="facebook" size={24} className="text-slate-400 group-hover:text-slate-950" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-sm vintage-border"
            >
              <h3 className="text-2xl font-serif font-bold text-white mb-6">Форма обратной связи</h3>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleBookingSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <input
                        type="text"
                        name="contact_name"
                        required
                        placeholder="Ваше имя"
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-600 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="contact_email"
                        required
                        placeholder="Email"
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-600 transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        name="contact_message"
                        required
                        rows={4}
                        placeholder="Ваше сообщение"
                        className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-600 transition-colors resize-none"
                      />
                    </div>

                    <input type="hidden" name="form_type" value="contact" />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-950 px-8 py-4 rounded-sm font-bold transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 loft-shadow"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        <>
                          <SafeIcon name="send" size={18} />
                          Отправить
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <SafeIcon name="checkCircle" size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">Сообщение отправлено!</h3>
                    <p className="text-slate-400">Мы ответим вам в ближайшее время.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-amber-900/20 py-12 px-4 md:px-6 telegram-safe-bottom">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-600 p-2 rounded-sm">
                <SafeIcon name="scissors" size={20} className="text-slate-950" />
              </div>
              <span className="text-2xl font-serif font-black text-amber-500">BAZA</span>
            </div>

            <div className="text-slate-500 text-sm text-center md:text-right">
              <p>© 2024 BAZA Barbershop. Все права защищены.</p>
              <p className="mt-1">Praha, Czech Republic</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App