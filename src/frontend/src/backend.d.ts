import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface ClassBooking {
    serviceType: ServiceType;
    date: string;
    name: string;
    email: string;
    preferredTimeSlot: TimeSlot;
    message: string;
    phone: string;
}
export interface NewsletterSignup {
    name: string;
    email: string;
    timestamp: Time;
}
export interface MembershipInquiry {
    name: string;
    email: string;
    preferredPlan: MembershipPlan;
    phone: string;
}
export enum MembershipPlan {
    quarterly = "quarterly",
    monthly = "monthly",
    halfYearly = "halfYearly",
    yearly = "yearly"
}
export enum ServiceType {
    weightTraining = "weightTraining",
    personalTraining = "personalTraining",
    zumba = "zumba",
    cardio = "cardio",
    nutrition = "nutrition"
}
export enum TimeSlot {
    morning = "morning",
    evening = "evening",
    afternoon = "afternoon"
}
export interface backendInterface {
    getAllClassBookings(): Promise<Array<ClassBooking>>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllMembershipInquiries(): Promise<Array<MembershipInquiry>>;
    getAllNewsletterSignups(): Promise<Array<NewsletterSignup>>;
    getClassBooking(email: string): Promise<ClassBooking>;
    getContactSubmission(email: string): Promise<ContactSubmission>;
    getMembershipInquiry(email: string): Promise<MembershipInquiry>;
    getNewsletterSignup(email: string): Promise<NewsletterSignup>;
    submitClassBooking(name: string, email: string, phone: string, serviceType: ServiceType, preferredTimeSlot: TimeSlot, date: string, message: string): Promise<void>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<void>;
    submitMembershipInquiry(name: string, email: string, phone: string, preferredPlan: MembershipPlan): Promise<void>;
    submitNewsletterSignup(name: string, email: string): Promise<void>;
}
