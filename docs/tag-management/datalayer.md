# Accessing Data Layer Variables

## Introduction


## Usage
In custom JavaScript code the data layer can be accessed using `event.message` or using `%event.message%` in input fields, each will return the current data being pushed to the data layer.
You can also use `event.fullState` or `%event.fullState%` to access the full, flattened data layer.

Consider this example:
```js
// Event 1:
xpDataLayer.push({
  event: 'page_default',
  site: {
    currency: 'AUD'
  },
  page: {
    title: 'Page Title',
    url: 'https://example.com/page'
  }
})

// Event 2:
xpDataLayer.push({
  event: 'product_view',
  products: [{
    name: 'Vans Classic Slip-On',
    listed_price: 119.99
  }]
})
```

If we had a rule in Adobe Tag Manager that was triggered by `product_view` we could access the name of the product using `event.message.products[0].name` and if we also wanted to include the currency of the product we could use `event.fullState.site.currency`. This means instead of having to add the currency to each data layer event, we can set it once and it will be available for all events.
