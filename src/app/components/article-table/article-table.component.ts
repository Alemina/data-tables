import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';
import { DataSource } from '@angular/cdk/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ArticleTableComponent implements OnInit {

  readonly displayedColumn = ['userId', 'id', 'title'];
  readonly headers = ['User Id', 'Id', 'Title'];
  dataSource = new ArticleDataSource(this.articleService);
  expandedElement: Article | null;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
  }

  toggleRow(el: Article): void {
    this.expandedElement = this.expandedElement === el ? null : el;
  }

}

export class ArticleDataSource extends DataSource<any> {
  constructor(private articleService: ArticleService) {
    super();
  }
  connect(): Observable<Article[]> {
    return this.articleService.getArticles();
  }
  disconnect() {}
}
