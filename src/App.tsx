import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProviders } from "@/providers/AppProviders";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FloatingThemeButton } from "@/components/ui/floating-theme-button";
import { FloatingChatbot } from "@/components/ui/floating-chatbot";
import { routeDefinitions } from "@/routes";

const App = () => (
  <AppProviders>
    <TooltipProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routeDefinitions.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
                index={route.index}
              />
            ))}
          </Routes>
        </Suspense>
        {/* Floating theme button appears on all pages */}
        <FloatingThemeButton />
        {/* Floating chatbot appears on all pages */}
        <FloatingChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </AppProviders>
);

export default App;
