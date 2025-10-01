import { ConversionResult, ConversionStep } from '../types/conversion';

const precedence: Record<string, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2,
  '^': 3,
};

const isOperator = (char: string): boolean => {
  return ['+', '-', '*', '/', '%', '^'].includes(char);
};

const isOperand = (char: string): boolean => {
  return /[a-zA-Z0-9]/.test(char);
};

export const infixToPostfix = (infix: string): ConversionResult => {
  const steps: ConversionStep[] = [];
  const stack: string[] = [];
  let postfix = '';

  const cleanedInfix = infix.replace(/\s+/g, '');

  for (let i = 0; i < cleanedInfix.length; i++) {
    const char = cleanedInfix[i];

    if (isOperand(char)) {
      postfix += char;
      steps.push({
        scannedChar: char,
        stack: [...stack],
        postfix: postfix,
        action: `Operand '${char}' added to postfix`,
      });
    } else if (char === '(') {
      stack.push(char);
      steps.push({
        scannedChar: char,
        stack: [...stack],
        postfix: postfix,
        action: `Push '(' to stack`,
      });
    } else if (char === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        const op = stack.pop()!;
        postfix += op;
        steps.push({
          scannedChar: char,
          stack: [...stack],
          postfix: postfix,
          action: `Pop '${op}' from stack and add to postfix`,
        });
      }
      if (stack.length > 0) {
        stack.pop();
        steps.push({
          scannedChar: char,
          stack: [...stack],
          postfix: postfix,
          action: `Pop '(' from stack (matched with ')')`,
        });
      }
    } else if (isOperator(char)) {
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== '(' &&
        precedence[stack[stack.length - 1]] >= precedence[char]
      ) {
        const op = stack.pop()!;
        postfix += op;
        steps.push({
          scannedChar: char,
          stack: [...stack],
          postfix: postfix,
          action: `Pop '${op}' (higher/equal precedence) and add to postfix`,
        });
      }
      stack.push(char);
      steps.push({
        scannedChar: char,
        stack: [...stack],
        postfix: postfix,
        action: `Push '${char}' to stack`,
      });
    }
  }

  while (stack.length > 0) {
    const op = stack.pop()!;
    postfix += op;
    steps.push({
      scannedChar: 'END',
      stack: [...stack],
      postfix: postfix,
      action: `Pop '${op}' from stack and add to postfix`,
    });
  }

  return { postfix, steps };
};

export const validateInfixExpression = (infix: string): string | null => {
  if (!infix.trim()) {
    return 'Please enter an expression';
  }

  const cleanedInfix = infix.replace(/\s+/g, '');
  let openParenCount = 0;

  for (let i = 0; i < cleanedInfix.length; i++) {
    const char = cleanedInfix[i];

    if (char === '(') {
      openParenCount++;
    } else if (char === ')') {
      openParenCount--;
      if (openParenCount < 0) {
        return 'Unmatched closing parenthesis';
      }
    } else if (!isOperand(char) && !isOperator(char)) {
      return `Invalid character: '${char}'`;
    }
  }

  if (openParenCount !== 0) {
    return 'Unmatched opening parenthesis';
  }

  return null;
};
