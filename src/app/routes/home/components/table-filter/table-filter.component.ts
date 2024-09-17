import { Component, output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { rxEffects } from "@rx-angular/state/effects";
import { debounceTime, map, Observable, tap } from "rxjs";

@Component({
    selector: "app-table-filter",
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: "./table-filter.component.html",
    styleUrl: "./table-filter.component.scss",
})
export class TableFilterComponent {
    protected readonly filterValueChanged = output<string>();
    protected readonly filterControl = new FormControl<string>("");

    readonly effects = rxEffects(({ register }) => {
        register(this.#filterValueChangeOutput$());
    });

    #filterValueChangeOutput$(): Observable<string> {
        return this.filterControl.valueChanges.pipe(
            debounceTime(2000),
            map((value) => (value ? value.trim().toLowerCase() : "")),
            tap((value) => this.filterValueChanged.emit(value))
        );
    }

    protected clearInput(): void {
        this.filterControl.setValue("");
    }
}
