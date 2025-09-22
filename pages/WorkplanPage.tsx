
import React from 'react';
import { WORKPLAN_DATA, WorkplanItem } from '../data';

const TimelineItem: React.FC<{ item: WorkplanItem, index: number }> = ({ item, index }) => {
    const isOdd = index % 2 !== 0;
    const aosAnimation = isOdd ? 'fade-left' : 'fade-right';

    return (
        <div className="relative">
            {/* <!-- Marker --> */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-primary-red to-dark-red rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                {item.id}
            </div>
            <div className={`flex ${isOdd ? 'justify-start' : 'justify-end'}`}>
                 <div className="w-5/12" data-aos={aosAnimation}>
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-primary-red before:to-secondary-yellow before:rounded-t-2xl">
                        <span className="inline-block bg-gradient-to-r from-secondary-yellow to-dark-yellow text-dark-gray px-4 py-1 text-sm font-bold rounded-full mb-3 shadow-sm">{item.date}</span>
                        <h3 className="text-xl font-bold text-primary-red mb-3">{item.title}</h3>
                        {item.details && (
                            <div className="space-y-2 mb-4">
                                {item.details.map((detail, i) => (
                                    <div key={i} className="bg-light-gray p-3 rounded-lg border-l-4 border-primary-red text-sm">
                                        {detail.title}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="bg-gradient-to-r from-primary-red to-dark-red text-white text-sm font-semibold p-3 rounded-lg flex items-center gap-2">
                           <i className={`fas ${item.icon}`}></i>
                           <span>{item.responsible}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WorkplanPage: React.FC = () => {
    return (
        <>
            <section className="bg-gradient-to-br from-dark-red to-primary-red text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-repeat bg-center opacity-5" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"52\" height=\"26\" viewBox=\"0 0 52 26\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z\" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
                <div className="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">USRA Workplan 2025</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">Comprehensive Activity Calendar for the Uganda Schools Rugby Association</p>
                </div>
            </section>
             <section className="py-20 bg-dark-gray text-white">
                 <div className="container mx-auto px-4">
                     <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">2025 at a Glance</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {[{num: 12, label: 'Major Activities'}, {num: 8, label: 'Regional Leagues'}, {num: 5, label: 'National Events'}, {num: 4, label: 'Regions Covered'}].map((stat, i) => (
                             <div key={i} className="text-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 transition-transform duration-300 hover:-translate-y-2" data-aos="fade-up" data-aos-delay={i*100}>
                                <div className="text-5xl font-extrabold text-secondary-yellow mb-2">{stat.num}</div>
                                <div className="text-lg font-semibold opacity-90">{stat.label}</div>
                            </div>
                        ))}
                     </div>
                 </div>
             </section>

             <section className="py-20 bg-light-gray">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-primary-red" data-aos="fade-up">2025 Activity Calendar</h2>
                    <div className="relative max-w-4xl mx-auto">
                        {/* <!-- The connecting line --> */}
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-red via-secondary-yellow to-primary-red rounded-full"></div>
                        
                        <div className="space-y-16">
                            {WORKPLAN_DATA.map((item, index) => (
                                <TimelineItem key={item.id} item={item} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WorkplanPage;
