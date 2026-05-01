import HomePage from "pages/homepage/page";

export default function Home({ reviews }) {
  return <HomePage reviews={reviews} />;
}

export async function getServerSideProps() {
  try {
    const url = `${process.env.GOOGLE_API_URL}/maps/api/place/details/json?place_id=${process.env.GOOGLE_PLACE_ID}&fields=reviews&language=en&reviews_sort=rating&key=${process.env.GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      props: {
        reviews: data.result?.reviews || [],
      },
    };
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    return {
      props: {
        error: "Failed to fetch reviews",
        
      },
    };
  }
}
