"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);
  const router = useRouter();


  useEffect(() => {
    if (user) {
      CheckUser();
    }
  }, [user]);

  const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      userName: user?.fullName
    });

    console.log(result);
  };

  return (
    <div>
      <Button onClick={() => router.push("/dashboard")}> Dashboard </Button>
      <UserButton />
    </div>
  );
}
