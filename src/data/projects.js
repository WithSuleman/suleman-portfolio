import expenseTracker from "../assets/images/projects/expense-tracker.png";
import saasLandingPage from "../assets/images/projects/saas-landing-page.png";
import industrybaselandingpage from "../assets/images/projects/industrybaselandingpage.png";
import dashboard from "../assets/images/projects/dashboard.png";
import movie from "../assets/images/projects/movie.png"
import resturent from "../assets/images/projects/resturent.png"


import mernExpenseTracker from "../assets/images/projects/mernExpenseTracker.png";
import mernContactManage from "../assets/images/projects/mernContactManage.png";
import flowerEcommerce from "../assets/images/projects/flowerEcommerce.png";


const projects = [
  /* ═════════════ MERN STACK PROJECTS ═════════════ */
  {
    id: 1,
    featured: true,
    category: "MERN Stack",
    title: "MERN Expense Tracker",
    image: mernExpenseTracker, // ← replace with mernExpenseTracker
    description:
      "A full-stack expense tracking application with user authentication, income and expense management, category-wise summaries and charts.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    github: "https://github.com/WithSuleman/expense-frontend", // ← put the repo link
    live: "https://expense-frontend-hv9k.vercel.app/", // ← put the live link (button stays hidden while empty)
  },
  {
    id: 2,
    featured: true,
    category: "MERN Stack",
    title: "Contact Manager",
    image: mernContactManage, // ← replace with mernTaskManager
    description:
      "A full-stack contact management app with secure login, create / update / delete contact, status and priority tracking, built on REST APIs.",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "JWT"],
    github: "https://github.com/WithSuleman/contact-manger-frontend", // ← put the repo link
    live: "https://contact-manger-frontend-two.vercel.app/", // ← put the live link
  },
  {
    id: 3,
    featured: true,
    category: "MERN Stack",
    title: "Flower E-Commerce Website",
    image: flowerEcommerce, // ← replace with flowerEcommerce
    description:
      "A full-stack flower shop with product catalog, search and filters, shopping cart, user accounts and an admin panel to manage products and orders.",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS"],
    github: "https://github.com/WithSuleman/flower-frontend", // ← put the repo link
    live: "https://flower-frontend-1gn9.vercel.app/", // ← put the live link
  },

  /* ═════════════ FRONTEND PROJECTS ═════════════ */
  {
    id: 4,
    featured: false,
    category: "React",
    title: "Expense Tracker",
    image: expenseTracker,
    description:
      "A responsive expense tracking application built with React for managing daily income and expenses with charts and summaries.",
    tech: ["React", "JavaScript", "CSS"],
    github: "https://github.com/WithSuleman/expensive",
    live: "https://expensive-one.vercel.app/",
  },
  {
    id: 5,
    featured: false,
    category: "Landing Page",
    title: "SaaS Landing Page",
    image: saasLandingPage,
    description:
      "Modern SaaS landing page with responsive design, smooth scroll animations and reusable React components.",
    tech: ["React", "Tailwind CSS", "Vite"],
    github: "https://github.com/WithSuleman/landing-page-submissions",
    live: "https://landing-page-submissions.vercel.app/",
  },
  {
    id: 6,
    featured: true,
    category: "Landing Page",
    title: "Analytics Landing Page",
    image: industrybaselandingpage,
    description:
      "Modern Industry Base landing page with responsive design, smooth scroll animations and reusable React components.",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/WithSuleman/industry-based-project",
    live: "https://industry-based-project.vercel.app/",
  },
  {
    id: 7,
    featured: false,
    category: "Dashboard",
    title: "Analytics Dashboard",
    image: dashboard,
    description:
      "Interactive analytics dashboard with dynamic charts, KPI cards and real-time data visualization.",
    tech: ["React", "Tailwind CSS", "Chart.js"],
    github: "https://github.com/WithSuleman/dashboard",
    live: "https://dashboard-six-blond-vu5y7yatqp.vercel.app/",
  },
  {
    id: 8,
    featured: true,
    category: "React",
    title: "Movie Exployer",
    image: movie,
    description:
      "Developed a responsive Movie Explorer web application that allows users to search",
    tech: ["React", "CSS", "JavaScript"],
    github: "https://github.com/WithSuleman/movie",
    live: "https://movie-ten-phi-84.vercel.app/",
  },
  {
    id: 9,
    featured: false,
    category: "Landing Page",
    title: "Resturent Landing Page",
    image: resturent,
    description:
      "Developed a modern and fully responsive Restaurant Website",
    tech: ["React", "Tailwind CSS", "Vite"],
    github: "https://github.com/WithSuleman/restaurant",
    live: "https://restaurant-eta-ivory.vercel.app/",
  },
];

export default projects;