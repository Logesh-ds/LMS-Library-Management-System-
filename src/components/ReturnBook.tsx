import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ReturnBook = () => {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!bookId) {
      setError("Book ID cannot be empty.");
      return false;
    }
    if (!userId) {
      setError("User ID cannot be empty.");
      return false;
    }
    if (!bookId.match(/^[A-Za-z0-9]+$/)) {
      setError("Book ID must be alphanumeric.");
      return false;
    }
    if (!userId.match(/^[A-Za-z0-9]+$/)) {
      setError("User ID must be alphanumeric.");
      return false;
    }
    setError("");
    return true;
  };

  const handleReturn = () => {
    if (!validate()) return;
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <Card className="shadow-elegant border-library-cream">
      <CardHeader>
        <CardTitle>Return Book</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Book ID"
          value={bookId}
          onChange={e => setBookId(e.target.value)}
        />
        <Input
          placeholder="User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <Button onClick={handleReturn}>Return Book</Button>
        {error && (
          <div className="mt-2 p-2 bg-red-100 text-red-800 rounded">{error}</div>
        )}
        {success && (
          <div className="mt-2 p-2 bg-blue-100 text-blue-800 rounded">Book returned successfully!</div>
        )}
      </CardContent>
    </Card>
  );
}
