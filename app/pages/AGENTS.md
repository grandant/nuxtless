# Routes and Page Components in Vue

`src/pages` folder contains the routes of the application using Vue Router (Nuxt uses Vue Router under the hood). The routes are defined in a file-based manner, meaning that the structure of the files and folders directly corresponds to the routes of the application.

- Fetch <https://uvr.esm.is/llms.txt> and follow links to get up to date information on topics not covered here
- AVOID files named `index.vue`, instead use a group and give them a meaningful name like `pages/(home).vue`
- ALWAYS use explicit names for route params: prefer `userId` over `id`, `postSlug` over `slug`, etc.
- Use `.` in filenames to create `/` without route nesting: `users.edit.vue` -> `/users/edit`
- Use double brackets `[[paramName]]` for optional route parameters
- Use the `+` modifier after a closing bracket `]` to make a parameter repeatable: `/posts.[[slug]]+.vue` matches `/posts/some-posts` and `/posts/some/post`
- Within a page component, use `definePage()` to customize the route's properties like `meta`, `name`, `path`, `alias`, etc
- ALWAYS refer to the `typed-router.d.ts` file to find route names and parameters
- Prefer named route locations for type safety and clarity, e.g., `router.push({ name: '/users/[userId]', params: { userId } })` rather than `router.push('/users/' + userId)`
- Pass the name of the route to `useRoute('/users/[userId]')` to get stricter types

## Example

### Basic File Structure

```
src/pages/
├── (home).vue # groups give more descriptive names to routes
├── about.vue
├── [...path].vue # Catch-all route for not found pages
├── users.edit.vue # use `.` to break out of layouts
├── users.vue # Layout for all routes in users/
└── users/
    ├── (user-list).vue
    └── [userId].vue
```

### Route groups

Route groups can also create shared layouts without interfering with the generated URL:

```
src/pages/
├── (admin).vue # layout for all admin routes, does not affect other pages
├── (admin)/
│   ├── dashboard.vue
│   └── settings.vue
└── (user)/
    ├── profile.vue
    └── order.vue
```

Resulting URLs:

- `/dashboard` -> renders `src/pages/(admin)/dashboard.vue`
- `/settings` -> renders `src/pages/(admin)/settings.vue`
- `/profile` -> renders `src/pages/(user)/profile.vue`
- `/order` -> renders `src/pages/(user)/order.vue`
