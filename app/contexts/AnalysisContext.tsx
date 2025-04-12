import React, { createContext, useState, useContext } from 'react';

// Define analysis scores types
interface AnalysisScores {
  jawline: number;
  skin: number;
  eyebrows: number;
  eyes: number;
  nose: number;
  lips: number;
  hairline: number;
  facialHarmony: number;
  modelPercentage: number;
}

// Define the context state type
interface AnalysisContextState {
  isAnalyzing: boolean;
  photoUri: string | null;
  scores: AnalysisScores | null;
  routines: string[] | null;
  setIsAnalyzing: (value: boolean) => void;
  setPhotoUri: (uri: string | null) => void;
  setScores: (scores: AnalysisScores | null) => void;
  setRoutines: (routines: string[] | null) => void;
}

// Create the context with default values
const AnalysisContext = createContext<AnalysisContextState>({
  isAnalyzing: false,
  photoUri: null,
  scores: null,
  routines: null,
  setIsAnalyzing: () => {},
  setPhotoUri: () => {},
  setScores: () => {},
  setRoutines: () => {},
});

// Create provider component
export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [scores, setScores] = useState<AnalysisScores | null>(null);
  const [routines, setRoutines] = useState<string[] | null>(null);

  return (
    <AnalysisContext.Provider
      value={{
        isAnalyzing,
        photoUri,
        scores,
        routines,
        setIsAnalyzing,
        setPhotoUri,
        setScores,
        setRoutines,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

// Create hook for using the context
export const useAnalysis = () => useContext(AnalysisContext); 