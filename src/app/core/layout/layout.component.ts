import { Component } from "@angular/core";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
    selector: "app-layout",
    standalone: true,
    imports: [HeaderComponent, FooterComponent],
    templateUrl: "./layout.component.html",
    styleUrl: "./layout.component.scss",
})
export class LayoutComponent {}
