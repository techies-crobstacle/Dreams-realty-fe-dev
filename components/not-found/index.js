export default function NotFound(props) {
  return (
    <section className="not-found-wrapper text-center pt-5 pb-5">
      <img
        src="/images/logo/logo.png"
        className="not-found-wrapper__image img-fluid mb-3"
        alt="dreams-realty-logo"
      />
      <h4>{props.title || "No Properties Found"}</h4>
    </section>
  );
}
