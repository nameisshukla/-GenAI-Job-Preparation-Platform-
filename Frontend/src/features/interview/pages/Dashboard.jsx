import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DownloadCloud, Target, Briefcase, Zap, HelpCircle, Loader2, Calendar } from 'lucide-react';
import { interviewApi } from '../services/api';
import './Dashboard.scss';

const Dashboard = () => {
    const { interviewId } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [activeTab, setActiveTab] = useState('technical');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await interviewApi.getReport(interviewId);
                setReport(data.interviewReport);
            } catch (error) {
                console.error("Failed to fetch report:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [interviewId]);

    const handleDownloadPdf = async () => {
        setDownloading(true);
        try {
            const blob = await interviewApi.downloadResumePdf(interviewId);
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Tailored_Resume.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Failed to download PDF", error);
            alert("Error downloading PDF");
        } finally {
            setDownloading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-page">
                <div className="loading-container">
                    <Loader2 size={48} className="loader" />
                    <p>Loading your personalized insights...</p>
                </div>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="dashboard-page">
                <h2>Report not found or error occurred.</h2>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div className="header-info">
                    <h1>Interview <span>Intelligence</span> Report</h1>
                    <p><Briefcase size={18} /> Role: {report.title || 'Not specified'}</p>
                </div>
                <button 
                    className="btn-download" 
                    onClick={handleDownloadPdf}
                    disabled={downloading}
                >
                    {downloading ? <Loader2 className="loader" size={20} /> : <DownloadCloud size={20} />}
                    {downloading ? 'Processing PDF...' : 'Download Tailored AI Resume'}
                </button>
            </header>

            <div className="dashboard-grid">
                {/* Left Panel */}
                <div className="overview-panel">
                    <motion.div 
                        className="score-card glass-panel"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div 
                            className="score-circle" 
                            style={{ '--score-deg': `${(report.matchScore || 0) * 3.6}deg` }}
                        >
                            <div className="score-value">
                                {report.matchScore}<span>%</span>
                            </div>
                        </div>
                        <h3>Match Score</h3>
                        <p>Your alignment with the job description based on required skills & experience.</p>
                    </motion.div>

                    <motion.div 
                        className="skills-card glass-panel"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3><Zap size={20} /> Identified Skill Gaps</h3>
                        <div className="skills-list">
                            {report.skillGaps?.map((gap, i) => (
                                <span key={i} className={`skill-tag severity-${gap.severity.toLowerCase()}`}>
                                    {gap.skill}
                                </span>
                            ))}
                            {(!report.skillGaps || report.skillGaps.length === 0) && (
                                <span className="skill-tag severity-low">No major skill gaps found!</span>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Right Panel */}
                <motion.div 
                    className="details-panel glass-panel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="tabs-nav">
                        <button 
                            className={activeTab === 'technical' ? 'active' : ''} 
                            onClick={() => setActiveTab('technical')}
                        >
                            Technical Questions
                        </button>
                        <button 
                            className={activeTab === 'behavioral' ? 'active' : ''} 
                            onClick={() => setActiveTab('behavioral')}
                        >
                            Behavioral
                        </button>
                        <button 
                            className={activeTab === 'prep' ? 'active' : ''} 
                            onClick={() => setActiveTab('prep')}
                        >
                            Prep Plan
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'technical' && (
                            <div className="questions-list">
                                {report.technicalQuestions?.map((q, i) => (
                                    <div key={i} className="question-card">
                                        <h4><HelpCircle size={20} className="text-accent" /> {q.question}</h4>
                                        <p className="intention"><strong>Intent:</strong> {q.intention}</p>
                                        <div className="answer"><strong>Suggested Approach:</strong> {q.answer}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'behavioral' && (
                            <div className="questions-list">
                                {report.behavioralQuestions?.map((q, i) => (
                                    <div key={i} className="question-card">
                                        <h4><HelpCircle size={20} className="text-accent" /> {q.question}</h4>
                                        <p className="intention"><strong>Intent:</strong> {q.intention}</p>
                                        <div className="answer"><strong>Suggested Approach:</strong> {q.answer}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'prep' && (
                            <div className="prep-timeline">
                                {report.preparationPlan?.map((plan, i) => (
                                    <div key={i} className="prep-plan-day">
                                        <div className="day-badge">D{plan.day}</div>
                                        <div className="day-content">
                                            <h4>{plan.focus}</h4>
                                            <ul>
                                                {plan.tasks?.map((task, j) => (
                                                    <li key={j}>{task}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
