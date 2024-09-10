import { Pipe, PipeTransform } from "@angular/core";
import { PeriodicElement } from "../model/misc.model";

@Pipe({
    name: "filterElementsByValue",
    standalone: true,
})
export class FilterElementsByValuePipe implements PipeTransform {
    transform(
        collection: PeriodicElement[],
        filterValue: string
    ): PeriodicElement[] {
        const filtredCollection = collection.filter((element) =>
            this.isRecordMatched(element, filterValue)
        );
        return filtredCollection;
    }

    private isRecordMatched(
        record: PeriodicElement,
        filterValue: string
    ): boolean {
        const positionMatch = record.position.toString().includes(filterValue);
        const nameMatch = record.name.toLowerCase().includes(filterValue);
        const weightMatch = record.weight.toString().includes(filterValue);
        const symbolMatch = record.symbol.toLowerCase().includes(filterValue);

        return positionMatch || nameMatch || weightMatch || symbolMatch;
    }
}
