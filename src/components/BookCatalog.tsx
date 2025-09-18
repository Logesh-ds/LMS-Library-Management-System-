import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Star, 
  Calendar, 
  User,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

interface BookCatalogProps {
  role: string;
}

export const BookCatalog = ({ role }: BookCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const sampleBooks = [
    {
      id: 1,
      title: "The Art of Computer Programming",
      author: "Donald E. Knuth",
      isbn: "978-0201896831",
      category: "Computer Science",
      status: "Available",
      rating: 4.8,
      copies: 3,
      totalCopies: 5,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0061120084",
      category: "Literature",
      status: "Borrowed",
      rating: 4.6,
      copies: 0,
      totalCopies: 4,
      image: "https://images.unsplash.com/photo-1481627834876-4845e4e0d4d6?w=300&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262033848",
      category: "Computer Science",
      status: "Available",
      rating: 4.9,
      copies: 2,
      totalCopies: 3,
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop"
    },
    {
      id: 4,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      category: "Literature",
      status: "Reserved",
      rating: 4.3,
      copies: 1,
      totalCopies: 6,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Calculus: Early Transcendentals",
      author: "James Stewart",
      isbn: "978-1285741550",
      category: "Mathematics",
      status: "Available",
      rating: 4.2,
      copies: 4,
      totalCopies: 8,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=400&fit=crop"
    },
    {
      id: 6,
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      category: "Computer Science",
      status: "Available",
      rating: 4.7,
      copies: 2,
      totalCopies: 4,
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop"
    },
    {
      id: 7,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "978-0141439518",
      category: "Literature",
      status: "Available",
      rating: 4.5,
      copies: 3,
      totalCopies: 5,
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=400&fit=crop"
    },
    {
      id: 8,
      title: "Physics: Principles and Problems",
      author: "McGraw-Hill",
      isbn: "978-0078807213",
      category: "Science",
      status: "Available",
      rating: 4.1,
      copies: 6,
      totalCopies: 8,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
    },
    {
      id: 9,
      title: "World History: Patterns of Interaction",
      author: "McDougal Littell",
      isbn: "978-0618409372",
      category: "History",
      status: "Borrowed",
      rating: 4.0,
      copies: 1,
      totalCopies: 4,
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop"
    },
    {
      id: 10,
      title: "Machine Learning Yearning",
      author: "Andrew Ng",
      isbn: "978-0999820201",
      category: "Computer Science",
      status: "Available",
      rating: 4.6,
      copies: 2,
      totalCopies: 3,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=400&fit=crop"
    },
    {
      id: 11,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isbn: "978-0316769174",
      category: "Literature",
      status: "Reserved",
      rating: 4.2,
      copies: 0,
      totalCopies: 3,
      image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=300&h=400&fit=crop"
    },
    {
      id: 12,
      title: "Linear Algebra and Its Applications",
      author: "David C. Lay",
      isbn: "978-0321385178",
      category: "Mathematics",
      status: "Available",
      rating: 4.3,
      copies: 5,
      totalCopies: 7,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=400&fit=crop"
    }
  ];

  const categories = ["all", "Computer Science", "Literature", "Mathematics", "Science", "History"];

  const filteredBooks = sampleBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 border-green-200";
      case "Borrowed":
        return "bg-red-100 text-red-800 border-red-200";
      case "Reserved":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAction = (book: any, action: string) => {
    switch (action) {
      case "borrow":
        alert(`Borrowing "${book.title}"`);
        break;
      case "reserve":
        alert(`Reserving "${book.title}"`);
        break;
      case "edit":
        alert(`Editing "${book.title}"`);
        break;
      case "delete":
        alert(`Deleting "${book.title}"`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Book Catalog</h2>
          <p className="text-muted-foreground">Browse and manage the library collection</p>
        </div>
        
        {(role === "librarian" || role === "admin") && (
          <Button className="bg-gradient-library">
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      <Card className="shadow-elegant border-library-cream">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="shadow-elegant border-library-cream hover:shadow-book transition-shadow overflow-hidden">
            <div className="aspect-[3/4] relative overflow-hidden bg-library-cream">
              <img 
                src={book.image} 
                alt={book.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
                loading="lazy"
              />
              <Badge className={`absolute top-2 right-2 ${getStatusColor(book.status)}`}>
                {book.status}
              </Badge>
            </div>
            
            <CardHeader className="pb-4">
              <div className="space-y-2">
                <CardTitle className="text-lg leading-tight line-clamp-2">{book.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {book.author}
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ISBN:</span>
                  <span className="font-mono">{book.isbn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{book.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available:</span>
                  <span>{book.copies}/{book.totalCopies}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-library-gold text-library-gold" />
                    <span className="text-sm font-medium">{book.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {(role === "student" || role === "faculty") && book.status === "Available" && (
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-library"
                    onClick={() => handleAction(book, "borrow")}
                  >
                    Borrow
                  </Button>
                )}
                
                {(role === "student" || role === "faculty") && book.status === "Borrowed" && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleAction(book, "reserve")}
                  >
                    Reserve
                  </Button>
                )}
                
                {(role === "librarian" || role === "admin") && (
                  <>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleAction(book, "edit")}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    {role === "admin" && (
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleAction(book, "delete")}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <Card className="shadow-elegant border-library-cream">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-16 w-16 text-library-burgundy mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or category filter.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};