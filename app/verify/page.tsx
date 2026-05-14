"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const params = useSearchParams();
  const status = params.get("status");

  return (
    <div>
      {status === "success" ? (
        <>
          <h1>Email Verified</h1>
          <p>Your account is now active.</p>
        </>
      ) : (
        <>
          <h1>Verifying…</h1>
          <p>Please wait while we confirm your email.</p>
        </>
      )}
    </div>
  );
}
