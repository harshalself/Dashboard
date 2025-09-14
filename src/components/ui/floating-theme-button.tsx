import { useState } from "react";
import { Palette, X, ChevronDown } from "lucide-react";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { useColorTheme } from "@/contexts/ColorThemeContext";

interface FloatingThemeButtonProps {
  // No props needed - component handles navigation internally
}

export function FloatingThemeButton(props?: FloatingThemeButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { colorThemes, setColorTheme } = useColorTheme();

  if (isExpanded) {
    return (
      <>
        {/* Theme Selection Card - positioned above the button */}
        <div className="fixed bottom-24 left-6 z-50">
          <Card className="w-80 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-center">
                <CardTitle className="text-base">Quick Theme Switch</CardTitle>
              </div>
              <CardDescription className="text-center">
                Click a theme to apply instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {colorThemes.map((theme) => (
                  <Button
                    key={theme.id}
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto py-2"
                    onClick={() => {
                      setColorTheme(theme.id);
                      setIsExpanded(false);
                    }}>
                    <div
                      className={`h-4 w-4 rounded-full ${theme.preview} mr-2`}
                    />
                    {theme.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating Button - stays fixed in position with down arrow */}
        <Button
          size="icon"
          className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          onClick={() => setIsExpanded(false)}>
          <ChevronDown className="h-5 w-5 flex-shrink-0" />
        </Button>
      </>
    );
  }

  return (
    <Button
      size="icon"
      className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
      onClick={() => setIsExpanded(true)}>
      <Palette className="h-5 w-5 flex-shrink-0" />
    </Button>
  );
}
