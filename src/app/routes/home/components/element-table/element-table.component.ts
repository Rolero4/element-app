import { Component, computed, effect, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { PeriodicElement } from "../../../../shared/model/misc.model";

@Component({
    selector: "app-element-table",
    standalone: true,
    imports: [MatTableModule, MatButtonModule, MatIconModule],
    templateUrl: "./element-table.component.html",
    styleUrl: "./element-table.component.scss",
})
export class ElementTableComponent {
    public readonly filterValue = input.required<string>();
    public readonly elements = input.required<PeriodicElement[]>();

    protected readonly displayedColumns: string[] = [
        "position",
        "name",
        "weight",
        "symbol",
        "edit",
    ];

    protected readonly dataSource = computed(
        () => new MatTableDataSource<PeriodicElement>(this.elements())
    );

    constructor() {
        effect(() => {
            this.dataSource().filter = this.filterValue();
        });
    }

    protected openEditDialog(index: number): void {
        console.log(index);
    }
}
