import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from "@angular/material/dialog";

import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import {
    PeriodicElement,
    PeriodicElementFormGroup,
} from "../../model/misc.model";

@Component({
    selector: "app-edit-popup",
    standalone: true,
    imports: [
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
    ],
    templateUrl: "./edit-popup.component.html",
    styleUrl: "./edit-popup.component.scss",
})
export class EditPopupComponent {
    readonly #dialogRef = inject(MatDialogRef<EditPopupComponent>);
    readonly #data = inject<PeriodicElement>(MAT_DIALOG_DATA);

    protected readonly editForm = this.#buildForm();

    constructor() {
        this.#patchForm();
    }

    #buildForm(): FormGroup<PeriodicElementFormGroup> {
        return new FormGroup<PeriodicElementFormGroup>({
            name: new FormControl<string>("", {
                nonNullable: true,
                validators: [Validators.required],
            }),

            weight: new FormControl<number>(0, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(0)],
            }),

            symbol: new FormControl<string>("", {
                nonNullable: true,
                validators: [Validators.required],
            }),
        });
    }

    #patchForm(): void {
        this.editForm.patchValue(this.#data);
    }

    protected onCloseClick(): void {
        this.#dialogRef.close(null);
    }

    protected onSaveClick(): void {
        this.#dialogRef.close({
            position: this.#data.position,
            ...this.editForm.getRawValue(),
        });
    }
}
