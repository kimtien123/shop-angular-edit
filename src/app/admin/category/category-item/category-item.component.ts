import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../../account/category/shared/category.service';
import { Category } from '../../../models/category.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {
  @Input() category: Category;
  @Input() index: number;
  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
  }

  edit () {
    this.router.navigate(['admin/category/edit/' + this.category.id]);
  }
}
