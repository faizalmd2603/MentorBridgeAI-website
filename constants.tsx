import React from 'react';
import { Translation, AppMode } from './types';

export const APP_NAME = "MentorBridge";

export const TRANSLATIONS: Record<'en' | 'ta', Translation> = {
  en: {
    welcome: "Welcome to MentorBridge",
    tagline: "Your Free AI Mentor for Careers, Skills & Growth",
    login: "Login",
    signup: "Sign Up",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    rememberMe: "Remember me",
    submit: "Continue",
    logout: "Logout",
    modes: {
      career: "Career & Education Mentor",
      typing: "Typing Coach",
      tally: "Tally + GST Coach",
      interview: "Interview Simulator",
      resume: "Resume Guide",
      developer: "About Developer",
    },
    typing: {
      start: "Start Test",
      restart: "Restart Test",
      stats: "Live Statistics",
      wpm: "Words Per Minute",
      accuracy: "Accuracy",
      errors: "Errors",
    }
  },
  ta: {
    welcome: "MentorBridge-க்கு வரவேற்கிறோம்",
    tagline: "தொழில், திறன்கள் மற்றும் வளர்ச்சிக்கான உங்கள் இலவச AI வழிகாட்டி",
    login: "உள்நுழைய",
    signup: "பதிவு செய்க",
    email: "மின்னஞ்சல் முகவரி",
    password: "கடவுச்சொல்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    rememberMe: "என்னை நினைவில் கொள்",
    submit: "தொடரவும்",
    logout: "வெளியேறு",
    modes: {
      career: "தொழில் மற்றும் கல்வி வழிகாட்டி",
      typing: "தட்டச்சு பயிற்சி",
      tally: "Tally + GST பயிற்சி",
      interview: "நேர்முகத் தேர்வு பயிற்சி",
      resume: "சுயவிவர வழிகாட்டி",
      developer: "உருவாக்குநர் பற்றி",
    },
    typing: {
      start: "தேர்வைத் தொடங்கு",
      restart: "மீண்டும் தொடங்கு",
      stats: "நேரடி புள்ளிவிவரங்கள்",
      wpm: "நிமிடத்திற்கு வார்த்தைகள்",
      accuracy: "துல்லியம்",
      errors: "பிழைகள்",
    }
  }
};

export const SYSTEM_INSTRUCTION_BASE = `
You are MentorBridge AI, a helpful, encouraging, and professional mentor.
Developer Information (Must be used when asked "Who made you?", "Who is the developer?", etc.):
Name: Mohammed Faizal M.
Age: 19.
Location: Chennai, Tamil Nadu, India.
Education: B.Com student at The New College, Chennai (Shift I – Govt. Aided Stream).
Roles: Student Placement Officer for Achievers’ Club 2025–2026, P.G. Research Department of Commerce.
Passions: Human Resources, Management, Business Development, AI.
Skills: Communication, simple accounting, recruiting, interviewing, data management, graphic design.
Experience: 3-month HR virtual internship (Shine Projects), 6-day HR Assistance (Yuva Intern), 1-month Graphic Design (Oasis Infobyte).

Core App Mission:
Provide FREE career and educational assistance to students/professionals in India.
Understand the mindset of students and guide them to the right path without cost.
NEVER advertise paid courses. Only suggest free, legitimate resources (e.g., YouTube channels, free government portals, open-source docs).

Language Rules:
If the user's selected language is English: Answer ONLY in English.
If the user's selected language is Tamil: Answer ONLY in Tamil. Use clear, simple Tamil suitable for students.
Do not mix languages unless explicitly asked.

Specific Mode Behaviors:
1. Career Mentor: Ask about background (Class/Year/Degree). Suggest paths especially in Commerce, HR, Finance.
2. Tally/GST: Explain concepts like Ledgers, Vouchers, GST entries simply. Provide scenarios.
3. Interview Simulator: Act as an interviewer. Ask one question at a time. Review the user's answer, then ask the next.
4. Resume Guide: Review pasted text. Suggest ATS-friendly improvements.
`;

// SVG Icons
export const LogoIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" className="text-brand-600 opacity-20" />
    <path d="M20 70L40 30L60 70M50 70L70 30L90 70" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500" />
    <path d="M15 75H95" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-accent-500" />
    <path d="M35 55H65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-brand-700" />
    <circle cx="50" cy="20" r="5" fill="currentColor" className="text-accent-500" />
  </svg>
);

export const TYPING_SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Education is the most powerful weapon which you can use to change the world.",
  "Do not wait for leaders; do it alone, person to person.",
  "It always seems impossible until it is done.",
  "Believe you can and you are halfway there.",
  "Act as if what you do makes a difference. It does.",
  "Dream big and dare to fail."
];
