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
      zodDefault: 'Require zod default values',
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
      // if (!node) {
      //   console.log('MISSING NODE', node);
      // }
      // console.log(node);

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
      // visitor functions for different types of nodes
      // ObjectExpression(node) {
      //   // Get the parent node
      //   if (node.parent.callee) {
      //     console.log('callee end', node.parent.callee.object);
      //   }
      // },
      // CallExpression(node) {
      //   console.log(node);
      // },
      ExpressionStatement(node) {
        // Check that callee is zod
        // if (node.expression.callee.object.name === 'z') {
        //   // context.
        //   // console.log('zod expression', node.expression.callee.object);
        // }
        const isZod = checkIfZod(node.expression.callee);
        console.log(isZod);
        if (isZod) {
          if (node.expression.callee.property.name !== 'default') {
            context.report({
              node,
              messageId: 'zodDefault',
            });
          }
          // console.log(node.expression.callee.property.name);
        }
        // console.log(node.expression.callee);
        // console.log(node.)
      },
      CallExpression(node) {
        // const isZod = checkIfZod(node.callee.object);
        // Loop through calle object until you get to type indentifier
        // if (isZod) {
        // console.log('is zod');
        // console.log(node.callee);
        // } else {
        // console.log('not zod');
        // }
      },
      Identifier(node) {
        // Check if node is from zod if it
        // z.object

        if (node.name === 'z') {
          // console.log('zod', node);
          // context.
          // context.report({
          //   node,
          //   messageId: 'zodDefault',
          // });
        }
      },
    };
  },
};
