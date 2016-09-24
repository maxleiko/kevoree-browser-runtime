import { ROUTE } from '.';

export function changeRoute(route) {
  return {
    type: ROUTE,
    route,
  };
}
