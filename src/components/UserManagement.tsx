import { useState } from "react";
import { useRef } from "react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  UserPlus, 
  Edit, 
  Trash2, 
  Ban,
  CheckCircle,
  Mail,
  Phone,
  Calendar
} from "lucide-react";

interface UserManagementProps {
  role: string;
}

export const UserManagement = ({ role }: UserManagementProps) => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [createdUser, setCreatedUser] = useState<any | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "student",
    status: "active",
    joinDate: "",
    booksIssued: 0,
    totalBorrowed: 0,
    fines: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [popup, setPopup] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any | null>(null);
  const [users, setUsers] = useState<any[]>([  // state for all users
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@university.edu",
      phone: "+1234567892",
      role: "student",
      status: "active",
      joinDate: "2023-09-15",
      booksIssued: 3,
      totalBorrowed: 15,
      fines: 0
    },
    {
      id: 2,
      name: "Dr. Sarah Smith",
      email: "sarah.smith@university.edu",
      phone: "+1234567893",
      role: "faculty",
      status: "active",
      joinDate: "2020-01-10",
      booksIssued: 8,
      totalBorrowed: 145,
      fines: 0
    },
    {
      id: 3,
      name: "Emily Johnson",
      email: "emily.johnson@university.edu",
      phone: "+1234567894",
      role: "student",
      status: "suspended",
      joinDate: "2023-01-20",
      booksIssued: 2,
      totalBorrowed: 8,
      fines: 25.50
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael.brown@library.com",
      phone: "+1234567895",
      role: "librarian",
      status: "active",
      joinDate: "2021-03-05",
      booksIssued: 0,
      totalBorrowed: 0,
      fines: 0
    },
    {
      id: 5,
      name: "Lisa Wilson",
      email: "lisa.wilson@university.edu",
      phone: "+1234567896",
      role: "faculty",
      status: "active",
      joinDate: "2019-08-12",
      booksIssued: 5,
      totalBorrowed: 89,
      fines: 0
    },
    {
      id: 6,
      name: "David Chen",
      email: "david.chen@university.edu",
      phone: "+1234567897",
      role: "student",
      status: "inactive",
      joinDate: "2022-05-18",
      booksIssued: 0,
      totalBorrowed: 12,
      fines: 5.00
    }
  ]);

  const roles = ["all", "student", "faculty", "librarian", "admin"];
  const statuses = ["all", "active", "inactive", "suspended"];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (userRole: string) => {
    const colors = {
      student: "bg-blue-100 text-blue-800 border-blue-200",
      faculty: "bg-purple-100 text-purple-800 border-purple-200",
      librarian: "bg-green-100 text-green-800 border-green-200",
      admin: "bg-red-100 text-red-800 border-red-200"
    };
    return colors[userRole as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      suspended: "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handleAction = (user: any, action: string) => {
    if (action === "edit") {
      setEditingUser(user);
      setEditForm({ ...user });
      return;
    }
    switch (action) {
      case "suspend":
        alert(`${user.status === "suspended" ? "Unsuspending" : "Suspending"} user: ${user.name}`);
        break;
      case "delete":
        alert(`Deleting user: ${user.name}`);
        break;
      default:
        break;
    }
  };

  const handleEditChange = (field: string, value: any) => {
    setEditForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleEditSave = () => {
    // Validate name and phone
    if (!/^[A-Za-z ]+$/.test(editForm.name)) {
      setPopup({ message: "Name must contain only alphabets.", visible: true });
      return;
    }
    const digits = editForm.phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setPopup({ message: "Phone number must be exactly 10 digits.", visible: true });
      return;
    }
    // Simulate save
    setEditingUser(null);
    setPopup({ message: "User details updated!", visible: true });
  };

  const handleEditRemove = () => {
    // Simulate remove
    setEditingUser(null);
    setPopup({ message: "User removed!", visible: true });
  };

  return (
    <div className="space-y-6">
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-card p-6 rounded shadow-lg border border-library-cream max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Member</h3>
            <div className="space-y-3">
              <label className="block text-sm font-medium">Name</label>
              <input className="w-full border rounded px-2 py-1" value={editForm.name} onChange={e => handleEditChange('name', e.target.value)} autoFocus />
              <label className="block text-sm font-medium">Email</label>
              <input className="w-full border rounded px-2 py-1" value={editForm.email} onChange={e => handleEditChange('email', e.target.value)} type="email" />
              <label className="block text-sm font-medium">Phone</label>
              <input className="w-full border rounded px-2 py-1" value={editForm.phone} onChange={e => handleEditChange('phone', e.target.value)} type="tel" />
              <label className="block text-sm font-medium">Role</label>
              <select className="w-full border rounded px-2 py-1" value={editForm.role} onChange={e => handleEditChange('role', e.target.value)}>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="librarian">Librarian</option>
                <option value="admin">Admin</option>
              </select>
              <label className="block text-sm font-medium">Status</label>
              <select className="w-full border rounded px-2 py-1" value={editForm.status} onChange={e => handleEditChange('status', e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div className="flex gap-2 mt-6">
              <Button className="flex-1" onClick={handleEditSave}>Save</Button>
              <Button className="flex-1" variant="destructive" onClick={handleEditRemove}>Remove</Button>
              <Button className="flex-1" variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
            </div>
          </div>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setEditingUser(null)}></div>
        </div>
      )}
      {popup.visible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-card p-6 rounded shadow-lg border border-library-cream max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2 text-destructive">Validation Error</h3>
            <p className="mb-4">{popup.message}</p>
            <Button onClick={() => setPopup({ ...popup, visible: false })} className="w-full">Close</Button>
          </div>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setPopup({ ...popup, visible: false })}></div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {role === "librarian" ? "Library Members" : "User Management"}
          </h2>
          <p className="text-muted-foreground">
            {role === "librarian" 
              ? "View and manage library member information"
              : "Manage user accounts and permissions"
            }
          </p>
        </div>
        
        {(role === "admin" || role === "librarian") && (
          <Button className="bg-gradient-library" onClick={() => setShowAddUser(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        )}
      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New User</h3>
            <form onSubmit={e => {
              e.preventDefault();
              // Simple validation
              if (!addForm.name || !addForm.email || !addForm.phone) {
                setPopup({ message: "Please fill all required fields.", visible: true });
                return;
              }
              const newUser = {
                ...addForm,
                id: users.length + 1,
                joinDate: addForm.joinDate || new Date().toISOString().slice(0,10)
              };
              setUsers(prev => [...prev, newUser]);
              setCreatedUser(newUser);
              setShowUserDetails(true);
              setShowAddUser(false);
              setAddForm({
                name: "",
                email: "",
                phone: "",
                role: "student",
                status: "active",
                joinDate: "",
                booksIssued: 0,
                totalBorrowed: 0,
                fines: 0
              });
      {/* Created User Details Modal */}
      {showUserDetails && createdUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowUserDetails(false)}></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-4 sm:p-8 w-full max-w-screen-sm mx-2 sm:mx-4 flex flex-col items-center overflow-y-auto" style={{ maxHeight: '90vh' }}>
            <h3 className="text-2xl font-bold mb-6 text-center text-library-burgundy">User Created Successfully</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full mb-6">
              <div className="font-semibold text-right">Name:</div>
              <div>{createdUser.name}</div>
              <div className="font-semibold text-right">Email:</div>
              <div>{createdUser.email}</div>
              <div className="font-semibold text-right">Phone:</div>
              <div>{createdUser.phone}</div>
              <div className="font-semibold text-right">Role:</div>
              <div>{createdUser.role}</div>
              <div className="font-semibold text-right">Status:</div>
              <div>{createdUser.status}</div>
              <div className="font-semibold text-right">Join Date:</div>
              <div>{createdUser.joinDate}</div>
              <div className="font-semibold text-right">Books Issued:</div>
              <div>{createdUser.booksIssued}</div>
              <div className="font-semibold text-right">Total Borrowed:</div>
              <div>{createdUser.totalBorrowed}</div>
              <div className="font-semibold text-right">Fines:</div>
              <div>${createdUser.fines}</div>
            </div>
            <div className="flex gap-2 w-full mt-2">
              <Button className="w-1/2" variant="outline" onClick={() => setShowUserDetails(false)}>Cancel</Button>
              <Button className="w-1/2 bg-gradient-library" onClick={() => setShowUserDetails(false)}>Enter</Button>
            </div>
          </div>
        </div>
      )}
            }}>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input value={addForm.email} onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))} required type="email" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input value={addForm.phone} onChange={e => setAddForm(f => ({ ...f, phone: e.target.value }))} required />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Role</label>
                <Select value={addForm.role} onValueChange={val => setAddForm(f => ({ ...f, role: val }))}>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="librarian">Librarian</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select value={addForm.status} onValueChange={val => setAddForm(f => ({ ...f, status: val }))}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Join Date</label>
                <Input value={addForm.joinDate} onChange={e => setAddForm(f => ({ ...f, joinDate: e.target.value }))} type="date" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Books Issued</label>
                <Input value={addForm.booksIssued} onChange={e => setAddForm(f => ({ ...f, booksIssued: Number(e.target.value) }))} type="number" min={0} />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Total Borrowed</label>
                <Input value={addForm.totalBorrowed} onChange={e => setAddForm(f => ({ ...f, totalBorrowed: Number(e.target.value) }))} type="number" min={0} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Fines</label>
                <Input value={addForm.fines} onChange={e => setAddForm(f => ({ ...f, fines: Number(e.target.value) }))} type="number" min={0} step={0.01} />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowAddUser(false)}>Cancel</Button>
                <Button type="submit" className="bg-gradient-library">Add User</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>

      {/* Search and Filter */}
      <Card className="shadow-elegant border-library-cream">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((roleOption) => (
                    <SelectItem key={roleOption} value={roleOption}>
                      {roleOption === "all" ? "All Roles" : roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="shadow-elegant border-library-cream hover:shadow-book transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/placeholder-avatar-${user.id}.jpg`} />
                  <AvatarFallback className="bg-library-cream text-library-burgundy">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg truncate">{user.name}</CardTitle>
                    <Badge className={getStatusBadge(user.status)}>
                      {user.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2 mb-2">
                    <Badge className={getRoleBadge(user.role)}>
                      {user.role}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4 p-3 bg-library-cream/30 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-library-burgundy">{user.booksIssued}</div>
                  <div className="text-xs text-muted-foreground">Current</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-library-burgundy">{user.totalBorrowed}</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-destructive">${user.fines}</div>
                  <div className="text-xs text-muted-foreground">Fines</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleAction(user, "edit")}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                
                {role === "admin" && (
                  <>
                    <Button 
                      size="sm" 
                      variant={user.status === "suspended" ? "default" : "destructive"}
                      onClick={() => handleAction(user, "suspend")}
                    >
                      {user.status === "suspended" ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <Ban className="h-3 w-3" />
                      )}
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleAction(user, "delete")}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card className="shadow-elegant border-library-cream">
          <CardContent className="p-8 text-center">
            <UserPlus className="h-16 w-16 text-library-burgundy mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No users found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};