import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  firstName: z.string().trim().max(50, "First name must be less than 50 characters").optional(),
  lastName: z.string().trim().max(50, "Last name must be less than 50 characters").optional(),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          message: data.message,
        }),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I will get back to you soon.",
        });
        reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error sending message",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="sr-only">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="First name"
            {...register("firstName")}
            className="input-field"
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName && (
            <p id="firstName-error" className="mt-1 text-sm text-destructive">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="sr-only">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            {...register("lastName")}
            className="input-field"
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName && (
            <p id="lastName-error" className="mt-1 text-sm text-destructive">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email *"
          {...register("email")}
          className="input-field"
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-required="true"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          placeholder="Message *"
          rows={6}
          {...register("message")}
          className="input-field resize-none"
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-required="true"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
