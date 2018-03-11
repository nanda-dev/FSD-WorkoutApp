import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name: 'convertFromSec'})
export class ConvertFromSecondsPipe implements PipeTransform {
    transform(value: number, toUnit: string): number {
        if(toUnit === 'M'){
            return value/60;
        }else if(toUnit === 'H'){
            return value/(60*60);
        } else {
            return value;
        }
        
    }
}