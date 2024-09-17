import { Component, computed, effect, inject, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { rxActions } from "@rx-angular/state/actions";
import { exhaustMap } from "rxjs";
import { ElementEditService } from "../../services/element-edit.service";
import { PeriodicElement } from "./../../../../shared/model/misc.model";

@Component({
    selector: "app-element-table",
    standalone: true,
    imports: [MatTableModule, MatButtonModule, MatIconModule],
    templateUrl: "./element-table.component.html",
    styleUrl: "./element-table.component.scss",
})
export class ElementTableComponent {
    readonly #elementEdit = inject(ElementEditService);

    public readonly filterValue = input.required<string>();
    public readonly elements = input.required<PeriodicElement[]>();

    protected readonly actions = rxActions<{
        openPopup: { element: PeriodicElement };
    }>();

    private readonly openPopupEffect = this.actions.onOpenPopup((data$) =>
        data$.pipe(
            exhaustMap(({ element }) =>
                this.#elementEdit.openEditPopup$(element)
            )
        )
    );

    private readonly filterEffect = effect(() => {
        this.dataSource().filter = this.filterValue();
    });

    protected readonly dataSource = computed(
        () => new MatTableDataSource<PeriodicElement>(this.elements())
    );

    protected readonly displayedColumns: string[] = [
        "position",
        "name",
        "weight",
        "symbol",
        "edit",
    ];
}
