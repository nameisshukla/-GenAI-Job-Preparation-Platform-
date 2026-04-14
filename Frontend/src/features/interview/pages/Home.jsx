import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FileText, Briefcase, User, UploadCloud, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { interviewApi } from '../services/api';
import './Home.scss';

const Home = () => {
    const navigate = useNavigate();
    const [jobDescription, setJobDescription] = useState('');
    const [selfDescription, setSelfDescription] = useState('');
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResume(e.target.files[0]);
        }
    };

    const handleGenerate = async () => {
        if (!resume || !jobDescription || !selfDescription) {
            alert('Please fill in all fields and upload your resume.');
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('resume', resume);
            formData.append('jobDescription', jobDescription);
            formData.append('selfDescription', selfDescription);

            const result = await interviewApi.generateReport(formData);
            
            // Assuming the result contains the generated interviewReport
            if (result && result.interviewReport && result.interviewReport._id) {
                navigate(`/dashboard/${result.interviewReport._id}`);
            } else {
                alert('Success, but no ID returned to navigate.');
            }
        } catch (error) {
            console.error('Error generating report:', error);
            alert('Oh no! Failed to generate report. Make sure backend is running and you are authenticated.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='home-page'>
            <motion.div 
                className='left-content'
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="badge">
                    <Sparkles /> Powered by Gemini 2.5 AI
                </div>
                <h1>Ace your next interview with <span>AI Precision</span></h1>
                <p>
                    Upload your resume and provide the job description. Our advanced AI will evaluate your fit, finding skill gaps, predicting technical and behavioral questions, and generating a customized 5-day prep plan.
                </p>
            </motion.div>

            <motion.div 
                className='right-content'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className='form-card glass-panel'>
                    <div className='input-group'>
                        <label htmlFor="jobDescription"><Briefcase /> Job Description</label>
                        <textarea 
                            id="jobDescription"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the target job description here..."
                        />
                    </div>

                    <div className='input-group'>
                        <label htmlFor="selfDescription"><User /> Self Description</label>
                        <textarea 
                            id="selfDescription"
                            value={selfDescription}
                            onChange={(e) => setSelfDescription(e.target.value)}
                            placeholder="Describe your current status, years of experience, and strengths..."
                        />
                    </div>

                    <div className='input-group'>
                        <label><FileText /> Upload Resume (PDF)</label>
                        <label className='file-upload'>
                            <input 
                                type="file" 
                                accept='.pdf' 
                                onChange={handleFileChange}
                            />
                            <div className="upload-content">
                                <UploadCloud />
                                <span>{resume ? resume.name : 'Click or drag to upload PDF'}</span>
                            </div>
                        </label>
                    </div>

                    <button 
                        className='btn-primary' 
                        onClick={handleGenerate}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="loader" /> Generating Analysis...
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} /> Generate Interview Report
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </main>
    )
}

export default Home;