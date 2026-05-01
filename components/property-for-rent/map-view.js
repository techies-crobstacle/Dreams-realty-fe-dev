export default function MapView(props) {
  const onChildClick = () => {
    props.onchange();
  };
  return (
    <section className="map-view-wrapper position-absolute">
      <button
        className="theme-button position-absolute"
        onClick={props.changetoListView}
      >
        <img
          src="/images/property-for-sale/right.svg"
          className="img-fluid mr-2"
          alt="chevron-right-icon"
        />
        List View
      </button>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.978704479622!2d77.66095461473128!3d12.844651890939259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae135aeb7f340f%3A0x3ad86af40d2ac611!2sInternational%20Institute%20of%20Information%20Technology%20Bangalore!5e0!3m2!1sen!2sin!4v1625330306093!5m2!1sen!2sin"
        width="100%"
        height="704"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </section>
  );
}
