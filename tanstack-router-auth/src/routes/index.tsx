import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        Tanstack Router Auth Example
      </h1>
      <p>
        This is an example of how to use Tanstack Router with authentication.
      </p>

      <div className=" mt-6">
        <ul className="py-2 flex gap-2 flex-col">
          <li>
            <Link
              to="/login"
              className="hover:text-blue-600  flex items-center gap-2"
            >
              <ArrowRight />
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="hover:text-blue-600  flex items-center gap-2"
            >
              <ArrowRight />
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export const Route = createFileRoute("/")({
  component: HomePage,
});
