import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  @ViewChild('editSection') editSection?: ElementRef;

  @Input() showEdit = true;

  @Output('onEdit') onEdit = new EventEmitter<boolean>();
  @Output('onDelete') onDelete = new EventEmitter<boolean>();
  open = false;

  @HostListener('document:click', ['$event'])
  clickOutside(event: any): void {
    if (this.open && !this.editSection?.nativeElement.contains(event.target)) {
      this.toggle();
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  toggle(): void {
    this.editSection?.nativeElement.classList.toggle('hideEditSection');
    setTimeout(() => {this.open = !this.open; }, 5);
  }

  edit(): void {
    this.onEdit.emit(true);
  }

  delete(): void {
    this.onDelete.emit(true);
  }
}
