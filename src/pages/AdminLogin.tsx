import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;

        if (data.user) {
          // Assign admin role via edge function
          const { error: roleError } = await supabase.functions.invoke("assign-admin-role", {
            body: { user_id: data.user.id, email },
          });
          if (roleError) {
            toast.error("Account created but not authorized as admin.");
            setLoading(false);
            return;
          }
        }

        toast.success("Account created! Please check your email to verify, then log in.");
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // Check admin role
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: roleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", user.id)
            .eq("role", "admin")
            .maybeSingle();

          if (!roleData) {
            await supabase.auth.signOut();
            toast.error("You are not authorized as an admin.");
            setLoading(false);
            return;
          }
        }

        toast.success("Welcome back, Admin!");
        navigate("/admin");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="font-heading text-2xl">
            Admin {isSignUp ? "Sign Up" : "Login"}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? "Create your admin account (only authorized emails)"
              : "Sign in to access the dashboard"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Login"}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {isSignUp ? "Already have an account?" : "Need an admin account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:underline font-medium"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
