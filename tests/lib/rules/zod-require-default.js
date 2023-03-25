/**
 * @fileoverview Require zod default values
 * @author Noah Baron
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/zod-require-default'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('zod-require-default', rule, {
  valid: [
    {
      code: 'z.object({}).default({})',
    },
    {
      code: 'z.string().default("example text")',
    },
    {
      code: 'z.number().default(1)',
    },
  ],

  invalid: [
    {
      code: 'z.object({})',
      errors: [
        {
          message: '.default property required for zod schemas',
          type: 'ExpressionStatement',
        },
      ],
    },
    {
      code: 'z.string()',
      errors: [
        {
          message: '.default property required for zod schemas',
          type: 'ExpressionStatement',
        },
      ],
    },
    {
      code: 'z.number()',
      errors: [
        {
          message: '.default property required for zod schemas',
          type: 'ExpressionStatement',
        },
      ],
    },
  ],
});
