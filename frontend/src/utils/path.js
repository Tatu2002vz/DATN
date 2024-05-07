const path = {
    HOME: '/',
    COMIC: '/comic/:slug/:id',
    ALL_COMIC: '/comic',
    CHAPTER: '/comic/chapter/:slug/:id',
    RESET_PASSWORD: '/user/reset-password/:tokenPassword',
    ADMIN: '/admin',
    DASHBOARD: '/admin/dashboard',
    MANAGER_USER: '/admin/manage-user',
    MANAGER_COMIC: '/admin/manage-comic',
    MANAGER_CHAPTER: '/admin/manage-chapter',
    UPDATE_USER: '/admin/manage-user/:id',
    UPDATE_COMIC: '/admin/manage-comic/:id',
    UPDATE_CHAPTER: '/admin/manage-chapter/:slug/:id',
    PROFILE: '/profile'
}
export default path