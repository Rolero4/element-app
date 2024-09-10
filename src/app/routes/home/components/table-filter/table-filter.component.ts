import { Component, DestroyRef, inject, output } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { debounceTime, filter, Observable, tap } from "rxjs";

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
    private readonly destroyRef = inject(DestroyRef);

    protected readonly filterValueChanged = output<string>();
    protected readonly filterControl = new FormControl<string>("");

    constructor() {
        this.filterValueChangeOutput$().subscribe();
    }

    private filterValueChangeOutput$(): Observable<string> {
        return this.filterControl.valueChanges.pipe(
            debounceTime(2000),
            filter((value): value is string => !!value),
            tap((value) => this.filterValueChanged.emit(value)),
            takeUntilDestroyed(this.destroyRef)
        );
    }

    protected clearInput(): void {
        this.filterControl.setValue("");
    }
}
