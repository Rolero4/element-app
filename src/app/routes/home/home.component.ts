import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ElementTableComponent } from "./components/element-table/element-table.component";
import { TableFilterComponent } from "./components/table-filter/table-filter.component";
import { ElementStoreService } from "./services/element-store.service";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [
        CommonModule,
        TableFilterComponent,
        ElementTableComponent,
        MatProgressSpinnerModule,
    ],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {
    readonly #storeService = inject(ElementStoreService);

    protected readonly elements$ = this.#storeService.elements$;
    protected readonly isElementsLoading$ =
        this.#storeService.isLoadingElements$;

    protected readonly filterValue = signal<string>("");
}
