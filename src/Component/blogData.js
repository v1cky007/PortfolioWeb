const blogPosts = [
  {
    id: "bpcl-internship-experience",
    title: "My BPCL Internship — Building Real-World Solutions at Bharat Petroleum",
    excerpt:
      "How my internship at Bharat Petroleum Corporation Limited gave me hands-on experience in building enterprise-grade software for one of India's largest energy companies.",
    date: "2026-07-15",
    readTime: "6 min read",
    views: 42,
    tags: ["Internship", "Enterprise Software", "Career"],
    category: "Career",
    categoryColor: "#FF6B35",
    featured: false,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop",
    author: {
      name: "M. Vigneash",
      avatar: "/Profile.jpeg",
    },
    content: `
When I got the opportunity to intern at **Bharat Petroleum Corporation Limited (BPCL)**, I knew it would be different from a typical software company internship. BPCL is one of India's largest oil and gas companies, and their IT infrastructure supports millions of transactions daily across refineries, fuel stations, and corporate offices. Here's what the experience was actually like.

## Getting In

BPCL's internship selection process is straightforward but competitive. They look for students who can demonstrate both technical aptitude and an understanding of how technology serves business operations. My interview focused on problem-solving approaches, database concepts, and basic web development skills.

## What I Worked On

### Internal Dashboard Application
My primary project was building an internal dashboard that aggregated data from multiple sources — inventory systems, sales records, and operational metrics. The goal was to give managers a single view of real-time performance across stations.

**The stack:** React for the frontend, Spring Boot for the backend, and MySQL for the database.

### Key Challenges
- **Data Integration:** BPCL's systems are built on different technologies and databases. Pulling data from legacy systems and presenting it in a unified format was the real engineering challenge.
- **Performance:** With thousands of fuel stations reporting data, even simple queries needed optimization. I learned to work with indexed queries, pagination, and caching strategies.
- **Security:** Working in an energy company meant security was non-negotiable. Every API endpoint needed proper authentication, input validation, and audit logging.

## A Typical Day

**9:00 AM** — Arrive at the office, review emails and any overnight data pipeline alerts.

**9:30 AM** — Team standup. Discuss progress, blockers, and priorities for the day.

**10:00 AM - 1:00 PM** — Development sprint. This is where the real coding happens — building new features, fixing bugs, or optimizing queries.

**1:00 PM - 2:00 PM** — Lunch. The BPCL campus is massive, and the food court has options from multiple cuisines.

**2:00 PM - 5:30 PM** — Afternoon work. Could involve code reviews with senior developers, testing, or documentation.

**5:30 PM** — Wrap up, commit code, update progress notes.

## What I Learned

### Technical Skills
- **React** — Building interactive dashboards with charts, tables, and real-time updates
- **Spring Boot** — REST API development, JPA for database operations, Spring Security for authentication
- **MySQL** — Complex joins, query optimization, database indexing strategies
- **Git** — Working in a team with branching workflows and code reviews
- **Data Visualization** — Turning raw data into actionable insights with charts and graphs

### Domain Knowledge
- **Enterprise Architecture** — Understanding how large organizations structure their IT systems
- **Legacy System Integration** — Working with older technologies while building modern interfaces
- **Compliance & Security** — The strict regulations in the energy sector and how they affect software design

## The Enterprise Perspective

What struck me most about BPCL was the scale. At college, you build projects for a few users. At BPCL, the software I worked on would eventually be used across hundreds of locations. That changes how you think about:

- **Reliability** — The system can't go down during peak hours.
- **Scalability** — What works for 10 stations needs to work for 10,000.
- **Maintainability** — Someone else will maintain your code after you leave.

## Challenges I Faced

1. **Understanding the Business Domain** — Oil and gas operations are complex. I spent the first week just understanding how fuel distribution, inventory management, and sales reporting work.
2. **Working with Legacy Code** — Some systems were built years ago with older frameworks. Integrating modern React dashboards with these required creative solutions.
3. **Corporate Documentation** — Unlike personal projects, every decision needed documentation. PRDs, technical design docs, API specifications — the paperwork is real.

## Advice for Aspiring Interns

1. **Learn the business domain.** Technical skills matter, but understanding what the company actually does helps you build better solutions.
2. **Be patient with onboarding.** Enterprise systems are complex. Give yourself time to understand the architecture before diving into code.
3. **Ask for code reviews.** Senior developers at large companies have seen patterns you haven't. Their feedback is invaluable.
4. **Document your work.** Future interns and team members will reference your documentation.
5. **Think about scale.** Every feature you build should work at 100x the current load.

## Conclusion

My BPCL internship taught me that software engineering isn't just about writing code — it's about solving real business problems at scale. Working at one of India's largest energy companies gave me perspective on how technology powers critical infrastructure, and that experience shapes how I approach every project I build now.

---

*This article reflects my personal experience. Your experience may vary depending on your team and project.*
    `,
  },
  {
    id: "building-my-projects",
    title: "Building Three Full-Stack Projects — From EstateFlow to Vortex Play",
    excerpt:
      "A deep dive into the design decisions, technical challenges, and lessons learned while building three full-stack projects: an AI-powered real estate platform, a cloud gaming service, and an e-commerce grocery store.",
    date: "2026-07-10",
    readTime: "8 min read",
    views: 63,
    tags: ["Full-Stack", "React", "Projects", "Architecture"],
    category: "Projects",
    categoryColor: "#00D4AA",
    featured: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    author: {
      name: "M. Vigneash",
      avatar: "/Profile.jpeg",
    },
    content: `
Projects are where you learn the most. Over the past year, I built three full-stack applications that each taught me something different about software architecture, user experience, and real-world problem solving. Here's the story behind each one.

## EstateFlow — AI-Powered House Brokerage Platform

### The Idea
EstateFlow started as a question: **What if house hunting was as smart as the technology we use every day?** Real estate platforms show you listings, but they don't truly understand what you're looking for. I wanted to build a platform where AI recommends properties based on your preferences, lifestyle, and budget — not just keyword matching.

### Tech Stack
- **Frontend:** React with React Router, Tailwind CSS
- **Backend:** Spring Boot with JPA
- **Database:** MySQL
- **AI:** Custom recommendation engine

### Architecture Decisions
The biggest decision was how to structure the recommendation system. I went with a hybrid approach — combining collaborative filtering (what similar users liked) with content-based filtering (property features that match your stated preferences). This meant the AI could recommend a property even if no one else had viewed it yet.

### Key Challenges
- **Search Performance:** With thousands of property listings, search needed to be fast. I implemented database indexing on location, price range, and property type, then added Redis caching for frequently accessed queries.
- **Real-Time Updates:** When a property's status changes (sold, rented, price drop), every user viewing that listing needs to see it instantly. I used WebSockets for this.
- **AI Model Integration:** The recommendation engine needed to run efficiently without blocking API responses. I offloaded heavy computation to background jobs and cached results.

### What I Learned
- **Machine Learning in Production** is different from tutorials. The model needs to handle edge cases, stale data, and users with very different preferences.
- **Database Design Matters.** A well-normalized schema saved me from performance headaches later.
- **User Experience is King.** The smartest algorithm means nothing if the interface is confusing.

---

## Vortex Play — Cloud-Based Gaming Platform

### The Idea
Vortex Play was born from my love of gaming and curiosity about real-time systems. I wanted to build a platform where multiple players could interact in the same virtual space — not through a game engine, but through the browser using web technologies.

### Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js with Socket.io
- **Real-Time Communication:** WebSockets
- **Database:** MongoDB for session management

### Architecture Decisions
The core challenge was real-time synchronization. When Player A moves, Player B needs to see it immediately. I chose **Socket.io** for its fallback mechanisms and room-based architecture. Each game session is a "room" with its own state, and all players in that room receive updates in real-time.

### Key Challenges
- **Latency Management:** Even 100ms of delay feels sluggish in a game. I implemented client-side prediction — the player's movement is rendered immediately, and the server corrects any discrepancies.
- **State Synchronization:** Keeping game state consistent across all connected clients required a careful protocol. I used a timestamp-based conflict resolution system.
- **Performance Optimization:** With multiple players sending updates every frame, the server needed to be efficient. I implemented delta compression — only sending changes, not full state.

### What I Learned
- **WebSockets are powerful but tricky.** Connection drops, reconnection handling, and message ordering all need explicit management.
- **Client-side prediction is essential.** Waiting for server confirmation before rendering makes games feel unresponsive.
- **Testing real-time systems** requires different strategies than traditional web apps. I built custom load testing tools to simulate hundreds of concurrent players.

---

## Grocery Store Website — E-Commerce Platform

### The Idea
The grocery store project was about solving a practical problem: **online grocery shopping should be as simple as picking items off a shelf.** No complicated checkout flows, no confusing navigation — just browse, add to cart, pay, and track your order.

### Tech Stack
- **Frontend:** React with Context API for state management
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Payments:** Stripe integration

### Architecture Decisions
For the payment system, I chose **Stripe** because of its excellent documentation and developer experience. The integration was straightforward, but I spent extra time on the security side — ensuring PCI compliance, handling webhooks for payment confirmations, and implementing proper error handling for failed transactions.

### Key Challenges
- **Real-Time Order Tracking:** Customers want to know exactly where their order is. I implemented a status tracking system with WebSocket updates — when the order status changes, the frontend updates instantly.
- **Cart Persistence:** Users might add items, leave, and come back hours later. I stored cart state in both localStorage (for instant access) and the database (for cross-device sync).
- **Responsive Design:** Grocery shopping happens on phones. Every component needed to work perfectly on mobile — the product grid, the cart, the checkout flow.

### What I Learned
- **Payment Integration** is more than just calling an API. You need to handle edge cases: network failures during payment, webhook delivery delays, and refund flows.
- **State Management** in React gets complex with shopping carts. Context API worked for this scale, but I can see why larger projects use Redux or Zustand.
- **Mobile-First Design** isn't optional for e-commerce. Most grocery orders come from phones.

---

## Common Lessons Across All Three

### 1. Start with Architecture, Not Code
Every project that went smoothly started with a clear architecture diagram. The ones that got messy were the ones where I jumped straight into coding.

### 2. Database Design is the Foundation
A poorly designed database will haunt you forever. Spend time on it upfront — it pays off later.

### 3. Security is Not Optional
Even in personal projects, I implemented proper authentication, input validation, and secure API design. These habits matter.

### 4. Documentation Helps You Think
Writing a README or a quick architecture doc forces you to clarify your thinking. It's worth the 30 minutes.

### 5. Deploy and Get Feedback
A project that lives only on your laptop teaches you less than one that's deployed and used by real people. I deployed all three projects and gathered feedback from users.

## Conclusion

These three projects taught me more than any course could. EstateFlow showed me how AI can enhance user experiences. Vortex Play taught me the complexities of real-time systems. The Grocery Store website grounded me in the fundamentals of e-commerce. Together, they gave me a full-stack perspective that I carry into every new project.

---

*All projects are open to collaboration. If you're interested in the code, check out my GitHub profile.*
    `,
  },
  {
    id: "my-cognizant-internship",
    title: "My Cognizant GenC Next Internship — An Honest Account",
    excerpt:
      "A first-hand account of my Cognizant GenC Next internship from January to May 2026 — what the program looks like, what a day actually feels like, and what I'd tell anyone heading into it.",
    date: "2026-06-18",
    readTime: "5 min read",
    views: 86,
    tags: ["Internship", "Career"],
    category: "Career",
    categoryColor: "#BF00FF",
    featured: true,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    author: {
      name: "M. Vigneash",
      avatar: "/Profile.jpeg",
    },
    content: `
Getting selected for the Cognizant GenC Next program was a milestone in my journey as a computer science student. Over the past five months, I've grown technically, professionally, and personally in ways I didn't expect. Here's an honest look at what it was really like.

## The Selection Process

The GenC Next selection is multi-layered. It starts with an online assessment covering aptitude, programming, and logical reasoning. If you clear that, you move to a technical interview followed by an HR round. The competition is real — thousands apply, and only a fraction make it through.

**My preparation:** I focused on data structures, algorithms, and core CS concepts for two months before the assessment. Platforms like LeetCode and HackerRank were my daily routine.

## What the Program Looks Like

GenC Next is Cognizant's flagship training program for fresh graduates. The structure is designed to take you from campus-ready to enterprise-ready.

### Phase 1: Foundation Training
The first month is all about fundamentals — Java, SQL, web technologies, and soft skills. The pace is intense. You're expected to learn, practice, and demonstrate competency within tight deadlines.

### Phase 2: Specialization
After the foundation phase, you choose a track. I went with **Full-Stack Development** (Angular + Spring Boot), which aligned with my interests and projects.

### Phase 3: Project Work
The final phase involves working on a real project simulating an enterprise environment. This is where everything clicks — agile methodology, code reviews, daily standups, and production-quality code.

## A Typical Day

**8:30 AM** — Reach the office, grab coffee, check Slack for updates.

**9:00 AM** — Standup meeting with the team. Everyone shares what they did yesterday and what they plan to do today.

**9:30 AM - 12:30 PM** — Deep work. Coding, debugging, pair programming. This is where the real learning happens.

**12:30 PM - 1:30 PM** — Lunch break. The cafeteria is decent, and this is when you actually bond with your cohort.

**1:30 PM - 5:30 PM** — Afternoon sessions. Could be a workshop, code review, or continued development work.

**5:30 PM** — Wrap up, push code, update tickets on Jira.

## What I Learned

### Technical Skills
- **Angular** — Component architecture, RxJS, TypeScript
- **Spring Boot** — REST APIs, JPA, security configuration
- **Git** — Branching strategies, pull requests, merge conflicts
- **SQL** — Complex queries, optimization, database design

### Soft Skills
- **Communication** — Explaining technical concepts to non-technical stakeholders
- **Teamwork** — Collaborating across teams and time zones
- **Time Management** — Balancing multiple tasks with tight deadlines

## The Honest Truth

### What's Great
- The training quality is genuinely good. You learn industry-standard technologies.
- The mentorship is real. Senior developers actually invest time in your growth.
- The network you build is invaluable. Your cohort becomes your professional circle.

### What's Challenging
- The pace is relentless. If you fall behind, catching up is tough.
- The corporate environment takes adjustment if you're coming straight from college.
- Work-life balance varies by project and team.

## Advice for Future Interns

1. **Don't just learn — build.** Create projects that demonstrate what you've learned.
2. **Ask questions.** No one expects you to know everything. What they expect is curiosity.
3. **Network intentionally.** The people you meet here will be your references and collaborators for years.
4. **Document everything.** Keep notes, save code snippets, write about what you learn.
5. **Stay humble.** The learning curve is steep, and that's okay.

## Conclusion

My Cognizant GenC Next internship was one of the most formative experiences of my career so far. It taught me not just how to code, but how to work in a professional environment, solve real problems, and contribute to a team. If you're considering applying, do it — but go in prepared to work hard and learn fast.

---

*This article reflects my personal experience. Your experience may vary depending on your team, project, and track.*
    `,
  },
];

export default blogPosts;
