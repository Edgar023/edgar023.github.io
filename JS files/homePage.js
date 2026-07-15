// 1. Data Definitions for your projects
const projectsData = [
    {
    title: "IT Help Desk Troubleshooting Guide",
    category: "it-support",
    description: "A comprehensive support manual identifying diagnostic workflows for network drops, hardware anomalies, synchronization restrictions, and operational escalation logic.",
    tech: ["System Hardware", "Network Connectivity", "Mobile Setup", "ITSM Documentation"],
    link: "https://edgar023.github.io/it-troubleshooting-guide.pdf"
    },
    {
    title: "Java Scanner & Recursive Descent Parser",
    category: "software",
    description: "A programmatic compiler tool engineered to tokenize input character streams through lexical analysis and execute top-down recursive syntax evaluation pipelines with robust error-tracking diagnostics.",
    tech: ["Java", "Lexical Analysis", "Compiler Architecture", "Recursive Algorithms", "Syntax Parsing"],
    link: "https://github.com/Edgar023/Scanner-recursive-Decent-Parser"
    },
    {
    title: "PlatePilot Nutritional Tracker",
    category: "software",
    description: "A gamified, full-stack nutrition dashboard featuring a flight-themed progress tracker, interactive component dashboards, secure local user states, and structured SQLite database management.",
    tech: ["React.js", "Tailwind CSS", "Python (Flask)", "SQLite", "RESTful APIs"],
    link: "https://github.com/Edgar023/PlatePilot"
    },
    {
    title: "Child Care Application Platform",
    category: "frontend",
    description: "An interactive client-side web interface utilizing modern DOM event listeners to capture user data entries, evaluate application pricing structures dynamically, and present a clean responsive UI layout.",
    tech: ["JavaScript (ES6)", "HTML5 Forms", "CSS3 Layouts", "DOM Processing", "Dynamic Calculations"],
    link: "https://github.com/Edgar023/Child-Care-Application"
    },
    {
    title: "Medical Record Form Intakes",
    category: "frontend",
    description: "A comprehensive medical data intake layout emphasizing robust semantic input validation rules, custom input constraints, and an accessible multi-column responsive architecture.",
    tech: ["HTML5", "CSS3", "Form Validation", "UI Usability", "Field Validation"],
    link: "https://edgar023.github.io/Medical-Record-Form/"
    },
    {
    title: "Web-based Calculation Engine",
    category: "frontend",
    description: "A responsive client-side calculation application engineered with pure vanilla programming to capture UI button interactions, evaluate mathematical math strings, and manage real-time input validation anomalies smoothly.",
    tech: ["JavaScript", "HTML5", "CSS3", "DOM Architecture", "Responsive Styling"],
    link: "https://edgar023.github.io/Web-based-Calculator/"
    }
];

// 2. Data Definitions for Targeted Skill Sets
const skillSets = {
    all: [
        "Java", "Python", "JavaScript", "HTML5", "CSS3", "React.js", "Tailwind CSS", "Flask", "SQLite", 
        "RESTful APIs", "DOM Architecture", "Compiler Architecture", "Recursive Algorithms", "Responsive Web Design", 
        "Form Validation", "Windows, macOS & Linux", "Hardware & Software Triage", "Mobile Device Configuration", 
        "Microsoft 365 Support", "Technical Writing & KB", "ITSM Workflows", "Customer Service"
    ],
    software: [
        "Java Development", "Python Scripts", "Flask Framework", "SQLite Databases", "Object-Oriented Design", "Data Structures", "Recursive Descent Parsers", "Git Engine Versioning"
    ],
    frontend: [
        "React.js", "Tailwind CSS", "HTML5 / CSS3 Layouts", "JavaScript DOM Manipulation", "Responsive Web Design", "UI/UX Component Usability", "Client Form Verification"
    ],
    'it-support': [
        "Windows & macOS Systems", "Hardware Support & Upgrade", "Mobile & Tablet Profile Setup", "Network Connectivity Triage", "Microsoft 365 Support", "Customer Support & Triage"
    ]
};

const roleContent = {
    all: {
    subtitle: "Computer Science graduate with hands-on experience providing technical support, troubleshooting devices, and building responsive applications.",
    gradient: "gradient-all"
    },
    software: {
    subtitle: "Focusing on scalable backend logic, API architecture, clean codebases, and efficient algorithmic solutions.",
    gradient: "gradient-software"
    },
    frontend: {
    subtitle: "Crafting intuitive user experiences, responsive layouts, pixel-perfect UI components, and fluid animations.",
    gradient: "gradient-frontend"
    },
    'it-support': {
    subtitle: "Dedicated to system diagnostics, network infrastructure, hardware/software troubleshooting, and rapid operational problem-solving.",
    gradient: "gradient-it-support"
    }
};

// 3. Build UI Blocks inside the Grid Container initially
function buildInitialDOM() {
    const grid = document.getElementById('project-grid');
    grid.innerHTML = projectsData.map((project, index) => `
    <article id="project-card-${index}" class="project-card" data-category="${project.category}">
        <div class="project-card-content">
        <div class="project-card-meta-wrap">
            <span class="project-card-meta">
            ${project.category === 'it-support' ? 'IT Systems' : project.category === 'frontend' ? 'UI / UX Design' : 'Software App'}
            </span>
        </div>
        <h3 class="project-card-title">${project.title}</h3>
        <p class="project-card-description">${project.description}</p>
        </div>
        <div class="project-card-footer">
        <div class="project-tech-list">
            ${project.tech.map(t => `<span class="project-tech-chip">${t}</span>`).join('')}
        </div>
        <a href="${project.link}" class="project-link">
            Explore Resource <span class="project-link-arrow">→</span>
        </a>
        </div>
    </article>
    `).join('');
}

// 4. Update elements when filtering takes place
function updateView(role) {
    if (!roleContent[role]) role = 'all';

    if (role === 'all') {
    history.replaceState(null, null, ' ');
    } else {
    location.hash = role;
    }

    // Toggle Active States on Buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('is-active');
    });
    const activeBtn = document.getElementById(`btn-${role}`);
    if (activeBtn) activeBtn.classList.add('is-active');

    // Modify Hero Title Gradient & Text Copy
    const textEl = document.getElementById('hero-subtitle');
    const gradEl = document.getElementById('hero-gradient');
    textEl.style.opacity = 0;
    textEl.style.transform = 'translateY(4px)';
    setTimeout(() => {
    textEl.textContent = roleContent[role].subtitle;
    gradEl.className = `hero-gradient ${roleContent[role].gradient}`;
    textEl.style.opacity = 1;
    textEl.style.transform = 'translateY(0)';
    }, 150);

    // Handle Skills Matrix Updates
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = skillSets[role].map(skill => `
    <span class="skill-chip">
        ${skill}
    </span>
    `).join('');

    // Filter Projects Visibility Logic
    projectsData.forEach((project, idx) => {
    const cardEl = document.getElementById(`project-card-${idx}`);
    if (!cardEl) return;
    
    if (role === 'all' || project.category === role) {
        cardEl.classList.remove('project-hidden');
    } else {
        cardEl.classList.add('project-hidden');
    }
    });
}

// Initialize layout hooks
window.addEventListener('DOMContentLoaded', () => {
    buildInitialDOM();
    const initialHash = location.hash.replace('#', '');
    updateView(initialHash || 'all');
});

window.addEventListener('hashchange', () => {
    const currentHash = location.hash.replace('#', '');
    updateView(currentHash || 'all');
});