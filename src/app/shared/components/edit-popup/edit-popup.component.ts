import { Component, Inject } from "@angular/core";
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
    protected readonly editForm: FormGroup<PeriodicElementFormGroup>;

    constructor(
        public dialogRef: MatDialogRef<EditPopupComponent>,
        @Inject(MAT_DIALOG_DATA) private readonly data: PeriodicElement
    ) {
        this.editForm = this.buildForm();
        this.patchForm();
    }

    private buildForm(): FormGroup<PeriodicElementFormGroup> {
        return new FormGroup<PeriodicElementFormGroup>({
            position: new FormControl<number>(1, {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),
                    Validators.min(1),
                ],
            }),

            name: new FormControl<string>("", {
                nonNullable: true,
                validators: [Validators.required],
            }),

            weight: new FormControl<number>(0, {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.pattern("^[0-9.-/]+$"),
                    Validators.min(0),
                ],
            }),

            symbol: new FormControl<string>("", {
                nonNullable: true,
                validators: [Validators.required, Validators.maxLength(2)],
            }),
        });
    }

    private patchForm(): void {
        this.editForm.patchValue(this.data);
    }

    protected onCloseClick(): void {
        this.dialogRef.close(false);
    }

    protected onSaveClick(): void {
        this.dialogRef.close(this.editForm.getRawValue());
    }
}
