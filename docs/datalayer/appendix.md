# Appendix

This is the best place to start if you don't understand what something means. Often times we can be cursed with knowledge and believe that everyone knows what we do. This documentation has been written in a way to try and alleviate the risk of that happening, at times it may sound obvious what is being discussed. If that's the case, good on you, you don't need to read that part clearly, for everyone else however, this should clear up any definitions or terminology that may sound confusing.

## Terminology Dictionary

**Event**: An Event is something that happens on a web page after some kind of interaction is made with it, for example when you click on a button, complete a form or navigate to a different web page.

**DataLayer**:The DataLayer is, in essence, the glue between our websites and the various marketing tools and technologies we use. It contains the information and data that these resources require to accurately monitor how our users are interacting with the website.

## Data Layer Event Name Reference

Below is an extensive list referencing each of the data layer events and a description on when we expect them to be triggered.

| **Event Name** | **Description** |
| --- | --- |
| account_create-complete | Whenever a user finishes the account signup process |
| account_create-start | When a user is presented an account creation form, either from pressing a button saying "create account" or navigating to a sign-up landing page |
| account_login-start | When a user is presented with a login screen whether this is a modal window, landing page or pop-up |
| account_login-complete | After the user has successfully logged into their account |
| account_logout | After the user has logged-out of their account |
| blog_post | When viewing a single blog post, article or other news page |
| blog_home | When viewing a collection of blog posts, articles or new pages |
| cart_add | After an item has been added to a users cart |
| cart_remove | After a user has removed an item(s) from their cart |
| cart_update | When a user changes the quantity, size or other attributes of items in their cart (Note: if they "update" an item qty by reducing to 0 this counts as removing not updating) |
| cart_view-full |     |
| cart_view-mini |     |
| checkout_start |     |
| checkout_step2 |     |
| checkout_step3 |     |
| home_view |     |
| member_view |     |
| order_success |     |
| page_default |     |
| product_listing-filters |     |
| product_listing-sort |     |
| product_listing-view |     |
| product_size-select |     |
| product_view |     |
| site_errors |     |
| site_search-results |     |
| store-locator_details |     |
| store-locator_view |     |
| add_to-wishlist |     |
| wishlist_home |     |

## Types
```ts
interface BaseProduct {
    available_size: string[];
    barcode: string;
    brand: string;              // Required
    category: string;           // Required (may be empty depending on user journey)
    child_sku: string;          // Required
    color: string;              // Required
    discount: number;           // Required
    feature: string[];
    full_price: number;         // Required
    gender: string;             // Required
    is_markdown: boolean;       // Required
    listed_price: number;       // Required
    model: string;              // Required - TAF only
    name: string;               // Required
    parent_category: string;    // Required
    parent_sku: string;         // Required
    rating: number;
    reward_points: number;
    sku_available: boolean;
    speciality: string;         // Required - TAF only
    sport: string;              // Required - TAF only
    story: string;              // Required - TAF only
}
    
interface PLP_Product extends BaseProduct {
    position: number;
}
    
interface Cart_Product extends BaseProduct {
    qty: number;
    size: string;
    sku_by_size: string;
}
```   

### Data Type Definitions