import { LibraryAuth } from "@/components/LibraryAuth";

const Signup = ({ onLogin, onBack }: { onLogin: (role: string, user: any) => void; onBack: () => void }) => <LibraryAuth mode="signup" onLogin={onLogin} onBack={onBack} />;

export default Signup;
