import AboutUs from "../Components/AboutUs";
import Commitee from "../Components/Commitee";
import Community from "../Components/Community";
import Events from "../Components/Events";
import Home from "../Components/Home";
import Achievements from "../Components/Achievements";
import ChatRoom from "../Components/chatRoom";

export const routes = [
  {
    path: "/",
    Element: Home,
  },
  {
    path: "/aboutus",
    Element: AboutUs,
  },
  {
    path: "/events",
    Element: Events,
  },
  {
    path: "/community",
    Element: Community,
  },
  {
    path: "/community/:club",
    Element: ChatRoom,
  },
  {
    path: "/committee",
    Element: Commitee,
  },
  {
    path: "/achievements",
    Element: Achievements,
  },
];
