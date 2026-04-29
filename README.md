# Infix to Postfix Converter

A modern, interactive web application that converts mathematical infix expressions to postfix (Reverse Polish) notation. This tool not only provides the result but also visualizes each step of the conversion process, making it an excellent educational resource for understanding stack-based expression parsing.

## 🚀 Features

- **Real-time Conversion:** Convert infix expressions to postfix instantly.
- **Step-by-Step Visualization:** Detailed breakdown of each step, showing the scanned character, current stack state, and evolving postfix expression.
- **Support for Multiple Operators:** Handles addition (+), subtraction (-), multiplication (*), division (/), modulus (%), and exponentiation (^).
- **Parentheses Support:** Correctly processes expressions with nested parentheses.
- **Validation:** Built-in error checking for invalid expressions or mismatched parentheses.
- **Quick Examples:** Pre-loaded examples to help you understand common conversion scenarios.
- **Responsive Design:** Built with React and Tailwind CSS for a seamless experience on all devices.

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aftabali28/infix-to-postfix.git
   ```

2. Navigate to the project directory:
   ```bash
   cd infix-to-postfix
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## 📖 How it Works

The converter uses the standard Shunting-yard algorithm to transform infix expressions into postfix. It utilizes a stack to manage operators and ensures that operator precedence and associativity are correctly maintained throughout the process.

## 📄 License

This project is licensed under the MIT License.
