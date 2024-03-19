"use client";

import { SignIn } from "@/components/checkpoint/signin";
import { SignUp } from "@/components/checkpoint/signup";
import { useState } from "react";

export default function Checkpoint() {
  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <div
      className="bg-yellow bg-cover"
      style={{ backgroundImage: "url('images/auth-bg.jpg')" }}
    >
      <div className="p-10 flex justify-center">
        {isSignUp ? <SignUp toggle={setIsSignUp} /> : <SignIn toggle={setIsSignUp} />}
      </div>
    </div>
  );
}
