import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  chartForm!: FormGroup;

  // Arrays for colors and chart types
  colors = [
    { name: 'Blue', value: 'blue' },
    { name: 'Red', value: 'red' },
    { name: 'Green', value: 'green' },
    { name: 'Purple', value: 'purple' },
    { name: 'Yellow', value: 'yellow' },
    { name: 'Grey', value: 'grey' },
    { name: 'Orange', value: 'orange' }
  ];

  chartTypes = [
    { name: 'Bar', value: 'bar' },
    { name: 'Pie', value: 'pie' },
    { name: 'Line', value: 'line' }
  ];


  // Event emitter to pass data to the parent (app component)
  @Output() chartData = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.chartForm = this.fb.group({
      january: ['', [Validators.required, this.rangeValidator(1000, 10000)]],
      february: ['', [Validators.required, this.rangeValidator(1000, 10000)]],
      march: ['', [Validators.required, this.rangeValidator(1000, 10000)]],
      januaryColor: ['blue'],
      februaryColor: ['blue'],
      marchColor: ['blue'],
      chartType: ['bar'],
    });
  }

  generateChart() {
    if (this.chartForm.invalid) {
      return;  // Exit if form is invalid
    }

    const formValues = this.chartForm.value;

    const januaryRevenue = Number(formValues.january);
    const februaryRevenue = Number(formValues.february);
    const marchRevenue = Number(formValues.march);

    const januaryColor = formValues.januaryColor;
    const februaryColor = formValues.februaryColor;
    const marchColor = formValues.marchColor;

    const maxRevenue = Math.max(januaryRevenue, februaryRevenue, marchRevenue);
    const minY = 1000;
    const maxY = Math.max(10000, maxRevenue);

    const chartOptions = {
      chart: {
        type: 'formValues.chartType'
      },
      title: {
        text: 'Monthly Revenue'
      },
      xAxis: {
        categories: ['January', 'February', 'March']
      },
      yAxis: {
        title: {
          text: 'Revenue'
        },
        min: minY,
        max: maxY,
      },
      series: [{
        name: 'Revenue',
        data: [
          { y: januaryRevenue, color: januaryColor },
          { y: februaryRevenue, color: februaryColor },
          { y: marchRevenue, color: marchColor }
        ]
      }]
    };

    this.chartData.emit(chartOptions);
  }

  // Custom validator function for range validation
  rangeValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value !== null && (isNaN(value) || value < min || value > max)) {
        return { range: true };
      }
      return null;
    };
  }
}
