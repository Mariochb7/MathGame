import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map, filter } from 'rxjs';

@Directive({
  selector: '[appAnswerHighlight]',
  standalone: true,
})
export class AnswerHighlightDirective {
  constructor(private el: ElementRef, private controlName: NgControl) {
    //ng control help us know that this element ref (input) in this case
    //is bound to the formcontrol of the form ( input formcontrol in this case)
    //we do a directive and inject it in the field that we want to track , input in this case
    // then we have the ng control object that we can use
  }

  ngOnInit() {
    // console.log(this.controlName.control?.parent); // parent means what ever object is controling this form control
    //form group in our case

    //observable to detect value changes
    this.controlName.control?.parent?.valueChanges
      .pipe(map(({ a, b, answer }) => Math.abs((a + b - answer) / (a + b))))
      .subscribe((value) => {
        //console.log(value);
        if (value < 0.2) {
          this.el.nativeElement.classList.add('close');
        } else {
          this.el.nativeElement.classList.remove('close');
        }
      });
  }
}
