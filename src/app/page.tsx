"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Leaf, Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    // Fake login validation
    const validCredentials = [
      { email: "john.smith@mission.org", password: "mission123" },
      { email: "admin@mission.org", password: "admin123" },
      { email: "demo@mission.org", password: "demo123" },
    ];

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const isValid = validCredentials.some(
      (cred) => cred.email === data.email && cred.password === data.password
    );

    if (isValid) {
      // Successful login - redirect to dashboard
      router.push("/dashboard");
    } else {
      // Invalid credentials
      form.setError("password", {
        type: "manual",
        message: "Invalid email or password. Try: demo@mission.org / demo123",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 text-primary-foreground">
              <Leaf className="h-6 w-6" />
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-bold text-foreground">Leaf</h1>
              <p className="text-sm text-muted-foreground">
                Missionary Dashboard
              </p>
            </div>
          </div>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to access your missionary dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@mission.org"
                          className="border-input bg-background"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="border-input bg-background"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>

            {/* Demo Credentials */}
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <h4 className="text-sm font-semibold text-foreground mb-2">
                Demo Credentials
              </h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>
                  <strong>Email:</strong> demo@mission.org
                </p>
                <p>
                  <strong>Password:</strong> demo123
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3"
                onClick={() => {
                  form.setValue("email", "demo@mission.org");
                  form.setValue("password", "demo123");
                }}
                disabled={isLoading}
              >
                Use Demo Account
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2025 Leaf Missionary Dashboard. Built for missionaries worldwide.
        </p>
      </div>
    </div>
  );
}
