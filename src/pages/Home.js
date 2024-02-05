/**
 *
 * This code defines the Home component, which represents the homepage of the application. It imports various components such as BottomMenu, MyBody, MyHeader, and data from their respective files. The Home component renders a header with search functionality, a body with the text "Hello", and a bottom menu with icons. The data for the header navigation links and bottom menu icons are passed as props to the corresponding components.
 */

import BottomMenu from "../components/BottomMenu";
import MyBody from "../components/MyBody";
import MyHeader from "../components/MyHeader";
import data from "../components/data";
//Homepage, maybe will use it as a login or feed router
function Home() {
  return (
    <>
      <MyHeader isSearchBarEnabled={true} navLinks={data.HeaderNav} />
      <MyBody>Hello</MyBody>
      <BottomMenu
        children={data.BottomMenuIcons.entities}
        childClasses={data.BottomMenuIcons.className}
      />
    </>
  );
}

export default Home;
