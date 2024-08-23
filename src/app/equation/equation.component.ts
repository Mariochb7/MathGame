import { Component } from '@angular/core';
import { delay, filter, scan } from 'rxjs';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './equation.component.html',
  styleUrl: './equation.component.css',
})
export class EquationComponent {
  secondsPerSolution = 0;
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [
      /* console.log(form.value);
        return { addition: true }; //replace the form.errors
        const { a, b, answer } = form.value; //destructuring
        if (a + b === parseInt(answer)) return null;
        else return { addition: true } 
        logic moved to mathvalidator class;*/
      MathValidators.addition('answer', 'a', 'b'), //no paranthesis because we are calling a reference on this function
    ]
  );

  get a() {
    return this.mathForm.get('a')?.value;
  }

  get b() {
    return this.mathForm.get('b')?.value;
  }

  randomNumber() {
    return Math.floor(Math.random() * 10); //gives a number between 0 and 9
  }

  ngOnInit() {
    // const startTime = new Date(); not needed in rxjs part
    // let numberSolved = 0;not needed in rxjs part

    /* SOLUTION WAS DONE WITHOUT RXJS, DOING SOLUTION WITH RXJS AFTER COMMENTED CODE
   this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(150) //ms
      )
      .subscribe(() => {
        numberSolved++;
        /*(value) => console.log(value)); //status changes is an observable
        //status changes is an observable throws a value saying if form is valid or not
        this.secondsPerSolution =
          (new Date().getTime() - //ms value of time
            startTime.getTime()) /
          numberSolved /
          1000; //to convert into seconds

        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });
    /* ===== WITH set value we are obliged to modify all 3 params of the formgroup we can overcome this issue with patch
      this.mathForm.patchValue({
        b: this.randomNumber(),
        answer: '',
      });
    });*/

    /* with RXJS */
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(150),
        scan(
          (acc) => {
            return {
              numberSolved: acc.numberSolved + 1,
              startTime: acc.startTime,
            };
          },
          { numberSolved: 0, startTime: new Date() }
        )
      )
      .subscribe(({ numberSolved, startTime }) => {
        //(value) => console.log(value)); //status changes is an observable
        //status changes is an observable throws a value saying if form is valid or not
        this.secondsPerSolution =
          (new Date().getTime() - //ms value of time
            startTime.getTime()) /
          numberSolved /
          1000; //to convert into seconds

        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });
  }
}
