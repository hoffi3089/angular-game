import { NgForOf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Feld, gestrichen, ohneEingabe } from './constants';

const selectValueToFeld = (value: string | null): Feld => {
  return value == null || value === '' || value === 'null'
    ? null
    : Number.parseInt(value);
};

const feldToSelectValue = (value: Feld): string => {
  return value == ohneEingabe ? 'null' : `${value}`;
};

@Component({
  selector: 'kf-select',
  templateUrl: './select.component.html',
  styleUrls: ['./global.css', './select.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, AfterViewInit {
  #lastValueWritten: Feld = ohneEingabe;
  #lastDisabled: boolean | null = null;

  readonly ohneEingabe = ohneEingabe;
  readonly gestrichen = gestrichen;

  @ViewChild('select') select: ElementRef<HTMLSelectElement> | null = null;

  @Input() werte: readonly Feld[] = [];

  ngAfterViewInit(): void {
    if (this.select != null) {
      this.select.nativeElement.value = feldToSelectValue(
        this.#lastValueWritten
      );
      if (this.#lastDisabled != null) {
        this.select.nativeElement.disabled = this.#lastDisabled;
      }
    }
  }

  writeValue(obj: Feld): void {
    this.#lastValueWritten = obj;
    if (this.select != null) {
      this.select.nativeElement.value = feldToSelectValue(obj);
    }
  }

  #onChange = (_: Feld) => {
    // not null dummy
  };

  registerOnChange(fn: (_: Feld) => void): void {
    this.#onChange = fn;
  }

  onChange(_event: unknown): void {
    if (this.select != null) {
      const value = selectValueToFeld(this.select.nativeElement.value);
      this.#onChange(value);
    }
  }

  #onTouched = () => {
    // not null dummy
  };

  registerOnTouched(fn: () => void): void {
    this.#onTouched = fn;
  }

  onTouched(): void {
    this.#onTouched();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.#lastDisabled = isDisabled;
    if (this.select != null) {
      this.select.nativeElement.disabled = isDisabled;
    }
  }
}
