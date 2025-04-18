# Project Name
Max Your Look

## Project Description
Max Your Look is a mobile app that uses AI to help users get a sharp, model-type look (defined face features). It analyzes your face with a photo, gives scores like jawline and skin inspired by apps like UMAX, and builds a daily to-do list routine to improve your features. It uses Google Vision for analysis and OpenAI for routines. First use is free, then everything locks behind premium. It tracks progress with a monthly graph and a summary of improved features, including a model look percentage.

## Target Audience
- Young adults into looksmaxxing who want a sharp, model-type face.
- Users willing to pay for premium after a free first try.

## Desired Features
### Onboarding
- [ ] Welcome screens to explain the app
    - [ ] Slide 1: "Welcome to Max Your Look! Get a model face with AI."
    - [ ] Slide 2: "Snap a photo, see your scores."
    - [ ] Slide 3: "Follow a daily to-do list to look sharper."
    - [ ] Slide 4: "Track progress—first try’s free, then premium!"

### User Accounts
- [ ] Sign-up/login with email
    - [ ] Option to use social media to join fast
    - [ ] Free first use, then premium locks all features

### Photo Upload & Analysis
- [ ] Upload a clear face photo
    - [ ] Tips like “use good light” and “no hats”
    - [ ] Buttons to snap a pic or pick from phone
    - [ ] Pop-up for bad photos: “Try better light!” with example pic
- [ ] AI analysis with Google Vision
    - [ ] Shows a loading bar: “Analyzing your face...”
    - [ ] Scores for model-type features: jawline, skin clarity, cheekbones, eyes, symmetry
    - [ ] Explains scores (e.g., “Jawline is 70—aim for 90”)
    - [ ] Shows “model look” percentage (e.g., “You’re 75% to model-type”)

### Personalized Routines
- [ ] Daily to-do list for a model-type look
    - [ ] Generated by OpenAI based on scores
    - [ ] 3-5 tasks (e.g., “Mew for 10 mins,” “Wash with soap”)
    - [ ] Mixes tasks daily (e.g., Day 1: jaw exercise, Day 2: skincare)
    - [ ] Links to short guides or videos
    - [ ] Cached locally for offline use after first scan

### Progress Tracking
- [ ] Monthly improvement graph
    - [ ] Plots scores over time (e.g., jawline from 70 to 85)
- [ ] Progress summary
    - [ ] Lists improved features (e.g., “Jawline: +10, Skin: +5”)
    - [ ] Shows total model look percentage

### Premium Features
- [ ] First analysis and routine free
    - [ ] Locks scores, routines, graphs, and summary after first use
    - [ ] Teaser on lock screen (e.g., “Day 1: Mew for 10 mins”)

## Design Requests
- [ ] Clean, sharp look
    - [ ] Big text, simple buttons, model-vibe colors (black, white, gold)
- [ ] Graph design
    - [ ] Clear lines, bright colors for scores
- [ ] Premium lock screen
    - [ ] Shows “Unlock Your Model Look” with teaser task
- [ ] Photo pop-up
    - [ ] Small alert with example pic for bad uploads

## Other Notes
- Uses Google Vision for analysis, OpenAI for routines.
- Keep photos safe—store on device or encrypted cloud.
- Confirm model-type scores: jawline, skin, cheekbones, eyes, symmetry.
- Confirm routine: 3-5 tasks, max 30 mins.
- Plan API costs for premium model.