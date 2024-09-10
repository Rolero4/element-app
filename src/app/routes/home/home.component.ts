import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EditPopupComponent } from "../../shared/components/edit-popup/edit-popup.component";
import { PeriodicElement } from "../../shared/model/misc.model";
import { ElementStoreService } from "./services/element-store.service";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {
    private readonly storeService = inject(ElementStoreService);
    protected readonly elements$ = this.storeService.elements$;

    constructor(public dialog: MatDialog) {
        this.openEditDialog({
            position: 1,
            name: "kekw",
            weight: 1.2334,
            symbol: "xd",
        });
    }

    openEditDialog(element: PeriodicElement): void {
        const dialogRef = this.dialog.open(EditPopupComponent, {
            data: { ...element },
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {});
    }
}
