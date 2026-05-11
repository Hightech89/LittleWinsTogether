import { AuthForm } from "../signin/auth-form";

export default function SignUpPage() {
  return (
    <main className="flex flex-1 items-center justify-center py-16">
      <AuthForm initialMode="signup" />
    </main>
  );
}
