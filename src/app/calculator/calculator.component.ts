import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  currentNumber = '';
  firstOperand: number | null = null; // Allow firstOperand to be both number and null
  operator: string | null = null; // Similarly, allow operator to be string or null for consistency
  waitForSecondNumber = false;

  appendNumber(number: string) {
    if (this.waitForSecondNumber) {
      this.currentNumber = number;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0'
        ? (this.currentNumber = number)
        : (this.currentNumber += number);
    }
  }

  clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }

  chooseOperation(op: string) {
    if (this.currentNumber === '') return;

    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);
    } else if (this.operator) {
      const result = this.calculate();
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
  }

  calculate(): number {
    let result = 0; // Default to 0 to handle undefined cases
    const current = Number(this.currentNumber);
    if (!this.operator || this.firstOperand === null) return result; // Early return if no operation is set or firstOperand is null

    switch (this.operator) {
      case '+':
        result = this.firstOperand + current;
        break;
      case '-':
        result = this.firstOperand - current;
        break;
      case '*':
        result = this.firstOperand * current;
        break;
      case '/':
        result = current !== 0 ? this.firstOperand / current : 0; // Prevent division by zero
        break;
      default:
        // Handle unknown operator or no operation
        break;
    }
    return result;
  }
}
