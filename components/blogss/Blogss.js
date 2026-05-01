
"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
} from "reactstrap";
// import '../../styles/Blog.css';

import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getValue } from "@utils/lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";
const PreviousPage = dynamic(() => import("@components/previous-page"));
const DynamicBreadcrumb = dynamic(() => import("@components/breadcrumbs"));
const BlogCard = dynamic(() => import("@components/blog/blog-card.js"), {
  ssr: false,
});
const Layout = dynamic(() => import("@components/layout.js"));

export default function OrinBlogPage() {
  const router = useRouter();
  const { query } = router;

  const [activeSection, setActiveSection] = useState("homepage");
  const [blogsList, setBlogsList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(
    query.page ? parseInt(query.page) : 1
  );
  const [limit, setLimit] = useState(9);
  const [pageCount, setPageCount] = useState(1);
  const [blogLoading, setBlogLoading] = useState(false);
  const [featuredArticles, setFeaturedArticles] = useState([]);

  // Sample popular posts for footer (keeping original as fallback)
  const [popularPosts] = useState([
    {
      id: 1,
      title: "What To Do If There Is No Inspiration",
      date: "March 15, 2024",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=120&q=80",
    },
    {
      id: 2,
      title: "How Minimalism Helps Me Stay Calm",
      date: "March 12, 2024",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=120&q=80",
    },
    {
      id: 3,
      title: "The Best National Parks On Our Planet",
      date: "March 10, 2024",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=120&q=80",
    },
    {
      id: 4,
      title: "Basic Steps to Analyze Your Problem",
      date: "March 8, 2024",
      image:
        "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=120&q=80",
    },
  ]);

  // Function to format date properly
  const formatDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      }
      
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      console.warn('Error formatting date:', dateString);
      return new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  // Function to create proper excerpt from content
  const createExcerpt = (blog) => {
    // First priority: Use description field if available
    if (blog.description && blog.description.trim()) {
      const desc = blog.description.trim();
      return desc.length > 150 ? desc.substring(0, 150) + "..." : desc;
    }
    
    // Second priority: Use meta_description if available
    if (blog.meta_description && blog.meta_description.trim()) {
      const metaDesc = blog.meta_description.trim();
      return metaDesc.length > 150 ? metaDesc.substring(0, 150) + "..." : metaDesc;
    }
    
    // Third priority: Extract from content if available
    if (blog.content && blog.content.trim()) {
      // Remove HTML tags and get clean text
      const cleanContent = blog.content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ') // Replace &nbsp; with spaces
        .replace(/&[a-zA-Z0-9#]+;/g, '') // Remove other HTML entities
        .trim();
      
      if (cleanContent.length > 0) {
        return cleanContent.length > 150 
          ? cleanContent.substring(0, 150) + "..."
          : cleanContent;
      }
    }
    
    // Fallback
    return "Read more about this interesting article...";
  };

  // Function to fetch blogs from API
  const fetchBlogs = async (page = 1, limitPerPage = 9) => {
    setBlogLoading(true);
    try {
      // Using your actual API endpoint with correct parameters
      const apiUrl = `https://backend-new.dreamsrealty.co.in/api/blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=${limitPerPage}&sort[0]=publishedAt:desc`;
      
      console.log('Fetching from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      // Check if the response is OK and contains JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data && data.data && Array.isArray(data.data)) {
        // Transform API data to match your component structure
        const transformedBlogs = data.data.map(blog => {
          console.log('Processing blog:', blog);
          
          // Handle image URL - checking multiple possible paths
          let imageUrl = "https://via.placeholder.com/600x400?text=Blog+Image";
          
          // Check for cover_image in attributes
          const coverImage = blog.attributes?.cover_image || blog.cover_image;
          
          if (coverImage?.data?.attributes?.url) {
            const url = coverImage.data.attributes.url;
            imageUrl = url.startsWith('http') 
              ? url 
              : `https://backend-new.dreamsrealty.co.in${url}`;
          } else if (coverImage?.data?.attributes?.formats?.large?.url) {
            const url = coverImage.data.attributes.formats.large.url;
            imageUrl = url.startsWith('http')
              ? url
              : `https://backend-new.dreamsrealty.co.in${url}`;
          } else if (coverImage?.data?.attributes?.formats?.medium?.url) {
            const url = coverImage.data.attributes.formats.medium.url;
            imageUrl = url.startsWith('http')
              ? url
              : `https://backend-new.dreamsrealty.co.in${url}`;
          }
          // Fallback to direct URL properties
          else if (coverImage?.url) {
            imageUrl = coverImage.url.startsWith('http') 
              ? coverImage.url 
              : `https://backend-new.dreamsrealty.co.in${coverImage.url}`;
          }

          // Get blog attributes (handle both blog.attributes and direct blog properties)
          const blogData = blog.attributes || blog;
          
          // Create proper excerpt using the improved function
          const excerpt = createExcerpt(blogData);

          // Handle dates properly
          const publishedDate = blogData.publishedAt || blogData.published_at || blogData.createdAt || blogData.created_at;
          const formattedDate = formatDate(publishedDate);

          return {
            id: blog.id,
            title: blogData.title || "Untitled Article",
            image: imageUrl,
            date: formattedDate,
            readTime: blogData.content 
              ? `${Math.max(1, Math.ceil(blogData.content.replace(/<[^>]*>/g, '').split(' ').filter(word => word.length > 0).length / 200))} min read`
              : "5 min read",
            excerpt: excerpt,
            category: blogData.category?.data?.attributes?.name || 
                     blogData.category?.name || 
                     blogData.category || 
                     "Article",
            slug: blogData.slug,
            content: blogData.content || "",
            description: blogData.description || "",
            meta_description: blogData.meta_description || ""
          };
        });

        console.log('Transformed blogs:', transformedBlogs);

        setBlogsList(transformedBlogs);
        
        // Handle pagination from Strapi format
        const totalCount = data.meta?.pagination?.total || transformedBlogs.length;
        const pageCount = data.meta?.pagination?.pageCount || Math.ceil(totalCount / limitPerPage);
        
        setTotalCount(totalCount);
        setPageCount(pageCount);

        // Set featured articles (first 2 articles)
        if (transformedBlogs.length >= 2) {
          setFeaturedArticles([
            {
              ...transformedBlogs[0],
              image: transformedBlogs[0].image,
            },
            {
              ...transformedBlogs[1],
              image: transformedBlogs[1].image,
            }
          ]);
        } else if (transformedBlogs.length === 1) {
          setFeaturedArticles([
            {
              ...transformedBlogs[0],
              image: transformedBlogs[0].image,
            },
            // Fallback second featured article
            {
              id: 'fallback-2',
              title: "More Articles Coming Soon",
              category: "Updates",
              image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
              excerpt: "Stay tuned for more interesting articles and updates.",
              readTime: "2 min read",
              date: formatDate(new Date()),
            }
          ]);
        }
      } else {
        // If API returns empty or invalid data, use fallback
        console.warn('API returned empty or invalid data, using fallback');
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
      console.log('Using fallback data due to API error');
      
      // Use fallback data instead of empty arrays
      setBlogsList(fallbackRecentArticles);
      setTotalCount(fallbackRecentArticles.length);
      setPageCount(Math.ceil(fallbackRecentArticles.length / limitPerPage));
      
      setFeaturedArticles([
        {
          id: 1,
          title: "How Has Minimalism Affected Your Life?",
          category: "Living Purposefully",
          image:
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          excerpt:
            "Exploring the transformative power of minimalist living and its impact on daily life.",
          readTime: "5 min read",
          date: "March 15, 2024",
        },
        {
          id: 2,
          image:
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
          title: "Article Title 2",
          category: "Design",
          date: "January 14, 2024",
          readTime: "3 min read",
        },
      ]);
    } finally {
      setBlogLoading(false);
    }
  };

  // Fallback recent articles (original data for when API fails)
  const fallbackRecentArticles = [
    {
      id: 2,
      title: "How Minimalism Helps Me Stay Calm",
      image: "/img1.jpg",
      excerpt:
        "In sbsbcsbjkajks this quis tortor molestias postum. Pellentesque turpis risus ac urna dellus neque at...",
      readTime: "4 min read",
      date: "March 12, 2024",
      category: "Wellness",
    },
    {
      id: 3,
      title: "What Will Help You Be Happy?",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      excerpt:
        "Nunc molestie, dui quis pellentesque lorem, felis eros vehicula leo, ut molestdua elit leo quis ante...",
      readTime: "6 min read",
      date: "March 10, 2024",
      category: "Happiness",
    },
    {
      id: 4,
      title: "Does This Thing Bring Me Balance?",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      excerpt:
        "Vestibulum lorem ipsum, lobortis sit et, rutrum sit, elementum a... mollis. Nullam accumsan lorem et elit...",
      readTime: "3 min read",
      date: "March 8, 2024",
      category: "Balance",
    },
    {
      id: 5,
      title: "The Best National Parks On Our Planet",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      excerpt:
        "Dulsque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi...",
      readTime: "7 min read",
      date: "March 5, 2024",
      category: "Travel",
    },
    {
      id: 6,
      title: "Simple Ways To Stay Focused",
      image:
        "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      excerpt:
        "Class aptent lacint lorem news. Phaellus vitae dictum magna. Sed sod mauus sed...",
      readTime: "4 min read",
      date: "March 3, 2024",
      category: "Productivity",
    },
    {
      id: 7,
      title: "What To Do If There Is No Inspiration",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      excerpt:
        "Colloque ut dolor. Praesent vestibulus netus et mauriue eunean varius. Lorem ipsum dolor sit amet...",
      readTime: "5 min read",
      date: "March 1, 2024",
      category: "Creativity",
    },
    {
      id: 8,
      title: "Useful Things For Better Productivity",
      image:
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      excerpt:
        "Proin viverra, ligula sit amet ultricies semper, ligula arcu tristique sapien, a posuere...",
      readTime: "6 min read",
      date: "February 28, 2024",
      category: "Productivity",
    },
    {
      id: 9,
      title: "How Has Minimalism Affected Your Life?",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      excerpt:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos...",
      readTime: "4 min read",
      date: "February 25, 2024",
      category: "Minimalism",
    },
  ];

  useEffect(() => {
    fetchBlogs(pageNumber, limit);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageNumber, limit]);

  const handlePaginationClick = (newPageNumber) => {
    setPageNumber(newPageNumber);
    router.push(
      {
        pathname: "/blog",
        query: { page: newPageNumber },
      },
      undefined,
      { shallow: true }
    );
  };

  // Get current articles to display (API data or fallback)
  const currentArticles = blogsList.length > 0 ? blogsList : fallbackRecentArticles;
  const currentFeatured = featuredArticles.length > 0 ? featuredArticles : [
    {
      id: 1,
      title: "How Has Minimalism Affected Your Life?",
      category: "Living Purposefully",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      excerpt:
        "Exploring the transformative power of minimalist living and its impact on daily life.",
      readTime: "5 min read",
      date: "March 15, 2024",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      title: "Article Title 2",
      category: "Design",
      date: "January 14, 2024",
      readTime: "3 min read",
    },
  ];

  return (
    <Layout>
      <div className="about-us-banner position-relative">
      
          <img
            src="/images/about-us/banner-about-image.webp"
            className="img-fluid about-banner-img"
            alt="collage-of-buildings-and-rooms"
          />
          <div className="custom-container">
            <h3>Blogs</h3>
          </div>
        </div>
      <section className="orin-blog-wrapper">
        {/* Must-Read Articles Section */}
        <div className="orin-featured-section">
          <Container>
            <div className="orin-section-header">
              <h1 style={{fontSize: "40px", fontWeight:"normal"}} className="orin-section-title">Must-Read Articles</h1>
              <p className="orin-section-subtitle">
                My best articles that recommend for you
              </p>
              <div className="orin-section-divider"></div>
            </div>

          <Row className="justify-content-center">
              <Col lg={15}>
                <div
                  className="orin-featured-swiper-container"
                  style={{ position: "relative" }}
                >
                  <Swiper
                    direction="vertical"
                    slidesPerView={1}
                    spaceBetween={0}
                    navigation={{
                      nextEl: ".orin-featured-next",
                      prevEl: ".orin-featured-prev",
                    }}
                    pagination={{
                      clickable: true,
                      el: ".swiper-pagination-custom",
                    }}
                    modules={[Navigation, Pagination]}
                    className="orin-featured-swiper"
                    style={{ height: "500px" }}
                  >
                    {currentFeatured.map((featuredArticle) => (
                      <SwiperSlide key={featuredArticle.id}>
                        <div className="orin-featured-card">
                          <div
                            className="orin-featured-image"
                            style={{ position: "relative" }}
                          >
                            <img
                              src={featuredArticle.image}
                              alt={featuredArticle.title}
                              className="orin-featured-img"
                            />
                            <div className="orin-featured-overlay">
                              <div className="orin-featured-content">
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "40px",
                                    marginBottom: "7px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  className="orin-featured-meta"
                                >
                                  <span>{featuredArticle.date}</span>
                                  <Badge className="orin-featured-badge">
                                    {featuredArticle.category}
                                  </Badge>
                                  <span>{featuredArticle.readTime}</span>
                                </div>
                                <h3
                                  style={{ color: "white" }}
                                  className="orin-featured-title"
                                >
                                  {featuredArticle.title}
                                </h3>
                              </div>
                            </div>
                            {/* Custom Navigation Buttons (INSIDE IMAGE, left and right, vertical) */}
                            <div
                              className="orin-featured-prev"
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "15px",
                                zIndex: 10,
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                opacity: 0.8,
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "white",
                                  borderRadius: "100%",
                                  padding: "5px",
                                }}
                              >
                                <Image
                                  src="/left.png"
                                  width={35}
                                  height={35}
                                  alt="Previous"
                                />
                              </div>
                            </div>
                            <div
                              className="orin-featured-next"
                              style={{
                                position: "absolute",
                                top: "50%",
                                right: "15px",
                                zIndex: 10,
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                opacity: 0.8,
                              }}
                            >
                              {/* Right (NEXT) Button */}
                              <div
                                style={{
                                  backgroundColor: "white",
                                  borderRadius: "100%",
                                  padding: "5px",
                                }}
                              >
                                <Image
                                  src="/right.png"
                                  width={35}
                                  height={35}
                                  alt="Next"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* Custom Pagination */}
                  <div className="swiper-pagination-custom"></div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Recent Articles Section */}
        <div className="orin-recent-section">
          <Container>
            <div className="orin-section-header">
              <h2 className="orin-section-title">Recent Articles</h2>
              <p className="orin-section-subtitle">
                All my latest articles and blog posts
              </p>
              <div className="orin-section-divider"></div>
            </div>

            {blogLoading ? (
              <div className="orin-loading">
                <p>Please wait...</p>
              </div>
            ) : (
              <>
                {/* Large Featured Article with Side Card Layout */}
                <div className="orin-featured-layout">
                  <Row>
                    {/* Large Featured Article - Takes 8 columns */}
                    <Col lg={8} md={8}>
                      {currentArticles[0] && (
                        <Card
                          style={{ border: "none" }}
                          className="orin-masonry-large-card"
                        >
                          <div className="orin-masonry-large-image">
                            <CardImg
                              style={{
                                boxShadow: "10px 10px 20px gray",
                              }}
                              top
                              src={currentArticles[0].image}
                              alt={currentArticles[0].title}
                              className="orin-masonry-large-img"
                            />
                          </div>
                          <CardBody className="orin-masonry-large-body">
                            <CardTitle className="orin-masonry-large-title">
                              {currentArticles[0].title}
                            </CardTitle>
                            <CardText className="orin-masonry-large-excerpt" style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              lineHeight: '1.5',
                              maxHeight: '4.5em'
                            }}>
                              {currentArticles[0].excerpt}
                            </CardText>
                            <div className="orin-masonry-large-meta">
                              <span>{currentArticles[0].date}</span>
                              <span>{currentArticles[0].readTime}</span>
                            </div>
                            <h6 className="read-btn">Read More</h6>
                          </CardBody>
                        </Card>
                      )}
                    </Col>

                    {/* Side Card - Takes 4 columns */}
                    <Col lg={4} md={4}>
                      {currentArticles[1] && (
                        <Card
                          style={{ border: "none" }}
                          className="orin-side-card"
                        >
                          <div className="orin-side-image">
                            <CardImg
                              top
                              src={currentArticles[1].image}
                              alt={currentArticles[1].title}
                              className="orin-side-img"
                            />
                          </div>
                          <CardBody className="orin-side-body">
                            <CardTitle className="orin-side-title">
                              {currentArticles[1].title}
                            </CardTitle>
                            <CardText className="orin-side-excerpt" style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              lineHeight: '1.5',
                              maxHeight: '4.5em'
                            }}>
                              {currentArticles[1].excerpt}
                            </CardText>
                            <div className="orin-side-meta">
                              <span>{currentArticles[1].date}</span>
                              <span>{currentArticles[1].readTime}</span>
                            </div>
                            <h6 className="read-btn">Read More</h6>
                          </CardBody>
                        </Card>
                      )}
                    </Col>
                  </Row>
                </div>

                {/* Masonry Layout for Remaining Articles */}
                <div className="orin-masonry-container">
                  <div className="orin-masonry-grid">
                    {currentArticles.slice(2).map((article, index) => (
                      <div key={article.id || index + 2} className="orin-masonry-item">
                        <Card
                          style={{ border: "none" }}
                          className="orin-article-card"
                        >
                          <div className="orin-article-image">
                            <CardImg
                              top
                              src={article.image}
                              alt={article.title}
                              className="orin-article-img"
                            />
                          </div>
                          <CardBody className="orin-article-body">
                            <CardTitle className="orin-article-title">
                              {article.title}
                            </CardTitle>
                            <CardText className="orin-article-excerpt" style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              lineHeight: '1.5',
                              maxHeight: '4.5em'
                            }}>
                              {article.excerpt}
                            </CardText>
                            <div className="orin-article-meta">
                              <span>{article.date}</span>
                              <span>{article.readTime}</span>
                            </div>
                            <h6 className="read-btn">Read More</h6>
                          </CardBody>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Pagination */}
            <div className="orin-pagination-wrapper">
              {(pageCount > 1 || currentArticles.length > 6) && (
                <Pagination className="orin-pagination">
                  <PaginationItem disabled={pageNumber <= 1}>
                    <PaginationLink
                      previous
                      onClick={() => handlePaginationClick(pageNumber - 1)}
                      className="orin-pagination-link"
                    />
                  </PaginationItem>

                  {[...Array(pageCount || 3)].map((_, i) => (
                    <PaginationItem active={i + 1 === pageNumber} key={i}>
                      <PaginationLink
                        onClick={() => handlePaginationClick(i + 1)}
                        className="orin-pagination-link"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem disabled={pageNumber >= (pageCount || 3)}>
                    <PaginationLink
                      next
                      onClick={() => handlePaginationClick(pageNumber + 1)}
                      className="orin-pagination-link"
                    />
                  </PaginationItem>
                </Pagination>
              )}
            </div>
          </Container>
        </div>
        <div
          style={{ position: "relative", margin: "20px 0", marginTop: "70px" }}
        >
          <hr style={{ borderTop: "1px solid gray" }} />
          <FontAwesomeIcon
            icon={faDiamond}
            color="#B2BEB5"
            className="orin-diamond-icon"
          />
        </div>

        {/* Footer Section */}
         <footer className="orin-footer">
          <Container>
            <Row>
              {/* Popular Posts */}
              {/* <Col md={4} className="orin-footer-section">
                <h5 className="orin-footer-title">Popular Posts</h5>
                <div className="orin-footer-posts">
                  {popularPosts.map((post) => (
                    <div key={post.id} className="orin-footer-post">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="orin-footer-post-img"
                      />
                      <div className="orin-footer-post-content">
                        <h6 className="orin-footer-post-title">{post.title}</h6>
                        <small className="orin-footer-post-date">
                          {post.date}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </Col> */}

             
              {/* <Col md={4} className="orin-footer-section">
                <h5 className="orin-footer-title">Random Posts</h5>
                <div className="orin-footer-posts">
                  {popularPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="orin-footer-post">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="orin-footer-post-img"
                      />
                      <div className="orin-footer-post-content">
                        <h6 className="orin-footer-post-title">{post.title}</h6>
                        <small className="orin-footer-post-date">
                          {post.date}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </Col> */}

            
              {/* <Col md={4} className="orin-footer-section">
                <h5 className="orin-footer-title">Contact Me</h5>
                <Form className="orin-contact-form">
                  <FormGroup className="orin-form-group">
                    <Input
                      type="text"
                      placeholder="Your Name"
                      className="orin-form-input"
                    />
                  </FormGroup>
                  <FormGroup className="orin-form-group">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="orin-form-input"
                    />
                  </FormGroup>
                  <FormGroup className="orin-form-group">
                    <Input
                      type="text"
                      placeholder="Subject"
                      className="orin-form-input"
                    />
                  </FormGroup>
                  <FormGroup className="orin-form-group">
                    <Input
                      type="textarea"
                      placeholder="Your Message"
                      rows="4"
                      className="orin-form-input"
                    />
                  </FormGroup>
                  <Button className="orin-contact-btn">Send Message</Button>
                </Form>
              </Col> */}
            </Row>

            
            <div className="orin-footer-bottom">
              <div
                style={{
                  position: "relative",
                  margin: "20px 0",
                  marginTop: "50px",
                  marginBottom: "60px",
                }}
              >
                <hr style={{ borderTop: "1px solid gray" }} />
                <FontAwesomeIcon
                  className="orin-diamond-icon"
                  icon={faDiamond}
                  color="#B2BEB5"
                />
              </div>
              <div className="orin-copyright">
                <p>
                  © 2024 ORIN. All rights reserved. | Designed with ❤️ using
                  Next.js & Reactstrap
                </p>
              </div>
            </div>
          </Container>
        </footer>
      </section>
    </Layout>
  );
}