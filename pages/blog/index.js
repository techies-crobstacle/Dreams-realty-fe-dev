"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link"; // Import Link component
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
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Blog", link: "" },
  ];
  const [limit, setLimit] = useState(8);
  const [pageCount, setPageCount] = useState(1);
  const [blogLoading, setBlogLoading] = useState(false);
  const [featuredArticles, setFeaturedArticles] = useState([]);

  // Function to format date properly
  const formatDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    try {
      const date = new Date(dateString);
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
    if (blog.description && blog.description.trim()) {
      const desc = blog.description.trim();
      return desc.length > 150 ? desc.substring(0, 150) + "..." : desc;
    }
    
    if (blog.meta_description && blog.meta_description.trim()) {
      const metaDesc = blog.meta_description.trim();
      return metaDesc.length > 150 ? metaDesc.substring(0, 150) + "..." : metaDesc;
    }
    
    if (blog.content && blog.content.trim()) {
      const cleanContent = blog.content
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&[a-zA-Z0-9#]+;/g, '')
        .trim();
      
      if (cleanContent.length > 0) {
        return cleanContent.length > 150 
          ? cleanContent.substring(0, 150) + "..."
          : cleanContent;
      }
    }
    
    return "Read more about this interesting article...";
  };

  // Function to fetch blogs from API
  const fetchBlogs = async (page = 1, limitPerPage = 8) => {
    setBlogLoading(true);
    try {
      const apiUrl = `https://backend-new.dreamsrealty.co.in/api/blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=${limitPerPage}&sort[0]=publishedAt:desc`;
      
      console.log('Fetching from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data && data.data && Array.isArray(data.data)) {
        const transformedBlogs = data.data.map(blog => {
          console.log('Processing blog:', blog);
          
          let imageUrl = "https://via.placeholder.com/600x400?text=Blog+Image";
          
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
          else if (coverImage?.url) {
            imageUrl = coverImage.url.startsWith('http') 
              ? coverImage.url 
              : `https://backend-new.dreamsrealty.co.in${coverImage.url}`;
          }

          const blogData = blog.attributes || blog;
          const excerpt = createExcerpt(blogData);
          // const publishedDate = blogData.publishedAt || blogData.published_at || blogData.createdAt || blogData.created_at;
          const publishedDate = blogData.createdAt;
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
        
        const totalCount = data.meta?.pagination?.total || transformedBlogs.length;
        const pageCount = data.meta?.pagination?.pageCount || Math.ceil(totalCount / limitPerPage);
        
        setTotalCount(totalCount);
        setPageCount(pageCount);

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
            {
              id: 'fallback-2',
              title: "More Articles Coming Soon",
              category: "Updates",
              image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
              excerpt: "Stay tuned for more interesting articles and updates.",
              readTime: "2 min read",
              date: formatDate(new Date()),
              slug: "#" // Fallback slug
            }
          ]);
        }
      } else {
        console.warn('API returned empty or invalid data');
        setBlogsList([]);
        setTotalCount(0);
        setPageCount(0);
        setFeaturedArticles([]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
      console.log('API error occurred, showing empty state');
      
      setBlogsList([]);
      setTotalCount(0);
      setPageCount(0);
      setFeaturedArticles([]);
    } finally {
      setBlogLoading(false);
    }
  };

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

  // Component for clickable card wrapper
  const ClickableCard = ({ children, slug, disabled = false }) => {
    if (disabled || !slug || slug === "#") {
      return children;
    }
    
    return (
      <Link href={`/blog/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ cursor: 'pointer' }}>
          {children}
        </div>
      </Link>
    );
  };

  const currentArticles = blogsList;
  const currentFeatured = featuredArticles;

  return (
    <Layout>
      <div className="about-us-banner position-relative">
        <div style={{position: "absolute"}} className="d-flex align-items-center">
          <div style={{ color: "white",marginTop: "36px", marginLeft: "30px" }}>
            <DynamicBreadcrumb textWhite={true} items={breadcrumbItems} />
          </div>
        </div>
        <img
          src="/images/about-us/banner-about-image.webp"
          className="img-fluid about-banner-img"
          alt="collage-of-buildings-and-rooms"
        />
        <div className="custom-container">
          <h3 style={{padding:"20px 0px"}}>Blogs</h3>
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
                    direction="horizontal"
                    slidesPerView={1}
                    spaceBetween={0}
                    modules={[Pagination]}
                    className="orin-featured-swiper"
                    style={{ height: "500px" }}
                    onSwiper={(swiper) => {
                      window.featuredSwiper = swiper;
                    }}
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
                                <ClickableCard slug={featuredArticle.slug}>
                                  <h3
                                    style={{ color: "white" }}
                                    className="orin-featured-title"
                                  >
                                    {featuredArticle.title}
                                  </h3>
                                </ClickableCard>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  
                  {/* Single Set of Navigation Buttons */}
                  <button
                    onClick={() => window.featuredSwiper?.slidePrev()}
                    style={{
                      position: "absolute",
                      top: "40%",
                      left: "15px",
                      zIndex: 20,
                      transform: "translate(0, -50%)",
                      cursor: "pointer",
                      opacity: 0.9,
                      background: "white",
                      border: "none",
                      padding: 0,
                      borderRadius: "50%",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50px",
                      height: "50px",
                      minWidth: "50px",
                      minHeight: "50px",
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "1"}
                    onMouseLeave={(e) => e.target.style.opacity = "0.9"}
                  >
                    <span style={{ 
                      fontSize: "20px", 
                      fontWeight: "bold", 
                      color: "#333",
                      lineHeight: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>‹</span>
                  </button>
                  
                  <button
                    onClick={() => window.featuredSwiper?.slideNext()}
                    style={{
                      position: "absolute",
                      top: "40%",
                      right: "15px",
                      zIndex: 20,
                      transform: "translate(0, -50%)",
                      cursor: "pointer",
                      opacity: 0.9,
                      background: "white",
                      border: "none",
                      padding: 0,
                      borderRadius: "50%",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50px",
                      height: "50px",
                      minWidth: "50px",
                      minHeight: "50px",
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "1"}
                    onMouseLeave={(e) => e.target.style.opacity = "0.9"}
                  >
                    <span style={{ 
                      fontSize: "20px", 
                      fontWeight: "bold", 
                      color: "#333",
                      lineHeight: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>›</span>
                  </button>
                  
                  <div className="swiper-pagination-custom"></div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
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

        {/* Recent Articles Section */}
        <div className="orin-recent-section">
          <Container>
            <div className="orin-section-header">
              <h2 style={{fontSize: "30px"}} className="orin-section-title">Recent Articles</h2>
              <p className="orin-section-subtitle">
                All my latest articles and blog posts
              </p>
              <div className="orin-section-divider"></div>
            </div>

            {blogLoading ? (
              <div className="orin-loading">
                <p>Please wait...</p>
              </div>
            ) : currentArticles.length === 0 ? (
              <div className="orin-no-articles">
                <p>No articles available at the moment.</p>
              </div>
            ) : (
              <>
                {/* Large Featured Article with Side Card Layout */}
                <div className="orin-featured-layout">
                  <Row>
                    {/* Large Featured Article */}
                    <Col lg={8} md={8}>
                      {currentArticles[0] && (
                        <ClickableCard slug={currentArticles[0].slug}>
                          <Card
                            style={{border: "1px solid #efeff2"}}
                            className="orin-masonry-large-card"
                          >
                            <div className="orin-masonry-large-image">
                              <CardImg
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
                        </ClickableCard>
                      )}
                    </Col>

                    {/* Side Card */}
                    <Col lg={4} md={4}>
                      {currentArticles[1] && (
                        <ClickableCard slug={currentArticles[1].slug}>
                          <Card
                            style={{border: "1px solid #efeff2"}}
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
                        </ClickableCard>
                      )}
                    </Col>
                  </Row>
                </div>

                {/* Masonry Layout for Remaining Articles */}
                {currentArticles.length > 2 && (
                  <div className="orin-masonry-container">
                    <div className="orin-masonry-grid">
                      {currentArticles.slice(2).map((article, index) => (
                        <div key={article.id || index + 2} className="orin-masonry-item">
                          <ClickableCard slug={article.slug}>
                            <Card
                              style={{border: "1px solid #efeff2"}}
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
                          </ClickableCard>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            <div className="orin-pagination-wrapper">
              {pageCount > 1 && (
                <Pagination className="orin-pagination">
                  <PaginationItem disabled={pageNumber <= 1}>
                    <PaginationLink
                      previous
                      onClick={() => handlePaginationClick(pageNumber - 1)}
                      className="orin-pagination-link"
                    />
                  </PaginationItem>

                  {[...Array(pageCount)].map((_, i) => (
                    <PaginationItem active={i + 1 === pageNumber} key={i}>
                      <PaginationLink
                        onClick={() => handlePaginationClick(i + 1)}
                        className="orin-pagination-link"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem disabled={pageNumber >= pageCount}>
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
       
      </section>
    </Layout>
  );
}