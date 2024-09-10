import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ElementApiService } from "../../../core/api/element.api.service";
import { PeriodicElement } from "../../../shared/model/misc.model";

@Injectable({
    providedIn: "root",
})
export class ElementStoreService {
    private readonly elementsApi = inject(ElementApiService);
    private readonly elementsStore$ = new BehaviorSubject<PeriodicElement[]>(
        []
    );

    constructor() {}

    public fetchElements(): void {
        this.elementsApi
            .getElements$()
            .pipe(tap((elements) => this.elementsStore$.next(elements)))
            .subscribe();
    }

    public get elements$(): Observable<PeriodicElement[]> {
        return this.elementsStore$.asObservable();
    }
}
