import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { PHOTO_COLLECTIONS } from '../data';

// --- Helper Components defined outside main component ---

const StatCounter: React.FC<{ target: number; label: string; icon: string }> = ({ target, label, icon }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / target));
        const timer = setInterval(() => {
            setCount(prevCount => {
                const increment = Math.ceil(target / (duration / 100));
                if (prevCount + increment < target) {
                    return prevCount + increment;
                } else {
                    clearInterval(timer);
                    return target;
                }
            });
        }, stepTime > 0 ? stepTime : 1);

        return () => clearInterval(timer);
    }, [target]);

    return (
        <div className="text-center p-8 bg-gradient-to-br from-white to-light-gray rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2" data-aos="fade-up">
            <div className={`text-4xl text-primary-red mb-4`}><i className={`fas ${icon}`}></i></div>
            <div className="text-5xl font-bold text-primary-red mb-2">{count.toLocaleString()}+</div>
            <div className="text-xl text-gray-600 font-semibold">{label}</div>
        </div>
    );
};

const HomePage: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section id="home" className="h-screen relative flex items-center justify-center text-white text-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/photos/hero.jpg')] brightness-50 z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>
                <div className="relative z-10 p-4" data-aos="fade-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Nurturing Young Rugby Talents</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 drop-shadow-md">
                        The Uganda Schools Rugby Association (USRA) governs and promotes rugby in schools across Uganda, building a strong foundation for the future of the sport.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/registration" className="btn-primary inline-block px-8 py-4 text-lg rounded-full font-semibold transition-transform hover:scale-105">Register Now</Link>
                        <a href="#about" className="btn-secondary inline-block px-8 py-4 text-lg rounded-full font-semibold border-2 border-white transition-colors hover:bg-white hover:text-primary-red">Learn More</a>
                    </div>
                </div>
            </section>
            
            {/* About Section */}
            <section id="about" className="py-20 bg-light-gray">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl font-bold text-primary-red">About USRA</h2>
                        <p className="text-xl text-gray-600 mt-2">Empowering young athletes through rugby excellence</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div data-aos="fade-right">
                           <img src="/photos/about.jpg" alt="USRA Rugby Team" className="rounded-2xl shadow-2xl w-full" loading="lazy" />
                        </div>
                        <div data-aos="fade-left">
                            <h3 className="text-2xl font-bold text-dark-gray mb-4">The USRA Story</h3>
                            <p className="text-gray-600 mb-4">Founded in the late 1990s by passionate educators, USRA has grown from a grassroots movement into a nationwide organization, nurturing talent and establishing structured competitions for both boys and girls.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="text-primary-red text-3xl mb-3"><i className="fas fa-bullseye"></i></div>
                                    <h4 className="font-bold text-lg mb-2">Our Mission</h4>
                                    <p className="text-sm text-gray-500">To promote rugby in schools, providing a safe, inclusive, and competitive environment for student athletes.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="text-primary-red text-3xl mb-3"><i className="fas fa-eye"></i></div>
                                    <h4 className="font-bold text-lg mb-2">Our Vision</h4>
                                    <p className="text-sm text-gray-500">To foster excellence, sportsmanship, and teamwork, developing well-rounded individuals on and off the pitch.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chairman's Message Section */}
            <section id="chairman" className="py-20 bg-gradient-to-r from-dark-red to-primary-red text-white">
                <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12 items-center">
                    <div className="md:col-span-1" data-aos="fade-right">
                        <img src="/photos/dixon.jpg" alt="Chairman Okello Dickson" className="rounded-full shadow-lg mx-auto border-4 border-secondary-yellow w-64 h-64 object-cover" loading="lazy"/>
                    </div>
                    <div className="md:col-span-2" data-aos="fade-left">
                        <h2 className="text-3xl font-bold text-secondary-yellow mb-4">Chairman's Message</h2>
                        <p className="mb-4">"It is with great pride that I welcome you to our digital home. This platform reflects our commitment to transparency, communication, and the growth of school rugby. We believe rugby is a powerful tool for character building, discipline, and teamwork. Join us as we take schools rugby to greater heights."</p>
                        <div className="mt-6">
                            <p className="font-bold text-lg">Okello Dickson</p>
                            <p className="text-gray-200">Chairman, Uganda Schools Rugby Association</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Statistics Section */}
            <section id="statistics" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                     <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl font-bold text-primary-red">Our Impact in Numbers</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                       <StatCounter target={150} label="Member Schools" icon="fa-school" />
                       <StatCounter target={2500} label="Registered Players" icon="fa-user-friends" />
                       <StatCounter target={25} label="Annual Tournaments" icon="fa-trophy" />
                       <StatCounter target={15} label="Years of Excellence" icon="fa-calendar-alt" />
                    </div>
                </div>
            </section>

            {/* Medical Fund Section */}
            <section id="medical-fund" className="py-20 bg-light-gray">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div data-aos="fade-right">
                        <span className="text-primary-red font-semibold">Welfare & Safety</span>
                        <h2 className="text-4xl font-bold text-dark-gray mt-2 mb-4">Athletes Medical Fund</h2>
                        <p className="text-gray-600 mb-6">The Athletes Medical Fund supports student players who suffer injuries, providing timely medical assistance, injury management, and rehabilitation so they can recover safely and return to the sport they love.</p>
                        <Link to="/medical-fund" className="btn-primary inline-block px-8 py-3 rounded-full font-semibold">Learn More</Link>
                    </div>
                    <div className="relative" data-aos="fade-left">
                       <img src="/photos/medicalfund.jpg" alt="Athletes Medical Fund" className="rounded-2xl shadow-xl w-full" loading="lazy" />
                        <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-full shadow-lg">
                           <img src="/photos/medicalfundLogo.png" alt="Fund Logo" className="w-20 h-20" loading="lazy" />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Gallery Section */}
            <section id="gallery" className="py-20 bg-white">
                 <div className="container mx-auto px-4">
                     <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl font-bold text-primary-red">Photo Album</h2>
                        <p className="text-xl text-gray-600 mt-2">Student rugby players in action</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {PHOTO_COLLECTIONS.slice(0, 6).map((item, index) => (
                             <Link to="/photos" key={index} className="group relative overflow-hidden rounded-lg shadow-lg" data-aos="zoom-in" data-aos-delay={index * 100}>
                                <img src={`/photos/gallery${index + 1}.jpg`} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy"/>
                                <div className="absolute inset-0 bg-black/50 flex items-end p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                     <div className="text-center mt-12" data-aos="fade-up">
                        <Link to="/photos" className="btn-primary inline-block px-8 py-3 rounded-full font-semibold">View All Collections</Link>
                    </div>
                </div>
            </section>
            
            {/* Contact Section */}
            <section id="contact" className="py-20 bg-dark-gray text-white">
                <div className="container mx-auto px-4">
                     <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl font-bold text-secondary-yellow">Contact Us</h2>
                        <p className="text-xl text-gray-300 mt-2">Get in touch with the USRA team</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div data-aos="fade-right">
                           <form className="space-y-6">
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <input type="text" placeholder="Your Name *" className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:ring-secondary-yellow focus:border-secondary-yellow" required />
                                    <input type="email" placeholder="Your Email *" className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:ring-secondary-yellow focus:border-secondary-yellow" required />
                               </div>
                               <input type="text" placeholder="Subject *" className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:ring-secondary-yellow focus:border-secondary-yellow" required />
                               <textarea placeholder="Your Message *" rows={5} className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:ring-secondary-yellow focus:border-secondary-yellow" required></textarea>
                               <button type="submit" className="btn-primary w-full px-8 py-4 text-lg rounded-full font-semibold transition-transform hover:scale-105">Send Message</button>
                           </form>
                        </div>
                        <div className="space-y-6" data-aos="fade-left">
                           <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/50">
                               <i className="fas fa-map-marker-alt text-2xl text-secondary-yellow mt-1"></i>
                               <div>
                                   <h4 className="font-bold">Address</h4>
                                   <p className="text-gray-300">Lugogo Tennis Club, Lugogo Bypass, Kampala</p>
                               </div>
                           </div>
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/50">
                               <i className="fas fa-phone text-2xl text-secondary-yellow mt-1"></i>
                               <div>
                                   <h4 className="font-bold">Phone</h4>
                                   <p className="text-gray-300">Chairman: +256 783 562 222</p>
                                   <p className="text-gray-300">Gen. Secretary: +256 788 378 660</p>
                               </div>
                           </div>
                           <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/50">
                               <i className="fas fa-envelope text-2xl text-secondary-yellow mt-1"></i>
                               <div>
                                   <h4 className="font-bold">Email</h4>
                                   <p className="text-gray-300">usrasecretariat@gmail.com</p>
                               </div>
                           </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;