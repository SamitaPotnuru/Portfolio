import React, { useState, useMemo } from 'react';

interface Skill {
  name: string;
  category: 'programming' | 'frontend' | 'ui' | 'backend' | 'database' | 'tools' | 'swe' | 'ai';
  level: number;
}

const skillsData: Skill[] = [
  // Programming Languages
  { name: 'JavaScript (ES6+)', category: 'programming', level: 90 },
  { name: 'TypeScript', category: 'programming', level: 90 },
  { name: 'Python', category: 'programming', level: 92 },
  { name: 'Java', category: 'programming', level: 85 },
  { name: 'HTML5', category: 'programming', level: 90 },
  { name: 'CSS3', category: 'programming', level: 88 },
  { name: 'C#', category: 'programming', level: 80 },

  // Frontend Development
  { name: 'React.js', category: 'frontend', level: 92 },
  { name: 'TypeScript', category: 'frontend', level: 90 },
  { name: 'React Hooks', category: 'frontend', level: 92 },
  { name: 'Context API', category: 'frontend', level: 90 },
  { name: 'Component-Based Architecture', category: 'frontend', level: 90 },
  { name: 'Responsive Web Design', category: 'frontend', level: 92 },
  { name: 'Cross-Browser Compatibility', category: 'frontend', level: 88 },
  { name: 'REST API Integration', category: 'frontend', level: 90 },
  { name: 'Frontend Performance Optimization', category: 'frontend', level: 85 },
  { name: 'UI Development', category: 'frontend', level: 92 },

  // UI Frameworks & Styling
  { name: 'Tailwind CSS', category: 'ui', level: 95 },
  { name: 'Material UI', category: 'ui', level: 88 },
  { name: 'CSS Flexbox', category: 'ui', level: 95 },
  { name: 'CSS Grid', category: 'ui', level: 90 },

  // Backend Development
  { name: 'Node.js', category: 'backend', level: 88 },
  { name: 'Express.js', category: 'backend', level: 88 },
  { name: '.NET', category: 'backend', level: 80 },
  { name: 'RESTful APIs', category: 'backend', level: 90 },
  { name: 'CRUD Operations', category: 'backend', level: 90 },
  { name: 'Authentication & Authorization', category: 'backend', level: 85 },

  // Database Technologies
  { name: 'PostgreSQL', category: 'database', level: 85 },
  { name: 'SQL', category: 'database', level: 88 },
  { name: 'Database Design', category: 'database', level: 85 },
  { name: 'Database Management', category: 'database', level: 85 },

  // Development Tools
  { name: 'Git', category: 'tools', level: 90 },
  { name: 'GitHub', category: 'tools', level: 90 },
  { name: 'VS Code', category: 'tools', level: 95 },
  { name: 'Postman', category: 'tools', level: 90 },
  { name: 'npm', category: 'tools', level: 88 },
  { name: 'Vite', category: 'tools', level: 90 },
  { name: 'Chrome Developer Tools', category: 'tools', level: 90 },
  { name: 'Cloud', category: 'tools', level: 80 },
  { name: 'Data', category: 'tools', level: 80 },
  { name: 'ERP', category: 'tools', level: 75 },

  // Software Engineering
  { name: 'Data Structures & Algorithms', category: 'swe', level: 85 },
  { name: 'Object-Oriented Programming', category: 'swe', level: 88 },
  { name: 'Software Engineering', category: 'swe', level: 85 },
  { name: 'Version Control', category: 'swe', level: 90 },
  { name: 'Debugging', category: 'swe', level: 90 },

  // AI & Machine Learning
  { name: 'Deep Learning', category: 'ai', level: 85 },
  { name: 'Computer Vision', category: 'ai', level: 85 },
  { name: 'TensorFlow', category: 'ai', level: 88 },
  { name: 'Keras', category: 'ai', level: 85 },
  { name: 'OpenCV', category: 'ai', level: 85 },
  { name: 'NumPy', category: 'ai', level: 90 },
  { name: 'Pandas', category: 'ai', level: 90 },
  { name: 'Scikit-learn', category: 'ai', level: 88 },
  { name: 'RAG', category: 'ai', level: 85 },
  { name: 'LLM', category: 'ai', level: 88 },
  { name: 'Supabase', category: 'ai', level: 85 },
  { name: 'Firebase', category: 'ai', level: 85 },
  { name: 'n8n', category: 'ai', level: 80 },
  { name: 'MCP', category: 'ai', level: 82 },
  { name: 'Windsurf', category: 'ai', level: 85 },
  { name: 'Codex', category: 'ai', level: 85 },
  { name: 'Claude', category: 'ai', level: 90 },
];

const categories = [
  { id: 'programming', label: 'Programming' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'ui', label: 'UI & Styling' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Databases' },
  { id: 'tools', label: 'Tools' },
  { id: 'swe', label: 'Software Eng.' },
  { id: 'ai', label: 'AI & ML' },
];

export const SkillUniverse: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('programming');

  const filteredSkills = useMemo(() => {
    return skillsData.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-8 w-full">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 text-xs font-space font-medium rounded-full border transition-all duration-300 ${
              selectedCategory === cat.id
                ? 'bg-slate-200 border-slate-200 text-slate-900 shadow-luxury scale-105'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Badges Container */}
      <div className="w-full">
        <div className="p-8 rounded-3xl glass-card">
          <div className="flex flex-wrap gap-3">
            {filteredSkills.map((skill) => (
              <div
                key={skill.name}
                className="px-5 py-3 bg-slate-800/30 border border-slate-700/40 hover:border-teal-500/50 hover:bg-slate-800/70 rounded-2xl text-slate-200 text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-default shadow-sm select-none"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
