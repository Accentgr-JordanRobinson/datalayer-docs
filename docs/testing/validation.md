# Data Layer Validation Library

A lightweight, schema-based validation library designed for Adobe Tag Manager data layer validation. Built for ecommerce analytics teams who need reliable, real-time validation of data layer events.

## Quick Start

```javascript
// Define a schema
const productSchema = val.object({
    name: val.string(),
    price: val.number(),
    category: val.from(['electronics', 'clothing', 'books']),
    inStock: val.boolean(),
    tags: val.array(val.string()).optional()
});

// Validate data
const result = productSchema.validate({
    name: "iPhone 15",
    price: 999,
    category: "electronics",
    inStock: true
});

console.log(result.success); // true
```

## Core Concepts

### Validators
Validators are functions that check data against specific rules. They return validation results with detailed error information.

### Schemas
Schemas define the expected structure of your data using a combination of validators. They can be nested and composed for complex data structures.

### Results
All validation operations return a standardized result object containing success status, error details, and helpful messages.

## API Reference

### Basic Validators

#### `val.string(expectedValue?)`
Validates that a value is a string.

```javascript
val.string()                    // Any string
val.string('specific_value')    // Exact string match

// Usage examples
const nameValidator = val.string();
const eventValidator = val.string('page_view');
```

#### `val.number()`
Validates that a value is a number (excluding NaN).

```javascript
const priceValidator = val.number();
const result = priceValidator.validate(29.99); // ✅ success: true
```

#### `val.boolean()`
Validates that a value is a boolean (true or false).

```javascript
const inStockValidator = val.boolean();
const result = inStockValidator.validate(true); // ✅ success: true
```

#### `val.from(allowedValues)`
Validates that a value matches one of the provided options.

```javascript
const statusValidator = val.from(['active', 'inactive', 'pending']);
const categoryValidator = val.from(['electronics', 'clothing', 'books']);

// Usage in schema
user_state: val.from(['guest', 'customer'])
```

### Complex Validators

#### `val.array(itemValidator)`
Validates arrays and their contents.

```javascript
// Array of strings
const tagsValidator = val.array(val.string());

// Array of specific values
const sizesValidator = val.array(val.from(['S', 'M', 'L', 'XL']));

// Usage examples
available_size: val.array(val.string()),
categories: val.array(val.from(['tech', 'fashion', 'home']))
```

#### `val.object(schema)`
Validates object structure and nested properties.

```javascript
const userSchema = val.object({
    id: val.string(),
    email: val.string(),
    age: val.number(),
    preferences: val.object({
        newsletter: val.boolean(),
        theme: val.from(['light', 'dark'])
    })
});

// Complex nested example
const pageSchema = val.object({
    page: val.object({
        type: val.string('wishlist'),
        action: val.string('add')
    })
});
```

### Optional Fields

#### `.optional()`
Makes any validator optional, allowing null, undefined, or empty string values.

```javascript
// Optional string field
bio: val.string().optional(),

// Optional nested object
metadata: val.object({
    tracking_id: val.string()
}).optional(),

// Optional array
tags: val.array(val.string()).optional()
```

### Advanced Patterns

#### `val.oneOf(fieldValidators)`
Ensures at least one of the specified fields is present and valid. Perfect for scenarios where multiple field options exist but only one is required.

```javascript
const cartSchema = val.object({
    ...val.oneOf({
        cartId: val.string(),
        quoteId: val.string()
    }),
    cart_total: val.number(),
    cart_quantity: val.number()
});

// This validates successfully if either cartId OR quoteId is present
// Both fields become optional, but at least one must exist
```

## Validation Results

Every validation returns a standardized result object:

```javascript
// Success result
{
    success: true,
    errors: [],
    message: "✅ fieldName validation passed"
}

// Failure result
{
    success: false,
    errors: [
        "fieldName: Expected string, got number",
        "fieldName.nested: Value does not exist"
    ],
    message: "❌ fieldName validation failed: 2 error(s) found"
}
```

## Error Tracking

### Global Error Log
Access all validation errors from the current session:

```javascript
// Get all errors
const allErrors = val.errors();

// Clear error history
val.clearErrors();
```

### Latest Result
Access the most recent validation result for automation:

```javascript
const schema = val.object({ name: val.string() });
schema.validate({ name: 123 });

// Access latest result
console.log(val.latest.success);  // false
console.log(val.latest.errors);   // ["name: Expected string, got number"]
```

## Real-World Examples

### Ecommerce Product Validation

```javascript
const productSchema = val.object({
    product: val.object({
        id: val.string(),
        name: val.string(),
        price: val.number(),
        currency: val.from(['USD', 'EUR', 'GBP']),
        category: val.string(),
        brand: val.string(),
        availability: val.from(['in_stock', 'out_of_stock', 'preorder']),
        tags: val.array(val.string()).optional(),
        variants: val.array(val.object({
            size: val.string(),
            color: val.string(),
            sku: val.string()
        })).optional()
    })
});
```

### User Authentication Event

```javascript
const loginSchema = val.object({
    event: val.string('user_login'),
    user: val.object({
        id: val.string(),
        email: val.string(),
        type: val.from(['guest', 'registered', 'premium']),
        first_login: val.boolean().optional()
    }),
    timestamp: val.number(),
    session_id: val.string()
});
```

### Cart Operations

```javascript
const cartSchema = val.object({
    event: val.string(),
    cart: val.object({
        ...val.oneOf({
            cart_id: val.string(),
            session_id: val.string()
        }),
        total_value: val.number(),
        currency: val.from(['USD', 'EUR', 'GBP']),
        item_count: val.number(),
        items: val.array(val.object({
            product_id: val.string(),
            quantity: val.number(),
            price: val.number(),
            name: val.string()
        }))
    })
});
```

### Page Tracking

```javascript
const pageSchema = val.object({
    page: val.object({
        type: val.from(['home', 'product', 'category', 'cart', 'checkout']),
        title: val.string(),
        url: val.string(),
        category: val.string().optional(),
        subcategory: val.string().optional()
    }),
    user: val.object({
        state: val.from(['guest', 'authenticated']),
        id: val.string().optional()
    })
});
```

## Adobe Tag Manager Integration

### Setting Up Validation Rules

1. **Create Custom Code Action**:
   ```javascript
   // Load the val.js library (paste the entire library code)
   
   // Define your schema
   const purchaseSchema = val.object({
       event: val.string('purchase'),
       transaction: val.object({
           id: val.string(),
           total: val.number(),
           currency: val.string()
       })
   });
   
   // Validate current data layer event
   const result = purchaseSchema.validate({{Event}}, 'purchase_event');
   
   if (!result.success) {
       console.error('Data Layer Validation Failed:', result.errors);
   }
   ```

2. **Event-Driven Validation**:
   ```javascript
   // Monitor specific events
   if ({{Event}} === 'purchase') {
       const validation = purchaseSchema.validate({{Event}}, 'purchase');
       
       // Stop rule execution if validation fails
       if (!validation.success) {
           return false; // Prevents subsequent actions
       }
   }
   ```

### Debugging with Console Output

```javascript
// Enable detailed logging
const result = schema.validate(data, 'my_event');

console.group('Data Layer Validation');
console.log('Success:', result.success);
console.log('Errors:', result.errors);
console.log('Latest Result:', val.latest);
console.log('All Session Errors:', val.errors());
console.groupEnd();
```

## Testing and Automation

### Manual Testing
```javascript
// In browser console
const testData = { name: "Test Product", price: "invalid" };
const result = productSchema.validate(testData);
console.log(result); // See detailed validation results
```

### Automated Testing (Selenium, Cypress)
```javascript
// Execute validation and get results programmatically
const validationResult = browser.executeScript(`
    const schema = val.object({ name: val.string() });
    const result = schema.validate(arguments[0]);
    return val.latest;
`, testData);

assert.equal(validationResult.success, true);
```

## Best Practices

### Schema Organization
```javascript
// Create reusable sub-schemas
const addressSchema = val.object({
    street: val.string(),
    city: val.string(),
    country: val.from(['US', 'CA', 'UK', 'DE'])
});

const userSchema = val.object({
    name: val.string(),
    email: val.string(),
    shipping_address: addressSchema,
    billing_address: addressSchema.optional()
});
```

### Error Handling
```javascript
// Always check validation results
const result = schema.validate(data);
if (!result.success) {
    // Log for debugging
    console.error('Validation failed:', result.errors);
    
    // Optionally stop execution
    return false;
}
```

### Performance Considerations
```javascript
// Cache schemas for repeated use
const productSchemaCache = val.object({
    // ... schema definition
});

// Reuse rather than recreating
const result = productSchemaCache.validate(productData);
```

## Troubleshooting

### Common Issues

**Validation always fails for existing data**
- Check for typos in field names
- Verify data types match validator expectations
- Use browser console to inspect actual data structure

**Optional fields causing errors**
- Ensure `.optional()` is called on the validator
- Remember that empty strings `""` are considered valid for optional fields

**oneOf constraints not working**
- Verify at least one of the specified fields contains a non-empty value
- Check that field names match exactly

### Debugging Tips

```javascript
// Inspect data structure before validation
console.log('Data to validate:', JSON.stringify(data, null, 2));

// Check individual field validation
const nameResult = val.string().validate(data.name, 'name');
console.log('Name validation:', nameResult);

// Review error history
console.log('All errors this session:', val.errors());
```

## Browser Compatibility

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **ES5 Compatible**: Uses vanilla JavaScript without modern syntax
- **Adobe Tag Manager**: Fully compatible with ATM environments
- **No Dependencies**: Works without external libraries or polyfills