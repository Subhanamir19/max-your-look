export default {
  expo: {
    name: 'Max Your Look',
    slug: 'max-your-look',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      }
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      supabaseUrl: "https://your-supabase-project-id.supabase.co",
      supabaseAnonKey: "your-supabase-anon-key",
      openaiApiKey: process.env.OPENAI_API_KEY,
    }
  }
}; 