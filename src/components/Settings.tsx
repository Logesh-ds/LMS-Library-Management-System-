import { useState } from "react";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export interface SettingsProps {
  onApply: (settings: SettingsState) => void;
}

export interface SettingsState {
  darkMode: boolean;
  notifications: boolean;
  language: string;
}

export const WebsiteSettings = ({ onApply }: SettingsProps) => {
  const [settings, setSettings] = useState<SettingsState>({
    darkMode: false,
    notifications: true,
    language: "en"
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (key: keyof SettingsState, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (showNotification && settings.notifications) {
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification, settings.notifications]);

  const handleApply = () => {
    onApply(settings);
    if (settings.notifications) {
      setShowNotification(true);
    }
  };

  return (
    <Card className="shadow-elegant border-library-cream">
      <CardHeader>
        <CardTitle>Website Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label>Dark Mode</Label>
          <Switch
            checked={settings.darkMode}
            onCheckedChange={(v) => handleChange("darkMode", v)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label>Notifications</Label>
          <Switch
            checked={settings.notifications}
            onCheckedChange={(v) => handleChange("notifications", v)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label>Language</Label>
          <select
            value={settings.language}
            onChange={(e) => handleChange("language", e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <Button onClick={handleApply} className="mt-4">
          Apply Settings
        </Button>
        {showNotification && settings.notifications && (
          <div className="mt-4 p-2 bg-green-100 text-green-800 rounded shadow">
            Settings applied successfully!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
