import { PipeTransform, Pipe } from "@angular/core";
import { WorkoutService } from "../workouts/workout.service";

@Pipe({name: 'workoutNameMapper'})
export class WorkoutNameMapperPipe implements PipeTransform {
    constructor(private workoutSvc: WorkoutService) {}

    transform(value: number): string {
        return this.workoutSvc.workoutMap[value] || value;        
    }
}