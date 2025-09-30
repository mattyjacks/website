"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { fadeInUp } from "@/lib/animations/scroll-animations";

export default function ProtectedPage() {
  const [claims, setClaims] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const infoRef = useScrollAnimation(fadeInUp);
  const detailsRef = useScrollAnimation(fadeInUp);
  const stepsRef = useScrollAnimation(fadeInUp);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getClaims();

      if (error || !data?.claims) {
        redirect("/auth/login");
        return;
      }

      setClaims(data.claims);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="flex-1 w-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div ref={infoRef} className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div ref={detailsRef} className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(claims, null, 2)}
        </pre>
      </div>
      <div ref={stepsRef}>
        <h2 className="font-bold text-2xl mb-4">Next steps</h2>
        <FetchDataSteps />
      </div>
    </div>
  );
}
