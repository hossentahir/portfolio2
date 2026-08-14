import { Helmet } from 'react-helmet-async';
import { FaGithub, FaLinkedin, FaEnvelope, FaGraduationCap, FaBriefcase, FaCode, FaCheckCircle, FaLaptopCode, FaAward } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export const About = () => {
  const experiences = [
    {
      role: 'Cofounder',
      company: 'SPC Academy',
      period: 'Dec 2024 - Current',
      description: 'ICT & Programming Instructor teaching programming fundamentals, web development, and problem solving.'
    },
    {
      role: 'Cofounder',
      company: 'সোনামণিদের প্রোগ্রামিং আড্ডা',
      period: 'Nov 2022 - Current',
      description: 'Community organizer hosting and conducting local coding contests to promote programming among youth.'
    },
    {
      role: 'Data Annotator',
      company: 'Quantigo AI, Dhaka',
      period: 'Oct 2024 - Nov 2024',
      description: 'Analyzed, labeled, and prepared high-quality dataset annotations to train and enhance machine learning models.'
    },
    {
      role: 'IT Executive Officer',
      company: 'Folon (Under ICT Division), Dhaka',
      period: 'Nov 2022 - Nov 2023',
      description: 'Developed and maintained organizational websites, diagnosed technical issues, monitored performance metrics, and provided technical user support.'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Software Engineering',
      institution: 'Daffodil International University, Dhaka',
      grade: 'CGPA: 3.7',
      details: 'Member of Software Engineering Club. Actively participating in national hackathons and robotics contests.'
    },
    {
      degree: 'Certificate of Higher Education (Science)',
      institution: 'Govt Bangabandhu College, Gopalganj',
      grade: 'GPA: 5.00',
      details: 'Completed Higher Secondary Certificate in Science with highest Distinction score.'
    },
    {
      degree: 'Foundation Degree in Science',
      institution: 'W.M High School, Mollahat, Bagerhat',
      grade: 'GPA: 4.83',
      details: 'Completed Secondary School Certificate in Science background.'
    }
  ];

  const skillGroups = [
    {
      category: 'Languages & Frameworks',
      skills: ['JavaScript', 'Java (Spring Boot)', 'C', 'C++', 'PHP', 'HTML', 'CSS (Bootstrap, Tailwind)', 'MERN Stack']
    },
    {
      category: 'Databases & Backend',
      skills: ['SQL', 'MySQL', 'MongoDB', 'Mongoose ORM']
    },
    {
      category: 'Software Quality Assurance (SQA)',
      skills: ['JMeter', 'Selenium IDE', 'Postman API Testing']
    },
    {
      category: 'Specializations & Certifications',
      skills: ['Prompt Engineering', 'IoT (Researcher)', 'Canva', 'Effective Communication', 'Certified Microsoft Office Specialist']
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Me | Sazzad Hossen - Software Engineering Student</title>
        <meta name="description" content="Learn about Sazzad Hossen, Software Engineering student at DIU (CGPA 3.7), Cofounder at SPC Academy, experience, skills, and projects." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            About <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Sazzad Hossen</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Software Engineering Student at Daffodil International University (CGPA 3.7) &amp; Full-Stack MERN Developer.
          </p>

          {/* Social Links Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="https://github.com/hossentahir"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all transform hover:-translate-y-0.5"
            >
              <FaGithub className="w-5 h-5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/sazzad-hossen-646bb0233/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#0A66C2] hover:bg-[#084e96] shadow-md shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <FaLinkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:sazzademon009@gmail.com"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5"
            >
              <FaEnvelope className="w-4 h-4" />
              <span>sazzademon009@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Bio Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 shadow-sm mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
              <FaLaptopCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Biography</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Who I Am &amp; What I Do</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            <p>
              I'm <strong className="text-slate-900 dark:text-white font-semibold">Sazzad Hossen</strong>, a Software Engineering student at <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">Daffodil International University (CGPA: 3.7)</strong> and a full-stack developer passionate about building practical, real-world solutions.
            </p>
            <p>
              I'm currently the Cofounder of <strong className="text-slate-900 dark:text-white font-semibold">SPC Academy</strong>, where I teach ICT and programming, and I also co-founded <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">'সোনামণিদের প্রোগ্রামিং আড্ডা'</strong> — a community that organizes local coding contests. Earlier, I worked as a <strong className="text-slate-900 dark:text-white font-semibold">Data Annotator at Quantigo AI</strong>, helping refine machine learning models, and as an <strong className="text-slate-900 dark:text-white font-semibold">IT Executive Officer at Folon</strong>, where I developed and maintained websites while providing technical support.
            </p>
            <p>
              I actively solve problems on competitive programming platforms like <strong className="text-slate-900 dark:text-white font-semibold">Codeforces, HackerRank, and AtCoder</strong>, and I've participated in <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">ICPC 2022, NASA Space Apps Challenge 2024</strong>, and the <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">National Robotics Championship 2025 (IoT category)</strong>, among others.
            </p>
            <p>
              My core stack includes <strong className="text-slate-900 dark:text-white font-semibold">JavaScript, HTML/CSS (Bootstrap, Tailwind), Java (Spring Boot), C/C++, PHP, SQL/MySQL</strong> — and I'm currently deep into the MERN stack. Beyond coding, I'm interested in IoT, prompt engineering, and effective communication.
            </p>
            <p className="italic font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border-l-4 border-indigo-600">
              "I believe in learning by building — every project on this site is something I made to solve a real problem or explore something new."
            </p>
          </div>
        </div>

        {/* Experience Section (Timeline) */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
              <FaBriefcase className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Professional Experience</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Roles &amp; Leadership</p>
            </div>
          </div>

          <div className="relative pl-6 md:pl-8 border-l-2 border-indigo-200 dark:border-indigo-900/60 space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-950 shadow-md" />
                
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {exp.role} <span className="text-indigo-600 dark:text-indigo-400">@ {exp.company}</span>
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
              <FaGraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Education</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Academic Credentials</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                      {edu.grade}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 leading-snug">
                    {edu.degree}
                  </h3>

                  <p className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
                    {edu.institution}
                  </p>

                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
              <FaCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Skills &amp; Expertise</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Technical Stack &amp; Tools</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm"
              >
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <HiSparkles className="w-4 h-4 text-indigo-500" />
                  {group.category}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60"
                    >
                      <FaCheckCircle className="w-3 h-3 text-emerald-500" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};
