import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ElementApiService } from "../../../core/api/element.api.service";
import { PeriodicElement } from "../../../shared/model/misc.model";

@Injectable({
    providedIn: "root",
})
export class ElementStoreService {
    readonly #elementsApi = inject(ElementApiService);
    readonly #elementsStore$ = new BehaviorSubject<PeriodicElement[]>([]);

    constructor() {
        this.#fetchElements();
    }

    #fetchElements(): void {
        this.#elementsApi
            .getElements$()
            .pipe(tap((elements) => this.#elementsStore$.next(elements)))
            .subscribe();
    }

    public get elements$(): Observable<PeriodicElement[]> {
        return this.#elementsStore$.asObservable();
    }
}
