import MyFooter from "../components/MyFooter";
import MyHeader from "../components/MyHeader";

//Homepage, maybe will use it as a login or feed router
function Home() {
  return (
    <>
      <MyHeader
        isSearchBarEnabled={true}
        navLinks={[
          { sno: 1, title: "Home", href: "/", onClick: "" },
          { sno: 2, title: "Trending", href: "/", onClick: "" },
          { sno: 3, title: "About", href: "/About", onClick: "" },
        ]}
      />
      <MyFooter />
    </>
  );
}

export default Home;
