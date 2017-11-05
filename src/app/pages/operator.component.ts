import { Component } from '@angular/core';
import { ContentService } from '../services/content.service';

@Component({
    templateUrl: 'operator.component.html'
})
export class OperatorComponent {

    public questions = [
    {
        "index": 1,
        "question": "Apa yang muncul di benak anda ketika mendengar kata “Digital” (jawab dalam satu kata)?",
        "chosen": false
    },
    {
        "index": 2,
        "question": "Bisakah anda sukses tanpa menjadi Digital?",
        "chosen": false
    },
    {
        "index": 3,
        "question": "Apakah UT sebaiknya berubah menjadi organisasi digital?",
        "chosen": false
    },
    {
        "index": 4,
        "question": "Apa dampak digitalisasi terhadap kehidupan kerja anda?",
        "chosen": false
    },
    {
        "index": 5,
        "question": "Bisakah kita hari ini berpegang teguh untuk melakukan “THINKING” digital dalam cara kita bekerja (Ya / Tidak)?",
        "chosen": false
    }   
    ]

    chosenCounter = 0;

    constructor(public contentService: ContentService) {
    }

    chooseQuestion(question){
        console.log(question);
        this.contentService.postShowQuestion({question_number: question.index})
        .subscribe(data => {
            if(data.success){
                console.log(data);
                question.chosen = true;
                this.chosenCounter+=1;
            }
        })
        // this.contentService.getShowQuestion()
        // .subscribe(data => {
        //     console.log(data);
        //     let orderedData = data.data.sort((a, b) => {
        //         return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        //     })
        //     console.log(orderedData);
        // })
    }

}
