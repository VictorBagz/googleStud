import React from 'react';
import { Link } from 'react-router-dom';
import { PHOTO_COLLECTIONS } from '../data';

// --- Medical Fund Page ---
export const MedicalFundPage: React.FC = () => {
    return (
        <>
            <section className="bg-cover bg-center pt-32 pb-20 text-white" style={{backgroundImage: "url('/photos/medicalfund-hero.jpg')"}}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Athletes Medical Fund</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">Protecting and supporting our student-athletes</p>
                </div>
            </section>
            
            <section className="py-20 bg-light-gray">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-primary-red">About the Fund</h2>
                            <p className="text-lg text-gray-600 mt-2">Ensuring timely care and recovery for injured student rugby athletes.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-10">
                            <div data-aos="fade-right">
                                <h3 className="text-xl font-bold text-dark-gray mb-4">What the Fund Covers</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    <li>Immediate medical attention during sanctioned matches or training.</li>
                                    <li>Subsidized treatment and rehabilitation for approved cases.</li>
                                    <li>Collaboration with partner facilities for specialized care.</li>
                                </ul>
                                <h3 className="text-xl font-bold text-dark-gray mt-8 mb-4">Eligibility</h3>
                                <p className="text-gray-600">Players registered with USRA and participating in sanctioned activities are eligible under the terms and conditions of the fund.</p>
                            </div>
                            <div data-aos="fade-left">
                                <h3 className="text-xl font-bold text-dark-gray mb-4">How to Apply</h3>
                                 <ol className="list-decimal list-inside space-y-2 text-gray-600">
                                    <li>Notify USRA immediately after an incident via your school representative.</li>
                                    <li>Submit medical assessment and incident report to USRA.</li>
                                    <li>USRA verifies the claim and communicates the next steps for support.</li>
                                </ol>
                                <Link to="/#contact" className="mt-8 inline-block w-full text-center bg-primary-red text-white font-semibold py-3 rounded-lg transition-colors duration-300 hover:bg-dark-red">
                                    Contact USRA for Assistance
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};


// --- Photos Page ---
export const PhotosPage: React.FC = () => {
    return (
        <>
            <section className="bg-gradient-to-br from-dark-red to-primary-red text-white pt-32 pb-20">
                <div className="container mx-auto px-4 text-center" data-aos="fade-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Photo Collections</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">Explore our complete collection of USRA rugby photos from tournaments, training, and events.</p>
                </div>
            </section>
            
            <section className="py-20 bg-light-gray">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PHOTO_COLLECTIONS.map((collection, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="p-8 text-center border-b-4 border-primary-red">
                                    <div className="w-20 h-20 mx-auto bg-primary-red/10 text-primary-red rounded-full flex items-center justify-center mb-4">
                                       <i className={`fas ${collection.icon} text-3xl`}></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-dark-gray">{collection.title}</h3>
                                    <p className="text-gray-500 mt-2 text-sm">{collection.description}</p>
                                </div>
                                <div className="p-6 bg-gray-50">
                                     <div className="flex justify-between text-sm text-gray-600 mb-4">
                                        <span><i className="fas fa-images mr-1"></i> {collection.count}</span>
                                        <span><i className="fas fa-calendar mr-1"></i> {collection.date}</span>
                                    </div>
                                    <a href={collection.link} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-primary-red text-white font-semibold py-3 rounded-lg transition-colors duration-300 hover:bg-dark-red">
                                        <i className="fab fa-google mr-2"></i> View on Google Photos
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};