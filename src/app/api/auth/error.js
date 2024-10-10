import { useSearchParams } from 'next/navigation';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (error === 'OAuthAccountNotLinked') {
    return (
      <div>
        <h1>Account Not Linked</h1>
        <p>
          It looks like you tried to sign in with a provider that isn't linked to your existing account.
        </p>
        <a href="/api/auth/signin">Sign in with a different account</a>
      </div>
    );
  }

  return (
    <div>
      <h1>Error</h1>
      <p>An unknown error occurred: {error}</p>
    </div>
  );
}
