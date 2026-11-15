import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import reelLogo from "@/assets/reel-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate("/admin");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          toast({
            title: "Login Failed",
            description: error.message === "Invalid login credentials" 
              ? "Invalid email or password. Please try again." 
              : error.message,
            variant: "destructive",
          });
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Account Exists",
              description: "This email is already registered. Please log in instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Sign Up Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Check Your Email",
            description: "We've sent you a confirmation link. Please verify your email to continue.",
          });
        }
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <img
            src={reelLogo}
            alt="REEL Tech Hub Logo"
            className="h-14 w-auto mx-auto mb-3 object-contain"
          />
          <h1 className="text-xl font-semibold text-background mb-1 tracking-wider uppercase">
            REEL TECH HUB
          </h1>
          <p className="text-xs text-background/60">
            {isLogin
              ? "Sign in to access publishing console"
              : "Register for admin access"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[11px] uppercase tracking-wider font-normal text-background/70">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@reelholding.com.ng"
              className="bg-background/10 border-background/20 text-background placeholder:text-background/30 focus-visible:ring-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[11px] uppercase tracking-wider font-normal text-background/70">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-background/10 border-background/20 text-background placeholder:text-background/30 focus-visible:ring-primary"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full text-[11px] uppercase tracking-wider font-normal"
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-background/50 hover:text-background/80 font-light transition-colors block mx-auto"
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>

          <div className="pt-4 border-t border-background/20 space-y-2">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Administrator Key Login (/admin)
            </button>
            <div>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-xs text-background/50 hover:text-background/80 transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to REEL Tech Hub
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <Button
            variant="default"
            onClick={() => navigate("/admin?demo=true")}
            className="w-full rounded-full text-[11px] uppercase tracking-wider font-normal"
          >
            Try Demo Mode
          </Button>
          <button
            onClick={() => navigate("/")}
            className="text-xs text-background/40 hover:text-background/60 font-light transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to site
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
