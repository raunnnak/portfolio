# Portfolio Website for Web Design & SEO Agency
Reference-style minimalist design with black background, white text, and subtle animations.

## Project Structure

```
portfolio-website/
├── client/                      # Frontend React application
│   ├── public/
│   │   ├── index.html
│   │   └── assets/             # Images, icons, etc.
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── layout/
│   │   │   │   ├── Navigation.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Layout.jsx
│   │   │   ├── home/
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── FeaturedProjects.jsx
│   │   │   │   └── ContactForm.jsx
│   │   │   ├── projects/
│   │   │   │   ├── ProjectGrid.jsx
│   │   │   │   └── ProjectCard.jsx
│   │   │   └── services/
│   │   │       ├── ServicesList.jsx
│   │   │       └── ServiceItem.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Services.jsx
│   │   ├── animations/         # Framer Motion animations
│   │   │   ├── fadeIn.js
│   │   │   ├── slideIn.js
│   │   │   └── scaleHover.js
│   │   ├── styles/            # Global styles
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
├── server/                     # Backend Node.js/Express application
│   ├── src/
│   │   ├── routes/
│   │   │   └── contact.js
│   │   ├── controllers/
│   │   │   └── contactController.js
│   │   └── index.js
│   └── package.json
└── README.md

## Implementation Steps

### 1. Project Setup [Phase 1]
[X] Initialize React project with Vite
[X] Set up Tailwind CSS
[X] Install dependencies (react-router-dom, framer-motion)
[X] Create basic folder structure
[X] Initialize Git repository

### 2. Frontend Development [Phase 2]

#### Layout Components
[ ] Create Navigation component with logo and numbered menu items
[ ] Implement responsive mobile menu
[ ] Create Layout wrapper component
[ ] Add Footer component

#### Homepage
[ ] Build Hero section with animations
[ ] Create FeaturedProjects component
[ ] Implement ContactForm component
[ ] Add scroll-triggered animations

#### Projects Page
[ ] Design ProjectCard component
[ ] Create ProjectGrid layout
[ ] Implement hover animations
[ ] Add sample project data

#### Services Page
[ ] Create ServiceItem component
[ ] Build ServicesList layout
[ ] Add scroll animations
[ ] Include sample service data

### 3. Styling & Animations [Phase 3]
[ ] Set up global Tailwind styles
[ ] Create reusable animation components
[ ] Implement page transitions
[ ] Add hover effects
[ ] Ensure responsive design

### 4. Backend Development [Phase 4]
[ ] Set up Express.js server
[ ] Create contact form endpoint
[ ] Implement form validation
[ ] Add error handling
[ ] Test API endpoints

### 5. Integration & Testing [Phase 5]
[ ] Connect frontend with backend
[ ] Test form submissions
[ ] Cross-browser testing
[ ] Mobile responsiveness testing
[ ] Performance optimization

### 6. Deployment [Phase 6]
[ ] Prepare for Vercel deployment
[ ] Configure environment variables
[ ] Deploy frontend
[ ] Deploy backend
[ ] Final testing in production

## Design Specifications

### Colors
- Background: #000000
- Text: #FFFFFF
- Accents: #333333, #666666

### Typography
- Primary Font: Helvetica Neue or Roboto
- Font Sizes:
  - Hero: 4rem (64px)
  - Headings: 2.5rem (40px)
  - Body: 1rem (16px)
  - Menu Items: 1.125rem (18px)

### Animations
- Page Transitions: Fade (300ms)
- Scroll Animations: Fade up (500ms)
- Hover Effects: Scale (1.05)
- Button Hover: Scale + Opacity

### Responsive Breakpoints
- Mobile: 320px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px+

## Component Details

### Navigation
- Fixed position
- Transparent background
- Numbered menu items
- Hover underline effect
- Mobile hamburger menu

### Hero Section
- Full viewport height
- Large, bold headline
- Animated text reveal
- Floating CTA button

### Project Cards
- Image thumbnail
- Title overlay
- Hover scale effect
- Category tag
- Brief description

### Service Items
- Icon
- Title
- Description
- Scroll-triggered animation

### Contact Form
- Name field
- Email field
- Message field
- Submit button
- Success/error states 