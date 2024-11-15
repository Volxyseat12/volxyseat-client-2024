import { Component } from '@angular/core';
import { TemplatesComponent } from "../../pages/templates/templates.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TemplatesComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
