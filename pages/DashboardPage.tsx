import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { databases } from '../appwriteClient';
import { Models } from 'appwrite';

// --- Appwrite Configuration ---
const DATABASE_ID = '68d0cd0b0020a3ac602d'; 
const SCHOOLS_COLLECTION_ID = 'schools'; 

// FIX: Changed interface to a type to correctly extend Models.Document
type SchoolData = Models.Document & {
    schoolName: string;
    centerNumber: string;
    schoolEmail: string;
    schoolPhone1: string;
    region: string;
    district: string;
    adminFullName: string;
    nin: string;
    role: string;
    contact1: string;
    address?: string;
};

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-screen bg-light-gray">
        <div className="w-16 h-16 border-4 border-primary-red border-dashed rounded-full animate-spin"></div>
    </div>
);

export const DashboardPage: React.FC = () => {
    const { currentUser } = useAuth();
    const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchSchoolData = async () => {
            if (!currentUser) {
                setError("No user session found. Please sign in.");
                setLoading(false);
                return;
            }

            try {
                const document = await databases.getDocument(
                    DATABASE_ID,
                    SCHOOLS_COLLECTION_ID,
                    currentUser.$id
                );
                // FIX: Cast to 'unknown' first to resolve the TypeScript casting error.
                // The document from Appwrite has the expected SchoolData shape, but its
                // base type does not sufficiently overlap for a direct cast.
                setSchoolData(document as unknown as SchoolData);
            } catch (err) {
                console.error("Failed to fetch school data:", err);
                setError("Could not retrieve school data. Please ensure your school is fully registered.");
            } finally {
                setLoading(false);
            }
        };

        fetchSchoolData();
    }, [currentUser]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error || !schoolData) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-light-gray pt-20">
                 <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                    <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                    <h2 className="text-2xl font-bold text-dark-gray">Error Loading Dashboard</h2>
                    <p className="text-gray-600 mt-2">{error || "No school data found for this account."}</p>
                </div>
            </div>
        );
    }
    
    const registrationDate = new Date(schoolData.$createdAt).getFullYear();

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Profile Header */}
            <header className="bg-gradient-to-r from-red-700 to-red-900 text-white py-16">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center" data-aos="fade-up">
                        <div className="md:w-1/4 flex justify-center mb-8 md:mb-0">
                            <div className="relative">
                                <img src={`/photos/school-badge-placeholder.png`} alt={`${schoolData.schoolName} Badge`} className="w-40 h-40 rounded-full border-4 border-white shadow-lg"/>
                                <span className="absolute bottom-0 right-0 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white">VERIFIED</span>
                            </div>
                        </div>
                        <div className="md:w-3/4 md:pl-12 text-center md:text-left">
                            <h1 className="text-4xl font-bold mb-2">{schoolData.schoolName}</h1>
                            <p className="text-xl mb-4">Member since {registrationDate} | Center Number: {schoolData.centerNumber}</p>
                             <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">Active Member</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">Region: {schoolData.region}</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">District: {schoolData.district}</span>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-6 opacity-90">
                                <div className="flex items-center"><i className="fas fa-phone mr-2"></i><span>{schoolData.schoolPhone1}</span></div>
                                <div className="flex items-center"><i className="fas fa-envelope mr-2"></i><span>{schoolData.schoolEmail}</span></div>
                                {schoolData.address && <div className="flex items-center"><i className="fas fa-map-pin mr-2"></i><span>{schoolData.address}</span></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar */}
                    <aside className="lg:w-1/4 space-y-8">
                         <div className="bg-white rounded-xl shadow-md p-6" data-aos="fade-right">
                             <h3 className="text-xl font-bold mb-4 text-red-700">Quick Stats</h3>
                             <div className="space-y-4">
                                <div className="flex items-center bg-gray-50 p-4 rounded-lg"><div className="p-3 bg-red-100 rounded-full mr-4"><i className="fas fa-users text-red-700"></i></div><div><p className="text-gray-500">Players</p><p className="text-2xl font-bold">48</p></div></div>
                                <div className="flex items-center bg-gray-50 p-4 rounded-lg"><div className="p-3 bg-red-100 rounded-full mr-4"><i className="fas fa-trophy text-red-700"></i></div><div><p className="text-gray-500">Trophies</p><p className="text-2xl font-bold">5</p></div></div>
                                <div className="flex items-center bg-gray-50 p-4 rounded-lg"><div className="p-3 bg-red-100 rounded-full mr-4"><i className="fas fa-calendar-check text-red-700"></i></div><div><p className="text-gray-500">Upcoming</p><p className="text-2xl font-bold">3</p></div></div>
                             </div>
                         </div>
                         <div className="bg-white rounded-xl shadow-md p-6" data-aos="fade-right" data-aos-delay="100">
                            <h3 className="text-xl font-bold mb-4 text-red-700">School Representative</h3>
                             <div className="flex items-center mb-4">
                                <img src="/photos/default-avatar.png" alt="Representative" className="w-16 h-16 rounded-full mr-4 border-2 border-red-200"/>
                                <div>
                                    <h4 className="font-semibold">{schoolData.adminFullName}</h4>
                                    <p className="text-gray-600 text-sm">{schoolData.role}</p>
                                </div>
                            </div>
                             <div className="space-y-3 text-sm">
                                <div className="flex items-center"><i className="fas fa-phone text-red-600 mr-2 w-5"></i><span>{schoolData.contact1}</span></div>
                                <div className="flex items-center"><i className="fas fa-envelope text-red-600 mr-2 w-5"></i><span>{currentUser.email}</span></div>
                                <div className="flex items-center"><i className="fas fa-id-card text-red-600 mr-2 w-5"></i><span>NIN: {schoolData.nin}</span></div>
                            </div>
                         </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="lg:w-3/4">
                        {/* Navigation Tabs */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8" data-aos="fade-up">
                            <div className="flex flex-col md:flex-row">
                                {['overview', 'teams', 'achievements', 'events', 'settings'].map(tab => (
                                    <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-6 text-left font-medium flex items-center transition-all duration-300 ${activeTab === tab ? 'text-red-700 bg-red-50 border-l-4 border-red-700' : 'text-gray-600 hover:text-red-700 hover:bg-red-50'}`}>
                                        <i className={`fas fa-${{overview:'info-circle', teams:'users', achievements:'trophy', events:'calendar', settings:'cog'}[tab]} mr-2`}></i> {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'overview' && (
                            <section className="bg-white rounded-xl shadow-md p-8" data-aos="fade-up" data-aos-delay="100">
                                <h2 className="text-2xl font-bold mb-6 text-red-700 border-b pb-2">School Overview</h2>
                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-gray-800">About Our Rugby Program</h3>
                                        <p className="text-gray-600 leading-relaxed">Our school has a proud tradition in rugby, focusing on skill, discipline, and sportsmanship. We actively participate in USRA events and aim to develop future national talent.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Facilities</h3>
                                        <ul className="space-y-2 text-gray-600">
                                            <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Regulation-size rugby field</li>
                                            <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Weight training room</li>
                                            <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Medical support staff</li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Supporting Documents</h3>
                                    <div className="flex flex-wrap gap-4">
                                        <a href="#" className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"><i className="fas fa-file-alt text-red-600 mr-2"></i> TMIS Certificate</a>
                                    </div>
                                </div>
                            </section>
                        )}
                         {activeTab !== 'overview' && (
                            <div className="bg-white rounded-xl shadow-md p-8 text-center" data-aos="fade-up">
                                <i className={`fas fa-${{teams:'users', achievements:'trophy', events:'calendar', settings:'cog'}[activeTab]} text-4xl text-gray-300 mb-4`}></i>
                                <h3 className="text-xl font-bold text-gray-700">Coming Soon</h3>
                                <p className="text-gray-500 mt-2">The "{activeTab}" section is under construction.</p>
                            </div>
                         )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;