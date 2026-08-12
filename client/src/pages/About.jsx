import { GraduationCap, Code2, Server, Database, Wrench, User, BookOpen, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const About = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      skills: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5 & CSS3', 'Vite', 'State Management']
    },
    {
      title: 'Backend Development',
      icon: <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Authentication', 'Middleware & CORS', 'Bcrypt Security']
    },
    {
      title: 'Database & ORM',
      icon: <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      skills: ['MongoDB', 'Mongoose ORM', 'Schema Design', 'Data Validation', 'Aggregation & Indexing']
    },
    {
      title: 'Tools & Workflow',
      icon: <Wrench className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      skills: ['Git & GitHub', 'Postman API Testing', 'Cloudinary Image SDK', 'NPM Package Ecosystem', 'VS Code']
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Me | Tahir Hossen - Software Engineering Student</title>
        <meta name="description" content="Learn about Tahir Hossen's education at Daffodil International University (DIU), MERN stack skills, and software engineering background." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            About <span className="text-indigo-600 dark:text-indigo-400">Me</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Passionate about building modern web software, exploring full-stack engineering, and creating intuitive user experiences.
          </p>
        </div>

        {/* Bio Card Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 shadow-sm mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Short Bio</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Background &amp; Aspirations</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Hello! I'm <strong className="text-slate-900 dark:text-white font-semibold">Tahir Hossen</strong>, a Software Engineering student at <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">Daffodil International University (DIU)</strong> with a deep passion for full-stack web application development.
            </p>
            <p>
              My core focus lies within the <strong className="text-slate-900 dark:text-white font-semibold">MERN stack</strong> (MongoDB, Express.js, React, Node.js). I thrive on turning complex logic into sleek, accessible, and high-performance digital products, emphasizing clean architecture, modular component structure, and secure REST APIs.
            </p>
            <p>
              When I'm not writing code or building projects, I'm continually learning new software patterns, refining database schemas, and staying up to date with modern web technology trends.
            </p>
          </div>
        </div>

        {/* Education Section (Timeline Style) */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Education</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Academic Journey</p>
            </div>
          </div>

          {/* Vertical Timeline */}
          <div className="relative pl-6 md:pl-8 border-l-2 border-indigo-200 dark:border-indigo-900/60 space-y-10">
            
            <div className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-950 shadow-md" />
              
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    B.Sc. in Software Engineering
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    In Progress
                  </span>
                </div>
                
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4 text-sm">
                  Daffodil International University (DIU)
                </p>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                  Specializing in modern software engineering principles, object-oriented programming, data structures, algorithms, database management, and web engineering.
                </p>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {['Data Structures', 'OOP', 'Web Engineering', 'Database Systems', 'Software Testing'].map((course) => (
                    <span key={course} className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Skills Section (Cards Grid) */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Technical Skills</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Technologies &amp; Competencies</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  {category.icon}
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 py-1.5 px-2 rounded-lg bg-slate-50 dark:bg-slate-800/40"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
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
