"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "../lib/validators";
import { z } from "zod";
import CountrySelect from "./CountrySelect";
import { useAuthStore } from "../lib/zustandStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof otpSchema>;

export default function OTPForm() {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { countryCode: "+91", phone: "" }
  });

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [sending, setSending] = useState(false);
  const [otp, setOtp] = useState<string | null>(null);

  const login = useAuthStore((s) => s.login);
  const loggedIn = useAuthStore((s) => s.loggedIn);
  const router = useRouter();

  //  Redirect if already logged in
  useEffect(() => {
    if (loggedIn) {
      router.replace("/dashboard");
    }
  }, [loggedIn, router]);

  const onSend = (data: FormValues) => {
    setSending(true);
    setTimeout(() => {
      const generated = String(Math.floor(100000 + Math.random() * 900000));
      setOtp(generated);
      setStep("otp");
      setSending(false);
      toast.success(`OTP sent: ${generated}`);
      // ⚠️ Shown for simulation only — real apps never reveal OTP!
    }, 3000);
  };

  const onVerify = (values: FormValues) => {
    if (!otp) return toast.error("No OTP sent.");
    const entered = (values as any).otp;
    if (entered === otp) {
      login(`${watch("countryCode")}${watch("phone")}`);
      toast.success("Logged in");
      router.replace("/dashboard"); // redirect immediately after login
    } else {
      toast.error("Invalid OTP");
    }
  };

  if (loggedIn) {
    return <div className="p-4">Redirecting...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-6 rounded shadow">
      {step === "phone" ? (
        <form onSubmit={handleSubmit(onSend)} className="space-y-6">
          <div>
            <label className="text-sm block mb-1 text-slate-700 dark:text-slate-200">Country</label>
            <CountrySelect
              value={watch("countryCode") || ""}
              onChange={(v) => setValue("countryCode", v)}
            />
          </div>
          <div>
            <label className="text-sm block mb-1 text-slate-700 dark:text-slate-200">Phone</label>
            <input
              {...register("phone")}
              className="w-full border rounded px-3 py-2 dark:bg-slate-800 text-slate-800 dark:border-slate-600 dark:text-white"
              placeholder="1234567890"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onVerify)} className="space-y-4">
          <div>
            <label className="text-sm block mb-1 text-slate-800">Enter OTP</label>
            <input
              {...register("otp" as any)}
              className="w-full border rounded px-3 py-2 text-slate-800"
              placeholder="123456"
            />
          </div>
          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Verify
            </button>
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="px-4 py-2 border rounded text-slate-800"
            >
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
