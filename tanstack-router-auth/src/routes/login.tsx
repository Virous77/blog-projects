import {
  createFileRoute,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import z from "zod";
import { redirect } from "@tanstack/react-router";
import { useAuth } from "../auth";
import { useState } from "react";

const schmea = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const LoginComp = () => {
  const auth = useAuth();
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const search = Route.useSearch();

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    try {
      evt.preventDefault();
      const data = new FormData(evt.currentTarget);
      const email = data.get("email") as string;
      const password = data.get("password") as string;

      const result = schmea.safeParse({ email, password });
      if (!result.success) {
        alert(result.error.errors[0].message);
        return;
      }
      await auth?.login(result.data.email);
      await router.invalidate();
      await navigate({ to: search.redirect || "/profile" });
    } catch (error) {
      alert("Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoggingIn = isLoading || isSubmitting;
  return (
    <main className=" flex items-center justify-center min-h-screen">
      <Card className="md:w-[500px] w-[95%]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login to Tanstack Router</CardTitle>
          <CardDescription>
            Enter your email and password below to login your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form
            onSubmit={handleFormSubmit}
            className=" flex flex-col space-y-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" />
            </div>
            <Button className="w-full">
              {isLoggingIn ? "Logging in..." : "Login account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export const Route = createFileRoute("/login")({
  component: LoginComp,
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || "/profile" });
    }
  },
});
