# Momentum - Frontend

A robust Node.js backend API for a Todo application with user authentication and task management.

## 🚀 Features

- **Task Management**: Create, read, update, and delete tasks
- **Real-time Updates**: Instant UI updates with backend synchronization
- **Task Status**: Mark tasks as complete/incomplete
- **Search Functionality**: Find tasks quickly with search
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages

## 🛠️ Tech Stack

- **Frontend Framework**: React JS
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS (v4.0 or higher) with modern responsive design
- **State Management**: React Hooks 
- **Deployment**: Vercel

## 📋 Prerequisites

Before running this project, ensure you have:

- Node.js (version 14 or higher)
- npm or yarn package manager
- Backend server running (see backend README for setup)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd client
   ```
2. Install dependencies
    ```bash
    npm install
    ```
3. Environment Configuration

- Create a ```.env``` file in the root directory and add:
```
    VITE_API_BASE_URL=http://localhost:5000/api
```
- For production, use your deployed backend URL from vercel.

4. Start the development server

```bash
    npm start
```

The application will open in your browser at http://localhost:3000

## 🔧 Configuration

### Environment Variables

```
    VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend Integration
Make sure your backend server is running and accessible at the URL specified in ```REACT_APP_API_BASE_URL```. The frontend expects the following API endpoints:

- GET /api/tasks - Fetch all tasks
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task
- PATCH /api/tasks/:id/status - Update task status

## 🎯 Usage

### Adding a Task
- Type your task in the input field at the top
- Press Enter or click the "Add" button
- The task will immediately appear in your list

### Managing Tasks
- Complete Task: Click the checkbox next to any task
- Edit Task: Click the edit icon, modify the text, and save
- Delete Task: Click the delete icon to remove a task


### Task States
- ✅ Completed: Tasks with a checkmark (strike through text)
- ⏳ Pending: Tasks without a checkmark (normal text)

## 📁 Frontend Structure
    src/
    ├── assets/
    ├── components/
    │   ├── Layouts/
    │   │   ├── AuthLayout.jsx              # Page layout of authentication screens
    │   │   ├── Layout.jsx                  # Page layout of site pages.
    │   │   ├── PreLoader.jsx               # Page preloading animation.
    │   ├── modal/
    │   │   ├── ConfirmationModal.jsx       # modal confirmation to delete a task
    │   │   ├── Modal.jsx                   # modal structural component
    │   │   ├── Taskform.jsx                # modal form for creating and editing tasks
    │   │   ├── ViewMessageModal.jsx        # modal for viewing complete task message
    │   ├── Navigation/
    │   │   ├── Header.jsx                  # Global top navigation
    │   │   ├── Footer.jsx                  # Page footer
    │   │   ├── TopBar.jsx                  # Top navigation for authentication pages
    │   │   ├── BottomBar.jsx               # Footer for authentication pages
    │   ├── Task/
    │   │   ├── TaskBoard.jsx               # Parent container for tasks system
    │   │   ├── TaskColumn.jsx              # Priority based Columns for tasks
    │   │   ├── TaskCard.jsx                # Card structure for each task
    │   ├── Buttons.jsx                     # Button component with variants
    │   ├── InputField.jsx                  # Input field component for forms
    │   ├── Text.jsx                        # Text component for auto styling for all header tags and p tags
    │   ├── ProtectedRoute.jsx              # Protection for route (user access only).
    ├── context/
    │   ├── AuthProvider.jsx                # Auth provider component user authentication
    │   └── AuthContext.jsx                 # Authentication context
    ├── data/
    │   └── data.json                       # Content data file
    ├── hooks/
    │   ├── useAuth.jsx                     # Custom authentiation hook
    │   └── useTasks.jsx                    # Custom hook for tasks
    ├── pages/
    │   ├── Contact.jsx                     # Contact page
    │   ├── Home.jsx                        # Home page
    │   ├── Login.jsx                       # Login page
    │   ├── PageNotFound.jsx                # 404 page
    │   ├── Register.jsx                    # Register page
    │   └── Tasks.jsx                       # Tasks page
    ├── services/
    │   ├── api.js                          # api service
    │   ├── auth.js                         # auth service
    │   └── tasks.js                        # tasks service
    ├── utils/
    │   └── taskUtils.js                    # tasks utils
    ├── App.jsx                             # Main application file
    ├── index.css                           # Global stylesheet
    ├── main.jsx                            # Main application entry point
    ├── .env                                # Environment variables
    ├── index.html                          
    ├── package.json                        
    ├── vercel.json                           
    └── vite.config.js                      # Vite configuration file

## 🚀 Deployment

### 📋 Prerequisites
- A Vercel account (free tier available)
- Your React project pushed to GitHub
- Backend API deployed and accessible

### ⚙️ Deployment Steps
1. Push your code to GitHub
```bash
    git add .
    git commit -m "Ready for deployment"
    git push origin main
```
2. Import project to Vercel
    - Go to vercel.com
    - Click "Add New..." → "Project"
    - Import your GitHub repository
    - Configure project settings (see below)
    - Click "Deploy"

## 🔧 Environment Configuration

### Setting Environment Variables in Vercel
1. In your Vercel dashboard:
    - Go to your project → Settings → Environment Variables
    - Add the following variables:
    ``` VITE_API_BASE_URL=https://your-backend-app.onrender.com/api```
2. Using Vercel CLI:
```bash
    vercel env add VITE_API_BASE_URL
```

## 📁 Vercel Configuration File
Create a ```vercel.json``` in your project root for advanced configuration:

```json
    {
        "rewrites": [{ "source": "/(.*)", "destination": "/index.html"}]
    }
```

## 🛠️ Build Configuration

### Package.json Scripts
Ensure your ```package.json``` has the correct build scripts:
```json
    {
        "name": "todo-frontend",
        "private": true,
        "version": "0.0.0",
        "type": "module",
        "scripts": {
            "dev": "vite",
            "build": "vite build",
            "lint": "eslint .",
            "preview": "vite preview"
        }
    }
```
### Vercel Project Settings
In your Vercel project dashboard, configure:
- Build Command: ```npm run build```
- Output Directory: ```build```
- Install Command: ```npm install```
- Node.js Version: ```18.x```

## 🔍 Pre-Deployment Checklist

1. Test locally with production build
```bash
    npm run build
    npx serve -s build
```
2. Verify environment variables
    - Check all API endpoints use production URLs
    - Confirm CORS is configured on backend
3. Optimize for production
    - Minify and compress assets
    - Remove console logs
    - Test performance

## 🧪 Testing

### Manual Testing
1. Test all CRUD operations (Create, Read, Update, Delete)
2. Verify search functionality
3. Test responsive design on different screen sizes
4. Check error scenarios (network issues, invalid data)

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🐛 Troubleshooting

### Common Issues
1. CORS Errors
    - Ensure backend has proper CORS configuration
    - Check if backend URL is correct in environment variables
2. API Connection Failed
    - Verify backend server is running
    - Check network connectivity
    - Confirm API base URL in environment variables
3. Build Failures
    - Clear node_modules and reinstall dependencies
    - Check Node.js version compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 📝 Implementation Notes

### Challenges & Solutions

1. State Synchronization
    - Challenge: Keeping frontend state in sync with backend data
    - Solution: Implemented optimistic updates with rollback on error

2. Error Handling
    - Challenge: Providing user-friendly error messages
    - Solution: Created centralized error handling with contextual messages

3. Loading States
    - Challenge: Managing multiple simultaneous API calls
    - Solution: Implemented individual loading states for each operation

4. Responsive Design
    - Challenge: Ensuring consistent experience across devices
    - Solution: Used CSS Grid and Flexbox with mobile-first approach

5. Key Decisions
    - Axios for HTTP Client: Chosen for its simplicity and interceptors
    - Component Structure: Modular components for reusability
    - State Management: Used React hooks for local state management
    - Error Boundaries: Implemented to catch and display errors gracefully

## 🆘 Support

For support, email devang.patani0806@gmail.com or create an issue in the repository.