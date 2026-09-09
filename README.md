# Drink It — V9 Complete Project

Single project containing the customer website, admin panel, backend API, and JSON data store.

## Folder structure

```text
drink-it/
├── backend/
│   └── server.js
├── data/
│   ├── products.json
│   └── orders.json
├── public/
│   ├── index.html      # Customer website
│   └── admin.html      # Admin panel
├── package.json
├── .gitignore
└── README.md
```

## Run locally

1. Install Node.js 18+.
2. Open a terminal in this folder.
3. Run `npm start`.
4. Open `http://localhost:3000/` for the customer website.
5. Open `http://localhost:3000/admin` for the admin panel.

The customer website and admin panel use the same backend API and the same JSON data files, so products and orders are shared while the server is running.

## Important

This is a development/demo backend. Before public launch, replace the JSON store with a proper database, add authentication/authorization, validation, rate limiting, HTTPS, secure secrets, backups, and production hosting.
