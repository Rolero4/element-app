import { FormControl } from "@angular/forms";

export interface PeriodicElement {
    position: number;
    name: string;
    weight: number;
    symbol: string;
}

export interface PeriodicElementFormGroup {
    name: FormControl<string>;
    weight: FormControl<number>;
    symbol: FormControl<string>;
}
