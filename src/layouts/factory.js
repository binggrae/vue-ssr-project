import AuthLayout from "@/layouts/Auth";
import DefaultLayout from "@/layouts/Default";

export const DEFAULT = 'default';
export const AUTH = 'auth';

export function getLayoutComponent(key) {
    switch (key) {
        case AUTH:
            return AuthLayout;
        default:
            return DefaultLayout;
    }

}
