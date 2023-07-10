const mapping: Record<string, string> = {
  'advertisement-scripts': 'advertisement_script',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
