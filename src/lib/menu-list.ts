import {
  Tag,
  Home,
  Bookmark,
  SquarePen,
  ShoppingBag,
  LucideIcon
} from "lucide-react";

// type Submenu = {
//   href: string;
//   label: string;
//   active: boolean;
// };

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  // submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "General",
      menus: [
        {
          href: "/",
          label: "Home",
          active: pathname === '/' || pathname === '',
          icon: Home,
          // submenus: []
        },
        {
          href: "/loja",
          label: "Loja",
          active: pathname.includes("/loja"),
          icon: ShoppingBag,
          // submenus: []
        }
      ]
    },
    {
      groupLabel: '',
      menus: [
        {
          href: "",
          label: "Posts",
          active: pathname.includes("/posts"),
          icon: SquarePen,
          // submenus: [
          //   {
          //     href: "/posts",
          //     label: "All Posts",
          //     active: pathname === "/posts"
          //   },
          //   {
          //     href: "/posts/new",
          //     label: "New Post",
          //     active: pathname === "/posts/new"
          //   }
          // ]
        },
        {
          href: "/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          // submenus: []
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
          // submenus: []
        }
      ]
    },
  ];
}