import Constants from 'expo-constants';

interface Env {
  supabaseUrl: string;
  supabaseAnonKey: string;
  openaiApiKey: string;
}

const getEnvVars = (): Env => {
  const env = Constants.expoConfig?.extra;

  if (!env?.supabaseUrl || !env?.supabaseAnonKey) {
    throw new Error('Missing Supabase configuration. Please check your app.config.js');
  }

  return {
    supabaseUrl: env.supabaseUrl as string,
    supabaseAnonKey: env.supabaseAnonKey as string,
    openaiApiKey: env.openaiApiKey as string,
  };
};

export default getEnvVars; 