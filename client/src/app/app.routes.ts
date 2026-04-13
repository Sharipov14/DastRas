import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tabs/home',
        pathMatch: 'full'
    },
    {
        path: 'tabs',
        loadComponent: () => import('./shared/components/tabs/tabs.component').then(m => m.TabsComponent),
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home-page.component').then(m => m.HomePageComponent)
            },
            {
                path: 'categories',
                loadComponent: () => import('./pages/categories/categories-page.component').then(m => m.CategoriesPageComponent)
            },
            {
                path: 'category/:id',
                loadComponent: () => import('./pages/category-products/category-products-page.component').then(m => m.CategoryProductsPageComponent)
            },
            {
                path: 'orders',
                loadComponent: () => import('./pages/orders/orders-page.component').then(m => m.OrdersPageComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./pages/profile/profile-page.component').then(m => m.ProfilePageComponent)
            }
        ]
    },
];