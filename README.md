# Admin Panel Template

A modern, responsive admin panel template built with React, TypeScript, and Tailwind CSS. Perfect for building admin dashboards, content management systems, and data visualization applications.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Authentication System**: Complete auth flow with JWT token management
- **Responsive Design**: Mobile-first design with dark/light theme support
- **Component Library**: Pre-built components with shadcn/ui
- **API Integration**: Axios-based HTTP client with interceptors and error handling
- **Dashboard Views**: Overview, Users, Activity, Analytics, and Settings
- **Type Safety**: Full TypeScript support with proper type definitions
- **Build Optimization**: Fast development and production builds with Vite

## 📦 What's Included

### Core Features

- **Authentication**: Login, register, logout with protected routes
- **Dashboard**: 5 main sections with sample data and charts
- **User Management**: User table with search, filters, and actions
- **Activity Monitoring**: Real-time activity feed and system status
- **Analytics**: KPI cards, charts, and performance metrics
- **Settings**: Application configuration and user preferences

### Technical Features

- **React Query**: Server state management and caching
- **React Router**: Client-side routing with protected routes
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful, customizable icons
- **Form Validation**: Built-in form validation and error handling
- **Toast Notifications**: User feedback with toast messages

## 🛠 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd admin-panel
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Header, Navigation components
│   └── ui/             # shadcn/ui components
├── contexts/           # React contexts (Auth, Theme, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
│   ├── api.ts          # HTTP client and API functions
│   ├── constants.ts    # App constants and configurations
│   └── utils.ts        # Utility functions
├── pages/              # Page components and routes
│   ├── dashboard/      # Dashboard view components
│   ├── Dashboard.tsx   # Main dashboard page
│   ├── SignIn.tsx      # Login page
│   └── SignUp.tsx      # Registration page
└── providers/          # Context providers wrapper
```

## 🎨 Customization

### Theming

The template uses Tailwind CSS with CSS variables for theming. You can customize colors, fonts, and spacing in:

- `tailwind.config.ts` - Tailwind configuration
- `src/index.css` - Global styles and CSS variables

### API Integration

Configure your API endpoints in `src/lib/constants.ts`:

```typescript
export const APP_CONFIG = {
  name: "Your App Name",
  apiBaseUrl: "https://your-api.com/api",
  // ...other config
};
```

Update API functions in `src/lib/api.ts` to match your backend schema.

### Authentication

The authentication system is configured in `src/contexts/AuthContext.tsx`. You can:

- Customize user interface and roles
- Add additional auth methods (OAuth, SSO)
- Modify token handling and storage

## 📱 Responsive Design

The template is fully responsive with:

- **Mobile Navigation**: Collapsible sidebar and mobile-optimized menus
- **Responsive Tables**: Horizontal scrolling on mobile devices
- **Adaptive Cards**: Stacked layout on smaller screens
- **Touch-Friendly**: Properly sized tap targets and gestures

## 🔒 Security Features

- **JWT Token Management**: Automatic token refresh and secure storage
- **Protected Routes**: Route-level authentication guards
- **Form Validation**: Client-side validation with error handling
- **XSS Protection**: Proper data sanitization and encoding
- **CSRF Protection**: Ready for CSRF token integration

## 🚀 Deployment

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Run TypeScript type checking
```

### Production

The template builds to static files that can be deployed to any static hosting service:

- **Vercel**: Zero-config deployment
- **Netlify**: Drag-and-drop deployment
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for public repos

## 🎯 Usage Examples

### Adding a New Dashboard View

1. Create component in `src/pages/dashboard/your-view/`
2. Add to tab configuration in `src/pages/Dashboard.tsx`
3. Update navigation in the tabs array

### Creating Custom API Endpoints

```typescript
// In src/lib/api.ts
export const customApi = {
  getData: () => api.get("/custom-endpoint"),
  createData: (data: any) => api.post("/custom-endpoint", data),
};
```

### Adding Protected Routes

```typescript
// In your router configuration
<Route
  path="/protected"
  element={
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  }
/>
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📚 [Documentation](docs/)
- 🐛 [Issue Tracker](https://github.com/your-repo/issues)
- 💬 [Discussions](https://github.com/your-repo/discussions)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/) communities

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
