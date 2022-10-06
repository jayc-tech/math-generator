import { Component } from '@angular/core';
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} from 'docx';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'math-web';

  firstNumFrom: string;
  firstNumTo: string;
  secondNumFrom: string;
  secondNumTo: string;
  lines: string;
  columns: string;
  operator: string;

  constructor(private fileSaverService: FileSaverService) {
    this.firstNumFrom = '';
    this.firstNumTo = '';
    this.secondNumFrom = '';
    this.secondNumTo = '';
    this.lines = '50';
    this.columns = '4';
    this.operator = 'plus';
  }

  getRandomNumber(from: number, to: number): number {
    return Math.floor(Math.random() * (from - to + 1) + to);
  }

  getRandomMath(): string {
    const a = this.getRandomNumber(+this.firstNumFrom, +this.firstNumTo);
    const b = this.getRandomNumber(+this.secondNumFrom, +this.secondNumTo);

    switch (this.operator) {
      case 'plus':
        return ` ${a} + ${b} = (         )   `;
      case 'minus':
        if (a >= b) {
          return ` ${a} - ${b} = (         )   `;
        }
        return ` ${b} - ${a} = (         )    `;
      case 'divide':
        if (a >= b && a % b == 0) {
          return ` ${a} ÷ ${b} = (         )   `;
        }
        if (b >= a && b % a == 0) {
          return ` ${b} ÷ ${a} = (         )   `;
        }
        break;
      case 'multiply':
        return ` ${a} × ${b} = (          )   `;
      default:
        return ` ${a} + ${b} = (         )   `;
    }
    return this.getRandomMath();
  }

  generateDoc() {
    const sections = [];
    const strList = [];
    const lines = +this.lines;

    for (let i = 0; i < lines; i++) {
      let text = this.getRandomMath();
      text += this.getRandomMath();
      text += this.getRandomMath();
      if (this.columns == '4') {
        text += this.getRandomMath();
      }
      strList.push(
        new Paragraph({ text: text, heading: HeadingLevel.HEADING_1 })
      );
    }

    sections.push({ children: strList });

    const document = new Document({
      sections: sections,
      styles: {
        default: {
          heading1: {
            run: {
              size: 26,
            },
            paragraph: {
              spacing: {
                after: 250,
              },
            },
          },
        },
      },
    });

    return document;
  }

  download(): void {
    const doc = this.generateDoc();
    Packer.toBlob(doc).then((buffer) => {
      console.log(buffer);
      this.fileSaverService.save(buffer, `math_${this.operator}.docx`);
      console.log('Document created successfully');
    });
  }
}
