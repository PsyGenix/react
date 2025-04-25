export default function Navbar({ setView, currentView }) {
  return (
    <header>
      <img src="/assets/logo.jpg" alt="Logo" width="200px"/>
      <nav>
        <ul>
          <li
            className={currentView === "home" ? "active" : ""}
            onClick={() => setView("home")}
          >
            Home
          </li>
          <li
            className={currentView === "gallery" ? "active" : ""}
            onClick={() => setView("gallery")}
          >
            Gallery
          </li>
          <li
            className={currentView === "booking" ? "active" : ""}
            onClick={() => setView("booking")}
          >
            Booking
          </li>
      

        </ul>
      </nav>
    </header>
  );
}
