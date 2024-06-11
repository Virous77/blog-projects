import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const data = [
  {
    name: "Hobby",
    description: "Everything you need to kickstart your web project.",
    features: [
      "Import any git repo, deploy in seconds",
      "Automatic CI/CD",
      "Serverless Compute",
      "Traffic & performance insights",
      "DDoS Mitigation",
      "Web Application Firewall",
      "Community Support",
    ],
    link: "your link here",
  },
  {
    name: "Pro",
    description: "Collaborate with a team for $10 /month, per member.",
    features: [
      "Everything in Hobby, plus",
      "Secure team collaboration",
      "Frontend Observability tools",
      "Advanced Protection",
      "Scales with you",
      "Spend management",
      "Email support",
    ],
    link: "your link here",
  },
  {
    name: "Enterprise",
    description: "Critical security, performance, observability and support.",
    features: [
      "Everything in Pro, plus",
      "Guest & Team access controls",
      "SCIM & Directory Sync",
      "Managed WAF Rulesets",
      "Multi-region compute & failover",
      "99.99% SLA",
      "Advanced Support",
    ],
    link: "your link here",
  },
];

const HomePage = () => {
  return (
    <main className=" md:h-screen flex items-center justify-center dark flex-col mt-4 md:mt-0">
      <h1 className=" text-4xl font-bold mb-3 underline underline-offset-4">
        Next Stripe Payment
      </h1>
      <section className=" grid grid-cols-1 items-start gap-3 md:grid-cols-3 md:w-[1200px] w-full px-3 md:px-0">
        {data.map((item) => (
          <Card key={item.name}>
            <CardHeader>
              <CardTitle className="text-3xl">{item.name}</CardTitle>
              <CardDescription className=" w-[70%] text-base">
                {item.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 mt-1">
                    <ArrowRight size={18} color="#b60825" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={item.link} className="w-full">
                <Button variant="outline" className="w-full">
                  Continue
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default HomePage;
