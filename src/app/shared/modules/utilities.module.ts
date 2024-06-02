import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetterHighlighterDirective } from '../directives/better-highlighter.directive';
import { CustomLoaderDirective } from '../directives/custom-loader.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    BetterHighlighterDirective,
    CustomLoaderDirective
    ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [
    BetterHighlighterDirective,
    MatProgressSpinnerModule,
    CustomLoaderDirective,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressBarModule,
    ]
})
export class UtilityModule { }
