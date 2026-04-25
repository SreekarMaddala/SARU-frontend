# Add Backend URL http://127.0.0.1:8001

## Steps
- [x] Step 1: Update `frontend/src/shared/api.js` — change BASE_URL and export it
- [x] Step 2: Update `frontend/src/features/auth/api.js` — import BASE_URL and replace hardcoded fetch URLs
- [x] Step 3: Update `frontend/src/features/companies/api.js` — import BASE_URL and replace hardcoded baseURL
- [x] Step 4: Update `frontend/src/features/products/api.js` — import BASE_URL and replace hardcoded baseURL
- [x] Step 5: Update `frontend/src/features/customers/api.js` — import BASE_URL and replace hardcoded baseURL
- [x] Step 6: Update `frontend/src/features/analytics/api.js` — import BASE_URL and replace hardcoded baseURL

# Fix Product Deletion Flow

## Steps
- [x] Step 1: Update `frontend/src/features/products/api.js` — add explicit error handling, status codes, and Content-Type header to `deleteProduct`
- [x] Step 2: Update `frontend/src/features/products/pages/ProductsPage.jsx` — add auth pre-check, specific 401/404 handling, optimistic state update, and detailed error messages in `handleDelete`
- [x] Step 3: Remove visible ID column from products table in `ProductsPage.jsx`

