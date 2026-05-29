import { Navigate } from "@tanstack/react-router";
import { useAuth, type Role, ROLE_HOME } from "@/lib/auth";

export function RequireRole({
  roles,
  children,
}: {
  roles: Role[];
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="size-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;
  if (!roles.includes(user.role)) return <Navigate to={ROLE_HOME[user.role]} />;

  return <>{children}</>;
}
