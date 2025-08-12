# EventHub React - Modern Event Management Platform

A beautiful, modern event management platform built with React, featuring stunning 3D effects, dark UI, and seamless user experience.

## ✨ Features

### 🌟 **Beautiful Dark UI**
- Sleek black theme with purple/pink gradients
- Modern glassmorphism effects
- Smooth animations and transitions

### 🎮 **3D Interactive Experience**
- 3D "WELCOME TO EVENT HUB" text on homepage
- 3D journey tour for new users
- Interactive category cards with depth effects
- Floating particles and background animations

### 🧭 **Smart Navigation**
- Icon-based floating navigation (appears only when logged in)
- Home, My Events, Profile icons
- Smooth logout functionality
- Returns to homepage after logout

### 📅 **My Events Management**
- Dedicated page showing only:
  - Events you're registered for
  - Events you're organizing
- Clean tabbed interface
- Real-time event tracking

### 🔐 **Authentication System**
- Beautiful modal-based login/signup
- Persistent login state
- User avatars and profiles
- Secure local storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm start
```

3. **Open your browser:**
Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── AuthModal.js          # Login/Signup modal
│   ├── Home/
│   │   ├── HeroSection.js        # 3D welcome section
│   │   ├── JourneyTour.js        # 3D tour overlay
│   │   └── CategoryGrid.js       # Event categories
│   └── Layout/
│       └── Layout.js             # Navigation & layout
├── contexts/
│   ├── AuthContext.js            # Authentication state
│   └── EventContext.js           # Event management
├── pages/
│   ├── HomePage.js               # Main landing page
│   ├── MyEventsPage.js           # User events (registered + organizing)
│   ├── ProfilePage.js            # User profile
│   ├── CategoryEventsPage.js     # Category event listings
│   └── EventDetailPage.js        # Individual event details
├── styles/
│   ├── GlobalStyles.js           # Global CSS styles
│   └── theme.js                  # Dark theme configuration
└── App.js                        # Main app component
```

## 🎨 Design System

### Color Palette
- **Primary**: `#6c5ce7` (Purple)
- **Secondary**: `#a29bfe` (Light Purple)
- **Accent**: `#fd79a8` (Pink)
- **Background**: `#0f0f0f` (Deep Black)
- **Cards**: `#1a1a1a` (Dark Gray)

### 3D Effects
- **Perspective**: 1000px depth
- **Hover transforms**: Rotation and translation
- **Floating animations**: Particles and orbs
- **Text effects**: 3D typography with metallic materials

## 🔧 Technology Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Smooth animations
- **React Three Fiber** - 3D graphics
- **React Icons** - Beautiful icons
- **React Hot Toast** - Notifications

## 📱 User Flow

### For New Users:
1. **Homepage** - See beautiful 3D welcome message
2. **Journey Tour** - Optional 3D guided tour
3. **Sign Up** - Create account via modal
4. **Floating Nav** - Access My Events, Profile
5. **Browse Events** - Explore categories

### For Returning Users:
1. **Auto Login** - Persistent authentication
2. **Floating Nav** - Quick access to features
3. **My Events** - Dedicated events page
4. **Logout** - Returns to homepage

## 🎯 Key Features Implemented

### ✅ **Homepage Enhancements**
- 3D "WELCOME TO EVENT HUB" rotating text
- Interactive floating particles
- Beautiful gradient backgrounds
- Smooth entrance animations

### ✅ **Navigation System**
- Icon-based floating navigation
- Only appears when logged in
- My Events icon for quick access
- Smooth logout with homepage redirect

### ✅ **My Events Page**
- Clean tabbed interface
- Registered events tab
- Organizing events tab
- Empty states with actions

### ✅ **Authentication**
- Beautiful dark-themed modals
- Persistent login state
- User avatar system
- Toast notifications

## 🔮 Future Enhancements

- Enhanced 3D journey tour with multiple steps
- Real-time event updates
- Advanced filtering and search
- Social features and event sharing
- Mobile app with React Native

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**🎉 Enjoy your modern, 3D-enhanced EventHub experience!** 