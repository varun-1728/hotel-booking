import Footer from "../includes/Footer";
import Navbar from "../includes/NavBar";

export default function BoilerPlate({ children }) {
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}
