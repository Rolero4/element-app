import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EditPopupComponent } from "../../shared/components/edit-popup/edit-popup.component";
import { PeriodicElement } from "../../shared/model/misc.model";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {
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
