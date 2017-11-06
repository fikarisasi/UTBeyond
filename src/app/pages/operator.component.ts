import { Component } from '@angular/core';
import { ContentService } from '../services/content.service';

@Component({
    templateUrl: 'operator.component.html'
})
export class OperatorComponent {

    public questions = [
    {
        "index": 1,
        "question": 'Satu kata yang mendeskripsikan "DIGITAL" bagi anda',
        "chosen": false
    },
    {
        "index": 2,
        "question": "Menurut anda, seberapa URGENT Digital Transformation bagi UT?",
        "chosen": false
    },
    {
        "index": 3,
        "question": "Bagaimana perasaan anda terkait dimulainya digitalization di UT?",
        "chosen": false
    },
    {
        "index": 4,
        "question": "Apakah kita semua berkomitmen untuk mensukseskan UT Digitalization?",
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
    }

}
