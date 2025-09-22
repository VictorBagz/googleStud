
import React, { useState, useMemo, useEffect } from 'react';
import { EVENTS_DATA, Event } from '../data';

const useCountdown = (targetDate: string) => {
    const countDownDate = new Date(targetDate).getTime();
    const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);
        return () => clearInterval(interval);
    }, [countDownDate]);

    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return { value: days, label: days === 1 ? 'Day' : 'Days' };
    if (hours > 0) return { value: hours, label: hours === 1 ? 'Hour' : 'Hours' };
    return { value: 0, label: 'Days' };
};

const EventCard: React.FC<{ event: Event; onDetailsClick: (event: Event) => void }> = ({ event, onDetailsClick }) => {
    const countdown = useCountdown(event.date);

    const badgeClasses = {
        'Happening Today': 'bg-red-600 text-white animate-pulse',
        'Next Event': 'bg-secondary-yellow text-dark-gray',
        'International': 'bg-blue-600 text-white',
        'Completed': 'bg-gray-500 text-white'
    };
    
    const badgeClass = badgeClasses[event.badge as keyof typeof badgeClasses] || 'bg-primary-red text-white';

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group" data-aos="fade-up">
            <div className="relative">
                <img src={event.imageUrl} alt={event.title} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {event.badge && (
                    <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${badgeClass}`}>
                        {event.badge}
                    </div>
                )}
                {event.statusIcon && (
                    <div className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-white ${event.timeline === 'past' ? 'bg-green-500' : 'bg-primary-red'}`}>
                        <i className={`fas ${event.statusIcon}`}></i>
                    </div>
                )}
                {event.timeline === 'upcoming' && countdown.value > 0 && (
                     <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-center backdrop-blur-sm">
                        <div className="text-xl font-bold">{countdown.value}</div>
                        <div className="text-xs">{countdown.label}</div>
                    </div>
                )}
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start text-sm text-gray-500 mb-2">
                    <span><i className="fas fa-calendar mr-1 text-primary-red"></i> {event.displayDate}</span>
                    <span><i className="fas fa-user mr-1 text-primary-red"></i> {event.responsible}</span>
                </div>
                <h3 className="text-xl font-bold text-dark-gray mb-2 h-14">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">{event.description}</p>
                 <button onClick={() => onDetailsClick(event)} className="w-full bg-primary-red text-white font-semibold py-3 rounded-lg transition-colors duration-300 hover:bg-dark-red">
                    More Details
                </button>
            </div>
        </div>
    );
};

const AGMModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()} data-aos="zoom-in">
                <div className="sticky top-0 bg-gradient-to-r from-primary-red to-dark-red text-white p-6 flex justify-between items-center z-10">
                    <h2 className="text-2xl font-bold"><i className="fas fa-users mr-2"></i> Annual General Meeting 2025</h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors"><i className="fas fa-times"></i></button>
                </div>
                <div className="p-8">
                     <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                             <h3 className="text-xl font-bold text-primary-red mb-4"><i className="fas fa-calendar-alt mr-2"></i>Event Information</h3>
                             <div className="space-y-2 text-gray-700">
                                 <p><strong>Date:</strong> September 6, 2025</p>
                                 <p><strong>Time:</strong> 9:00 AM - 4:00 PM</p>
                                 <p><strong>Venue:</strong> USRA Headquarters, Lugogo Tennis Club</p>
                             </div>
                        </div>
                         <div>
                             <h3 className="text-xl font-bold text-primary-red mb-4"><i className="fas fa-clipboard-list mr-2"></i>Meeting Agenda</h3>
                             <ul className="list-disc list-inside space-y-1 text-gray-700">
                                 <li>Chairman's Opening Remarks</li>
                                 <li>2025 Activities Review & Financial Report</li>
                                 <li>2026 Strategic Planning</li>
                                 <li>Committee Reports & Closing Remarks</li>
                             </ul>
                        </div>
                     </div>
                     <div className="mb-8">
                         <h3 className="text-xl font-bold text-primary-red mb-4"><i className="fas fa-school mr-2"></i>Invited Schools</h3>
                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
                             <div className="bg-light-gray p-3 rounded-lg"><strong>Central:</strong> Makerere College, Hana Int'l</div>
                             <div className="bg-light-gray p-3 rounded-lg"><strong>Eastern:</strong> Busoga College, Kira College</div>
                             <div className="bg-light-gray p-3 rounded-lg"><strong>Western:</strong> Mbarara High, Nyakasura School</div>
                             <div className="bg-light-gray p-3 rounded-lg"><strong>Northern:</strong> Sir Samuel Baker, Inomo S.S</div>
                         </div>
                     </div>
                </div>
                <div className="sticky bottom-0 bg-gray-100 p-6 flex justify-end gap-4">
                     <button onClick={onClose} className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition">Close</button>
                     <button className="px-6 py-2 rounded-lg bg-primary-red hover:bg-dark-red text-white font-semibold transition">Download Agenda</button>
                </div>
            </div>
        </div>
    );
};


const EventsPage: React.FC = () => {
    const [timelineFilter, setTimelineFilter] = useState('upcoming');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    
    const filteredEvents = useMemo(() => {
        return EVENTS_DATA.filter(event => {
            const timelineMatch = timelineFilter === 'all' || 
                                (timelineFilter === 'upcoming' && (event.timeline === 'upcoming' || event.timeline === 'current')) ||
                                event.timeline === timelineFilter;
            const categoryMatch = categoryFilter === 'all' || event.category === categoryFilter;
            return timelineMatch && categoryMatch;
        });
    }, [timelineFilter, categoryFilter]);

    const handleDetailsClick = (event: Event) => {
        if(event.id === 10) { // Specific modal for AGM
             setIsModalOpen(true);
        } else {
            // Handle other events, maybe a generic modal or navigate to a detail page
            alert(`Details for: ${event.title}`);
        }
    };

    return (
        <>
            <section className="bg-gradient-to-br from-dark-red to-primary-red text-white pt-32 pb-16">
                <div className="container mx-auto px-4 text-center" data-aos="fade-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Events & Tournaments</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">Discover upcoming tournaments, training camps, and community events across Uganda.</p>
                </div>
            </section>

            <section className="py-20 bg-light-gray">
                <div className="container mx-auto px-4">
                    {/* Timeline Toggle */}
                    <div className="flex justify-center mb-12" data-aos="fade-up">
                         <div className="bg-white rounded-full p-2 shadow-md flex gap-2">
                             {['upcoming', 'past', 'all'].map(filter => (
                                <button key={filter} onClick={() => setTimelineFilter(filter)} 
                                        className={`px-4 sm:px-8 py-3 text-sm sm:text-base font-semibold rounded-full transition-colors duration-300 ${timelineFilter === filter ? 'bg-primary-red text-white' : 'text-gray-600 hover:bg-red-100'}`}>
                                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                </button>
                             ))}
                        </div>
                    </div>

                     {/* Filter Tabs */}
                     <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12" data-aos="fade-up" data-aos-delay="100">
                         {['all', 'tournaments', 'meetings', 'national', 'international'].map(filter => (
                            <button key={filter} onClick={() => setCategoryFilter(filter)}
                                    className={`px-5 py-2 text-sm font-medium rounded-full border-2 transition-all duration-300 ${categoryFilter === filter ? 'bg-dark-gray text-white border-dark-gray' : 'bg-white text-gray-700 border-gray-200 hover:border-dark-gray'}`}>
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </button>
                         ))}
                     </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map(event => (
                            <EventCard key={event.id} event={event} onDetailsClick={handleDetailsClick} />
                        ))}
                    </div>
                     {filteredEvents.length === 0 && (
                        <div className="text-center col-span-full py-12" data-aos="fade-up">
                            <i className="fas fa-calendar-times text-6xl text-gray-300 mb-4"></i>
                            <p className="text-gray-500 text-xl">No events match the current filters.</p>
                        </div>
                    )}
                </div>
            </section>
             <AGMModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default EventsPage;
