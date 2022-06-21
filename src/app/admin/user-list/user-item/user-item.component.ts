import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../../account/category/shared/category.service';
import { User } from '../../../models/user.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  @Input() index: number;
  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
  }

}
