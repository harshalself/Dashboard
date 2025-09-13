import { useState } from "react";
import { Palette, X } from "lucide-react";
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
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="w-80 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Quick Theme Switch</CardTitle>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsExpanded(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>Click a theme to apply instantly</CardDescription>
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
    );
  }

  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      onClick={() => setIsExpanded(true)}>
      <Palette className="h-5 w-5" />
    </Button>
  );
}
