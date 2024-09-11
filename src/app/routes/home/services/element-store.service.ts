import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, finalize, Observable, tap } from "rxjs";
import { ElementApiService } from "../../../core/api/element.api.service";
import { PeriodicElement } from "../../../shared/model/misc.model";

@Injectable({
    providedIn: "root",
})
export class ElementStoreService {
    readonly #elementsApi = inject(ElementApiService);
    readonly #elementsStore$ = new BehaviorSubject<PeriodicElement[]>([]);
    readonly #isElementsLoadingStore$ = new BehaviorSubject<boolean>(false);

    constructor() {
        this.#fetchElements();
    }

    public set elements(elements: PeriodicElement[]) {
        this.#elementsStore$.next(elements);
    }

    public get elements(): PeriodicElement[] {
        return [...this.#elementsStore$.value];
    }

    public get elements$(): Observable<PeriodicElement[]> {
        return this.#elementsStore$.asObservable();
    }

    public get isLoadingElements$(): Observable<boolean> {
        return this.#isElementsLoadingStore$.asObservable();
    }

    #fetchElements(): void {
        this.#isElementsLoadingStore$.next(true);
        this.#elementsApi
            .getElements$()
            .pipe(
                tap((elements) => this.#elementsStore$.next(elements)),
                finalize(() => this.#isElementsLoadingStore$.next(false))
            )
            .subscribe();
    }
}
