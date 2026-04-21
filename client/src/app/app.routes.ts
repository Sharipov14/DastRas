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
                path: 'orders',
                loadComponent: () => import('./pages/orders/orders-page.component').then(m => m.OrdersPageComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./pages/profile/profile-page.component').then(m => m.ProfilePageComponent)
            }
        ]
    },
    {
        path: 'product/:id',
        loadComponent: () => import('./pages/product-details/product-details-page.component').then(m => m.ProductDetailsPageComponent)
    },
    {
        path: 'search',
        loadComponent: () => import('./pages/search/search-page.component').then(m => m.SearchPageComponent)
    },
    {
        path: 'category/:id',
        loadComponent: () => import('./pages/category-products/category-products-page.component').then(m => m.CategoryProductsPageComponent)
    }
];