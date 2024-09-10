import { FormControl } from "@angular/forms";

export type PeriodicElement = {
    position: number;
    name: string;
    weight: number;
    symbol: string;
};

export type PeriodicElementFormGroup = {
    position: FormControl<number>;
    name: FormControl<string>;
    weight: FormControl<number>;
    symbol: FormControl<string>;
};
