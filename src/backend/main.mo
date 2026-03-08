import Array "mo:core/Array";
import Int "mo:core/Int";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Text "mo:core/Text";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type ServiceType = {
    #cardio;
    #weightTraining;
    #zumba;
    #personalTraining;
    #nutrition;
  };

  type TimeSlot = {
    #morning;
    #afternoon;
    #evening;
  };

  type ClassBooking = {
    name : Text;
    email : Text;
    phone : Text;
    serviceType : ServiceType;
    preferredTimeSlot : TimeSlot;
    date : Text;
    message : Text;
  };

  type MembershipPlan = {
    #monthly;
    #quarterly;
    #halfYearly;
    #yearly;
  };

  type MembershipInquiry = {
    name : Text;
    email : Text;
    phone : Text;
    preferredPlan : MembershipPlan;
  };

  type NewsletterSignup = {
    name : Text;
    email : Text;
    timestamp : Time.Time;
  };

  module ContactSubmission {
    public func compare(a : ContactSubmission, b : ContactSubmission) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  module NewsletterSignup {
    public func compare(a : NewsletterSignup, b : NewsletterSignup) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let contactSubmissions = Map.empty<Text, ContactSubmission>();
  let classBookings = Map.empty<Text, ClassBooking>();
  let membershipInquiries = Map.empty<Text, MembershipInquiry>();
  let newsletterSignups = Map.empty<Text, NewsletterSignup>();

  // Contact Form Submission
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(email, submission);
  };

  // Class Booking
  public shared ({ caller }) func submitClassBooking(name : Text, email : Text, phone : Text, serviceType : ServiceType, preferredTimeSlot : TimeSlot, date : Text, message : Text) : async () {
    let booking : ClassBooking = {
      name;
      email;
      phone;
      serviceType;
      preferredTimeSlot;
      date;
      message;
    };
    classBookings.add(email, booking);
  };

  // Newsletter Signup
  public shared ({ caller }) func submitNewsletterSignup(name : Text, email : Text) : async () {
    if (newsletterSignups.containsKey(email)) {
      Runtime.trap("Email already signed up");
    };
    let signup : NewsletterSignup = {
      name;
      email;
      timestamp = Time.now();
    };
    newsletterSignups.add(email, signup);
  };

  // Membership Inquiry
  public shared ({ caller }) func submitMembershipInquiry(name : Text, email : Text, phone : Text, preferredPlan : MembershipPlan) : async () {
    let inquiry : MembershipInquiry = {
      name;
      email;
      phone;
      preferredPlan;
    };
    membershipInquiries.add(email, inquiry);
  };

  // Get all contact submissions
  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray().sort();
  };

  // Get all class bookings
  public query ({ caller }) func getAllClassBookings() : async [ClassBooking] {
    classBookings.values().toArray();
  };

  // Get all membership inquiries
  public query ({ caller }) func getAllMembershipInquiries() : async [MembershipInquiry] {
    membershipInquiries.values().toArray();
  };

  // Get all newsletter signups
  public query ({ caller }) func getAllNewsletterSignups() : async [NewsletterSignup] {
    newsletterSignups.values().toArray().sort();
  };

  // Get specific contact submission
  public query ({ caller }) func getContactSubmission(email : Text) : async ContactSubmission {
    switch (contactSubmissions.get(email)) {
      case (null) { Runtime.trap("No submission found for this email") };
      case (?submission) { submission };
    };
  };

  // Get specific class booking
  public query ({ caller }) func getClassBooking(email : Text) : async ClassBooking {
    switch (classBookings.get(email)) {
      case (null) { Runtime.trap("No booking found for this email") };
      case (?booking) { booking };
    };
  };

  // Get specific membership inquiry
  public query ({ caller }) func getMembershipInquiry(email : Text) : async MembershipInquiry {
    switch (membershipInquiries.get(email)) {
      case (null) { Runtime.trap("No inquiry found for this email") };
      case (?inquiry) { inquiry };
    };
  };

  // Get specific newsletter signup
  public query ({ caller }) func getNewsletterSignup(email : Text) : async NewsletterSignup {
    switch (newsletterSignups.get(email)) {
      case (null) { Runtime.trap("No signup found for this email") };
      case (?signup) { signup };
    };
  };
};
