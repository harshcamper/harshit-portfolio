import React, { useState, useEffect, useRef } from 'react';

// --- ICONS ---
const LinkedinIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="transition-colors duration-300 group-hover:fill-cyan-400"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> );
const MailIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg> );
const PhoneIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> );
const SparkleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 3L9.27 9.27L3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73L12 3z"/><path d="M3 21l1.64-1.64"/><path d="M21 3l-1.64 1.64"/></svg> );

// --- Reusable Components & Hooks ---
const AnimatedSection = ({ children, className = '', id }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);
    return ( <section id={id} ref={ref} className={`py-20 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}><div className="max-w-6xl mx-auto">{children}</div></section> );
};

const useGlow = (ref) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const handleMouseMove = (e) => { const rect = element.getBoundingClientRect(); element.style.setProperty('--glow-x', `${e.clientX - rect.left}px`); element.style.setProperty('--glow-y', `${e.clientY - rect.top}px`); element.style.setProperty('--glow-opacity', '1'); };
        const handleMouseLeave = () => element.style.setProperty('--glow-opacity', '0');
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
        return () => { element.removeEventListener('mousemove', handleMouseMove); element.removeEventListener('mouseleave', handleMouseLeave); };
    }, [ref]);
};

const SectionTitle = ({ children }) => ( <h2 className="text-4xl font-bold text-center text-white mb-12">{children.split(' ').map((word, i) => <span key={i} className={i === 1 ? 'text-cyan-400' : ''}>{word} </span>)}</h2> );

// --- Main Page Sections ---
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => { const handleScroll = () => setIsScrolled(window.scrollY > 10); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);
    
    const navLinks = [ { href: '#synergy', label: 'Synergy' }, { href: '#experience', label: 'Experience' }, { href: '#projects', label: 'Projects' }, { href: '#education', label: 'Education' }, { href: '#contact', label: 'Contact' } ];

    const handleNavClick = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return ( 
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
            <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <a href="#hero" onClick={handleNavClick} className="text-2xl font-bold text-white">HG<span className="text-cyan-400">.</span></a>
                <ul className="hidden md:flex space-x-8">
                    {navLinks.map(link => ( 
                        <li key={link.href}>
                            <a href={link.href} onClick={handleNavClick} className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">{link.label}</a>
                        </li> 
                    ))}
                </ul>
            </nav>
        </header> 
    );
};

const Hero = () => {
    const titles = [
        "Product Manager",
        "Product Strategist",
        "UX Advocate",
        "Agile Delivery Lead",
        "GTM Specialist",
        "CSPO",
        "Product Marketing Manager"
    ];
    const [titleIndex, setTitleIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const getInTouchBtnRef = useRef(null);
    const downloadCvBtnRef = useRef(null);
    useGlow(getInTouchBtnRef);
    useGlow(downloadCvBtnRef);

    useEffect(() => {
        const intervalId = setInterval(() => { setIsFading(true); setTimeout(() => { setTitleIndex((prev) => (prev + 1) % titles.length); setIsFading(false); }, 500); }, 3000);
        return () => clearInterval(intervalId);
    }, [titles.length]);

    return (
        <section id="hero" className="min-h-screen flex items-center bg-gray-900 px-4 py-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16">
                <div className="text-center md:text-left order-2 md:order-1">
                    <p className="text-lg text-cyan-400 mb-1">Hi I am</p>
                    <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">Harshit Govindarajan</h1>
                    <h2 className={`text-2xl md:text-3xl font-light text-cyan-400 mt-4 mb-8 h-10 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>{titles[titleIndex]}</h2>
                    <p className="text-lg text-gray-400 mb-8">With 39 months of experience in product ownership, I specialize in leading cross-functional teams, driving digital transformations, and solving complex business challenges.</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <a ref={getInTouchBtnRef} href="#contact" className="glow-effect px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105">Get In Touch</a>
                        <a ref={downloadCvBtnRef} href="/infosys.docx" download="Harshit_Govindarajan_Resume.docx" className="glow-effect px-6 py-3 border-2 border-cyan-500 text-cyan-500 font-semibold rounded-lg shadow-lg hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-105">Download Resume</a>
                    </div>
                </div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto order-1 md:order-2">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse-slow blur-xl"></div>
                    <div className="absolute inset-0 rounded-full animate-spin-slow" style={{ background: 'conic-gradient(from 180deg at 50% 50%, #00c6ff, #0072ff, #e000ff, #ff00a0, #00c6ff)' }}></div>
                    <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
                        <img src="https://i.imgur.com/39Yg2tS.png" alt="A professional headshot of Harshit Govindarajan, smiling, in a suit and tie." className="w-full h-full object-cover rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const Synergy = () => {
    const [jobDesc, setJobDesc] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const resumeContext = `Harshit Govindarajan is a Product Management Professional (CSPO®) with 39 months of experience. He worked at Kofluence Tech Ltd from Jan 2021 to Apr 2024. Key achievements include leading a mobile app to 1M+ downloads with 88% retention, implementing an AI/ML software generating over ₹320 crore annually, and developing a finance interface for 100,000+ creators. He has a PGPM from Great Lakes Institute of Management and a BBA in Marketing from Christ University. His skills include Stakeholder Management, Data Analytics, Scrum, SEO/ASO, Market Research, UI/UX, and tools like Python, SQL, Power BI, and Jira.`;

    const handleSubmit = async () => {
        if (!jobDesc.trim()) return;
        setIsLoading(true);
        setAnalysis(null);

        const prompt = `Based on my resume context, evaluate my fit for the following job description. My resume context: "${resumeContext}". Job Description: "${jobDesc}". Provide a synergy score from 0 to 100 and a brief justification for why I am a good fit, highlighting key matching skills and experiences.`;
        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: { type: "OBJECT", properties: { "synergyScore": { type: "NUMBER" }, "justification": { type: "STRING" } } }
            }
        };

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error("API key is missing. Please set VITE_GEMINI_API_KEY in your environment variables.");
            }
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            
            if (!response.ok) {
                const errorBody = await response.json();
                console.error("API Error Response:", errorBody);
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();

            if (!result.candidates || result.candidates.length === 0) {
                console.error("Invalid API response structure:", result);
                throw new Error("No candidates returned from API.");
            }

            const jsonText = result.candidates[0].content.parts[0].text;
            setAnalysis(JSON.parse(jsonText));
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            setAnalysis({ error: "Could not generate analysis. Please ensure the API key is set correctly and try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatedSection id="synergy" className="bg-gray-800/50">
            <SectionTitle>AI Synergy Check</SectionTitle>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">Paste a job description below to see how my skills and experience align with the role, powered by AI.</p>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} placeholder="Paste job description here..." className="w-full h-40 bg-gray-800 text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-gray-700"></textarea>
                <button onClick={handleSubmit} disabled={isLoading} className="glow-effect mt-4 w-full px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-600 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center">
                    {isLoading ? <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : <><SparkleIcon /> Analyze Synergy</>}
                </button>
            </div>
            {analysis && (
                <div className="mt-8 bg-gray-900 p-6 rounded-lg border border-gray-700">
                    {analysis.error ? <p className="text-red-400">{analysis.error}</p> :
                        <>
                            <h3 className="text-2xl font-bold text-white text-center mb-4">Synergy Score</h3>
                            <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center bg-cyan-500/20 border-4 border-cyan-500 mb-4">
                                <span className="text-4xl font-bold text-cyan-300">{analysis.synergyScore}%</span>
                            </div>
                            <h4 className="text-xl font-semibold text-white mb-2">Justification:</h4>
                            <p className="text-gray-300">{analysis.justification}</p>
                        </>
                    }
                </div>
            )}
        </AnimatedSection>
    );
};

const Experience = () => {
    const experience = { 
        role: 'Product Owner', 
        company: 'Kofluence Tech Ltd', 
        date: 'JAN 2021 – APR 2024', 
        points: [
            "<strong>End-to-End B2C App Ownership:</strong> Led the mobile app lifecycle from ideation (user interviews, market research, journey mapping) to launch, achieving 1M+ downloads and 100K+ MAU by focusing on user engagement and retention.",
            "<strong>Performance Marketing Platform:</strong> Headed development of a campaign management platform (CPC, CPA, CPM), integrating Affise and Appsflyer for analytics and Cashfree for automated payouts.",
            "<strong>Agile Sprint Management:</strong> Managed product sprints using Scrum in Azure DevOps and Jira, conducting standups, backlog grooming, and UAT to ensure timely, high-quality delivery.",
            "<strong>Product Documentation & Wireframing:</strong> Authored PRDs, defined product vision, and translated requirements into user stories. Designed prototypes and user flows in Figma, Miro, and Whimsical.",
            "<strong>Marketing Automation Strategy:</strong> Led the implementation of an omnichannel marketing system (WhatsApp, Email, SMS, Push) using CleverTap and MoEngage to craft personalized customer journeys.",
            "<strong>Advanced Analytics & Data Integration:</strong> Enabled advanced analytics by integrating data from Meta, YouTube, and Google Analytics. Built real-time dashboards for business stakeholders.",
            "<strong>DIY SaaS Martech Platform:</strong> Collaborated on a self-serve tool for D2C brands to manage influencer campaigns, reducing campaign setup TAT from 4 days to under 2 hours for 30+ brands.",
            "<strong>AI-Driven WhatsApp Bot:</strong> Designed and launched an AI-powered WhatsApp bot with Gupshup to handle customer queries, automating responses for 350+ queries daily.",
            "<strong>Product Vision & Roadmap:</strong> Partnered with leadership to shape product strategy, define quarterly roadmaps, and align feature prioritization with business objectives.",
            "<strong>Internal Operations Transformation:</strong> Launched an AI-enabled system that automated workflows for 200+ monthly campaigns, successfully onboarding and training over 200 employees.",
            "<strong>Go-to-Market Strategy:</strong> Executed GTM strategies for a new mobile app, including SEO, social media ads, and ASO, achieving a 4.5-star app rating.",
            "<strong>Customer Support System:</strong> Built a live support interface using Sendgrid and Gupshup and created a Gitbook knowledge base to streamline query resolution.",
            "<strong>Standardized Testing Workflows:</strong> Worked with the QA team to define test plans, establish regression testing cycles, and streamline defect reporting to ensure product quality."
        ] 
    };

    return (
        <AnimatedSection id="experience" className="bg-gray-900">
            <SectionTitle>Work Experience</SectionTitle>
            <div className="relative border-l-2 border-cyan-500/30 pl-10">
                <div className="relative">
                    <div className="absolute -left-[49px] top-1 w-4 h-4 bg-cyan-500 rounded-full border-4 border-gray-900"></div>
                    <h3 className="text-2xl font-semibold text-cyan-400">{experience.role}</h3>
                    <p className="text-gray-400 font-medium my-1">{experience.company} | {experience.date}</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-3 mt-4">
                        {experience.points.map((point, i) => 
                            <li key={i} dangerouslySetInnerHTML={{ __html: point }}></li>
                        )}
                    </ul>
                </div>
            </div>
        </AnimatedSection>
    );
};

const Projects = () => {
    const projects = [
        { title: "Kofluence Influencer Mobile App", description: "Owned the end-to-end development of the Kofluence mobile application, scaling it from concept to over 1 million downloads.", link: "#" },
        { title: "AI-Driven Internal Management Software", description: "Spearheaded the implementation of an AI/ML-driven internal management software, enabling seamless execution of 200+ marketing campaigns/month.", link: "#" },
        { title: "Finance & Payments Interface", description: "Developed a dedicated interface for the finance team, focusing on process optimization for over 100,000 content creators annually.", link: "#" }
    ];
    return (
        <AnimatedSection id="projects" className="bg-gray-900">
            <SectionTitle>My Projects</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
            </div>
        </AnimatedSection>
    );
};

const ProjectCard = ({ title, description, link }) => {
    const cardRef = useRef(null);
    useGlow(cardRef);
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        const handleMouseMoveTilt = (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / (width / 2);
            const y = (e.clientY - top - height / 2) / (height / 2);
            card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.05, 1.05, 1.05)`;
        };
        const handleMouseLeaveTilt = () => card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
        card.addEventListener('mousemove', handleMouseMoveTilt);
        card.addEventListener('mouseleave', handleMouseLeaveTilt);
        return () => { card.removeEventListener('mousemove', handleMouseMoveTilt); card.removeEventListener('mouseleave', handleMouseLeaveTilt); };
    }, []);
    return (
        <div ref={cardRef} className="glow-effect bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg transition-transform duration-300" style={{ transformStyle: 'preserve-3d' }}>
            <div className="h-48 bg-gray-700 flex items-center justify-center"><span className="text-gray-500">Project Image</span></div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">{title}</h3>
                <p className="text-gray-400 mb-4">{description}</p>
                <a href={link} className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors opacity-50 cursor-not-allowed">View Project &rarr;</a>
            </div>
        </div>
    );
};

const Tools = () => {
    const tools = [
        // Priority Tools
        { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/FFFFFF' },
        { name: 'Jira', icon: 'https://cdn.simpleicons.org/jira/FFFFFF' },
        { name: 'Miro', icon: 'https://cdn.simpleicons.org/miro/FFFFFF' },
        { name: 'Whimsical', icon: 'https://www.svgrepo.com/show/354572/whimsical.svg', invert: true },
        { name: 'CleverTap', icon: 'https://cdn.simpleicons.org/clevertap/FFFFFF' },
        // Existing & New Tools
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python/FFFFFF' },
        { name: 'SQL', icon: 'https://cdn.simpleicons.org/postgresql/FFFFFF' },
        { name: 'Power BI', icon: 'https://cdn.simpleicons.org/powerbi/FFFFFF' },
        { name: 'Tableau', icon: 'https://cdn.simpleicons.org/tableau/FFFFFF' },
        { name: 'Amplitude', icon: 'https://cdn.simpleicons.org/amplitude/FFFFFF' },
        { name: 'Mixpanel', icon: 'https://cdn.simpleicons.org/mixpanel/FFFFFF' },
        { name: 'Google Analytics', icon: 'https://cdn.simpleicons.org/googleanalytics/FFFFFF' },
        { name: 'AppsFlyer', icon: 'https://cdn.simpleicons.org/appsflyer/FFFFFF' },
        { name: 'Azure DevOps', icon: 'https://cdn.simpleicons.org/azuredevops/FFFFFF' },
        { name: 'Adobe', icon: 'https://cdn.simpleicons.org/adobe/FFFFFF' },
        { name: 'PowerPoint', icon: 'https://cdn.simpleicons.org/microsoftpowerpoint/FFFFFF' },
        { name: 'Excel', icon: 'https://cdn.simpleicons.org/microsoftexcel/FFFFFF' },
        { name: 'Notion', icon: 'https://cdn.simpleicons.org/notion/FFFFFF' },
    ];

    return (
        <AnimatedSection id="tools" className="bg-gray-900">
            <SectionTitle>My Toolkit</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {tools.map((tool) => (
                    <div key={tool.name} className="bg-gray-800/50 rounded-lg flex flex-col items-center justify-center p-6 transition-transform transform hover:scale-110">
                        <img 
                            src={tool.icon} 
                            alt={tool.name} 
                            className={`h-12 w-12 object-contain ${tool.invert ? 'filter invert' : ''}`} 
                        />
                        <span className="mt-4 text-white text-center">{tool.name}</span>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
};


const Education = () => {
    const education = [
        { degree: 'Post Graduate Program in Management (PGPM)', institution: 'Great Lakes Institute of Management, Chennai', date: '2024 - Present', note: 'Awarded: Dean’s List' },
        { degree: 'BBA (Marketing)', institution: 'Christ University, Bengaluru', date: 'Graduated March 2020', note: 'GPA: 3.49 / 4.0' }
    ];
    return (
        <AnimatedSection id="education" className="bg-gray-900">
            <SectionTitle>Education</SectionTitle>
            <div className="grid md:grid-cols-2 gap-8">
                {education.map((edu, index) => (
                    <div key={index} className="bg-gray-800/50 border border-gray-700/50 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold text-cyan-400">{edu.degree}</h3>
                        <p className="text-gray-400 my-1">{edu.institution}</p>
                        <p className="text-gray-500 text-sm mb-2">{edu.date}</p>
                        <p className="text-gray-300">{edu.note}</p>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
};

const Contact = () => (
    <AnimatedSection id="contact" className="bg-gray-900">
        <SectionTitle>Get In Touch</SectionTitle>
        <div className="text-center max-w-2xl mx-auto">
            <p className="text-lg text-gray-400 mb-8">I'm currently open to new opportunities in Product Management. If you have a project in mind or just want to connect, feel free to reach out. Let's create something amazing together!</p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                <a href="mailto:harshit.govindarajan@gmail.com" className="flex items-center text-lg text-gray-300 hover:text-cyan-400 transition-colors"><MailIcon />harshit.govindarajan@gmail.com</a>
                <a href="tel:+918867246327" className="flex items-center text-lg text-gray-300 hover:text-cyan-400 transition-colors"><PhoneIcon />+91 88672 46327</a>
            </div>
        </div>
    </AnimatedSection>
);

const Footer = () => ( <footer className="bg-gray-900 py-6 text-center text-gray-500"><p>&copy; {new Date().getFullYear()} Harshit Govindarajan. All rights reserved.</p></footer> );

// --- Main App Component ---
export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-gray-900 text-white font-sans">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                body { font-family: 'Poppins', sans-serif; }
                .glow-effect { position: relative; overflow: hidden; }
                .glow-effect::before { content: ''; position: absolute; left: var(--glow-x); top: var(--glow-y); transform: translate(-50%, -50%); width: 250px; height: 250px; background: radial-gradient(circle, rgba(0, 170, 255, 0.25) 0%, transparent 70%); opacity: var(--glow-opacity, 0); transition: opacity 0.3s ease-out; pointer-events: none; }
                @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                .animate-scroll { animation: scroll 40s linear infinite; }
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-spin-slow { animation: spin-slow 10s linear infinite; }
                @keyframes pulse-slow { 50% { opacity: 0.5; } }
                .animate-pulse-slow { animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fade-in-up 0.5s ease-out backwards; }
            `}</style>
            
            <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-gray-900 transition-opacity duration-500 ease-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="text-4xl md:text-6xl font-bold text-white flex flex-wrap justify-center p-4">
                    {'Welcome to'.split('').map((char, i) => <span key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>{char === ' ' ? '\u00A0' : char}</span>)}
                    <span className="w-4"></span>
                    {'HG.'.split('').map((char, i) => <span key={i} className="text-cyan-400 animate-fade-in-up" style={{ animationDelay: `${(i + 'Welcome to'.length) * 50}ms` }}>{char}</span>)}
                </div>
            </div>

            <div className={`transition-opacity duration-500 delay-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <Header />
                <main>
                    <Hero />
                    <Synergy />
                    <Experience />
                    <Projects />
                    <Tools />
                    <Education />
                    <Contact />
                </main>
                <Footer />
            </div>
        </div>
    );
}
