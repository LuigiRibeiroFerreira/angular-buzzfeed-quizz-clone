import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:number[] = [] // Alterado o tipo do array para números
  answerSelected:string =""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }

  }

  playerChoose(value:string){
    
    this.answers.push(Number(value));
    console.log(value);
    this.nextStep();
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{

      const average:string = await this.calculateAverage(this.answers);
      this.finished = true;
      const averageIndex = average as keyof typeof quizz_questions.results;
      this.answerSelected = quizz_questions.results[averageIndex];
    }
  }

  async calculateAverage(numbers:number[]){
    if (numbers.length === 0) {
        throw new Error("O array de números está vazio.");
    }
  
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const average = sum / numbers.length;
    console.log(average)
    const roundedAverage = this.roundToNearest(average, [1, 3, 5]);
    const roundedString = roundedAverage.toString();
    console.log(roundedString);
    return roundedString;
  }

  // Função auxiliar para arredondar para o número mais próximo de uma lista de valores
  roundToNearest(value:number, array:number[]):number {
    return array.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev));
  }
}
