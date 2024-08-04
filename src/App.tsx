import polyglotI18nProvider from "ra-i18n-polyglot";
import {
  Admin,
  CustomRoutes,
  Resource,
  localStorageStore,
  useStore,
  StoreContextProvider,
} from "react-admin";
import { Route } from "react-router";

import authProvider from "./authProvider";
import categories from "./categories";
import { Dashboard } from "./dashboard";
// import dataProviderFactory from './dataProvider';
import englishMessages from "./i18n/en";
import invoices from "./invoices";
import { Layout, Login } from "./layout";
import orders from "./orders";
import products from "./products";
import reviews from "./reviews";
import Segments from "./segments/Segments";
import visitors from "./visitors";
import administrators from "./administrators";
import { themes, ThemeName } from "./themes/themes";
import restDataProvider from "./dataProvider/dataProvider";

const store = localStorageStore(undefined, "F3-ECommerce");

const App = () => {
  const [themeName] = useStore<ThemeName>("themeName", "soft");
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;
  return (
    <Admin
      title="Fresh From Farm | Admin"
      dataProvider={restDataProvider}
      store={store}
      authProvider={authProvider}
      dashboard={Dashboard}
      loginPage={Login}
      layout={Layout}
      disableTelemetry
      lightTheme={lightTheme}
      darkTheme={darkTheme}
      defaultTheme="light"
    >
      <CustomRoutes>
        <Route path="/segments" element={<Segments />} />
      </CustomRoutes>
      <Resource name="customers" {...visitors} />
      <Resource name="administrators" {...administrators} />
      <Resource name="orders" {...orders} />
      <Resource name="invoices" {...invoices} />
      <Resource name="products" {...products} />
      <Resource name="categories" {...categories} />
      <Resource name="reviews" {...reviews} />
    </Admin>
  );
};

const AppWrapper = () => (
  <StoreContextProvider value={store}>
    <App />
  </StoreContextProvider>
);

export default AppWrapper;
