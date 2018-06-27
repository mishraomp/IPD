import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    constructor() { }


    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'Student',
                icon: 'fa fa-fw fa-file-o',
                items: [{
                    label: 'New'
                },
                { label: 'Search' },
                { label: 'Advanced Search' }
                ]
            },
            {
                label: 'Course',
                icon: 'fa fa-fw fa-file-o',
                items: [{
                    label: 'Add'
                },
                { label: 'Edit' },
                { label: 'Search' }
                ]
            }
        ];
        for (let i = 0 ; i < 10; i++) {
            const item = {
                label: 'Course' + i,
                icon: 'fa fa-fw fa-file-o',
                items: [{
                    label: 'Add'
                },
                { label: 'Edit' },
                { label: 'Search' }
                ]
            };
            this.items.push(item);
        }
    }

}
