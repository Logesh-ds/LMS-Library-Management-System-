import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Profile = ({ user, onUpdate }: { user: any; onUpdate: (u: any) => void }) => {
  const [editForm, setEditForm] = useState({ ...user });
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(user.profileImage || "");

  const handleChange = (field: string, value: any) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate({ ...editForm, profileImage });
    setEditing(false);
  };

  return (
    <Card className="shadow-elegant border-library-cream max-w-lg mx-auto mt-8">
      <CardHeader className="flex flex-col items-center bg-gradient-to-r from-library-gold to-library-burgundy rounded-t-xl py-8">
        <div className="relative">
          <img
            src={profileImage || "/placeholder-avatar-1.jpg"}
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover border-4 border-library-gold shadow-lg"
          />
          {editing && (
            <label className="absolute bottom-2 right-2 bg-library-burgundy text-white rounded-full p-2 cursor-pointer shadow-lg">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = ev => {
                      setProfileImage(ev.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <span className="text-xs">Change</span>
            </label>
          )}
        </div>
        <CardTitle className="mt-4 text-2xl text-white">My Profile</CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={e => { e.preventDefault(); handleSave(); }} className="space-y-4">
          <div className={editing ? "relative" : ""}>
            <label className="block text-sm font-semibold mb-1 text-library-burgundy">Name</label>
            <Input value={editForm.name} onChange={e => handleChange("name", e.target.value)} disabled={!editing} className={`bg-library-cream ${editing ? 'border-2 border-library-burgundy ring-2 ring-library-gold' : ''}`} />
            {editing && <span className="absolute right-2 top-2 text-library-burgundy"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15H9v-2z" /></svg></span>}
          </div>
          <div className={editing ? "relative" : ""}>
            <label className="block text-sm font-semibold mb-1 text-library-burgundy">Email</label>
            <Input value={editForm.email} onChange={e => handleChange("email", e.target.value)} disabled={!editing} className={`bg-library-cream ${editing ? 'border-2 border-library-burgundy ring-2 ring-library-gold' : ''}`} />
            {editing && <span className="absolute right-2 top-2 text-library-burgundy"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15H9v-2z" /></svg></span>}
          </div>
          <div className={editing ? "relative" : ""}>
            <label className="block text-sm font-semibold mb-1 text-library-burgundy">Phone</label>
            <Input value={editForm.phone} onChange={e => handleChange("phone", e.target.value)} disabled={!editing} className={`bg-library-cream ${editing ? 'border-2 border-library-burgundy ring-2 ring-library-gold' : ''}`} />
            {editing && <span className="absolute right-2 top-2 text-library-burgundy"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15H9v-2z" /></svg></span>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-library-burgundy">Role</label>
            <Input value={editForm.role} disabled className="bg-library-cream" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-library-burgundy">Status</label>
            <Input value={editForm.status} disabled className="bg-library-cream" />
          </div>
          <div className="flex gap-4 mt-6">
            {!editing ? (
              <Button type="button" onClick={() => setEditing(true)} className="bg-gradient-library w-full">Edit Profile</Button>
            ) : (
              <>
                <Button type="submit" className="bg-gradient-library w-1/2">Save</Button>
                <Button type="button" variant="outline" className="w-1/2" onClick={() => { setEditForm({ ...user }); setProfileImage(user.profileImage || ""); setEditing(false); }}>Cancel</Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
