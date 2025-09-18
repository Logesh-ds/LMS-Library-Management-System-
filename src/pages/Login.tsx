import { LibraryAuth } from "@/components/LibraryAuth";

const Login = ({ onLogin, onBack, onSignupNavigate }: { onLogin: (role: string, user: any) => void; onBack: () => void; onSignupNavigate: () => void }) => (
	<LibraryAuth mode="login" onLogin={onLogin} onBack={onBack} onSignupNavigate={onSignupNavigate} />
);

export default Login;
