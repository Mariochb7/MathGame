import { AbstractControl } from '@angular/forms';

export class MathValidators {
  //static means no need to create an instance of the class we simply write MathValidators.function()
  static addition(target: string, sourceOne: string, sourceTwo: string) {
    return (form: AbstractControl) => {
      const sum = form.value[target];
      const firstNumber = form.value[sourceOne];
      const secondNumber = form.value[sourceTwo];
      if (firstNumber + secondNumber === parseInt(sum)) return null;
      else return { addition: true };
    };
  }
}
