import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../auth";

const Profile = () => {
  const auth = useAuth();
  return (
    <section>
      <p>Welcome, {auth?.user}</p>
    </section>
  );
};

export const Route = createFileRoute("/_auth/profile")({
  component: Profile,
});
