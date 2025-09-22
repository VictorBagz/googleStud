
import React, { useState } from 'react';
import { LEADERSHIP_DATA, LeadershipMember } from '../data';

const MemberCard: React.FC<{ member: LeadershipMember }> = ({ member }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group" data-aos="fade-up">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-red to-secondary-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        <div className="flex items-start gap-4">
            {member.photoUrl && <img src={member.photoUrl} alt={member.name} className="w-20 h-20 rounded-full border-4 border-secondary-yellow object-cover" />}
            <div className="flex-1">
                <span className="inline-block bg-gradient-to-r from-primary-red to-dark-red text-white px-3 py-1 text-xs font-bold rounded-full mb-2 uppercase tracking-wider">{member.title}</span>
                <h3 className="text-xl font-bold text-primary-red">{member.name}</h3>
                <p className="text-sm text-gray-600 italic">{member.school}</p>
                 <div className="mt-4 text-sm text-text-dark space-y-1">
                    <p><i className="fas fa-envelope w-5 text-primary-red/70"></i> <a href={`mailto:${member.email}`} className="hover:text-primary-red">{member.email}</a></p>
                    <p><i className="fas fa-phone w-5 text-primary-red/70"></i> <a href={`tel:${member.phone}`} className="hover:text-primary-red">{member.phone}</a></p>
                </div>
            </div>
        </div>
    </div>
);

const LeadershipPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('excom');

    const tabs = [
        { id: 'excom', label: 'Executive' },
        { id: 'finance', label: 'Finance' },
        { id: 'technical', label: 'Technical' },
        { id: 'disciplinary', label: 'Disciplinary' },
        { id: 'regional', label: 'Regional' },
        { id: 'girls', label: 'Girls\' Rugby' },
    ];
    
    const regionalZones = ['Central', 'Western', 'Northern', 'Eastern'];
    const regionalMembersByZone = regionalZones.map(zone => ({
        zone,
        members: LEADERSHIP_DATA.regional.filter(m => m.zone === zone)
    }));

    return (
        <>
            <section className="bg-gradient-to-br from-dark-red to-primary-red text-white pt-32 pb-20">
                <div className="container mx-auto px-4 text-center" data-aos="fade-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Leadership Structure 2025</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">Meet the dedicated individuals guiding school rugby in Uganda.</p>
                </div>
            </section>

            <div className="sticky top-20 bg-white/80 backdrop-blur-md z-30 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center flex-wrap gap-2 py-4">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} 
                                    className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${activeTab === tab.id ? 'bg-primary-red text-white shadow-md' : 'text-gray-600 hover:bg-red-100'}`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="py-20 bg-light-gray">
                <div className="container mx-auto px-4">
                    {Object.keys(LEADERSHIP_DATA).map(key => (
                         activeTab === key && (
                            <div key={key}>
                                 <div className="text-center mb-12">
                                     <h2 className="text-3xl font-bold text-primary-red capitalize">{tabs.find(t=>t.id===key)?.label} Committee</h2>
                                     <div className="w-24 h-1 bg-gradient-to-r from-primary-red to-secondary-yellow mx-auto mt-4 rounded"></div>
                                 </div>

                                {key === 'regional' ? (
                                     regionalMembersByZone.map(zoneGroup => (
                                         <div key={zoneGroup.zone} className="mb-12">
                                             <h3 className="text-2xl font-bold text-center text-secondary-yellow mb-8">{zoneGroup.zone} Region Committee</h3>
                                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                 {zoneGroup.members.map(member => <MemberCard key={member.name} member={member} />)}
                                             </div>
                                         </div>
                                     ))
                                 ) : (
                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                          {LEADERSHIP_DATA[key as keyof typeof LEADERSHIP_DATA].map(member => (
                                              <MemberCard key={member.name} member={member} />
                                          ))}
                                      </div>
                                 )}
                            </div>
                        )
                    ))}
                </div>
            </main>
        </>
    );
};

export default LeadershipPage;
