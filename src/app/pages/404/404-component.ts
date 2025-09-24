import { Component, computed, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleLink } from '../../../locale/locale.link';
import { PATH } from '../../app.paths';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-404-component',
  imports: [RouterLink, LocaleLink],
  templateUrl: './404-component.html',
  styleUrl: './404-component.css',
  providers: [NgxIndexedDBService],
  standalone: true,
})
export class NotFoundComponent implements OnInit {
  @Input() resolveFoo?: string; // My resolved data
  @Input() isSomething?: boolean; // true
  @Input() todoId?: string; // 1
  @Input() searchTerm?: string; // angular
  @Input() locale?: string; // angular

  protected readonly message = 'PAGE NOT FOUND';
  protected readonly PATH = PATH;

  hasUnsavedChanges = () => true;

  getMessage = computed<string>(() => `Message: ${this.message}`);

  name = 'Angular';
  people: any[] = [];
  constructor(private dbService: NgxIndexedDBService) {
    this.dbService.clear('people').subscribe((successDeleted) => {
      console.log('success? ', successDeleted);
    });

    this.dbService
      .bulkAdd('people', [
        {
          name: `charles number ${Math.random() * 10}`,
          email: `email number ${Math.random() * 10}`,
        },
        {
          name: `charles number ${Math.random() * 10}`,
          email: `email number ${Math.random() * 10}`,
        },
      ])
      .subscribe((result) => {
        console.log('result: ', result);
      });
  }

  ngOnInit() {
    this.dbService.getAll('people').subscribe((result: any) => {
      console.log('results: ', result);
      this.people = result;
    });
  }
}
