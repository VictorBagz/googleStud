import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { databases, account, ID, Permission, Role } from '../appwriteClient';
import { useAuth } from '../AuthContext';

// --- Appwrite Configuration ---
const DATABASE_ID = '68d0cd0b0020a3ac602d'; 
const SCHOOLS_COLLECTION_ID = 'schools'; 

// --- Registration Page ---
export const RegistrationPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const initialFormData = {
        schoolName: '', centerNumber: '', schoolEmail: '', schoolPhone1: '',
        region: '', district: '', adminFullName: '', nin: '', role: '',
        contact1: '', password: '', termsAccept: false,
    };
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 3));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.termsAccept) {
            setErrorMessage("You must accept the terms and conditions to proceed.");
            return;
        }
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            // 1. Create Appwrite Auth User
            const newUser = await account.create(
                ID.unique(),
                formData.schoolEmail,
                formData.password,
                formData.adminFullName
            );

            // 2. Define permissions for the new user
            const permissions = [
                Permission.read(Role.user(newUser.$id)),
                Permission.update(Role.user(newUser.$id)),
                Permission.delete(Role.user(newUser.$id)),
            ];

            // 3. Create associated school document with permissions
            const { termsAccept, password, ...schoolData } = formData;
            await databases.createDocument(
                DATABASE_ID,
                SCHOOLS_COLLECTION_ID,
                newUser.$id, 
                schoolData,
                permissions // Grant the new user access to their own document
            );
            
            // 4. Log the new user in
            await login(formData.schoolEmail, formData.password);

            setSuccessMessage('Registration successful! Redirecting to your dashboard...');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);


        } catch (error: any) {
            console.error('Appwrite registration error:', error);
            setErrorMessage(error.message || 'Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const progressPercentage = useMemo(() => {
        return ((step - 1) / 2) * 100;
    }, [step]);

    return (
        <>
            <section className="bg-gradient-to-br from-dark-red to-primary-red text-white pt-32 pb-16">
                <div className="container mx-auto px-4 text-center" data-aos="fade-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">School Registration</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">Join USRA and become part of Uganda's growing school rugby community.</p>
                </div>
            </section>

            <section className="py-20 bg-light-gray">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10">
                        {/* Status Messages */}
                        {successMessage && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md" role="alert"><p>{successMessage}</p></div>}
                        {errorMessage && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert"><p>{errorMessage}</p></div>}

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between mb-2 text-sm font-medium text-gray-600">
                                <span>School Info</span>
                                <span>Representative</span>
                                <span>Submit</span>
                            </div>
                             <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-gradient-to-r from-primary-red to-secondary-yellow h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {step === 1 && (
                                <div data-aos="fade-in">
                                    <h3 className="text-2xl font-bold text-primary-red mb-6 text-center">Step 1: School Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input name="schoolName" value={formData.schoolName} placeholder="School Name *" onChange={handleInputChange} className="p-3 border rounded-lg" required/>
                                        <input name="centerNumber" value={formData.centerNumber} placeholder="School Centre Number *" onChange={handleInputChange} className="p-3 border rounded-lg" required/>
                                        <input name="schoolEmail" value={formData.schoolEmail} type="email" placeholder="School Email *" onChange={handleInputChange} className="p-3 border rounded-lg" required/>
                                        <input name="schoolPhone1" value={formData.schoolPhone1} type="tel" placeholder="Primary Contact *" onChange={handleInputChange} className="p-3 border rounded-lg" required/>
                                        <select name="region" value={formData.region} onChange={handleInputChange} className="p-3 border rounded-lg" required>
                                            <option value="">Select Region *</option>
                                            <option>Central</option><option>Eastern</option><option>Northern</option><option>Western</option>
                                        </select>
                                        <input name="district" value={formData.district} placeholder="District *" onChange={handleInputChange} className="p-3 border rounded-lg" required/>
                                    </div>
                                </div>
                            )}
                             {step === 2 && (
                                <div data-aos="fade-in">
                                    <h3 className="text-2xl font-bold text-primary-red mb-6 text-center">Step 2: Representative Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input name="adminFullName" value={formData.adminFullName} placeholder="Full Name *" onChange={handleInputChange} className="p-3 border rounded-lg" required />
                                        <input name="nin" value={formData.nin} placeholder="National ID Number (NIN) *" onChange={handleInputChange} className="p-3 border rounded-lg" required/>
                                        <input name="role" value={formData.role} placeholder="Role/Position *" onChange={handleInputChange} className="p-3 border rounded-lg" required/>
                                        <input name="contact1" value={formData.contact1} type="tel" placeholder="Primary Contact *" onChange={handleInputChange} className="p-3 border rounded-lg" required/>
                                        <input name="password" value={formData.password} type="password" placeholder="Password for Sign In *" onChange={handleInputChange} className="md:col-span-2 p-3 border rounded-lg" required/>
                                    </div>
                                </div>
                            )}
                             {step === 3 && (
                                <div data-aos="fade-in">
                                     <h3 className="text-2xl font-bold text-primary-red mb-6 text-center">Step 3: Review & Submit</h3>
                                    <div className="bg-light-gray p-6 rounded-lg space-y-2 mb-6">
                                        <p><strong>School:</strong> {formData.schoolName}</p>
                                        <p><strong>Email:</strong> {formData.schoolEmail}</p>
                                        <p><strong>Region:</strong> {formData.region}</p>
                                        <p><strong>Rep. Name:</strong> {formData.adminFullName}</p>
                                    </div>
                                    <label className="flex items-center space-x-3">
                                        <input type="checkbox" name="termsAccept" checked={formData.termsAccept} onChange={handleInputChange} className="h-5 w-5" required/>
                                        <span className="text-gray-700">I confirm all information is accurate and agree to USRA's terms.</span>
                                    </label>
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t flex justify-between items-center">
                                {step > 1 ? <button type="button" onClick={prevStep} className="px-6 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold">Previous</button> : <div></div>}
                                
                                {step < 3 && <button type="button" onClick={nextStep} className="px-6 py-2 rounded-lg bg-primary-red text-white font-semibold">Next</button>}
                                {step === 3 && (
                                    <button type="submit" className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold disabled:bg-green-300 flex items-center justify-center" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : (
                                            'Submit Registration'
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};


// --- Sign In Page ---
export const SignInPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to sign in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-light-gray pt-20">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 m-4" data-aos="fade-up">
                <div className="text-center mb-8">
                     <img src="/photos/usraLogo.png" alt="USRA Logo" className="mx-auto h-16 w-auto" />
                     <h2 className="mt-6 text-3xl font-extrabold text-dark-gray">Administrator Sign In</h2>
                     <p className="mt-2 text-sm text-gray-600">Access your school's dashboard</p>
                </div>
                <form className="space-y-6" onSubmit={handleSignIn}>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input id="email" name="email" type="email" autoComplete="email" required 
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-red focus:border-primary-red" 
                               placeholder="Email address" 
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" required 
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-red focus:border-primary-red" 
                               placeholder="Password" 
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary-red hover:text-dark-red">Forgot your password?</a>
                        </div>
                    </div>
                    <div>
                         <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-red hover:bg-dark-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-red disabled:bg-red-300">
                            {loading ? 'Signing In...' : 'Sign in'}
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Not registered?{' '}
                    <Link to="/registration" className="font-medium text-primary-red hover:text-dark-red">
                        Register your school
                    </Link>
                </p>
            </div>
        </div>
    );
};