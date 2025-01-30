import { Component } from '@angular/core';
import {FormsModule}  from '@angular/forms'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InputSum';

    inputValue:number | null =null;
    textValue:string='';

    convertToText() {
      this.textValue = this.inputValue !== null ? this.numberToWords(this.inputValue): '';
    }

    numberToWords(num:number):string{
      if(num === 0) return "Nol"

      const ones = ["", "Bir", "Ikki", "Uch", "To'rt", "Besh", "Olti", "Yett", "Sakkiz", "To'qqiz"];
      const teens = ["O'n", "O'n bir", "O'n ikki", "O'n uch", "O'n to'rt", "O'n besh", "O'n olti", "O'n yetti", "O'n sakkiz", "O'n to'qqiz"];
      const tens = ["", "", "Yigirma", "O'ttiz", "Qirq", "Elli", "Oltmish", "Yetmish", "Sakson", "To'qson"];
      const thousands = ["", "Ming", "Million", "Milliard"];

      let words: string[] = [];
      let scaleIndex = 0;

      while(num > 0) {
        let numberSegment = num % 1000;

        if(numberSegment > 0) {
          let segmentWords = this.splitToWords(numberSegment, ones, teens, tens);
          words.unshift(segmentWords + ' ' + thousands[scaleIndex]);
        }
        num = Math.floor(num/1000);
        scaleIndex++;
      }

      return words.join(' ').trim();

    }

    splitToWords(num: number, ones: string[], teens: string[], tens: string[]): string {
      let words: string[] = [];

      if(num >= 100) {
        words.push(ones[Math.floor(num/100)]+ " Yuz");
        num %= 100;
      }

      if(num >= 20) {
        words.push(tens[Math.floor(num/10)]);
        num %= 10;
      } else if (num >= 10) {
        words.push(teens[num - 10]);
        num = 0
      }

      if(num > 0) {
        words.push(ones[num]);
      }

      return words.join(' ').trim();

    }

}
