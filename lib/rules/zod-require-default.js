/**
 * @fileoverview Require zod default values
 * @author Noah Baron
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    messages: {
      zodDefault: '.default property required for zod schemas',
    },
    docs: {
      description: 'Require zod default values',
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression(node) {
        const isZod = node.callee.object.name === 'z';

        if (isZod) {
          const includesDefaultAttribute =
            node.parent &&
            node.parent.property &&
            'name' in node.parent.property &&
            node.parent.property.name === 'default';

          if (!includesDefaultAttribute) {
            context.report({
              node,
              messageId: 'zodDefault',
            });
          }
        }
      },
    };
  },
};
