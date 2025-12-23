import React, { createContext, ReactNode, useContext, useState } from 'react';

// 1. Define the Shape of our Context
// This tells VS Code what "data" is available so it can autocomplete for you later.
// Basically a python dictionary
interface SessionContextType {
  isLocked: boolean;
  credits: number;
  sessionEndTime: Date | null;
  startLockSession: (durationInMinutes: number) => void;
  endLockSession: () => void;
  deductCredits: (amount: number) => void;
}

// 2. Create the Context with a default "undefined" value - nothing in it yet
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// 3. The Provider Component
// This wraps our app and holds the actual "State"
// Basically a Python class with methods
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [credits, setCredits] = useState(100); // Mock currency
  const [sessionEndTime, setSessionEndTime] = useState<Date | null>(null);

  // method that calculates when locks should end and updates state
  const startLockSession = (durationInMinutes: number) => {
    const endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + durationInMinutes);
    setSessionEndTime(endTime);
    setIsLocked(true);
    console.log(`🔒 Session Started: Locked for ${durationInMinutes} minutes.`);
  };

  const endLockSession = () => {
    setIsLocked(false);
    setSessionEndTime(null);
    console.log("🔓 Session Ended: Unlocked.");
  };

  const deductCredits = (amount: number) => {
    setCredits((prev) => Math.max(0, prev - amount));
    console.log(`💸 Penalty applied: -${amount} credits.`);
  };

  return (
    <SessionContext.Provider
      value={{
        isLocked,
        credits,
        sessionEndTime,
        startLockSession,
        endLockSession,
        deductCredits,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// 4. A Helper Hook
// This makes it easy to use the data in other files: const { isLocked } = useSession();
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

// DELETE THIS COMMENT WHEN DONE
{/*Example Usage:
  
import { useSession } from '@/context/SessionContext';

export default function MyScreen() {
  const { isLocked, credits, startLockSession } = useSession();
  
  // Now you have access to all the data!
  if (isLocked) {
    return <Text>You are locked!</Text>;
  }
  
  return (
    <Button 
      title="Start 10 min lock" 
      onPress={() => startLockSession(10)} 
    />
  );
}
  */}