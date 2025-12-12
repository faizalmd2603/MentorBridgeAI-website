export type Language = 'en' | 'ta';

export enum AppMode {
  DASHBOARD = 'DASHBOARD',
  CAREER_MENTOR = 'CAREER_MENTOR',
  TYPING_COACH = 'TYPING_COACH',
  TALLY_COACH = 'TALLY_COACH',
  INTERVIEW_SIM = 'INTERVIEW_SIM',
  RESUME_GUIDE = 'RESUME_GUIDE',
  DEVELOPER = 'DEVELOPER'
}

export interface User {
  name: string;
  email: string;
  password?: string; // Stored securely in real app, simplistic here
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface TypingResult {
  wpm: number;
  accuracy: number;
  date: string;
}

export interface Translation {
  welcome: string;
  tagline: string;
  login: string;
  signup: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: string;
  submit: string;
  logout: string;
  modes: {
    career: string;
    typing: string;
    tally: string;
    interview: string;
    resume: string;
    developer: string;
  };
  typing: {
    start: string;
    restart: string;
    stats: string;
    wpm: string;
    accuracy: string;
    errors: string;
  };
}