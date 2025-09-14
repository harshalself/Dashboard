import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useColorTheme } from "@/hooks/use-color-theme";

export function ThemesView() {
  const { currentColorTheme, setColorTheme, colorThemes } = useColorTheme();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Theme Settings
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>Choose Your Theme</CardTitle>
          <CardDescription>
            Select a predefined theme to customize your dashboard appearance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorThemes.map((theme) => (
              <div
                key={theme.id}
                className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                  currentColorTheme === theme.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setColorTheme(theme.id)}>
                <div className="flex items-center space-x-3">
                  <div className={`h-8 w-8 rounded-full ${theme.preview}`} />
                  <div>
                    <h3 className="font-medium">{theme.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {theme.description}
                    </p>
                  </div>
                </div>
                {currentColorTheme === theme.id && (
                  <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button onClick={() => setColorTheme(currentColorTheme)}>
              Apply Theme
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
