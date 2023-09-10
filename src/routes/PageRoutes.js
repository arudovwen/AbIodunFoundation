import { paths } from "./paths";

// Define routes based on the 'paths' array
const routes = paths.map(({ path, name, component, children }) => ({
  path,
  name,
  component,
  children,
}));

export default routes;
