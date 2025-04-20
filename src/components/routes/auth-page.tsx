import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../auth-context";

export default function AuthPage() {
  const location = useLocation().pathname.replace("/", "");
  const navigate = useNavigate();
  return (
    <div className="grid min-h-svh lg:grid-cols-2 w-full">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <NavLink to="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </NavLink>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col items-center gap-2 text-center">
              {location === "login" ? (
                <>
                  <h1 className="text-2xl font-bold">Login to your account</h1>
                  <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">Register your account</h1>
                  <p className=" text-sm text-muted-foreground">
                    Enter email & password below to register your account
                  </p>
                </>
              )}
            </div>
            <Tabs
              value={location}
              onValueChange={(value) => navigate("/" + value)}
              className="w-full mt-3"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm className="mt-3" />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm className="mt-3" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/src/assets/tokyo-pink.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const { login, mutationResult } = useAuth();

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" }),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "pass12345",
    },
  });
  function onSubmit({ email, password }: z.infer<typeof loginSchema>) {
    login(email, password);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="grid gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between">
                    Password
                    <NavLink className="ml-auto text-sm underline-offset-4 hover:underline" to="#">
                      Forgot Password?
                    </NavLink>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button loading={mutationResult.login.loading} type="submit" className="w-full">
            Login
          </Button>
          <FormMessage>{mutationResult.login.error?.message}</FormMessage>
        </div>
      </form>
    </Form>
  );
}

function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const { register, mutationResult } = useAuth();
  const registerSchema = z.object({
    email: z.string().email(),
    name: z.string().max(255, { message: "Name should not exceed 255 characters" }),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" }),
  });
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  function onSubmit({ email, password, name }: z.infer<typeof registerSchema>) {
    register(name, email, password);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col", className)}
        {...props}
      >
        <div className="grid gap-5">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button loading={mutationResult.register.loading} type="submit" className="w-full">
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
}
