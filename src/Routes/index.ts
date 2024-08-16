import AboutUs from "../Components/AboutUs";
import Commitee from "../Components/Commitee";
import Community from "../Components/Community";
import Events from "../Components/Events";
import Home from "../Components/Home";
import Achievements from "../Components/Achievements";
import ChatRoom from "../Components/chatRoom";
import TechNews from "../Components/technews";

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
    path: "/technews",
    Element: TechNews,
  },
  {
    path: "/events",
    Element: Events,
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
