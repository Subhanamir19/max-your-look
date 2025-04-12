# Max Your Look

A mobile app that uses AI to help users achieve a sharp, model-type look with defined facial features.

## Features

* Face analysis with AI scoring for features like jawline, skin, etc.
* Daily routine generator with tasks to improve your features
* Progress tracking with monthly graphs
* Model look percentage rating

## Screens

1. **Onboarding**: Introduction to the app's features
2. **Home**: Main navigation hub to access all features
3. **Photo Upload**: Take or upload a photo for analysis
4. **Analysis**: View your scores for each facial feature
5. **Routine**: Personalized daily tasks to improve your features
6. **Progress**: Track improvement over time with graphs
7. **Premium Lock**: Upgrade to access all features after the free trial

## Tech Stack

* React Native / Expo
* TypeScript
* Google Vision API for face analysis
* OpenAI for personalized routine generation
* Supabase for backend
* AsyncStorage for local data persistence

## Getting Started

### Prerequisites

* Node.js (v14 or higher)
* npm or yarn
* Expo CLI (`npm install -g expo-cli`)
* Expo Go app on your mobile device

### Installation

1. Clone the repository

```bash
git clone https://github.com/Subhanamir19/max-your-look.git
cd max-your-look
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

Create a `.env` file in the root directory with the following variables:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
GOOGLE_VISION_API_KEY=your_google_vision_api_key
```

4. Start the development server

```bash
npx expo start
```

5. Scan the QR code with Expo Go (Android) or the Camera app (iOS)

## Project Structure

```
max-your-look/
├── app/
│   ├── components/       # Reusable UI components
│   ├── constants/        # Theme, colors, and app constants
│   ├── contexts/         # React context providers
│   ├── lib/              # Utility functions and API clients
│   ├── navigation/       # Navigation configuration
│   └── screens/          # App screens
├── assets/               # Images and media files
├── App.tsx               # Entry point
└── app.config.js         # Expo configuration
```

## Development Workflow

1. Create a new branch for each feature
2. Follow the coding style guidelines
3. Write tests for new features
4. Submit a pull request with a clear description

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## API Integration

### Google Vision API

Used for facial feature analysis:

```typescript
const analyzePhoto = async (photoUri: string) => {
  // Upload photo to API
  // Process facial landmark data
  // Calculate scores
};
```

### OpenAI API

Used to generate personalized routines:

```typescript
const generateRoutine = async (scores: AnalysisScores) => {
  // Create prompt with scores
  // Get routine tasks from OpenAI
  // Parse and save tasks
};
```

## Premium Features

The app uses a freemium model:
- First analysis and routine are free
- Premium subscription unlocks unlimited analyses, routines, and progress tracking
- Integrated with Stripe for payment processing

## License

MIT

## Contact

Subhan Amir - [@SubhanAmir19](https://github.com/Subhanamir19)

Project Link: [https://github.com/Subhanamir19/max-your-look](https://github.com/Subhanamir19/max-your-look) 