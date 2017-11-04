import { Component } from '@angular/core';

@Component({
  templateUrl: 'operator.component.html'
})
export class OperatorComponent {

    public questions = [
        "Apa yang muncul di benak anda ketika mendengar kata “Digital” (jawab dalam satu kata)?",
        "Bisakah anda sukses tanpa menjadi Digital?",
        "Apakah UT sebaiknya berubah menjadi organisasi digital?",
        "Apa dampak digitalisasi terhadap kehidupan kerja anda?",
        "Bisakah kita hari ini berpegang teguh untuk melakukan “THINKING” digital dalam cara kita bekerja (Ya / Tidak)?"
    ]

    constructor() {
        
    }

}
