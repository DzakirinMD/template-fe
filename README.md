# template-fe
Template for FE

Pages & Routing: In Next.js, pages are associated with routes based on their file names in the pages directory. For example, you might create a new file pages/employees.js to list employees.

Fetching Data: To connect with your Spring Boot backend, you can use fetch API or libraries like Axios to make HTTP requests. For example, you can fetch the list of employees from your backend and display them.

Components: Create reusable React components for your application. You might have components for employee lists, forms to add or edit employees, etc.

Styling: Next.js supports CSS Modules out of the box, or you can use styled-components, Tailwind CSS, or other styling solutions.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.