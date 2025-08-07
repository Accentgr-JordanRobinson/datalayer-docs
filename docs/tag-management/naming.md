# Rule & Data Naming Conventions

Consistency isn't just about making things look pretty—it's about creating a system that actually works when you're knee-deep in debugging at 11 PM. These naming conventions will save you from the classic "what the hell does this rule do?" moment we've all experienced.

## Core Principles

Think of these as the commandments of tagging sanity:

- **Consistency**: Because "rule_1", "rule_2", and "my_cool_rule" isn't a filing system—it's chaos
- **Clarity**: Your rule names should tell a story, not require a PhD in archaeology to decipher
- **Discoverability**: If you can't find it, it might as well not exist
- **Maintainability**: Future you will either thank present you or plot your demise—choose wisely

## Naming Conventions by Element Type

### Rules (Rust-like Module Pattern)

We're borrowing from the Rust playbook here because, frankly, they got it right. Think of it as `who::what::when` for tracking events.

**Format**: `vendor::category::event_type`

This hierarchical structure means you'll never again wonder which platform a rule belongs to or what it's supposed to track.

**Examples**:
- `google_ads::capi::purchase_tracking`
- `meta_tiktok::capi::all_events`
- `snapchat::capi::all_events`

---

### Conditions (Descriptive Boolean Pattern)

Conditions should read like questions you'd ask yourself: "Is this a purchase?" becomes `is_purchase_complete`.

**Format**: `is_condition_description`

The `is_` prefix immediately tells you this returns true or false. No guessing games.

**Examples**:
- `is_purchase_complete`
- `is_meta_tracked_event`
- `is_snapchat_tracked_event`

---

### Actions (Verb-Based Pattern)

Actions do things, so they should start with verbs. Revolutionary concept, I know.

**Format**: `verb_target_purpose`

You'll find that this almost always results in the name starting and ending with a verb and being no more than 4 words, for example;

**Examples**:
- `send_ga4_cart_add`
- `send_meta_user_login`
- `hash_client_ip`

---

### Data Elements

Data elements are the workhorses of your implementation, so we've broken them down into three distinct categories:

#### Static Data Elements (snake_case)

For those reliable, unchanging pieces of data that just sit there and do their job.

**Format**: `descriptive_element_name`

**DataLayer Elements**: Prefix with `dl_` because knowing where your data comes from isn't optional—it's survival.

**Examples**:
- `dl_user_email_hashed`
- `dl_order_id`
- `event_url`

#### Constants (SCREAMING_SNAKE_CASE)

These are your API tokens, IDs, and other values that never change. We SCREAM them because they're important and immutable.

**Format**: `CONSTANT_NAME`

**Examples**:
- `TIKTOK_API_TOKEN`
- `SNAPCHAT_API_TOKEN`

#### Function Data Elements (Object.method Pattern)

When your data elements need to actually *do* something beyond just sitting there looking pretty.

**Format**: `Object.method_name`

**Examples**:
- `Meta.get_event_name`
- `Sys.get_unix_timestamp`
- `Meta.create_payload`

:::info
`Sys` refers to system methods or shared functionality that multiple platforms can use. Think of it as your utility belt.
:::

---

## Quick Reference Table

Because sometimes you just need the facts, ma'am:

| Element Type | Format | Example |
|--------------|--------|---------|
| Rules | `vendor::category::event_type` | `google_ads::capi::purchase_tracking` |
| Conditions | `is_condition_description` | `is_purchase_complete` |
| Actions | `verb_target_purpose` | `send_conversion_to_google_ads` |
| Static Data | `descriptive_element_name` | `event_url` |
| DataLayer Data | `dl_element_name` | `dl_order_id` |
| Constants | `CONSTANT_NAME` | `TIKTOK_API_TOKEN` |
| Functions | `Object.method_name` | `Meta.create_payload` |

## Implementation Guidelines

### Creating New Elements

Follow this checklist, and you'll never create a naming disaster:

1. **Identify the element type** (rule, condition, action, or data element)
2. **Apply the appropriate pattern** for that type
3. **Make it descriptive** - if someone else can't understand it, you've failed
4. **Be consistent** with existing naming in your workspace
5. **When in doubt, ask** - it's better to clarify than to guess wrong

### Platform Namespaces

Know your platforms and use their designated prefixes:

- **Meta**: Facebook/Instagram related functions
- **Tiktok**: TikTok related functions  
- **Snapchat**: Snapchat related functions
- **Google**: Google related functions
- **Sys**: Shared system methods (the Swiss Army knife of namespaces)

## Best Practices

- **Stick to the patterns** - creativity is for campaign copy, not naming conventions
- **Prioritize clarity over cleverness** - future you will thank present you
- **Keep it concise but complete** - `send_meta_event` is better than `send_conversion_data_to_meta_conversions_api_endpoint`
- **Use consistent terminology** - if you call it a "purchase" in one place, don't call it a "transaction" somewhere else

## Maintenance and Reality Check

These conventions are now the law of the land. Changes require team approval because chaos is contagious, and we're not running a naming anarchy here.

Got questions? Hit up the Martech team. We're here to help, not judge your past naming crimes.

*Remember: Good naming conventions are like good documentation—they seem tedious until you desperately need them.*