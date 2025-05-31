export type IdleState = 'ACTIVE' | 'WARNING' | 'IDLE';

export const IdleState = {
  ACTIVE: 'ACTIVE' as IdleState,
  WARNING: 'WARNING' as IdleState,
  IDLE: 'IDLE' as IdleState
};

export interface IdleTimerContextType {
  idleState: IdleState;
  timeRemaining: number;
  reset: () => void;
  pause: () => void;
  resume: () => void;
}