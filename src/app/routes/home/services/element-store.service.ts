import { inject, Injectable } from "@angular/core";
import { rxState } from "@rx-angular/state";
import { finalize, Observable, tap } from "rxjs";
import { ElementApiService } from "../../../core/api/element.api.service";
import { PeriodicElement } from "../../../shared/model/misc.model";

@Injectable({
    providedIn: "root",
})
export class ElementStoreService {
    readonly #elementsApi = inject(ElementApiService);

    readonly #stateStore$ = rxState<{
        elements: PeriodicElement[];
        isLoading: boolean;
    }>(({ set, connect }) => {
        set({ elements: [], isLoading: true });
        connect("elements", this.#fetchElements$());
    });

    public set elements(elements: PeriodicElement[]) {
        this.#stateStore$.set({ elements: [...elements] });
    }

    public get elements(): PeriodicElement[] {
        return [...this.#stateStore$.get("elements")];
    }

    public get elements$(): Observable<PeriodicElement[]> {
        return this.#stateStore$.select("elements");
    }

    public get isLoadingElements$(): Observable<boolean> {
        return this.#stateStore$.select("isLoading");
    }

    #fetchElements$(): Observable<PeriodicElement[]> {
        return this.#elementsApi.getElements$().pipe(
            tap((elements) => this.#stateStore$.set({ elements })),
            finalize(() => this.#stateStore$.set({ isLoading: false }))
        );
    }
}
