import { paths } from "./paths";

// Define routes based on the 'paths' array
const routes = paths.map(({ path, name, component, children, meta }) => ({
  path,
  name,
  component,
  children,
  meta,
}));

export default routes;
