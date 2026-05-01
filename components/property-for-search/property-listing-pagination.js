export default function PropertyListingPagination() {
  return (
    <div className="property-listing-pagination text-center">
      <ul>
        <li>
          <img
            src="/images/property-for-sale/left.svg"
            className="img-fluid cursor-pointer"
            alt="cheveron-left-icon"
          />
        </li>
        <li>
          <a className="active">1</a>
        </li>
        <li>
          <a>2</a>
        </li>
        <li>
          <a>3</a>
        </li>
        <li>
          <img
            src="/images/property-for-sale/right.svg"
            className="img-fluid cursor-pointer"
            alt="cheveron-right-icon"
          />
        </li>
      </ul>
      <p>1 - 12 of 356 properties to buy</p>
    </div>
  );
}
