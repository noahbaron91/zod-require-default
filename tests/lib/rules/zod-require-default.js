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
    // give me some code that won't trigger a warning
    {
      code: 'z.object({}).default({})',
    },
  ],

  invalid: [
    {
      code: 'z.object({})',
      errors: [
        { message: 'Require zod default values', type: 'ExpressionStatement' },
      ],
    },
  ],
});
