import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.css']
})
export class ArticleTableComponent implements OnInit {

  dataSource = new ArticleDataSource(this.articleService);
  displayedColumns = ['userId', 'id', 'title', 'body'];
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
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
