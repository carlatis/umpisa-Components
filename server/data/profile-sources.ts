export type ProfileSource = {
    id: string;
    title: string;
    sourceType: "resume" | "cover-letter" | "portfolio" | "social" | "contact";
    url?: string;
    content: string;
};

export const profileSources: ProfileSource[] = [
    {
        id: "resume-contact",
        title: "Resume - Contact Details",
        sourceType: "resume",
        content: "Carl Kenneth D. Atis is a Senior Backend PHP Developer and Software Engineer based in Marikina City, Philippines. Mobile: +63 917 477 1338. Email: carlatis1992@gmail.com. LinkedIn: https://www.linkedin.com/in/carl-atis-92676ab4. Portfolio: https://carl-atis.vercel.app/."
    },
    {
        id: "resume-download",
        title: "Resume - Download",
        sourceType: "resume",
        url: "/docs/Carl_Kenneth_Atis_Resume.pdf",
        content: "Carl Kenneth D. Atis' resume can be downloaded from /docs/Carl_Kenneth_Atis_Resume.pdf."
    },
    {
        id: "resume-summary",
        title: "Resume - Professional Summary",
        sourceType: "resume",
        content: "Backend PHP Developer with over 10 years of commercial experience designing, developing, and maintaining scalable web applications using PHP, MySQL, JavaScript, Laravel, CodeIgniter, REST APIs, Vue.js, Nuxt.js, and AWS. Experienced in modernizing legacy systems, developing custom CMS platforms, integrating third-party APIs, and delivering secure, maintainable backend solutions across media, advertising, analytics, and enterprise applications. Strong understanding of Object-Oriented Programming, Agile development, software engineering best practices, and database optimization. Proven ability to adapt quickly to proprietary frameworks, work independently, and take ownership of projects from design through deployment."
    },
    {
        id: "resume-achievements",
        title: "Resume - Achievements and Core Competencies",
        sourceType: "resume",
        content: "Achievements and core competencies: 10+ years of full stack development experience building and supporting scalable web applications. Delivered and maintained multiple high-traffic media and brand websites across content, advertising, and analytics platforms. Automated business reporting workflows through Google Ad Manager API integrations and PDF generation systems. Modernized legacy systems and improved performance through refactoring, AWS S3 integration, and scalable architecture improvements. Provided end-to-end production support for multiple applications, ensuring reliability, stability, and continuous enhancements. Core backend competencies include Backend PHP Development, PHP 7/8, Object-Oriented Programming, REST API Development, MySQL database design and optimization, Laravel, CodeIgniter, custom PHP frameworks, legacy system modernization, API integration, Git, Agile/Scrum, debugging, troubleshooting, AWS, Docker, CI/CD, code reviews, and production support."
    },
    {
        id: "resume-skills",
        title: "Resume - Technical Skills",
        sourceType: "resume",
        content: "Technical skills: Languages: PHP, JavaScript, TypeScript, Python, HTML5, CSS3. Frameworks: Laravel, CodeIgniter, Vue.js, Nuxt.js, Next.js, Tailwind CSS. Databases: MySQL, MongoDB, query optimization, database design. Backend: REST APIs, JSON, authentication, API integrations. Cloud and DevOps: AWS S3, Docker, Linux, Webiny, GitHub Actions, CI/CD. Tools: Git, Postman, VS Code, Nginx, Laragon, XAMPP."
    },
    {
        id: "experience-mquest",
        title: "Resume - Full Stack Developer at MQuest Ventures",
        sourceType: "resume",
        content: "Full Stack Developer at MQuest Ventures from February 2026 to present. Develop and maintain backend services for a headless CMS platform using Webiny, AWS, REST APIs, and modern JavaScript frameworks. Build scalable web applications and data migration tools while maintaining production systems. Develop integrations between backend services and third-party platforms. Troubleshoot production issues and deliver enhancements with minimal supervision."
    },
    {
        id: "experience-summit-dynamic-pages",
        title: "Resume - Software Engineer at Summit Media",
        sourceType: "resume",
        content: "Software Engineer at Summit Media from July 2025 to February 2026. Developed reusable component-based applications using Nuxt.js while collaborating with backend services. Supported production deployments, bug fixes, and application enhancements. Participated in Agile development, code reviews, and technical discussions."
    },
    {
        id: "experience-summit-adtech",
        title: "Resume - Software Engineer AdTech and Analytics at Summit Media",
        sourceType: "resume",
        content: "Software Engineer, AdTech and Analytics, at Summit Media from January 2022 to June 2025. Developed backend services and reporting systems using PHP, MySQL, and REST APIs. Built automated Google Ad Manager reporting solutions with PDF generation. Designed reusable backend modules and integrated third-party APIs. Maintained production applications and implemented new business features."
    },
    {
        id: "experience-summit-web-programmer",
        title: "Resume - Web Programmer at Summit Media",
        sourceType: "resume",
        content: "Web Programmer at Summit Media from November 2015 to January 2022. Developed and maintained PHP web applications supporting high-traffic media websites. Modernized legacy PHP applications through refactoring and performance optimization. Integrated AWS S3 storage into existing PHP applications. Developed custom CMS functionality, backend modules, and REST APIs. Optimized MySQL queries and resolved production issues across multiple websites. Provided production support and collaborated with cross-functional Agile teams."
    },
    {
        id: "experience-unison",
        title: "Resume - PHP Developer at Unison Computer Systems",
        sourceType: "resume",
        content: "PHP Developer at Unison Computer Systems, Inc. from June 2015 to November 2015. Developed PHP applications using CodeIgniter following MVC architecture. Designed MySQL databases and optimized SQL queries. Built automated PDF reporting systems and prototype e-commerce solutions. Developed reusable backend modules and participated in application testing."
    },
    {
        id: "resume-certifications-education",
        title: "Resume - Certifications and Education",
        sourceType: "resume",
        content: "Certifications: Advanced Python (2024), Learning Python (2024), Flask Essential Training (2024), Learning Node.js Express (2024), Essentials: Build Powerful Web Apps with Node.js (2024). Education: Bachelor of Science in Computer Engineering, Technological Institute of the Philippines, 2009 to 2015."
    },
    {
        id: "cover-letter-summary",
        title: "Cover Letter - Summary and Download",
        sourceType: "cover-letter",
        url: "/docs/Carl_Kenneth_Atis_Cover_Letter.pdf",
        content: "Carl Kenneth D. Atis' cover letter can be downloaded from /docs/Carl_Kenneth_Atis_Cover_Letter.pdf. The cover letter expresses interest in Full Stack Developer, Software Engineer, or PHP Developer roles. It highlights over 10 years of commercial experience designing, developing, and maintaining secure, scalable, high-performing web applications using PHP, Laravel, JavaScript, MySQL, Vue.js, Nuxt.js, Next.js, and AWS. It emphasizes custom CMS platforms, RESTful APIs, analytics dashboards, backend integrations, cloud-based applications, legacy PHP modernization, refactoring, performance improvement, third-party integrations, clean and maintainable code, independent work, fast adaptation to unfamiliar codebases and custom frameworks, Agile collaboration, production support, debugging, troubleshooting, full lifecycle delivery, and a continuous learning mindset."
    },
    {
        id: "portfolio",
        title: "Portfolio Website",
        sourceType: "portfolio",
        url: "https://carl-atis.vercel.app/",
        content: "Portfolio URL: https://carl-atis.vercel.app/. The portfolio title is Carl Kenneth Atis | Full-Stack Developer. It describes Carl as a Full-Stack Developer specializing in AdTech, analytics, automation, API integrations, CMS development, and creative digital advertising solutions. The portfolio includes sections for Home, About, Experience, Projects, Tools, and Contact. It says Carl builds websites with Laravel, NextJs, TypeScript, NuxtJs, and Python. The portfolio footer says it was built with Nuxt.js, TypeScript, and TailwindCSS."
    },
    {
        id: "portfolio-about",
        title: "Portfolio Website - About",
        sourceType: "portfolio",
        url: "https://carl-atis.vercel.app/",
        content: "Portfolio About section: Carl Kenneth Atis is a dedicated Software Engineer with over a decade of experience developing robust digital platforms. He specializes in dashboards, content management systems, login modules, and reservation tools. He builds progressive web applications that are interactive, optimized, industry-standard, user-friendly, scalable, and responsive across devices. He holds a Bachelor of Science degree in Computer Engineering from the Technological Institute of the Philippines in Cubao, Quezon City. He highlights quick learning, adaptability, collaboration, clear communication, teamwork, and iteration."
    },
    {
        id: "portfolio-project-creative-ads",
        title: "Portfolio Website - Creative Ads Templates",
        sourceType: "portfolio",
        url: "https://carl-atis.vercel.app/",
        content: "Portfolio project: Creative Ads Templates, categorized as a Sales/Programmatic Ad Project. It includes game, scratch, takeover, and expandable ad samples. The project helped monitor monetization performance by tracking revenue and user activity in real time and gave management and ad operations teams better visibility into performance and trends for decision-making. Technologies listed: JavaScript, HTML5, CSS, and Tag Manager."
    },
    {
        id: "portfolio-project-playlist",
        title: "Portfolio Website - Custom Playlist Widget",
        sourceType: "portfolio",
        url: "https://carl-atis.vercel.app/",
        content: "Portfolio project: Custom Playlist Widget, categorized as a Dailymotion Playlist Project. It includes a live demo at /article?demo=playlist. The project helped monitor monetization performance by tracking revenue and user activity in real time and gave management and ad operations teams better visibility into performance and trends. Technologies listed: NuxtJs, TypeScript, TailwindCSS, CSS, JavaScript, and HTML5."
    },
    {
        id: "portfolio-tools",
        title: "Portfolio Website - Tools and Technologies",
        sourceType: "portfolio",
        url: "https://carl-atis.vercel.app/",
        content: "Portfolio tools and technologies: Laravel, NuxtJS, Visual Studio Code, Python, MySQL, TailwindCSS, Google Ad Manager, Google Tag Manager, Google Analytics, FASTAPI, ChatGPT, Figma, GCP, Amazon Web Services, NextJs, Postman, and GitHub Copilot."
    },
    {
        id: "linkedin",
        title: "LinkedIn Profile",
        sourceType: "social",
        url: "https://www.linkedin.com/in/carl-atis-92676ab4/",
        content: "LinkedIn URL: https://www.linkedin.com/in/carl-atis-92676ab4/. Treat LinkedIn as an approved personal source only when public profile details are manually copied into this knowledge base. Do not guess LinkedIn-only details."
    },
    {
        id: "facebook",
        title: "Facebook Profile",
        sourceType: "social",
        url: "https://www.facebook.com/carlkenneth.atis/",
        content: "Facebook URL: https://www.facebook.com/carlkenneth.atis/. Treat Facebook as an approved personal source only when the profile owner provides public profile details or posts to include. Do not infer private details from Facebook."
    },
    {
        id: "gmail",
        title: "Gmail Contact",
        sourceType: "contact",
        content: "Gmail contact: carlatis1992@gmail.com. This chatbot does not connect to Gmail or read email. It can share the email address as a contact detail because it appears in Carl's resume and cover letter."
    }
];