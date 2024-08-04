import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";

import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";

import visitors from "../visitors";
import orders from "../orders";
import invoices from "../invoices";
import products from "../products";
import categories from "../categories";
import reviews from "../reviews";
import administrators from "../administrators";
import SubMenu from "./SubMenu";

type MenuName = "menuCatalog" | "menuSales" | "menuCustomers" | "menuAdmin";

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuCatalog: true,
    menuSales: true,
    menuCustomers: true,
    menuAdmin: true,
  });
  const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <DashboardMenuItem />
      <SubMenu
        handleToggle={() => handleToggle("menuSales")}
        isOpen={state.menuSales}
        name="Sales"
        icon={<orders.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/orders"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Orders`, {
            smart_count: 2,
          })}
          leftIcon={<orders.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/invoices"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Invoices`, {
            smart_count: 2,
          })}
          leftIcon={<invoices.icon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuCatalog")}
        isOpen={state.menuCatalog}
        // name="pos.menu.catalog"
        name="Products"
        icon={<products.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/products"
          state={{ _scrollToTop: true }}
          primaryText={"Product Detail"}
          leftIcon={<products.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/categories"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Categories`, {
            smart_count: 2,
          })}
          leftIcon={<categories.icon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuAdmin")}
        isOpen={state.menuAdmin}
        name="Administrators"
        icon={<visitors.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/administrators"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Admin Details`, {
            smart_count: 2,
          })}
          leftIcon={<administrators.icon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuCustomers")}
        isOpen={state.menuCustomers}
        name="Customers"
        icon={<visitors.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/customers"
          state={{ _scrollToTop: true }}
          primaryText={translate(`User Details`, {
            smart_count: 2,
          })}
          leftIcon={<visitors.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/segments"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Segments`, {
            smart_count: 2,
          })}
          leftIcon={<LabelIcon />}
          dense={dense}
        />
      </SubMenu>
      <MenuItemLink
        to="/reviews"
        state={{ _scrollToTop: true }}
        primaryText={translate(`Reviews`, {
          smart_count: 2,
        })}
        leftIcon={<reviews.icon />}
        dense={dense}
      />
    </Box>
  );
};

export default Menu;
