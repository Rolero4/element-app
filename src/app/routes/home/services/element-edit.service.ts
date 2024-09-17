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
        element: PeriodicElement
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
            tap((value) => this.#editRecord(value))
        );
    }

    #editRecord(record: PeriodicElement): void {
        const indexOfOriginalElement = this.#elementStore.elements.findIndex(
            (element) => element.position === record.position
        );

        if (indexOfOriginalElement === -1) return;

        const updatedArray = this.#elementStore.elements;
        updatedArray[indexOfOriginalElement] = record;
        this.#elementStore.elements = updatedArray;
    }
}
