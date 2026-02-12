"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2, "Name is too short").max(80),
  email: z.string().email("Invalid email"),
  company: z.string().max(120).optional(),
  message: z.string().min(10, "Add more detail").max(2000),
  mobile: z
    .string()
    .regex(/^\d{10,12}$/, "Mobile must be 10 to 12 digits"),
});

type FormValues = z.infer<typeof FormSchema>;

export function ContactForm() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", email: "", company: "", message: "", mobile: "" }
  });

  const onSubmit = async (values: FormValues) => {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      //toast({ title: "Submission failed", description: data?.error ?? "Try again." });
      notification.error({
        message: "Submission failed",
        description: data?.error ?? "Try again.",
        placement: "topRight"
      })
      return;
    }

    form.reset();
    //show notification antd
    notification.success({
      message: "Query Submitted",
      description: "We’ll respond with next steps.",
      placement: "topRight"
    })
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 rounded-2xl border p-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Your name" {...form.register("name")} />
        {form.formState.errors.name?.message && (
          <p className="text-xs text-red-600">{form.formState.errors.name.message}</p>
        )}
      </div>
      {/* add mobile also */}
      <div className="grid gap-2">
        <Label htmlFor="mobile">Mobile</Label>
        <Input
          id="mobile"
          type="tel"
          inputMode="numeric"
          placeholder="Your mobile number"
          {...form.register("mobile")}
          onInput={(e: any) => {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "").slice(0, 12);
          }}
        />
        {form.formState.errors.mobile?.message && (
          <p className="text-xs text-red-600">{form.formState.errors.mobile.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="you@company.com" {...form.register("email")} />
        {form.formState.errors.email?.message && (
          <p className="text-xs text-red-600">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="company">Company (optional)</Label>
        <Input id="company" placeholder="Company" {...form.register("company")} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" rows={6} placeholder="What are you trying to build?" {...form.register("message")} />
        {form.formState.errors.message?.message && (
          <p className="text-xs text-red-600">{form.formState.errors.message.message}</p>
        )}
      </div>

      <Button disabled={form.formState.isSubmitting} type="submit">{form.formState.isSubmitting ? "Sending..." : "Send"}</Button>
    </form>
  );
}
