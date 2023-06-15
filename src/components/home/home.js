import AdminHome from "../Admin/AdminHome/adminHome";
import AreYou from "../AreYou/areYou";
import Footer from "../Footer/Footer";
import Carousel from "../carousel/Carousel";
import Navbar from "../navbar/Navbar";

function
    Home() {
    return <>
        <Navbar />

        <Carousel />
        <AreYou />
        <Footer />
    </>
}

export default Home;