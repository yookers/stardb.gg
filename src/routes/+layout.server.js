export const load = async ({ locals, url }) => {
    return {
        user: locals.user,
        currentPath: url.pathname,
    };
};