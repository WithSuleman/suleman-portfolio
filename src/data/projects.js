import expenseTracker from "../assets/images/projects/expense-tracker.png";
import saasLandingPage from "../assets/images/projects/saas-landing-page.png";
import industrybaselandingpage from "../assets/images/projects/industrybaselandingpage.png";
import dashboard from "../assets/images/projects/dashboard.png";
import movie from "../assets/images/projects/movie.png"
import resturent from "../assets/images/projects/resturent.png"
/* ── Add your own project images below & replace the placeholders ──
import ecommerceStore from "../assets/images/projects/ecommerce-store.png";
import portfolioTemplate from "../assets/images/projects/portfolio-template.png";
import taskManager from "../assets/images/projects/task-manager.png";
*/

const projects = [
  {
    id: 1,
    featured: true,
    category: "React",
    title: "Expense Tracker",
    image: expenseTracker,
    description:
      "A responsive expense tracking application built with React for managing daily income and expenses with charts and summaries.",
    tech: ["React", "JavaScript", "CSS"],
    github: "https://github.com/WithSuleman/expensive-tracker",
    live: "https://expensive-one.vercel.app/",
  },
  {
    id: 2,
    featured: false,
    category: "Landing Page",
    title: "SaaS Landing Page",
    image: saasLandingPage,
    description:
      "Modern SaaS landing page with responsive design, smooth scroll animations and reusable React components.",
    tech: ["React", "Tailwind CSS", "Vite"],
    github: "https://github.com/WithSuleman/teyzix-core-task-2-submissions",
    live: "https://landing-page-submissions.vercel.app/",
  },
  {
    id: 3,
    featured: true,
    category: "Landing Page",
    title: "Analytics Landing Page",
    image:industrybaselandingpage,
    description:
          "Modern Industry Base landing page with responsive design, smooth scroll animations and reusable React components.",

    tech: ["React", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/WithSuleman/Advanced-industry-Based-Project",
    live: "https://industry-based-project.vercel.app/",
  },
  {
    id: 4,
    featured: false,
    category: "dashboard",
    title: "Analytics Dashboard",
    // image: ecommerceStore,        ← Replace with your image
    image: dashboard,           // Placeholder — replace above
    description:
          "Interactive analytics dashboard with dynamic charts, KPI cards and real-time data visualization.",
    tech: ["React", "Tailwind CSS", "Chart.js"],
    github: "https://github.com/WithSuleman/teyzix-core-fewd-dashboard",
    live: "https://dashboard-six-blond-vu5y7yatqp.vercel.app/",
  },
   {
    id: 5,
    featured: true,
    category: "React",
    title: "Movie Exployer",
    // image: ecommerceStore,        ← Replace with your image
    image: movie,           // Placeholder — replace above
    description:
    "Developed a responsive Movie Explorer web application that allows users to search",
    tech: ["React", "CSS", "JavaScript"],
    github: "https://github.com/WithSuleman/Movie-Exployer",
    live: "https://movie-ten-phi-84.vercel.app/",
  },
    {
    id: 6,
    featured: false,
    category: "Landing Page",
    title: "Resturent Landing Page",
    image: resturent,
    description:
    "Developed a modern and fully responsive Restaurant Website",
    tech: ["React", "Tailwind CSS", "Vite"],
    github: "https://github.com/WithSuleman/Restaurant-Website-",
    live: "https://restaurant-eta-ivory.vercel.app/",
  },
  
];

export default projects;