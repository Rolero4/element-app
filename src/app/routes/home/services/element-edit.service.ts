import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { filter, Observable, tap } from "rxjs";
import { EditPopupComponent } from "../../../shared/components/edit-popup/edit-popup.component";
import { PeriodicElement } from "../../../shared/model/misc.model";
import { ElementStoreService } from "./element-store.service";

@Injectable({
    providedIn: "root",
})
export class ElementEditService {
    readonly #elementStore = inject(ElementStoreService);
    readonly #dialog = inject(MatDialog);

    public openEditPopup$(
        element: PeriodicElement,
        index: number
    ): Observable<PeriodicElement> {
        const dialogRef = this.#dialog.open(EditPopupComponent, {
            data: { ...element },
            disableClose: true,
        });

        return dialogRef.afterClosed().pipe(
            filter(
                (value: PeriodicElement | null): value is PeriodicElement =>
                    !!value
            ),
            tap((value) => this.#editRecord(value, index))
        );
    }

    #editRecord(record: PeriodicElement, index: number): void {
        const updatedArray = this.#elementStore.elements;
        updatedArray[index] = record;
        this.#elementStore.elements = updatedArray;
    }
}
