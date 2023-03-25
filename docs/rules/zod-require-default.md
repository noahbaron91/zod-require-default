# Require zod default values (`zod-require-default/zod-require-default`)

<!-- end auto-generated rule header -->

Please describe the origin of the rule here.

## Rule Details

This rule aims to require the default property for zod interfaces

Examples of **incorrect** code for this rule:

```js

z.object({...})
z.boolean()
z.string()
z.number()

```

Examples of **correct** code for this rule:

```js

z.object({}).default({...})
z.boolean().default(...)
z.string().default(...)
z.number().default(...)

```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
