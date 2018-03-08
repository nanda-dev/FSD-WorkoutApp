export interface IWorkoutTransaction {
    id: number;
    workoutId: number;
    startTime: string;
    endTime: string;
    duration: number;
    calsBurnt: number;    
}