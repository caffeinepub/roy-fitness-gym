import { useMutation } from "@tanstack/react-query";
import type { MembershipPlan, ServiceType, TimeSlot } from "../backend.d";
import { useActor } from "./useActor";

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.submitContactForm(name, email, phone, message);
    },
  });
}

export function useSubmitMembershipInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      preferredPlan,
    }: {
      name: string;
      email: string;
      phone: string;
      preferredPlan: MembershipPlan;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.submitMembershipInquiry(name, email, phone, preferredPlan);
    },
  });
}

export function useSubmitClassBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      serviceType,
      preferredTimeSlot,
      date,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      serviceType: ServiceType;
      preferredTimeSlot: TimeSlot;
      date: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.submitClassBooking(
        name,
        email,
        phone,
        serviceType,
        preferredTimeSlot,
        date,
        message,
      );
    },
  });
}

export function useSubmitNewsletterSignup() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.submitNewsletterSignup(name, email);
    },
  });
}
