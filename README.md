# ASHE — Anonymous Self Help Experience
<!-- Place your main screenshot here -->
<img width="270" height="270" alt="ashe" src="https://github.com/user-attachments/assets/63d5bbb4-2df8-4dd0-b7df-a597d2c5a4d9" />




**Live demo:** https://mind-tech-eight.vercel.app/  
**Built at:** MindTech Hackathon  
**Team:** Aldin Velić · Mirza Hodžić · Vedad Trako · Amel Husika · Adnan Šemić



---

## Features

- **Onboarding with mini exercises**  
  Grounding and relaxation activities help the user settle, build trust, and get comfortable.
- **AI Chatbot (OpenRouter)**  
  Supportive conversational agent available any time; choose **male or female** persona.
- **Therapy-inspired card flows (3 types)**
  - **Problem Cards:** guided prompts for common concerns (e.g., **ADHD**, **Anxiety**).  
    • Supports **custom questions** → AI generates tailored prompts and options.  
    • After answering, users get a **motivating stimulus**, a brief **analysis**, and **next-step suggestions**.
  - **Feelings Cards:** quick emotional check-ins.
  - **Self-Confidence Cards:** micro-exercises to reinforce strengths.
- **Session booking with verification**  
  Booking requires **sign-in and phone verification**; exploration before that is **anonymous**.
- **Ambient background music**  
  Relaxing audio to reduce tension and improve focus.

---

## Tech Stack
- **Frontend:** React + Vite  
- **Styling:** Tailwind CSS  
- **AI:** OpenRouter (model routing via OpenRouter API)  
- **Hosting:** Vercel (static frontend)
- **Design:** Figma

---
## Usage Guide

1. **Open ASHE** — ambient music plays; onboarding exercises appear.  
2. **Try mini-exercises** — reduce arousal and build trust.  
3. **Chat with the AI** — ask about therapy, expectations, or next steps.  
4. **Pick a card flow:**
   - **Problem Cards** (ADHD, Anxiety, or **Custom**)
   - **Feelings**
   - **Self-Confidence**
5. **Answer prompts** — receive a **stimulus**, brief **analysis**, and **next steps**.  
6. **Ready to talk to a human?** — **Book a session** (sign-in + phone verification - now hardcoded value:123456).

---

## Design Principles

- **Safety & Stigma Reduction:** warm tone, clear boundaries, progressive disclosure.  
- **Agency & Consent:** user chooses depth; booking is opt-in and gated.  
- **Accessibility:** high contrast, clear typography, keyboard navigation, concise language.  
- **Calm UX:** minimal clutter, predictable flows, relaxing audio.

