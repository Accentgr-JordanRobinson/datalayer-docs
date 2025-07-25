# xpDataLayer Framework

## What is the xpDataLayer?

The xpDataLayer is our unified data collection framework that serves as the central communication hub between our websites/apps and various analytics tools. Think of it as a digital journal that records every user interaction across all Accent Group digital properties.

### Core Components

The xpDataLayer consists of two fundamental parts:

1. **Event Objects** - Structured data containers (modules) that capture specific user interactions and contextual information
2. **Event Array** - A chronological log that stores all event objects, creating a complete interaction history for each user session

## Why is the xpDataLayer Important?

Understanding user behavior is critical to our business success. The xpDataLayer:

* Provides reliable, consistent data across all digital properties
* Enables personalised user experiences based on behaviour patterns
* Informs strategic business decisions with actionable insights
* Supports marketing attribution and campaign effectiveness measurement
* Creates a single source of truth for all behavioural and transactional data

## How the xpDataLayer Works

### Event Architecture

Each user interaction triggers an event, which is structured using standardised modules:
```js
    // Example of a page view event in the xpDataLayer
    window.xpDataLayer.push({
      event: "page_default",
      default: {
        page: {
            type: "home",
            action: "view",
        },
        user: {
            login_status: "logged_out",
            user_state: "guest",
            uem_hashed: "f3214bc75223312acfc1a9fa"
        },
      }
    
    });
```

### Understanding Modules

Modules are logical groupings of related data points. Each module focuses on a specific aspect of the user experience:

#### Example Scenario

> A user searches for "Vans sneakers" on Google, clicks on our search result, and lands on the Vans homepage.

This single interaction captures data across multiple modules:

* **Page Module**: URL, page title, site name, currency, language
* **User Module**: Login status, user type, customer ID (if known)
* **Device Module**: Device type, screen size, operating system
* **Marketing Module**: Traffic source, campaign parameters, referral information

## Implementation Approach

The xpDataLayer follows a modular implementation strategy:

1. **Modular Structure**: Divides data requirements into logical components
2. **Phased Delivery**: Implements modules based on business priority
3. **Decoupled Architecture**: Allows independent development and deployment
4. **Standardised Format**: Ensures consistency across all digital properties

## Benefits of the Modular Approach

* **Flexibility**: Add or modify modules without disrupting the entire framework
* **Scalability**: Easily extend to accommodate new data requirements
* **Maintainability**: Simplifies troubleshooting and updates
* **Priority-Based Implementation**: Focus on high-value data collection first

* * *

*This documentation provides an overview of the xpDataLayer framework. For specific implementation details, please refer to the individual module documentation sections.*