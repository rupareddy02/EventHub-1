// Event Management Application
class EventApp {
    constructor() {
        this.currentPage = 'categories';
        this.currentCategory = null;
        this.currentEvent = null;
        this.isLoggedIn = false;
        this.currentUser = null;
        this.userRegistrations = new Set(); // Track user's registered events
        this.userCreatedEvents = []; // Track user-created events
        this.initDatabase();
        this.initUserCreatedEvents();
        this.init();
    }

    // Sample data for events
    data = {
        categories: [
            {
                id: 'all-events',
                name: 'All Events',
                description: 'Browse all available events across all categories',
                icon: 'fas fa-globe',
                count: 0,
                isSpecial: true
            },
            {
                id: 'sports',
                name: 'Sports',
                description: 'Athletic events, tournaments, and fitness activities',
                icon: 'fas fa-futbol',
                count: 8
            },
            {
                id: 'games',
                name: 'Games',
                description: 'Video games, board games, and gaming tournaments',
                icon: 'fas fa-gamepad',
                count: 12
            },
            {
                id: 'competitions',
                name: 'Competitions',
                description: 'Contests, challenges, and competitive events',
                icon: 'fas fa-trophy',
                count: 6
            },
            {
                id: 'meetups',
                name: 'Meetups',
                description: 'Social gatherings and networking events',
                icon: 'fas fa-users',
                count: 15
            },
            {
                id: 'dance',
                name: 'Dance Clubs',
                description: 'Dance classes, parties, and performances',
                icon: 'fas fa-music',
                count: 9
            },
            {
                id: 'technology',
                name: 'Technology',
                description: 'Tech talks, workshops, and innovation events',
                icon: 'fas fa-laptop-code',
                count: 11
            },
            {
                id: 'food',
                name: 'Food & Dining',
                description: 'Cooking classes, food festivals, and tastings',
                icon: 'fas fa-utensils',
                count: 7
            },
            {
                id: 'arts',
                name: 'Arts & Culture',
                description: 'Art exhibitions, cultural events, and workshops',
                icon: 'fas fa-palette',
                count: 10
            }
        ],
        
        events: {
            sports: [
                {
                    id: 'marathon-2024',
                    title: 'City Marathon 2024',
                    date: 'March 15, 2024',
                    time: '6:00 AM',
                    location: 'Central Park, New York',
                    type: 'In-Person',
                    icon: 'fas fa-running',
                    description: 'Join thousands of runners in our annual city marathon. This challenging 26.2-mile course takes you through the most scenic parts of the city.',
                    fullDescription: 'The City Marathon 2024 is our biggest running event of the year, attracting participants from around the world. The race starts at Central Park and winds through iconic neighborhoods, offering stunning views and enthusiastic crowd support. Whether you\'re a seasoned marathoner or running your first 26.2 miles, this event promises an unforgettable experience. The course is USATF certified and Boston Marathon qualifying eligible.',
                    organizer: {
                        name: 'NYC Running Club',
                        contact: 'info@nycrunning.com',
                        avatar: 'NR'
                    },
                    venue: 'Central Park, New York',
                    isVirtual: false,
                    registrationFee: '$75',
                    capacity: '5000 participants'
                },
                {
                    id: 'basketball-tournament',
                    title: 'Street Basketball Tournament',
                    date: 'April 22, 2024',
                    time: '10:00 AM',
                    location: 'Community Sports Center',
                    type: 'In-Person',
                    icon: 'fas fa-basketball-ball',
                    description: 'Competitive 3v3 basketball tournament for all skill levels. Registration includes team jerseys and refreshments.',
                    fullDescription: 'Get ready for an action-packed day of street basketball! Our tournament features both amateur and semi-professional divisions, ensuring competitive matches for players of all skill levels. Teams compete in a single-elimination format with exciting prizes for winners. The event includes professional referees, scorekeepers, and medical staff on-site for safety.',
                    organizer: {
                        name: 'Street Ball Association',
                        contact: 'tournaments@streetball.org',
                        avatar: 'SB'
                    },
                    venue: 'Community Sports Center - 6 outdoor courts',
                    isVirtual: false,
                    registrationFee: '$120 per team',
                    capacity: '32 teams'
                }
            ],
            
            games: [
                {
                    id: 'esports-championship',
                    title: 'eSports Championship 2024',
                    date: 'May 10, 2024',
                    time: '2:00 PM',
                    location: 'Virtual Event',
                    type: 'Virtual',
                    icon: 'fas fa-trophy',
                    description: 'Professional gaming tournament featuring popular games like League of Legends, Valorant, and CS2.',
                    fullDescription: 'The biggest eSports event of the year featuring multiple game titles and substantial prize pools. Professional teams from around the world will compete in League of Legends, Valorant, CS2, and Rocket League. The event will be livestreamed on multiple platforms with professional commentary and analysis. Viewers can participate in interactive polls and giveaways throughout the tournament.',
                    organizer: {
                        name: 'GameMasters Pro',
                        contact: 'events@gamemasters.pro',
                        avatar: 'GM'
                    },
                    venue: 'Twitch, YouTube, Discord',
                    isVirtual: true,
                    registrationFee: 'Free to watch, $50 to compete',
                    capacity: 'Unlimited viewers, 64 teams'
                },
                {
                    id: 'board-game-night',
                    title: 'Board Game Café Night',
                    date: 'Every Friday',
                    time: '7:00 PM',
                    location: 'The Game Room Café',
                    type: 'In-Person',
                    icon: 'fas fa-dice',
                    description: 'Weekly board game night featuring classic and modern games. Perfect for meeting new people and trying new games.',
                    fullDescription: 'Join us every Friday for an evening of board games, good company, and great coffee! Our extensive game library includes everything from classic games like Monopoly and Scrabble to modern strategy games like Catan and Wingspan. Our friendly staff will help you learn new games and find the perfect match for your group size and experience level.',
                    organizer: {
                        name: 'The Game Room Café',
                        contact: 'hello@gameroomcafe.com',
                        avatar: 'GR'
                    },
                    venue: 'The Game Room Café - 123 Main Street',
                    isVirtual: false,
                    registrationFee: '$10 (includes coffee/tea)',
                    capacity: '50 people'
                },
                {
                    id: 'retro-gaming-tournament',
                    title: 'Retro Gaming Tournament',
                    date: 'February 14, 2024',
                    time: '2:00 PM',
                    location: 'Gaming Arena',
                    type: 'In-Person',
                    icon: 'fas fa-gamepad',
                    description: 'Classic arcade and console gaming tournament with prizes for winners.',
                    fullDescription: 'Step back in time with our retro gaming tournament! Compete in classic games from the 80s and 90s including Pac-Man, Street Fighter II, Super Mario Bros, and more. Prizes for top performers in each category.',
                    organizer: {
                        name: 'Retro Gamers Club',
                        contact: 'events@retrogamers.com',
                        avatar: 'RG'
                    },
                    venue: 'Gaming Arena - Downtown',
                    isVirtual: false,
                    registrationFee: '$15',
                    capacity: '64 players'
                }
            ],
            
            competitions: [
                {
                    id: 'coding-hackathon',
                    title: '48-Hour Coding Hackathon',
                    date: 'June 1-3, 2024',
                    time: 'Friday 6:00 PM',
                    location: 'Tech Innovation Hub',
                    type: 'In-Person',
                    icon: 'fas fa-code',
                    description: 'Build innovative solutions in 48 hours. Prizes for best overall, most creative, and best beginner project.',
                    fullDescription: 'Challenge yourself in our intensive 48-hour hackathon where teams of developers, designers, and entrepreneurs come together to build innovative software solutions. Participants will have access to mentors from leading tech companies, unlimited food and drinks, and sleeping areas. Projects are judged on innovation, technical implementation, and potential impact.',
                    organizer: {
                        name: 'TechHub Innovations',
                        contact: 'hackathon@techhub.com',
                        avatar: 'TH'
                    },
                    venue: 'Tech Innovation Hub - Full building access',
                    isVirtual: false,
                    registrationFee: '$25 (refunded upon attendance)',
                    capacity: '200 participants'
                }
            ],
            
            meetups: [
                {
                    id: 'startup-networking',
                    title: 'Startup Founders Networking',
                    date: 'March 28, 2024',
                    time: '6:30 PM',
                    location: 'WeWork Downtown',
                    type: 'In-Person',
                    icon: 'fas fa-handshake',
                    description: 'Network with fellow entrepreneurs, share experiences, and explore collaboration opportunities.',
                    fullDescription: 'Connect with like-minded entrepreneurs in a relaxed networking environment. This monthly meetup brings together startup founders, aspiring entrepreneurs, and industry professionals. The evening includes structured networking activities, short pitch sessions, and plenty of time for organic conversations. Light refreshments and drinks are provided.',
                    organizer: {
                        name: 'Entrepreneur Society',
                        contact: 'network@entrepreneursoc.com',
                        avatar: 'ES'
                    },
                    venue: 'WeWork Downtown - Event Space',
                    isVirtual: false,
                    registrationFee: '$15',
                    capacity: '80 people'
                },
                {
                    id: 'tech-professionals-mixer',
                    title: 'Tech Professionals Mixer',
                    date: 'January 20, 2024',
                    time: '7:00 PM',
                    location: 'Tech Hub Lounge',
                    type: 'In-Person',
                    icon: 'fas fa-users',
                    description: 'Monthly networking event for technology professionals and enthusiasts.',
                    fullDescription: 'Connect with fellow tech professionals in a casual environment. Share experiences, discuss industry trends, and build valuable connections. Open to developers, designers, product managers, and anyone passionate about technology.',
                    organizer: {
                        name: 'Tech Professionals Network',
                        contact: 'events@techpro.net',
                        avatar: 'TP'
                    },
                    venue: 'Tech Hub Lounge - Silicon Valley',
                    isVirtual: false,
                    registrationFee: '$20',
                    capacity: '100 people'
                }
            ],
            
            dance: [
                {
                    id: 'salsa-night',
                    title: 'Latin Dance Night',
                    date: 'Every Saturday',
                    time: '8:00 PM',
                    location: 'Rhythm Dance Studio',
                    type: 'In-Person',
                    icon: 'fas fa-music',
                    description: 'Learn salsa, bachata, and merengue with professional instructors. All skill levels welcome!',
                    fullDescription: 'Experience the passion and rhythm of Latin dance! Our weekly Latin Dance Night starts with beginner-friendly lessons in salsa, bachata, and merengue, followed by open dancing with live DJ music. Professional instructors will guide you through the basics and help improve your technique. No partner required - we rotate partners during lessons.',
                    organizer: {
                        name: 'Rhythm Dance Studio',
                        contact: 'info@rhythmdance.com',
                        avatar: 'RD'
                    },
                    venue: 'Rhythm Dance Studio - Main ballroom',
                    isVirtual: false,
                    registrationFee: '$20',
                    capacity: '100 dancers'
                }
            ],
            
            technology: [
                {
                    id: 'ai-workshop',
                    title: 'Artificial Intelligence Workshop',
                    date: 'April 15, 2024',
                    time: '10:00 AM',
                    location: 'Virtual Event',
                    type: 'Virtual',
                    icon: 'fas fa-robot',
                    description: 'Hands-on workshop covering machine learning fundamentals and practical AI applications.',
                    fullDescription: 'Dive deep into the world of artificial intelligence in this comprehensive workshop. Topics include machine learning fundamentals, neural networks, natural language processing, and computer vision. Participants will work through practical exercises using Python and popular AI frameworks. The workshop includes interactive coding sessions, Q&A with AI experts, and take-home projects.',
                    organizer: {
                        name: 'AI Learning Institute',
                        contact: 'workshops@ailearning.org',
                        avatar: 'AI'
                    },
                    venue: 'Zoom + GitHub Codespaces',
                    isVirtual: true,
                    registrationFee: '$45',
                    capacity: '200 participants'
                }
            ],
            
            food: [
                {
                    id: 'cooking-masterclass',
                    title: 'Italian Cuisine Masterclass',
                    date: 'May 5, 2024',
                    time: '11:00 AM',
                    location: 'Culinary Arts Academy',
                    type: 'In-Person',
                    icon: 'fas fa-utensils',
                    description: 'Learn to prepare authentic Italian dishes with a professional chef. Includes lunch and recipes.',
                    fullDescription: 'Master the art of Italian cooking with Chef Marco Rossi, who trained in Italy and has over 20 years of experience. This hands-on masterclass covers pasta making from scratch, traditional sauces, and classic desserts. All ingredients and equipment are provided, and you\'ll enjoy the meal you prepare together. Take home a recipe booklet and cooking tips.',
                    organizer: {
                        name: 'Culinary Arts Academy',
                        contact: 'classes@culinaryacademy.edu',
                        avatar: 'CA'
                    },
                    venue: 'Culinary Arts Academy - Professional kitchen',
                    isVirtual: false,
                    registrationFee: '$120',
                    capacity: '16 students'
                }
            ],
            
            arts: [
                {
                    id: 'art-exhibition',
                    title: 'Modern Art Exhibition Opening',
                    date: 'March 20, 2024',
                    time: '6:00 PM',
                    location: 'Metropolitan Gallery',
                    type: 'In-Person',
                    icon: 'fas fa-palette',
                    description: 'Opening night of contemporary art exhibition featuring emerging local artists.',
                    fullDescription: 'Celebrate the opening of "Emerging Voices," a curated exhibition showcasing the work of 15 emerging artists from our local community. The exhibition explores themes of identity, technology, and social change through various mediums including painting, sculpture, digital art, and mixed media. The opening reception includes artist talks, live music, and complimentary refreshments.',
                    organizer: {
                        name: 'Metropolitan Gallery',
                        contact: 'events@metrogallery.art',
                        avatar: 'MG'
                    },
                    venue: 'Metropolitan Gallery - All three floors',
                    isVirtual: false,
                    registrationFee: 'Free',
                    capacity: '300 guests'
                }
            ]
        }
    };

    init() {
        this.bindEvents();
        this.bindAuthEvents();
        this.bindCreateEventEvents();
        this.bindChatbotEvents();
        this.loadCategories();
        this.checkPersistentLogin(); // Check if user was previously logged in
        this.showPage('categories');
        this.initChatbot();
    }

    bindEvents() {
        // Navigation buttons
        document.getElementById('home-btn').addEventListener('click', () => {
            this.showPage('categories');
        });

        // Back button
        document.getElementById('back-btn').addEventListener('click', () => {
            this.goBack();
        });

        // Create Event button
        document.getElementById('create-event-btn').addEventListener('click', () => {
            this.showCreateEventModal();
        });
    }

    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    }

    showPage(page) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Show target page
        document.getElementById(`${page}-page`).classList.add('active');
        this.currentPage = page;

        // Update navigation
        this.updateNavigation();

        // Update homepage content if showing categories page
        if (page === 'categories' && this.isLoggedIn) {
            this.updateHomepageForUser();
        }
    }

    updateNavigation() {
        const homeBtn = document.getElementById('home-btn');
        const backBtn = document.getElementById('back-btn');

        if (this.currentPage === 'categories' || this.currentPage === 'profile') {
            homeBtn.classList.add('active');
            backBtn.classList.add('hidden');
        } else {
            homeBtn.classList.remove('active');
            backBtn.classList.remove('hidden');
        }
    }

    goBack() {
        if (this.currentPage === 'event-detail') {
            this.showCategoryEvents(this.currentCategory);
        } else if (this.currentPage === 'category-events') {
            this.showPage('categories');
        } else if (this.currentPage === 'profile') {
            this.showPage('categories');
        }
    }

    loadCategories() {
        const grid = document.getElementById('categories-grid');
        grid.innerHTML = '';

        // Update all events count to include user-created events
        this.updateAllEventsCount();

        this.data.categories.forEach(category => {
            const card = this.createCategoryCard(category);
            grid.appendChild(card);
        });
    }

    createCategoryCard(category) {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => this.showCategoryEvents(category.id);

        // Add staggered animation delay
        const index = this.data.categories.indexOf(category);
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.8)';

        card.innerHTML = `
            <i class="${category.icon} category-icon"></i>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <span class="category-count">${category.count} events</span>
        `;

        // Animate in after a short delay
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0px) scale(1)';
        }, index * 100 + 200);

        return card;
    }

    showCategoryEvents(categoryId) {
        this.showLoading();
        this.currentCategory = categoryId;
        
        setTimeout(() => {
            const category = this.data.categories.find(c => c.id === categoryId);
            let events;
            
            if (categoryId === 'all-events') {
                // Show all events from all categories
                events = [];
                Object.values(this.data.events).forEach(categoryEvents => {
                    events.push(...categoryEvents);
                });
                // Sort events by status (upcoming first) then by date
                events.sort((a, b) => {
                    const statusA = this.getEventStatus(a);
                    const statusB = this.getEventStatus(b);
                    
                    // Upcoming events come first
                    if (statusA === 'upcoming' && statusB === 'ended') return -1;
                    if (statusA === 'ended' && statusB === 'upcoming') return 1;
                    
                    // Within same status, sort by date
                    const dateA = this.parseEventDate(a.date);
                    const dateB = this.parseEventDate(b.date);
                    
                    if (statusA === 'upcoming' && statusB === 'upcoming') {
                        return dateA - dateB; // Upcoming: earliest first
                    } else {
                        return dateB - dateA; // Ended: most recent first
                    }
                });
            } else {
                events = this.data.events[categoryId] || [];
                // Sort category events by status (upcoming first) then by date
                events.sort((a, b) => {
                    const statusA = this.getEventStatus(a);
                    const statusB = this.getEventStatus(b);
                    
                    // Upcoming events come first
                    if (statusA === 'upcoming' && statusB === 'ended') return -1;
                    if (statusA === 'ended' && statusB === 'upcoming') return 1;
                    
                    // Within same status, sort by date
                    const dateA = this.parseEventDate(a.date);
                    const dateB = this.parseEventDate(b.date);
                    
                    if (statusA === 'upcoming' && statusB === 'upcoming') {
                        return dateA - dateB; // Upcoming: earliest first
                    } else {
                        return dateB - dateA; // Ended: most recent first
                    }
                });
            }

            // Update page header
            document.getElementById('category-title').textContent = `${category.name}`;
            document.getElementById('category-description').textContent = 
                categoryId === 'all-events' 
                    ? `Discover all ${events.length} amazing events across all categories`
                    : `Discover ${events.length} amazing ${category.name.toLowerCase()} events`;

            // Load events
            this.loadEvents(events);
            this.showPage('category-events');
            this.hideLoading();
        }, 500);
    }

    loadEvents(events) {
        const grid = document.getElementById('events-grid');
        grid.innerHTML = '';

        if (events.length === 0) {
            grid.innerHTML = `
                <div class="text-center" style="grid-column: 1 / -1; padding: 3rem;">
                    <h3>No events found</h3>
                    <p>Check back later for new events in this category.</p>
                </div>
            `;
            return;
        }

        events.forEach(event => {
            const card = this.createEventCard(event);
            grid.appendChild(card);
        });
    }

    createEventCard(event) {
        const card = document.createElement('div');
        const eventStatus = this.getEventStatus(event);
        card.className = `event-card ${eventStatus}`;
        card.onclick = () => this.showEventDetail(event.id);

        // Add entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';

        const statusBadge = eventStatus === 'ended' 
            ? '<span class="event-status status-ended"><i class="fas fa-flag-checkered"></i> Ended</span>'
            : '<span class="event-status status-upcoming"><i class="fas fa-calendar-plus"></i> Upcoming</span>';

        card.innerHTML = `
            <div class="event-image">
                <i class="${event.icon}"></i>
                <span class="event-type">${event.type}</span>
                ${statusBadge}
            </div>
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <div class="event-meta">
                    <div class="event-meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${event.date}</span>
                    </div>
                    <div class="event-meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${event.time}</span>
                    </div>
                    <div class="event-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>
                </div>
                <p class="event-description">${event.description}</p>
            </div>
        `;

        // Animate in with random delay for more natural feel
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0px) scale(1)';
        }, Math.random() * 300 + 100);

        return card;
    }

    // Database Simulation Methods
    initDatabase() {
        // Initialize localStorage "database" if it doesn't exist
        if (!localStorage.getItem('eventhub_users')) {
            localStorage.setItem('eventhub_users', JSON.stringify({}));
        }
        if (!localStorage.getItem('eventhub_user_registrations')) {
            localStorage.setItem('eventhub_user_registrations', JSON.stringify({}));
        }
        if (!localStorage.getItem('eventhub_user_sessions')) {
            localStorage.setItem('eventhub_user_sessions', JSON.stringify({}));
        }
        if (!localStorage.getItem('eventhub_user_preferences')) {
            localStorage.setItem('eventhub_user_preferences', JSON.stringify({}));
        }
    }

    initUserCreatedEvents() {
        // Initialize user-created events storage
        if (!localStorage.getItem('eventhub_user_created_events')) {
            localStorage.setItem('eventhub_user_created_events', JSON.stringify({}));
        }
    }

    saveUserToDatabase(userData) {
        const users = JSON.parse(localStorage.getItem('eventhub_users'));
        const userId = this.generateUserId();
        
        users[userData.email] = {
            id: userId,
            name: userData.name,
            email: userData.email,
            password: userData.password, // In real app, this would be hashed
            registeredAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            loginCount: 0,
            profile: {
                avatar: userData.name.charAt(0).toUpperCase(),
                preferences: {
                    theme: 'light',
                    notifications: true,
                    emailUpdates: true
                },
                stats: {
                    eventsAttended: 0,
                    eventsCreated: 0,
                    totalRegistrations: 0
                }
            },
            accountStatus: 'active',
            lastActivity: new Date().toISOString()
        };
        localStorage.setItem('eventhub_users', JSON.stringify(users));
        
        // Initialize user-specific data containers
        this.initializeUserData(userData.email);
    }

    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    initializeUserData(email) {
        // Initialize user registrations if not exists
        const registrations = JSON.parse(localStorage.getItem('eventhub_user_registrations'));
        if (!registrations[email]) {
            registrations[email] = [];
            localStorage.setItem('eventhub_user_registrations', JSON.stringify(registrations));
        }

        // Initialize user created events if not exists
        const createdEvents = JSON.parse(localStorage.getItem('eventhub_user_created_events'));
        if (!createdEvents[email]) {
            createdEvents[email] = [];
            localStorage.setItem('eventhub_user_created_events', JSON.stringify(createdEvents));
        }

        // Initialize user preferences if not exists
        const preferences = JSON.parse(localStorage.getItem('eventhub_user_preferences') || '{}');
        if (!preferences[email]) {
            preferences[email] = {
                theme: 'light',
                notifications: true,
                emailUpdates: true,
                favoriteCategories: [],
                language: 'en'
            };
            localStorage.setItem('eventhub_user_preferences', JSON.stringify(preferences));
        }
    }

    getUserFromDatabase(email) {
        const users = JSON.parse(localStorage.getItem('eventhub_users'));
        return users[email] || null;
    }

    validateUser(email, password) {
        const user = this.getUserFromDatabase(email);
        return user && user.password === password ? user : null;
    }

    userExists(email) {
        const users = JSON.parse(localStorage.getItem('eventhub_users'));
        return !!users[email];
    }

    updateUserLastLogin(email) {
        const users = JSON.parse(localStorage.getItem('eventhub_users'));
        if (users[email]) {
            users[email].lastLogin = new Date().toISOString();
            users[email].lastActivity = new Date().toISOString();
            users[email].loginCount = (users[email].loginCount || 0) + 1;
            localStorage.setItem('eventhub_users', JSON.stringify(users));
        }
    }

    updateUserActivity(email) {
        const users = JSON.parse(localStorage.getItem('eventhub_users'));
        if (users[email]) {
            users[email].lastActivity = new Date().toISOString();
            localStorage.setItem('eventhub_users', JSON.stringify(users));
        }
    }

    updateUserStats(email, statType, increment = 1) {
        const users = JSON.parse(localStorage.getItem('eventhub_users'));
        if (users[email] && users[email].profile && users[email].profile.stats) {
            users[email].profile.stats[statType] = (users[email].profile.stats[statType] || 0) + increment;
            users[email].lastActivity = new Date().toISOString();
            localStorage.setItem('eventhub_users', JSON.stringify(users));
        }
    }

    saveUserRegistrations(email, registrations) {
        const allRegistrations = JSON.parse(localStorage.getItem('eventhub_user_registrations'));
        allRegistrations[email] = Array.from(registrations);
        localStorage.setItem('eventhub_user_registrations', JSON.stringify(allRegistrations));
    }

    loadUserRegistrations(email) {
        const allRegistrations = JSON.parse(localStorage.getItem('eventhub_user_registrations'));
        return new Set(allRegistrations[email] || []);
    }

    saveLoginState(user) {
        localStorage.setItem('eventhub_current_user', JSON.stringify({
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }));
        localStorage.setItem('eventhub_logged_in', 'true');
    }

    clearLoginState() {
        localStorage.removeItem('eventhub_current_user');
        localStorage.removeItem('eventhub_logged_in');
        this.clearUserSession();
    }

    // Multi-user session management
    saveUserSession(user) {
        const sessions = JSON.parse(localStorage.getItem('eventhub_user_sessions') || '{}');
        const sessionId = this.generateSessionId();
        
        sessions[user.email] = {
            sessionId: sessionId,
            user: user,
            loginTime: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            isActive: true
        };
        
        localStorage.setItem('eventhub_user_sessions', JSON.stringify(sessions));
        localStorage.setItem('eventhub_current_session', sessionId);
        return sessionId;
    }

    clearUserSession() {
        if (this.currentUser) {
            const sessions = JSON.parse(localStorage.getItem('eventhub_user_sessions') || '{}');
            if (sessions[this.currentUser.email]) {
                sessions[this.currentUser.email].isActive = false;
                sessions[this.currentUser.email].logoutTime = new Date().toISOString();
                localStorage.setItem('eventhub_user_sessions', JSON.stringify(sessions));
            }
        }
        localStorage.removeItem('eventhub_current_session');
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getAllUsers() {
        const users = JSON.parse(localStorage.getItem('eventhub_users') || '{}');
        return Object.values(users).map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.profile?.avatar || user.name.charAt(0).toUpperCase(),
            lastLogin: user.lastLogin,
            loginCount: user.loginCount || 0,
            accountStatus: user.accountStatus || 'active'
        }));
    }

    switchUser(email) {
        if (!this.userExists(email)) {
            console.error('User does not exist');
            return false;
        }

        // Save current user's state if logged in
        if (this.isLoggedIn && this.currentUser) {
            this.saveUserRegistrations(this.currentUser.email, this.userRegistrations);
            this.clearUserSession();
        }

        // Load new user
        const user = this.getUserFromDatabase(email);
        if (user) {
            this.currentUser = {
                name: user.name,
                email: user.email,
                avatar: user.profile?.avatar || user.name.charAt(0).toUpperCase()
            };
            this.isLoggedIn = true;
            this.userRegistrations = this.loadUserRegistrations(email);
            
            // Update session
            this.saveUserSession(this.currentUser);
            this.saveLoginState(this.currentUser);
            this.updateUserActivity(email);
            
            // Load user's created events
            this.loadUserCreatedEvents();
            
            this.updateAuthUI();
            this.updateHomepageForUser();
            
            return true;
        }
        return false;
    }

    checkPersistentLogin() {
        const isLoggedIn = localStorage.getItem('eventhub_logged_in') === 'true';
        const userData = localStorage.getItem('eventhub_current_user');
        
        if (isLoggedIn && userData) {
            this.currentUser = JSON.parse(userData);
            this.isLoggedIn = true;
            this.userRegistrations = this.loadUserRegistrations(this.currentUser.email);
            this.loadUserCreatedEvents();
            this.updateAuthUI();
            
            // Show profile page for returning users
            this.showProfilePage();
            
            // Welcome back message
            setTimeout(() => {
                this.addChatMessage(`Welcome back, ${this.currentUser.name}! 👋`, 'bot');
            }, 1000);
        }
    }

    updateHomepageForUser() {
        if (this.isLoggedIn && this.currentUser) {
            const heroSection = document.querySelector('.hero-section h1');
            if (heroSection) {
                heroSection.textContent = `Welcome back, ${this.currentUser.name}!`;
            }
            
            const heroDescription = document.querySelector('.hero-section p');
            if (heroDescription) {
                heroDescription.textContent = `Ready to discover more amazing events? You have ${this.userRegistrations.size} registered events.`;
            }
        }
    }

    showEventDetail(eventId) {
        this.showLoading();
        this.currentEvent = eventId;

        setTimeout(() => {
            const event = this.findEventById(eventId);
            if (event) {
                this.loadEventDetail(event);
                this.showPage('event-detail');
            }
            this.hideLoading();
        }, 300);
    }

    findEventById(eventId) {
        for (const category in this.data.events) {
            const event = this.data.events[category].find(e => e.id === eventId);
            if (event) return event;
        }
        return null;
    }

    loadEventDetail(event) {
        const container = document.getElementById('event-detail');
        
        container.innerHTML = `
            <div class="event-detail-header">
                <i class="${event.icon}"></i>
            </div>
            <div class="event-detail-content">
                <h1 class="event-detail-title">${event.title}</h1>
                
                <div class="event-detail-meta">
                    <div class="meta-item">
                        <div class="meta-icon">
                            <i class="fas fa-calendar"></i>
                        </div>
                        <div class="meta-info">
                            <h4>Date & Time</h4>
                            <p>${event.date} at ${event.time}</p>
                        </div>
                    </div>
                    
                    <div class="meta-item">
                        <div class="meta-icon">
                            <i class="fas fa-${event.isVirtual ? 'video' : 'map-marker-alt'}"></i>
                        </div>
                        <div class="meta-info">
                            <h4>${event.isVirtual ? 'Virtual Platform' : 'Venue'}</h4>
                            <p>${event.venue}</p>
                        </div>
                    </div>
                    
                    <div class="meta-item">
                        <div class="meta-icon">
                            <i class="fas fa-ticket-alt"></i>
                        </div>
                        <div class="meta-info">
                            <h4>Registration</h4>
                            <p>${event.registrationFee}</p>
                        </div>
                    </div>
                    
                    <div class="meta-item">
                        <div class="meta-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="meta-info">
                            <h4>Capacity</h4>
                            <p>${event.capacity}</p>
                        </div>
                    </div>
                </div>
                
                <div class="event-detail-description">
                    <h3>About This Event</h3>
                    <p>${event.fullDescription}</p>
                </div>
                
                <div class="organizer-info">
                    <h3>Event Organizer</h3>
                    <div class="organizer-card">
                        <div class="organizer-avatar">
                            ${event.organizer.avatar}
                        </div>
                        <div class="organizer-details">
                            <h4>${event.organizer.name}</h4>
                            <p>Contact: ${event.organizer.contact}</p>
                        </div>
                    </div>
                </div>

                <!-- Registration Section -->
                <div class="registration-section">
                    <h3>Event Registration</h3>
                    <div class="registration-card" id="registration-card">
                        ${this.getRegistrationContent(event)}
                    </div>
                </div>
            </div>
        `;
    }

    // Authentication Methods
    bindAuthEvents() {
        // Login button
        document.getElementById('login-btn').addEventListener('click', () => {
            this.showAuthModal('login');
        });

        // Register button
        document.getElementById('register-btn').addEventListener('click', () => {
            this.showAuthModal('register');
        });

        // Modal close events
        document.getElementById('modal-close').addEventListener('click', () => {
            this.hideAuthModal();
        });

        document.getElementById('modal-overlay').addEventListener('click', () => {
            this.hideAuthModal();
        });

        // Form switch events
        document.getElementById('switch-to-register').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchAuthForm('register');
        });

        document.getElementById('switch-to-login').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchAuthForm('login');
        });

        // Form submissions
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // User profile dropdown events
        document.getElementById('profile-btn').addEventListener('click', () => {
            this.showProfile();
        });

        document.getElementById('my-events-btn').addEventListener('click', () => {
            this.showMyEventsPage();
        });

        document.getElementById('switch-user-btn').addEventListener('click', () => {
            this.showUserSwitcherModal();
        });

        document.getElementById('logout-btn').addEventListener('click', () => {
            this.handleLogout();
        });
    }

    showAuthModal(type) {
        const modal = document.getElementById('auth-modal');
        modal.classList.remove('hidden');
        this.switchAuthForm(type);
    }

    hideAuthModal() {
        document.getElementById('auth-modal').classList.add('hidden');
    }

    switchAuthForm(type) {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const modalTitle = document.getElementById('modal-title');

        if (type === 'login') {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            modalTitle.textContent = 'Login';
        } else {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            modalTitle.textContent = 'Sign Up';
        }
    }

    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Validate email format
        if (!this.isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Check user credentials against database
        const user = this.validateUser(email, password);
        if (user) {
            this.currentUser = {
                name: user.name,
                email: user.email,
                avatar: user.name.charAt(0).toUpperCase()
            };
            this.isLoggedIn = true;
            this.userRegistrations = this.loadUserRegistrations(email);
            
            // Update last login
            this.updateUserLastLogin(email);
            
            // Save login state and session for persistence
            this.saveLoginState(this.currentUser);
            this.saveUserSession(this.currentUser);
            
            // Load user's created events
            this.loadUserCreatedEvents();
            
            this.updateAuthUI();
            this.hideAuthModal();
            
            // Clear form
            document.getElementById('login-form').reset();
            
            // Show profile page after login
            this.showProfilePage();
            
            this.addChatMessage(`Welcome back, ${user.name}! You're now logged in. 🎉`, 'bot');
        } else {
            alert('Invalid email or password. Please check your credentials and try again.');
        }
    }

    handleRegister() {
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;

        // Validation
        if (!name || !email || !password || !confirm) {
            alert('Please fill in all fields');
            return;
        }

        if (name.length < 2) {
            alert('Name must be at least 2 characters long');
            return;
        }

        if (!this.isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirm) {
            alert('Passwords do not match');
            return;
        }

        // Check if user already exists
        if (this.userExists(email)) {
            alert('An account with this email already exists. Please use a different email or try logging in.');
            return;
        }

        // Create new user
        const userData = {
            name: name,
            email: email,
            password: password
        };

        // Save to database
        this.saveUserToDatabase(userData);

        // Log in the new user
        this.currentUser = {
            name: name,
            email: email,
            avatar: name.charAt(0).toUpperCase()
        };
        this.isLoggedIn = true;
        this.userRegistrations = new Set(); // New user has no registrations

        // Save login state and session for persistence
        this.saveLoginState(this.currentUser);
        this.saveUserSession(this.currentUser);

        this.updateAuthUI();
        this.hideAuthModal();

        // Clear form
        document.getElementById('register-form').reset();

        // Show profile page after registration
        this.showProfilePage();

        this.addChatMessage(`Welcome to EventHub, ${name}! Your account has been created successfully. 🎉`, 'bot');
    }

    // Create Event Methods
    bindCreateEventEvents() {
        // Modal close events
        document.getElementById('create-event-close').addEventListener('click', () => {
            this.hideCreateEventModal();
        });

        document.getElementById('create-event-overlay').addEventListener('click', () => {
            this.hideCreateEventModal();
        });

        // Form submission
        document.getElementById('create-event-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCreateEvent();
        });
    }

    showCreateEventModal() {
        if (!this.isLoggedIn) {
            this.showAuthModal('login');
            return;
        }

        const modal = document.getElementById('create-event-modal');
        modal.classList.remove('hidden');
        
        // Pre-fill organizer info
        document.getElementById('organizer-name').value = this.currentUser.name;
        document.getElementById('organizer-contact').value = this.currentUser.email;
        
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('event-date').min = today;
    }

    hideCreateEventModal() {
        document.getElementById('create-event-modal').classList.add('hidden');
        document.getElementById('create-event-form').reset();
    }

    handleCreateEvent() {
        // Get form data
        const formData = {
            title: document.getElementById('event-title').value.trim(),
            category: document.getElementById('event-category').value,
            date: document.getElementById('event-date').value,
            time: document.getElementById('event-time').value,
            location: document.getElementById('event-location').value.trim(),
            type: document.getElementById('event-type').value,
            description: document.getElementById('event-description').value.trim(),
            fullDescription: document.getElementById('event-full-description').value.trim(),
            registrationFee: document.getElementById('event-fee').value.trim() || 'Free',
            capacity: document.getElementById('event-capacity').value.trim() || '50 people',
            venue: document.getElementById('event-venue').value.trim(),
            icon: document.getElementById('event-icon').value,
            organizerName: document.getElementById('organizer-name').value.trim() || this.currentUser.name,
            organizerContact: document.getElementById('organizer-contact').value.trim() || this.currentUser.email
        };

        // Validate required fields
        if (!formData.title || !formData.category || !formData.date || !formData.time || 
            !formData.location || !formData.type || !formData.description || !formData.fullDescription) {
            alert('Please fill in all required fields marked with *');
            return;
        }

        // Format date for display
        const eventDate = new Date(formData.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        // Format time for display
        const timeFormatted = new Date(`1970-01-01T${formData.time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        // Create event object
        const newEvent = {
            id: `user-event-${Date.now()}`,
            title: formData.title,
            date: formattedDate,
            time: timeFormatted,
            location: formData.location,
            type: formData.type,
            icon: formData.icon,
            description: formData.description,
            fullDescription: formData.fullDescription,
            organizer: {
                name: formData.organizerName,
                contact: formData.organizerContact,
                avatar: formData.organizerName.charAt(0).toUpperCase()
            },
            venue: formData.venue || formData.location,
            isVirtual: formData.type === 'Virtual',
            registrationFee: formData.registrationFee,
            capacity: formData.capacity,
            createdBy: this.currentUser.email,
            createdAt: new Date().toISOString()
        };

        // Add to user's created events and selected category
        this.addUserCreatedEvent(newEvent, formData.category);

        // Update category count
        const category = this.data.categories.find(c => c.id === formData.category);
        if (category) {
            category.count++;
        }

        this.hideCreateEventModal();
        
        // Show success message
        this.addChatMessage(`🎉 Event "${newEvent.title}" has been created successfully! You can find it in the ${category.name} category.`, 'bot');

        // Navigate to the category page to show the new event
        this.showCategoryEvents(formData.category);
    }

    addUserCreatedEvent(event, categoryId) {
        // Add to data structure
        if (!this.data.events[categoryId]) {
            this.data.events[categoryId] = [];
        }
        this.data.events[categoryId].push(event);

        // Save to localStorage
        const userCreatedEvents = JSON.parse(localStorage.getItem('eventhub_user_created_events'));
        if (!userCreatedEvents[this.currentUser.email]) {
            userCreatedEvents[this.currentUser.email] = [];
        }
        userCreatedEvents[this.currentUser.email].push({
            event: event,
            category: categoryId
        });
        localStorage.setItem('eventhub_user_created_events', JSON.stringify(userCreatedEvents));
    }

    loadUserCreatedEvents() {
        if (!this.currentUser) return;

        const userCreatedEvents = JSON.parse(localStorage.getItem('eventhub_user_created_events'));
        const userEvents = userCreatedEvents[this.currentUser.email] || [];

        userEvents.forEach(({ event, category }) => {
            // Check if event already exists in current data
            if (!this.data.events[category]) {
                this.data.events[category] = [];
            }
            
            const existingEvent = this.data.events[category].find(e => e.id === event.id);
            if (!existingEvent) {
                this.data.events[category].push(event);
                
                // Update category count
                const cat = this.data.categories.find(c => c.id === category);
                if (cat) {
                    cat.count++;
                }
            }
        });

        // Update "All Events" count to include user-created events
        this.updateAllEventsCount();
    }

    updateAllEventsCount() {
        let totalEvents = 0;
        Object.values(this.data.events).forEach(categoryEvents => {
            totalEvents += categoryEvents.length;
        });

        const allEventsCategory = this.data.categories.find(c => c.id === 'all-events');
        if (allEventsCategory) {
            allEventsCategory.count = totalEvents;
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    handleLogout() {
        // Save user registrations before logging out
        if (this.currentUser && this.currentUser.email) {
            this.saveUserRegistrations(this.currentUser.email, this.userRegistrations);
        }

        // Clear login state
        this.clearLoginState();
        
        this.isLoggedIn = false;
        this.currentUser = null;
        this.userRegistrations.clear();
        this.updateAuthUI();
        
        // Reset homepage to default
        this.resetHomepageDefault();
        
        // Update current event registration display if on event detail page
        if (this.currentPage === 'event-detail' && this.currentEvent) {
            const event = this.findEventById(this.currentEvent);
            const registrationCard = document.getElementById('registration-card');
            if (registrationCard && event) {
                registrationCard.innerHTML = this.getRegistrationContent(event);
            }
        }
        
        // Redirect to home page after logout
        this.showPage('categories');
        
        this.addChatMessage('You\'ve been logged out successfully. Thanks for using EventHub! 👋', 'bot');
    }

    resetHomepageDefault() {
        const heroSection = document.querySelector('.hero-section h1');
        if (heroSection) {
            heroSection.textContent = 'Discover Amazing Events';
        }
        
        const heroDescription = document.querySelector('.hero-section p');
        if (heroDescription) {
            heroDescription.textContent = 'Find and join events that match your interests';
        }
    }

    updateAuthUI() {
        const authButtons = document.getElementById('auth-buttons');
        const userProfile = document.getElementById('user-profile');
        const createEventSection = document.getElementById('create-event-section');

        if (this.isLoggedIn && this.currentUser) {
            authButtons.classList.add('hidden');
            userProfile.classList.remove('hidden');
            createEventSection.classList.remove('hidden');
            
            document.getElementById('user-name').textContent = this.currentUser.name;
            document.getElementById('user-email').textContent = this.currentUser.email;
            document.getElementById('user-avatar').innerHTML = this.currentUser.avatar;
        } else {
            authButtons.classList.remove('hidden');
            userProfile.classList.add('hidden');
            createEventSection.classList.add('hidden');
        }
    }

    showProfile() {
        if (this.isLoggedIn) {
            this.showProfilePage();
        } else {
            this.showAuthModal('login');
        }
    }

    showMyEventsPage() {
        if (!this.isLoggedIn) {
            this.showAuthModal('login');
            return;
        }

        this.showProfilePage();
    }

    // Chatbot Methods
    bindChatbotEvents() {
        // Float button to open/close chatbot
        document.getElementById('chatbot-float').addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Toggle button in chatbot header
        document.getElementById('chatbot-toggle').addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Send message on button click
        document.getElementById('chat-send').addEventListener('click', () => {
            this.sendMessage();
        });

        // Send message on Enter key
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-action')) {
                const action = e.target.getAttribute('data-action');
                this.handleQuickAction(action);
            }
        });
    }

    initChatbot() {
        this.chatbotOpen = false;
    }

    toggleChatbot() {
        const container = document.getElementById('chatbot-container');
        const floatBtn = document.getElementById('chatbot-float');

        if (this.chatbotOpen) {
            container.classList.remove('active');
            floatBtn.style.display = 'flex';
            this.chatbotOpen = false;
        } else {
            container.classList.add('active');
            floatBtn.style.display = 'none';
            this.chatbotOpen = true;
        }
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();

        if (message) {
            this.addChatMessage(message, 'user');
            input.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                this.generateBotResponse(message);
            }, 1000);
        }
    }

    addChatMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;

        const avatar = sender === 'bot' ? '<i class="fas fa-robot"></i>' : 
                      (this.isLoggedIn ? this.currentUser.avatar : '<i class="fas fa-user"></i>');

        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${avatar}
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        let response = '';

        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            response = this.isLoggedIn ? 
                `Hi ${this.currentUser.name}! How can I help you find the perfect event today?` :
                'Hello! Welcome to EventHub. I can help you find events, learn about our platform, or assist with account questions.';
        } else if (message.includes('event') || message.includes('find')) {
            response = 'I can help you find events! We have categories like Sports, Games, Competitions, Meetups, Dance Clubs, Technology, Food & Dining, and Arts & Culture. Which type of event interests you?';
        } else if (message.includes('register') || message.includes('account')) {
            response = this.isLoggedIn ? 
                'You\'re already logged in! You can view your profile or manage your events from the user menu.' :
                'To register for events and save your favorites, please create an account using the Sign Up button in the top right corner.';
        } else if (message.includes('login') || message.includes('sign in')) {
            response = this.isLoggedIn ? 
                'You\'re already logged in!' :
                'Click the Login button in the top right corner to access your account.';
        } else if (message.includes('help') || message.includes('how')) {
            response = 'I\'m here to help! You can:\n• Browse events by category\n• View detailed event information\n• Create an account to save favorites\n• Get help with any questions\n\nWhat would you like to do?';
        } else if (message.includes('sports')) {
            response = 'Great choice! We have exciting sports events like marathons, basketball tournaments, and fitness classes. Click on the Sports category from the home page to see all available events.';
        } else if (message.includes('virtual') || message.includes('online')) {
            response = 'We have both in-person and virtual events! Look for the "Virtual" badge on event cards. Virtual events include workshops, gaming tournaments, and online meetups.';
        } else if (message.includes('register') || message.includes('registration')) {
            if (this.isLoggedIn) {
                const registeredCount = this.userRegistrations.size;
                if (registeredCount > 0) {
                    response = `You currently have ${registeredCount} registered event${registeredCount > 1 ? 's' : ''}! To register for more events, just click on any event and hit the "Register Now" button. You can also view your registered events from your profile menu.`;
                } else {
                    response = 'To register for an event, simply click on any event card to view details, then click the "Register Now" button. Make sure to check the registration fee and event details before confirming!';
                }
            } else {
                response = 'To register for events, you\'ll need to create an account first. Click "Sign Up" in the top right corner, then you can register for any event by clicking the "Register Now" button on event detail pages.';
            }
        } else if (message.includes('cancel') || message.includes('unregister')) {
            if (this.isLoggedIn && this.userRegistrations.size > 0) {
                response = 'To cancel a registration, go to the event detail page and click "Cancel Registration". You can also view all your registered events by clicking on your profile menu and selecting "My Events".';
            } else if (this.isLoggedIn) {
                response = 'You don\'t have any active registrations to cancel right now. Browse events to find something interesting to register for!';
            } else {
                response = 'Please log in to manage your event registrations.';
            }
        } else if (message.includes('my events') || message.includes('registered')) {
            if (this.isLoggedIn) {
                const count = this.userRegistrations.size;
                response = count > 0 ? 
                    `You have ${count} registered event${count > 1 ? 's' : ''}! Click on your profile menu (top right) and select "My Events" to see the full list.` :
                    'You haven\'t registered for any events yet. Browse our categories to find events that interest you!';
            } else {
                response = 'Please log in to view your registered events.';
            }
        } else if (message.includes('users') || message.includes('members')) {
            const users = JSON.parse(localStorage.getItem('eventhub_users'));
            const userCount = Object.keys(users).length;
            response = `EventHub now has ${userCount} registered member${userCount !== 1 ? 's' : ''}! Join our growing community of event enthusiasts. 🌟`;
        } else if (message.includes('database') || message.includes('storage')) {
            if (this.isLoggedIn && this.currentUser.email === 'admin@test.com') {
                const users = JSON.parse(localStorage.getItem('eventhub_users'));
                const registrations = JSON.parse(localStorage.getItem('eventhub_user_registrations'));
                response = `Database Status:\n• Users: ${Object.keys(users).length}\n• Total Registrations: ${Object.values(registrations).reduce((total, regs) => total + regs.length, 0)}\n• Your Registrations: ${this.userRegistrations.size}`;
            } else {
                response = 'Database information is only available to administrators.';
            }
        } else {
            response = 'I understand you\'re looking for information. Try asking me about:\n• Finding events\n• Event registration\n• Account help\n• Event categories\n• How to register\n\nOr use the quick action buttons for common tasks!';
        }

        this.addChatMessage(response, 'bot');
    }

    handleQuickAction(action) {
        switch (action) {
            case 'find-events':
                this.addChatMessage('Find Events', 'user');
                this.addChatMessage('Perfect! I can help you find events. We have 8 different categories:\n\n🏃 Sports - Marathons, tournaments, fitness\n🎮 Games - Gaming tournaments, board games\n🏆 Competitions - Hackathons, contests\n👥 Meetups - Networking, social events\n💃 Dance - Classes, performances\n💻 Technology - Workshops, tech talks\n🍴 Food & Dining - Cooking classes, tastings\n🎨 Arts & Culture - Exhibitions, workshops\n\nWhich category interests you most?', 'bot');
                break;
            case 'event-help':
                this.addChatMessage('Event Help', 'user');
                this.addChatMessage('I can help you with events! Here\'s what you can do:\n\n📱 Browse by category on the home page\n📋 View detailed event information\n📅 Check dates, times, and locations\n🎟️ See registration fees and capacity\n👨‍💼 Learn about event organizers\n\nJust click on any category or event card to get started!', 'bot');
                break;
            case 'registration-help':
                this.addChatMessage('Registration', 'user');
                if (this.isLoggedIn) {
                    const regCount = this.userRegistrations.size;
                    this.addChatMessage(`📝 **Event Registration Guide**\n\n**Your Status:** ${regCount} registered event${regCount !== 1 ? 's' : ''}\n\n**How to register:**\n• Click on any event card\n• View event details\n• Click "Register Now" button\n• Confirm your registration\n\n**Managing registrations:**\n• View: Profile menu → "My Events"\n• Cancel: Go to event page → "Cancel Registration"\n\n${regCount > 0 ? '✅ You can register for unlimited events!' : '🎯 Ready to register for your first event?'}`, 'bot');
                } else {
                    this.addChatMessage('📝 **Event Registration Guide**\n\n**To register for events:**\n1️⃣ Create an account (Sign Up button)\n2️⃣ Browse events by category\n3️⃣ Click on events to view details\n4️⃣ Click "Register Now" on event pages\n\n**Registration includes:**\n• Event confirmation email\n• Access to event updates\n• Ability to manage registrations\n\nCreate your account now to get started! 🚀', 'bot');
                }
                break;
            case 'account-help':
                this.addChatMessage('Account Help', 'user');
                if (this.isLoggedIn) {
                    this.addChatMessage('You\'re logged in! Here\'s what you can do:\n\n👤 Click your avatar to access:\n• View your profile\n• See your registered events\n• Logout\n\nIs there anything specific you need help with?', 'bot');
                } else {
                    this.addChatMessage('To get the most out of EventHub:\n\n✅ **Sign Up** to create an account\n🔑 **Login** if you already have one\n\nWith an account you can:\n• Save favorite events\n• Track your registrations\n• Get personalized recommendations\n\nClick the Sign Up button in the top right to get started!', 'bot');
                }
                break;
        }
    }

    // Registration Methods
    getRegistrationContent(event) {
        const isRegistered = this.userRegistrations.has(event.id);
        const capacity = this.parseCapacity(event.capacity);
        const isFull = capacity.current >= capacity.max;

        if (!this.isLoggedIn) {
            return `
                <div class="registration-prompt">
                    <div class="registration-icon">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <h4>Login Required</h4>
                    <p>Please log in to register for this event</p>
                    <button class="btn-register login-required" onclick="app.showAuthModal('login')">
                        <i class="fas fa-sign-in-alt"></i> Login to Register
                    </button>
                </div>
            `;
        }

        if (isRegistered) {
            return `
                <div class="registration-status registered">
                    <div class="registration-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h4>You're Registered!</h4>
                    <p>You have successfully registered for this event</p>
                    <div class="registration-actions">
                        <button class="btn-register registered" disabled>
                            <i class="fas fa-check"></i> Registered
                        </button>
                        <button class="btn-unregister" onclick="app.unregisterFromEvent('${event.id}')">
                            <i class="fas fa-times"></i> Cancel Registration
                        </button>
                    </div>
                </div>
            `;
        }

        if (isFull) {
            return `
                <div class="registration-status full">
                    <div class="registration-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h4>Event Full</h4>
                    <p>This event has reached maximum capacity</p>
                    <button class="btn-register full" disabled>
                        <i class="fas fa-ban"></i> Registration Full
                    </button>
                    <p class="capacity-info">Capacity: ${capacity.current}/${capacity.max}</p>
                </div>
            `;
        }

        return `
            <div class="registration-available">
                <div class="registration-icon">
                    <i class="fas fa-calendar-plus"></i>
                </div>
                <h4>Join This Event</h4>
                <p>Secure your spot at this amazing event</p>
                <div class="registration-details">
                    <div class="registration-fee">
                        <span class="fee-label">Registration Fee:</span>
                        <span class="fee-amount">${event.registrationFee}</span>
                    </div>
                    <div class="availability">
                        <span class="availability-label">Availability:</span>
                        <span class="availability-count">${capacity.max - capacity.current} spots left</span>
                    </div>
                </div>
                <button class="btn-register available" onclick="app.registerForEvent('${event.id}')">
                    <i class="fas fa-user-plus"></i> Register Now
                </button>
            </div>
        `;
    }

    parseCapacity(capacityString) {
        // Parse capacity string like "5000 participants" or "32 teams"
        const numbers = capacityString.match(/\d+/g);
        const maxCapacity = numbers ? parseInt(numbers[0]) : 100;
        // Simulate some registrations (random between 10% and 80% of capacity)
        const currentRegistrations = Math.floor(maxCapacity * (0.1 + Math.random() * 0.7));
        
        return {
            current: currentRegistrations,
            max: maxCapacity
        };
    }

    registerForEvent(eventId) {
        if (!this.isLoggedIn) {
            this.showAuthModal('login');
            return;
        }

        const event = this.findEventById(eventId);
        if (!event) return;

        // Add to user's registrations
        this.userRegistrations.add(eventId);
        
        // Save to database
        this.saveUserRegistrations(this.currentUser.email, this.userRegistrations);
        
        // Update user stats
        this.updateUserStats(this.currentUser.email, 'totalRegistrations');
        this.updateUserActivity(this.currentUser.email);
        
        // Update the registration UI
        const registrationCard = document.getElementById('registration-card');
        if (registrationCard) {
            registrationCard.innerHTML = this.getRegistrationContent(event);
        }

        // Update homepage if user is on it
        this.updateHomepageForUser();

        // Show success message
        this.addChatMessage(`Great! You've successfully registered for "${event.title}". We'll send you a confirmation email shortly. 🎉`, 'bot');
        
        // Trigger celebration animation
        this.triggerCelebrationAnimation();
        
        // Optional: Show registration confirmation modal
        this.showRegistrationConfirmation(event);
    }

    unregisterFromEvent(eventId) {
        const event = this.findEventById(eventId);
        if (!event) return;

        if (confirm(`Are you sure you want to cancel your registration for "${event.title}"?`)) {
            // Remove from user's registrations
            this.userRegistrations.delete(eventId);
            
            // Save to database
            this.saveUserRegistrations(this.currentUser.email, this.userRegistrations);
            
            // Update the registration UI
            const registrationCard = document.getElementById('registration-card');
            if (registrationCard) {
                registrationCard.innerHTML = this.getRegistrationContent(event);
            }

            // Update homepage if user is on it
            this.updateHomepageForUser();

            this.addChatMessage(`Your registration for "${event.title}" has been cancelled. You can re-register anytime if spots are available.`, 'bot');
        }
    }

    showRegistrationConfirmation(event) {
        const modal = document.createElement('div');
        modal.className = 'modal confirmation-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Registration Confirmed!</h2>
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="confirmation-content">
                        <div class="confirmation-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>${event.title}</h3>
                        <div class="event-summary">
                            <p><i class="fas fa-calendar"></i> ${event.date} at ${event.time}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                            <p><i class="fas fa-ticket-alt"></i> ${event.registrationFee}</p>
                        </div>
                        <p class="confirmation-message">
                            You're all set! We've sent a confirmation email to <strong>${this.currentUser.email}</strong> 
                            with event details and any additional instructions.
                        </p>
                        <div class="confirmation-actions">
                            <button class="btn-primary" onclick="this.closest('.modal').remove()">
                                <i class="fas fa-check"></i> Got it!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal events
        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.querySelector('.modal-overlay').onclick = () => modal.remove();

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 5000);
    }

    // Update the showMyEvents method to show registered events
    showMyEvents() {
        if (!this.isLoggedIn) {
            this.showAuthModal('login');
            return;
        }

        this.showProfilePage();
    }

    // Profile Page Methods
    showProfilePage() {
        if (!this.isLoggedIn) {
            this.showAuthModal('login');
            return;
        }

        this.loadProfileData();
        this.showPage('profile');
    }

    loadProfileData() {
        if (!this.currentUser) return;

        const user = this.getUserFromDatabase(this.currentUser.email);
        
        // Update profile header
        document.getElementById('profile-name').textContent = this.currentUser.name;
        document.getElementById('profile-email').textContent = this.currentUser.email;
        document.getElementById('profile-avatar-large').innerHTML = this.currentUser.avatar;

        // Update member dates
        if (user) {
            const memberSince = new Date(user.registeredAt).toLocaleDateString();
            const lastActive = new Date(user.lastLogin).toLocaleDateString();
            
            document.getElementById('member-since').textContent = memberSince;
            document.getElementById('last-active').textContent = lastActive;
        }

        // Get user's registered events
        const userEvents = this.getUserRegisteredEvents();
        const { upcomingEvents, pastEvents } = this.categorizeEventsByDate(userEvents);
        
        // Get user's organizing events
        const organizingEvents = this.getUserOrganizingEvents();

        // Update statistics
        document.getElementById('total-events').textContent = userEvents.length;
        document.getElementById('upcoming-events').textContent = upcomingEvents.length;
        document.getElementById('attended-events').textContent = pastEvents.length;

        // Update section counts
        document.getElementById('upcoming-count').textContent = upcomingEvents.length;
        document.getElementById('past-count').textContent = pastEvents.length;
        document.getElementById('organizing-count').textContent = organizingEvents.length;
        document.getElementById('all-events-count').textContent = userEvents.length;

        // Load events into sections
        this.loadEventsIntoSection('upcoming-events-list', upcomingEvents, 'upcoming');
        this.loadEventsIntoSection('past-events-list', pastEvents, 'past');
        this.loadEventsIntoSection('organizing-events-list', organizingEvents, 'organizing');
        this.loadEventsIntoSection('all-events-list', userEvents, 'all');
        
        // Load category recommendations
        this.loadCategoryRecommendations();
    }

    getUserRegisteredEvents() {
        const registeredEvents = [];
        for (const eventId of this.userRegistrations) {
            const event = this.findEventById(eventId);
            if (event) {
                registeredEvents.push(event);
            }
        }
        return registeredEvents;
    }

    getUserOrganizingEvents() {
        const organizingEvents = [];
        const userCreatedEvents = JSON.parse(localStorage.getItem('eventhub_user_created_events'));
        if (userCreatedEvents && userCreatedEvents[this.currentUser.email]) {
            userCreatedEvents[this.currentUser.email].forEach(({ event, category }) => {
                const categoryObj = this.data.categories.find(c => c.id === category);
                if (categoryObj) {
                    organizingEvents.push({
                        ...event,
                        category: categoryObj.name // Display category name in profile
                    });
                }
            });
        }
        return organizingEvents;
    }

    categorizeEventsByDate(events) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingEvents = [];
        const pastEvents = [];

        events.forEach(event => {
            const eventDate = this.parseEventDate(event.date);
            if (eventDate >= today) {
                upcomingEvents.push(event);
            } else {
                pastEvents.push(event);
            }
        });

        // Sort upcoming events by date (earliest first)
        upcomingEvents.sort((a, b) => this.parseEventDate(a.date) - this.parseEventDate(b.date));
        
        // Sort past events by date (most recent first)
        pastEvents.sort((a, b) => this.parseEventDate(b.date) - this.parseEventDate(a.date));

        return { upcomingEvents, pastEvents };
    }

    parseEventDate(dateString) {
        // Parse dates like "March 15, 2024" or "Every Friday"
        if (dateString.toLowerCase().includes('every')) {
            // For recurring events, assume they're upcoming
            return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Next week
        }
        
        try {
            return new Date(dateString);
        } catch (e) {
            // If parsing fails, assume it's upcoming
            return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Next month
        }
    }

    getEventStatus(event) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const eventDate = this.parseEventDate(event.date);
        eventDate.setHours(0, 0, 0, 0);
        
        if (eventDate < today) {
            return 'ended';
        } else {
            return 'upcoming';
        }
    }

    triggerCelebrationAnimation() {
        const container = document.getElementById('celebration-container');
        if (!container) return;

        // Clear any existing animation
        container.innerHTML = '';

        // Create burst effect at center
        this.createBurstEffect();

        // Create falling blossoms
        this.createFallingBlossoms();

        // Create sparkles
        this.createSparkles();

        // Auto-cleanup after animation
        setTimeout(() => {
            container.innerHTML = '';
        }, 8000);
    }

    createBurstEffect() {
        const burst = document.createElement('div');
        burst.className = 'celebration-burst';
        
        const colors = ['#ff69b4', '#da70d6', '#87ceeb', '#ffd700', '#ff1493'];
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'burst-particle';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (i / 12) * 360;
            const distance = 100 + Math.random() * 50;
            
            particle.style.setProperty('--angle', `${angle}deg`);
            particle.style.setProperty('--distance', `${distance}px`);
            particle.style.transform = `rotate(${angle}deg) translateX(${distance}px)`;
            
            burst.appendChild(particle);
        }
        
        document.getElementById('celebration-container').appendChild(burst);
        
        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 2000);
    }

    createFallingBlossoms() {
        const container = document.getElementById('celebration-container');
        const colors = ['pink', 'purple', 'white', 'blue', 'yellow'];
        
        // Create multiple waves of blossoms
        for (let wave = 0; wave < 3; wave++) {
            setTimeout(() => {
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        const blossom = document.createElement('div');
                        blossom.className = 'blossom';
                        
                        const petal = document.createElement('div');
                        const colorClass = colors[Math.floor(Math.random() * colors.length)];
                        petal.className = `petal ${colorClass} ${Math.random() > 0.5 ? 'sway' : ''}`;
                        
                        // Random starting position across the top
                        blossom.style.left = Math.random() * 100 + '%';
                        blossom.style.top = '-20px';
                        
                        // Random animation duration
                        const duration = 3 + Math.random() * 4;
                        petal.style.animationDuration = `${duration}s`;
                        
                        // Random size variation
                        const scale = 0.5 + Math.random() * 0.8;
                        petal.style.transform = `scale(${scale})`;
                        
                        blossom.appendChild(petal);
                        container.appendChild(blossom);
                        
                        // Clean up after animation
                        setTimeout(() => {
                            if (blossom.parentNode) {
                                blossom.parentNode.removeChild(blossom);
                            }
                        }, duration * 1000 + 500);
                    }, i * 100);
                }
            }, wave * 1000);
        }
    }

    createSparkles() {
        const container = document.getElementById('celebration-container');
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                
                // Random position
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                
                // Random delay
                sparkle.style.animationDelay = Math.random() * 2 + 's';
                
                container.appendChild(sparkle);
                
                // Clean up
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 4000);
            }, i * 200);
        }
    }

    // User Switcher Modal Functions
    showUserSwitcherModal() {
        document.getElementById('user-switcher-modal').classList.remove('hidden');
        this.loadUserList();
        
        // Bind modal events if not already bound
        if (!this.userSwitcherEventsBound) {
            this.bindUserSwitcherEvents();
            this.userSwitcherEventsBound = true;
        }
    }

    hideUserSwitcherModal() {
        document.getElementById('user-switcher-modal').classList.add('hidden');
    }

    bindUserSwitcherEvents() {
        document.getElementById('user-switcher-close').addEventListener('click', () => {
            this.hideUserSwitcherModal();
        });

        document.getElementById('user-switcher-overlay').addEventListener('click', () => {
            this.hideUserSwitcherModal();
        });

        document.getElementById('add-new-user-btn').addEventListener('click', () => {
            this.hideUserSwitcherModal();
            this.showAuthModal('register');
        });
    }

    loadUserList() {
        const userList = document.getElementById('user-list');
        const users = this.getAllUsers();
        
        if (users.length === 0) {
            userList.innerHTML = `
                <div class="text-center" style="padding: 2rem; color: var(--text-secondary);">
                    <i class="fas fa-users" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No user accounts found</h3>
                    <p>Create your first account to get started!</p>
                </div>
            `;
            return;
        }

        userList.innerHTML = users.map(user => `
            <div class="user-item ${this.currentUser && user.email === this.currentUser.email ? 'current' : ''}" 
                 onclick="app.handleUserSwitch('${user.email}')">
                <div class="user-avatar-large">
                    ${user.avatar}
                </div>
                <div class="user-details">
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">${user.email}</div>
                    <div class="user-meta">
                        <span><i class="fas fa-sign-in-alt"></i> ${user.loginCount} logins</span>
                        <span><i class="fas fa-clock"></i> ${this.formatDate(user.lastLogin)}</span>
                        <span class="user-status ${this.currentUser && user.email === this.currentUser.email ? 'status-current' : 'status-available'}">
                            ${this.currentUser && user.email === this.currentUser.email ? 'Current' : 'Available'}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    handleUserSwitch(email) {
        if (this.currentUser && email === this.currentUser.email) {
            this.hideUserSwitcherModal();
            return;
        }

        const success = this.switchUser(email);
        if (success) {
            this.hideUserSwitcherModal();
            this.addChatMessage(`Welcome back, ${this.currentUser.name}! You've successfully switched accounts. 👋`, 'bot');
            this.showPage('categories'); // Navigate to home page
        } else {
            alert('Failed to switch user. Please try again.');
        }
    }

    formatDate(dateString) {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    }

    loadEventsIntoSection(containerId, events, type) {
        const container = document.getElementById(containerId);
        
        if (events.length === 0) {
            container.innerHTML = this.getEmptyStateHTML(type);
            return;
        }

        container.innerHTML = events.map(event => this.createProfileEventCard(event, type)).join('');
    }

    createProfileEventCard(event, type) {
        const category = this.getCategoryForEvent(event.id) || { name: event.category || 'Event' };
        let status = 'active';
        let statusText = 'Registered';
        
        if (type === 'upcoming') {
            status = 'upcoming';
            statusText = 'Upcoming';
        } else if (type === 'past') {
            status = 'past';
            statusText = 'Attended';
        } else if (type === 'organizing') {
            status = 'organizing';
            statusText = 'Organizing';
        }
        
        return `
            <div class="profile-event-card" onclick="app.showEventDetail('${event.id}')">
                <div class="profile-event-header">
                    <div>
                        <div class="profile-event-title">${event.title}</div>
                        <div class="profile-event-category">${category.name}</div>
                    </div>
                    <div class="profile-event-status status-${status}">
                        ${statusText}
                    </div>
                </div>
                
                <div class="profile-event-meta">
                    <div class="profile-event-meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${event.date}</span>
                    </div>
                    <div class="profile-event-meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${event.time}</span>
                    </div>
                    <div class="profile-event-meta-item">
                        <i class="fas fa-${event.isVirtual ? 'video' : 'map-marker-alt'}"></i>
                        <span>${event.location}</span>
                    </div>
                    <div class="profile-event-meta-item">
                        <i class="fas fa-ticket-alt"></i>
                        <span>${event.registrationFee}</span>
                    </div>
                </div>
            </div>
        `;
    }

    getCategoryForEvent(eventId) {
        for (const categoryId in this.data.events) {
            if (this.data.events[categoryId].some(event => event.id === eventId)) {
                return this.data.categories.find(cat => cat.id === categoryId);
            }
        }
        return null;
    }

    getEmptyStateHTML(type) {
        let icon, title, message, button;
        
        switch (type) {
            case 'upcoming':
                icon = 'fa-calendar-plus';
                title = 'No Upcoming Events';
                message = 'You don\'t have any upcoming events registered. Discover amazing events to join!';
                button = '<button onclick="app.showPage(\'categories\')">Browse Events</button>';
                break;
            case 'past':
                icon = 'fa-history';
                title = 'No Past Events';
                message = 'You haven\'t attended any events yet. Start exploring and join your first event!';
                button = '<button onclick="app.showPage(\'categories\')">Find Events</button>';
                break;
            case 'organizing':
                icon = 'fa-user-tie';
                title = 'No Events Created';
                message = 'You haven\'t created any events yet. Start organizing and bring people together!';
                button = '<button onclick="app.showCreateEventModal()">Create Your First Event</button>';
                break;
            default:
                icon = 'fa-calendar';
                title = 'No Events Registered';
                message = 'You haven\'t registered for any events yet. Browse our categories to find events that interest you!';
                button = '<button onclick="app.showPage(\'categories\')">Explore Events</button>';
        }

        return `
            <div class="empty-state">
                <i class="fas ${icon}"></i>
                <h3>${title}</h3>
                <p>${message}</p>
                ${button}
            </div>
        `;
    }

    // Profile Quick Actions
    exportEventData() {
        if (!this.isLoggedIn) return;

        const events = this.getUserRegisteredEvents();
        const eventData = events.map(event => ({
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            type: event.type,
            registrationFee: event.registrationFee,
            organizer: event.organizer.name
        }));

        const dataStr = JSON.stringify(eventData, null, 2);
        const dataBlob = new Blob([dataStr], {type:'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `${this.currentUser.name.replace(/\s+/g, '_')}_events.json`;
        link.click();

        this.addChatMessage('Your event data has been exported successfully! 📄', 'bot');
    }

    showEventRecommendations() {
        if (!this.isLoggedIn) return;

        const userEvents = this.getUserRegisteredEvents();
        const userCategories = new Set();
        
        // Find categories user is interested in
        userEvents.forEach(event => {
            const category = this.getCategoryForEvent(event.id);
            if (category) userCategories.add(category.id);
        });

        if (userCategories.size === 0) {
            this.addChatMessage('🎯 **Event Recommendations**\n\nSince you\'re new to EventHub, I recommend exploring:\n• Sports events for active fun\n• Technology workshops for learning\n• Meetups for networking\n• Games for entertainment\n\nBrowse categories to find what interests you most!', 'bot');
        } else {
            const recommendations = Array.from(userCategories).map(catId => {
                const category = this.data.categories.find(c => c.id === catId);
                return `• ${category.name} - You seem to enjoy these!`;
            }).join('\n');

            this.addChatMessage(`🎯 **Personalized Recommendations**\n\nBased on your registrations, you might like:\n${recommendations}\n\nI also suggest exploring new categories to broaden your interests! 🌟`, 'bot');
        }
    }

    shareProfile() {
        if (!this.isLoggedIn) return;

        const shareText = `Check out my EventHub profile! I've registered for ${this.userRegistrations.size} amazing events. Join me in discovering great events! 🎉`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My EventHub Profile',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                this.addChatMessage('Profile sharing text copied to clipboard! Share it with your friends. 📋', 'bot');
            }).catch(() => {
                alert('Share text: ' + shareText);
            });
        }
    }

    loadCategoryRecommendations() {
        const recommendationsContainer = document.getElementById('recommendations-grid');
        if (!recommendationsContainer) return;

        recommendationsContainer.innerHTML = ''; // Clear previous recommendations

        const userEvents = this.getUserRegisteredEvents();
        const userCategories = new Set();
        
        userEvents.forEach(event => {
            const category = this.getCategoryForEvent(event.id);
            if (category) userCategories.add(category.id);
        });

        if (userCategories.size === 0) {
            recommendationsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-lightbulb"></i>
                    <h3>Get Started with Events</h3>
                    <p>Register for events to get personalized category recommendations!</p>
                    <button onclick="app.showPage('categories')">Browse Categories</button>
                </div>
            `;
            return;
        }

        // Show all categories as recommendations with status
        const allCategories = this.data.categories.filter(c => c.id !== 'all-events');
        const recommendations = allCategories.map(category => {
            const isInterested = userCategories.has(category.id);
            return `
                <div class="recommendation-card ${isInterested ? 'selected' : ''}" onclick="app.showCategoryEvents('${category.id}')">
                    <div class="recommendation-icon">
                        <i class="${category.icon}"></i>
                    </div>
                    <h4>${category.name}</h4>
                    <p>${category.description}</p>
                    ${isInterested ? '<span class="recommendation-badge">Interested</span>' : ''}
                </div>
            `;
        }).join('');

        recommendationsContainer.innerHTML = recommendations;
    }
}

// Initialize the application when DOM is loaded
let app; // Global reference for onclick handlers
document.addEventListener('DOMContentLoaded', () => {
    app = new EventApp();
}); 