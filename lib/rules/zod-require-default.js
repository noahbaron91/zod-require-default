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
    const checkIfZod = (node) => {
      if (!node || !('type' in node)) return false;

      if (node.type === 'MemberExpression') {
        return checkIfZod(node.object);
      } else if (node.type === 'CallExpression') {
        return checkIfZod(node.callee);
      }

      if (node.type === 'Identifier' && node.name === 'z') {
        return true;
      }

      return false;
    };

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ExpressionStatement(node) {
        const isZod = checkIfZod(node.expression.callee);

        if (isZod) {
          if (node.expression.callee.property.name !== 'default') {
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
